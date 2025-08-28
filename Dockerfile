# syntax=docker.io/docker/dockerfile:1
# hadolint global ignore=DL3018

FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# hadolint ignore=DL3018
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml ./
RUN  corepack enable pnpm && pnpm i --frozen-lockfile

# Run stage
FROM alpine:3.20

SHELL ["/bin/ash", "-eo", "pipefail", "-c"]

RUN apk add --no-cache bash curl ca-certificates sqlite-libs && curl -L https://github.com/benbjohnson/litestream/releases/download/v0.3.13/litestream-v0.3.13-linux-amd64.tar.gz | tar -C /usr/local/bin -xzf -

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Litestream 設定腳本
COPY <<'EOF' /app/setup-litestream.sh
#!/bin/bash
set -e

if [ -n "$SAKURA_OBJECT_STORAGE_BUCKET" ] && \
   [ -n "$SAKURA_OBJECT_STORAGE_ACCESS_KEY" ] && \
   [ -n "$SAKURA_OBJECT_STORAGE_SECRET_KEY" ] && \
   [ -n "$SQLITE_DB_PATH" ]; then

  echo "Configuring Litestream backup..."

  mkdir -p "$(dirname "$SQLITE_DB_PATH")"

  cat > /etc/litestream.yml <<LITESTREAM_EOF
dbs:
  - path: $SQLITE_DB_PATH
    replicas:
      - type: s3
        endpoint: https://s3.isk01.sakurastorage.jp
        bucket: $SAKURA_OBJECT_STORAGE_BUCKET
        path: ${APP_NAME}/${SQLITE_DB_PATH##*/}
        access-key-id: $SAKURA_OBJECT_STORAGE_ACCESS_KEY
        secret-access-key: $SAKURA_OBJECT_STORAGE_SECRET_KEY
        sync-interval: ${LITESTREAM_REPLICATE_INTERVAL:-10s}
LITESTREAM_EOF

  if [ ! -f "$SQLITE_DB_PATH" ]; then
    echo "Database not found, attempting to restore from backup..."
    if /usr/local/bin/litestream restore -config /etc/litestream.yml -if-replica-exists "$SQLITE_DB_PATH"; then
      echo "Database restored successfully from backup"
    else
      echo "No backup found or restore failed, starting with fresh database"
    fi
  fi

  pnpm migrate

  echo "Starting Litestream with app integration..."
  sync

  cd /app

  corepack enable pnpm && pnpm run build

  exec /usr/local/bin/litestream replicate -config /etc/litestream.yml -exec "node .next/standalone/server.js"
else
  echo "Litestream backup not configured, starting app directly..."
  sync
  exec /app/app
fi
EOF

RUN chmod +x /app/setup-litestream.sh

ARG PORT=8080
ENV PORT=$PORT
EXPOSE $PORT

USER nextjs

ENTRYPOINT ["/app/setup-litestream.sh"]

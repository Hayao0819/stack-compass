# syntax=docker.io/docker/dockerfile:1
# hadolint global ignore=DL3018



FROM node:22-alpine AS base

WORKDIR /app
COPY ./scripts /app/scripts
SHELL ["/bin/ash", "-eo", "pipefail", "-c"]

# hadolint ignore=DL3016
RUN apk add --no-cache libc6-compat bash curl ca-certificates sqlite-libs \
    && curl -L https://github.com/benbjohnson/litestream/releases/download/v0.3.13/litestream-v0.3.13-linux-amd64.tar.gz \
    | tar -C /usr/local/bin -xzf - && npm install -g drizzle-kit drizzle-orm better-sqlite3


FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

FROM deps AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM base AS prod

ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME="0.0.0.0"
EXPOSE 3000

WORKDIR /app

COPY --from=builder /app/.next/standalone .
# マイグレーション用のSQLのみを含める（アプリのDBファイルは含めない）
COPY ./db /app/db
RUN rm -f /app/db/app.db
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts

ARG DB_FILE_NAME

CMD ["/app/scripts/start.sh"]

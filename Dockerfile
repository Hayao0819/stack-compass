# syntax=docker.io/docker/dockerfile:1
# hadolint global ignore=DL3018



FROM node:22-alpine AS base

WORKDIR /app
COPY ./scripts /app/scripts
# # hadolint ignore=DL3018
RUN apk add --no-cache libc6-compat && /app/scripts/install-litestream.sh

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

FROM deps AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run migrate && npm run build

FROM base AS prod
SHELL ["/bin/ash", "-eo", "pipefail", "-c"]
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME="0.0.0.0"
EXPOSE 3000

WORKDIR /app

COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/db ./db
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts

ARG DB_FILE_NAME

CMD ["/app/scripts/start-container.sh"]

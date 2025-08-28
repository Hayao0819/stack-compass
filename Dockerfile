# syntax=docker.io/docker/dockerfile:1
# hadolint global ignore=DL3018



FROM node:22-alpine AS base

WORKDIR /app
COPY ./scripts /app/scripts
# # hadolint ignore=DL3018
RUN apk add --no-cache libc6-compat && /app/scripts/install-litestream.sh

FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile


FROM deps AS builder
COPY . .
ARG AUTH_SECRET
ARG AUTH_GITHUB_ID
ARG AUTH_GITHUB_SECRET
ARG DB_FILE_NAME
ARG DATABASE_URL
ARG APP_NAME
ARG SAKURA_API_SECRET
ARG SAKURA_API_TOKEN
ARG SAKURA_STORAGE_BUCKET_NAME
ARG SAKURA_STORAGE_KEYID
ARG SAKURA_STORAGE_SECRET
ARG CONTAINER_IMAGE_NAME
ARG CONTAINER_REGISTRY_URL
ARG CONTAINER_REGISTRY_USERNAME
ARG CONTAINER_REGISTRY_PASSWORD

# 結局setup-litestream.sh内でシークレットをコンテナ内に保存してしまうので良くない
RUN /app/scripts/setup-litestream.sh 
RUN pnpm migrate
RUN pnpm build


FROM builder AS prod

SHELL ["/bin/ash", "-eo", "pipefail", "-c"]
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME="0.0.0.0"
EXPOSE 3000

WORKDIR /app

COPY --from=builder /app/db ./db
COPY --from=builder /app/.next/standalone ./.next/standalone
COPY --from=builder /app/.next/static ./.next/static

ENTRYPOINT ["/app/scripts/start-container.sh"]

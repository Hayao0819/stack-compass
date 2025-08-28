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
RUN /app/scripts/setup-litestream.sh && pnpm migrate && pnpm build


FROM builder AS prod

SHELL ["/bin/ash", "-eo", "pipefail", "-c"]
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME="0.0.0.0"
EXPOSE 3000

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ENTRYPOINT ["/app/start-container.sh"]

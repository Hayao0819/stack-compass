# syntax=docker.io/docker/dockerfile:1
# hadolint global ignore=DL3018



FROM node:22-alpine AS base

WORKDIR /app
COPY ./scripts /app/scripts
# # hadolint ignore=DL3018
RUN apk add --no-cache libc6-compat && /app/scripts/install-litestream.sh
# RUN /app/scripts/install-litestream.sh

FROM base AS deps
COPY package.json package-lock.yaml* ./
RUN npm install

FROM deps AS builder
COPY . .
COPY --from=deps /app/node_modules ./node_modules
ARG DB_FILE_NAME
COPY ./litestream.yml /etc/litestream.yml
RUN /app/scripts/setup-litestream.sh
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

ARG DB_FILE_NAME

# ENTRYPOINT ["/app/scripts/start-container.sh"]
CMD ["/app/scripts/start-container.sh"]

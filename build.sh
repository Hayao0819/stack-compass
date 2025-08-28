#!/usr/bin/env sh

cd "$(dirname "$0")" || exit 1

# shellcheck source=/dev/null
. ./.env.local

docker buildx build \
    --build-arg AUTH_SECRET="$AUTH_SECRET" \
    --build-arg AUTH_GITHUB_ID="$AUTH_GITHUB_ID" \
    --build-arg AUTH_GITHUB_SECRET="$AUTH_GITHUB_SECRET" \
    --build-arg DB_FILE_NAME="$DB_FILE_NAME" \
    --build-arg DATABASE_URL="$DATABASE_URL" \
    --build-arg APP_NAME="$APP_NAME" \
    --build-arg SAKURA_API_SECRET="" \
    --build-arg SAKURA_API_TOKEN="" \
    --build-arg SAKURA_STORAGE_BUCKET_NAME="$SAKURA_STORAGE_BUCKET_NAME" \
    --build-arg SAKURA_STORAGE_KEYID="$SAKURA_STORAGE_KEYID" \
    --build-arg SAKURA_STORAGE_SECRET="$SAKURA_STORAGE_SECRET" \
    --build-arg CONTAINER_IMAGE_NAME="$CONTAINER_IMAGE_NAME" \
    --build-arg CONTAINER_REGISTRY_URL="$CONTAINER_REGISTRY_URL" \
    --build-arg CONTAINER_REGISTRY_USERNAME="$CONTAINER_REGISTRY_USERNAME" \
    --build-arg CONTAINER_REGISTRY_PASSWORD="$CONTAINER_REGISTRY_PASSWORD" \
    -t "stack-compass-dev:latest" \
    .

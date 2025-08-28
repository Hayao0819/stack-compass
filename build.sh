#!/usr/bin/env sh

cd "$(dirname "$0")" || exit 1

# shellcheck source=/dev/null
. ./.env.local

docker buildx build \
    --build-arg DB_FILE_NAME="$DB_FILE_NAME" \
    -t "stack-compass-dev:latest" \
    .

#!/bin/sh

cd "$(dirname "$0")" || exit 1
# shellcheck source=/dev/null
. ./.env.local
# shellcheck source=/dev/null
. ./scripts/common-litestream-config.sh > ./litestream.yml

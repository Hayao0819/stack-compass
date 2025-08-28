#!/usr/bin/env sh

cd /app || exit 1
./scripts/setup-litestream.sh
exec litestream replicate -config /etc/litestream.yml -exec "node server.js"

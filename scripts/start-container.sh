#!/usr/bin/env sh

cd /app || exit 1
exec /usr/local/bin/litestream replicate -config /etc/litestream.yml -exec "node .next/standalone/server.js"

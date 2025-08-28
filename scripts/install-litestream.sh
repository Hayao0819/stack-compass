#!/usr/bin/env sh
# litestream をインストールする

set -eu

apk add --no-cache bash curl ca-certificates sqlite-libs

curl -L https://github.com/benbjohnson/litestream/releases/download/v0.3.13/litestream-v0.3.13-linux-amd64.tar.gz |
    tar -C /usr/local/bin -xzf -

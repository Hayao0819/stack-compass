#!/bin/sh
# 環境変数をもとに litestream.yml を生成し標準出力する

set -eu

if [ -z "${SAKURA_STORAGE_BUCKET_NAME-""}" ] ||
  [ -z "${SAKURA_STORAGE_KEYID-""}" ] ||
  [ -z "${SAKURA_STORAGE_SECRET-""}" ] ||
  [ -z "${APP_NAME-""}" ] ||
  [ -z "${DB_FILE_NAME-""}" ]; then
  echo "Litestream backup not configured" >&2

  echo "APP_NAME=${APP_NAME-""}" >&2
  echo "SAKURA_STORAGE_BUCKET_NAME=${SAKURA_STORAGE_BUCKET_NAME-""}" >&2
  echo "SAKURA_STORAGE_KEYID=${SAKURA_STORAGE_KEYID-""}" >&2
  echo "SAKURA_STORAGE_SECRET=${SAKURA_STORAGE_SECRET-""}" >&2
  echo "DB_FILE_NAME=${DB_FILE_NAME-""}" >&2
  exit 1
fi

echo "Configuring Litestream backup..." >&2

cat <<EOF
dbs:
  - path: $DB_FILE_NAME
    replicas:
      - type: s3
        endpoint: https://s3.isk01.sakurastorage.jp
        bucket: $SAKURA_STORAGE_BUCKET_NAME
        path: ${APP_NAME}/${DB_FILE_NAME##*/}
        access-key-id: $SAKURA_STORAGE_KEYID
        secret-access-key: $SAKURA_STORAGE_SECRET
        sync-interval: ${LITESTREAM_REPLICATE_INTERVAL:-10s}
EOF

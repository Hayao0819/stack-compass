#!/usr/bin/env sh

set -eu

if [ -z "${SAKURA_STORAGE_BUCKET_NAME-""}" ] ||
    [ -z "${SAKURA_STORAGE_KEYID-""}" ] ||
    [ -z "${SAKURA_STORAGE_SECRET-""}" ] ||
    [ -z "${DB_FILE_NAME-""}" ]; then
    echo "Litestream backup not configured, starting app directly..." >&2


    echo "SAKURA_STORAGE_BUCKET_NAME=${SAKURA_STORAGE_BUCKET_NAME-""}"
    echo "SAKURA_STORAGE_KEYID=${SAKURA_STORAGE_KEYID-""}"
    echo "SAKURA_STORAGE_SECRET=${SAKURA_STORAGE_SECRET-""}"
    echo "DB_FILE_NAME=${DB_FILE_NAME-""}"
    exit 1
    # sync
    # exec /app/app
fi

echo "Configuring Litestream backup..." >&2

mkdir -p "$(dirname "$DB_FILE_NAME")"

cat >/etc/litestream.yml <<EOF
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

if [ ! -e "$DB_FILE_NAME" ]; then
    echo "Database not found, attempting to restore from backup..." >&2
    if litestream restore -config /etc/litestream.yml -if-replica-exists "$SQLITE_DB_PATH"; then
        echo "Database restored successfully from backup" >&2
    else
        echo "No backup found or restore failed, starting with fresh database" >&2
    fi
fi
sync

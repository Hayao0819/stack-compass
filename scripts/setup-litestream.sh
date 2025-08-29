#!/usr/bin/env sh
# litestream の初期設定を行う

set -eu

cd "$(dirname "$0")/../" || exit 1

if [ -z "${DB_FILE_NAME-""}" ]; then
  echo "Litestream backup not configured" >&2
  echo "DB_FILE_NAME=${DB_FILE_NAME-""}" >&2
  exit 1
fi

if [ ! -e /etc/litestream.yml ]; then
  if ./scripts/common-litestream-config.sh >/etc/litestream.yml; then
    echo "Litestream configuration file created at /etc/litestream.yml" >&2
  else
    echo "Failed to create Litestream configuration file" >&2
    exit 1
  fi
fi

echo "Configuring Litestream backup..." >&2
mkdir -p "$(dirname "$DB_FILE_NAME")"

if [ ! -e "$DB_FILE_NAME" ]; then
  echo "Database not found, attempting to restore from backup..." >&2
  if litestream restore -config /etc/litestream.yml -if-replica-exists "$DB_FILE_NAME"; then
    echo "Database restored successfully from backup" >&2
  else
    echo "No backup found or restore failed, starting with fresh database" >&2
  fi
fi
sync

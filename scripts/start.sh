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
	if ./scripts/litestream-config.sh >/etc/litestream.yml; then
		echo "Litestream configuration file created at /etc/litestream.yml" >&2
	else
		echo "Failed to create Litestream configuration file" >&2
		exit 1
	fi
fi

echo "Configuring Litestream backup..." >&2
mkdir -p "$(dirname "$DB_FILE_NAME")"

echo "Attempting to restore database from replica (if exists)..." >&2
if litestream restore -config /etc/litestream.yml -if-replica-exists "$DB_FILE_NAME"; then
	echo "Restore step completed (replica may or may not have existed)" >&2
else
	echo "Restore step failed or no replica; continuing with local DB state" >&2
fi


echo "Running database migrations..." >&2
if drizzle-kit migrate; then
	echo "Migrations completed successfully" >&2
else
	echo "Migration failed" >&2
	exit 1
fi

sync

# 3) レプリケーションを開始し、アプリを起動
exec litestream replicate -config /etc/litestream.yml -exec "node server.js"

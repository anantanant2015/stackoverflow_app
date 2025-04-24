#!/bin/bash

set -e

MODE=${REBUILD_MODE:-init-rebuild}
echo "🚀 Rebuild Mode: $MODE"

case "$MODE" in
  clean-rebuild)
    echo "🧨 Cleaning all containers, volumes (except images)..."
    docker rm -f $(docker ps -aq) 2>/dev/null || true
    docker volume rm $(docker volume ls -q) 2>/dev/null || true
    docker network rm $(docker network ls -q | grep -v bridge) 2>/dev/null || true
    echo "🔁 Starting full rebuild..."
    docker compose up --build
    ;;

  init-rebuild)
    echo "📦 Pulling images and running full setup..."
    docker compose pull
    docker compose build
    docker compose up
    ;;

  rebuild)
    echo "♻️ Standard rebuild (cache-enabled)..."
    docker compose build
    docker compose up
    ;;

  *)
    echo "❌ Unknown REBUILD_MODE: $MODE"
    exit 1
    ;;
esac

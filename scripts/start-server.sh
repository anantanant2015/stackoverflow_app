#!/bin/bash

set -e

# Set environment (default to "dev")
ENV="${ENV:-dev}"

# Compose file selection
if [ "$ENV" = "prod" ]; then
  COMPOSE_FILE="docker-compose.prod.yml"
  ENV_FILE=".env.prod"
else
  COMPOSE_FILE="docker-compose.yml"
  ENV_FILE=".env.dev"
fi

echo "🚀 Starting server in '$ENV' mode..."

# Check required docker-compose file
if [ ! -f "$COMPOSE_FILE" ]; then
  echo "❌ Missing $COMPOSE_FILE. Please make sure it's in the project root."
  exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose >/dev/null 2>&1; then
  echo "❌ docker-compose is not installed or not in your PATH."
  exit 1
fi

# Use the matching env file if it exists
if [ -f "$ENV_FILE" ]; then
  echo "📁 Using environment variables from $ENV_FILE"
  export $(grep -v '^#' "$ENV_FILE" | xargs)
fi

# Start services
echo "📦 Running: docker-compose -f $COMPOSE_FILE up -d"
docker-compose -f "$COMPOSE_FILE" up -d

echo "✅ Server started successfully in '$ENV' mode!"

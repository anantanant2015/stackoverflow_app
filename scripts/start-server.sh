#!/bin/bash

set -e

# Set environment (default to "dev" if not provided)
ENV=${ENV:-dev}
COMPOSE="docker-compose -f docker-compose.yml -f docker-compose.${ENV}.yml"

echo "🚀 Starting server in '$ENV' mode using Docker Compose..."

# Check if Docker Compose is available
if ! command -v docker-compose &>/dev/null; then
    echo "❌ Docker Compose not found. Please install Docker Compose and try again."
    exit 1
fi

# Check if base docker-compose.yml file exists
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ docker-compose.yml not found. Please ensure it's located in the project root directory."
    exit 1
fi

# Check if environment-specific docker-compose.$ENV.yml file exists
if [ ! -f "docker-compose.${ENV}.yml" ]; then
    echo "❌ docker-compose.${ENV}.yml not found. Please create it or specify a valid ENV (e.g., dev, prod)."
    exit 1
fi

# Run Docker Compose to start the services
echo "📦 Running: $COMPOSE up -d"
$COMPOSE up -d

# Check result
if [ $? -eq 0 ]; then
    echo "✅ Server started successfully in '$ENV' mode!"
else
    echo "❌ Failed to start the server. Please check Docker logs for more details."
    exit 1
fi

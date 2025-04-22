#!/bin/bash

ENV_FILE=$1

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ $ENV_FILE does not exist."
  exit 1
fi

REQUIRED_VARS=(
  # Backend
  DB_USERNAME
  DB_PASSWORD
  DB_HOST
  DB_PORT
  DB_NAME
  DATABASE_URL
  SECRET_KEY_BASE
  PHX_SERVER
  PHX_HOST
  PORT
  ENVIRONMENT
  APP_NAME

  # Frontend
  REACT_APP_API_URL
  REACT_APP_API_SUFFIX
  REACT_APP_SITE
  REACT_APP_CACHE_EXPIRATION
  HOST
  CHOKIDAR_USEPOLLING
)

SSL_VARS=(SSL_KEY_PATH SSL_CERT_PATH)

echo "🔍 Validating $ENV_FILE..."
MISSING=false

for VAR in "${REQUIRED_VARS[@]}"; do
  val=$(grep -E "^$VAR=" "$ENV_FILE" | cut -d '=' -f2-)
  if [[ -z "$val" ]]; then
    echo "❌ Missing or empty: $VAR"
    MISSING=true
  fi
done

# Production-specific recommendations
if [[ "$ENV_FILE" == *".prod" ]]; then
  for VAR in "${SSL_VARS[@]}"; do
    val=$(grep -E "^$VAR=" "$ENV_FILE" | cut -d '=' -f2-)
    if [[ -z "$val" ]]; then
      echo "⚠️  Recommended (but missing): $VAR (required for SSL in production)"
    fi
  done
fi

if [ "$MISSING" = true ]; then
  echo ""
  echo "❌ Validation failed for $ENV_FILE."
  exit 1
else
  echo ""
  echo "✅ All required variables are present and non-empty in $ENV_FILE!"
  exit 0
fi

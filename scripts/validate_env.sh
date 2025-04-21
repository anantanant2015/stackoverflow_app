#!/bin/bash

# Usage:
# chmod +x scripts/validate_env.sh
# ./scripts/validate_env.sh .env

ENV_FILE=$1

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ $ENV_FILE does not exist."
  exit 1
fi

REQUIRED_VARS=(
  # Backend essentials
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

  # SSL (recommended for prod)
  SSL_KEY_PATH
  SSL_CERT_PATH

  # Frontend essentials
  REACT_APP_API_URL
  REACT_APP_SITE
  REACT_APP_CACHE_EXPIRATION
)

echo "🔍 Validating $ENV_FILE..."
MISSING=false

for VAR in "${REQUIRED_VARS[@]}"; do
  if ! grep -q "^$VAR=" "$ENV_FILE"; then
    echo "❌ Missing: $VAR"
    MISSING=true
  fi
done

if [ "$MISSING" = true ]; then
  echo ""
  echo "❌ Validation failed for $ENV_FILE."
  exit 1
else
  echo "✅ $ENV_FILE looks good!"
fi

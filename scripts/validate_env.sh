#!/bin/bash

# chmod +x scripts/validate_env.sh
# ./scripts/validate_env.sh .env.dev


ENV_FILE=$1

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ $ENV_FILE does not exist."
  exit 1
fi

REQUIRED_VARS=(
  DB_USERNAME
  DB_PASSWORD
  DB_HOST
  DB_NAME
  DB_PORT
  SECRET_KEY_BASE
  MIX_ENV
  DATABASE_URL
  REACT_APP_API_URL
)

echo "🔍 Validating $ENV_FILE..."
for VAR in "${REQUIRED_VARS[@]}"; do
  if ! grep -q "^$VAR=" "$ENV_FILE"; then
    echo "❌ Missing: $VAR"
    MISSING=true
  fi
done

if [ "$MISSING" = true ]; then
  echo "❌ Validation failed."
  exit 1
else
  echo "✅ $ENV_FILE looks good!"
fi

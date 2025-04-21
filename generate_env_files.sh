#!/bin/bash

echo "========================================="
echo "🌱 .env File Generator for Dev & Prod"
echo "========================================="

# List of variable definitions: VAR_NAME|Description|Default(dev)|Default(prod)
ENV_VARS=(
  # Backend
  "DB_USERNAME|Postgres DB username (e.g., postgres)|postgres|postgres"
  "DB_PASSWORD|Postgres DB password|postgres|postgres"
  "DB_HOST|Database hostname (e.g., db)|db|db"
  "DB_PORT|Database port|5432|5432"
  "DB_NAME|Database name (e.g., stackoverflow_be_dev or prod_db)|stackoverflow_be_dev|prod_db"
  "POOL_SIZE|Ecto connection pool size|10|10"
  "DATABASE_URL|Full DB URL (e.g., ecto://user:pass@host/dbname)||"
  "SECRET_KEY_BASE|Phoenix secret key (use mix phx.gen.secret)||"
  "PHX_SERVER|Start Phoenix server (true/false)|true|true"
  "PHX_HOST|Domain or host (e.g., localhost or yourdomain.com)|localhost|yourdomain.com"
  "PORT|Phoenix port|4000|4000"
  "DNS_CLUSTER_QUERY|Clustering DNS query (optional)||"
  "SSL_KEY_PATH|Path to SSL key file (optional)||"
  "SSL_CERT_PATH|Path to SSL cert file (optional)||"
  "OPENAI_API_KEY|OpenAI API Key (optional)||"
  "LLM_API_URL|LLM service URL|http://llm:11434/api/generate|http://llm:11434/api/generate"
  "MAILGUN_API_KEY|Mailgun API Key (optional)||"
  "MAILGUN_DOMAIN|Mailgun domain (optional)||"

  # Frontend
  "REACT_APP_API_URL|Backend API URL|http://localhost:4000|https://yourdomain.com"
  "REACT_APP_SITE|Frontend site name||"
  "REACT_APP_CACHE_EXPIRATION|Frontend cache time in ms|86400000|86400000"
  "REACT_APP_STACKEXCHANGE_KEY|StackExchange API Key||"
  "REACT_APP_STACK_APP_KEY|Stack App Key||"

  # General (for both frontend and backend)
  "ENVIRONMENT|Environment type (dev/prod)|dev|prod"
  "APP_NAME|App Name (for example: stackoverflow_clone)|stackoverflow_clone|stackoverflow_clone"
)

create_env_file() {
  local file_name=$1
  local env_type=$2

  echo ""
  echo "🚧 Generating $file_name for $env_type environment..."

  if [ -f "$file_name" ]; then
    echo "⚠️  $file_name already exists. Overwrite? (y/N)"
    read -r overwrite
    if [[ $overwrite != "y" && $overwrite != "Y" ]]; then
      echo "⏭️  Skipping $file_name"
      return
    fi
  fi

  echo "# Auto-generated on $(date)" > "$file_name"
  echo "" >> "$file_name"

  # Unified env setup for both backend and frontend
  echo "# General settings" >> "$file_name"
  for entry in "${ENV_VARS[@]}"; do
    IFS="|" read -r var_name description dev_default prod_default <<< "$entry"
    default_val=""
    [[ $env_type == "dev" ]] && default_val="$dev_default"
    [[ $env_type == "prod" ]] && default_val="$prod_default"

    prompt="➤ Enter $description"
    [[ -n "$default_val" ]] && prompt+=" [default: $default_val]"

    read -p "$prompt: " user_val
    final_val="${user_val:-$default_val}"

    echo "$var_name=$final_val" >> "$file_name"
  done

  # Add unified settings on top
  echo "# Unified settings for both backend and frontend" >> "$file_name"
  echo "ENVIRONMENT=$env_type" >> "$file_name"
  echo "APP_NAME=stackoverflow_clone" >> "$file_name"

  echo "✅ $file_name created."
}

# Generate both .env (unified) for dev and prod
create_env_file ".env" "dev"
create_env_file ".env.prod" "prod"

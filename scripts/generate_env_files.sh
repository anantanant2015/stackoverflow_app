#!/bin/bash

echo "========================================="
echo "🌱 .env File Generator for Dev & Prod"
echo "========================================="

REQUIRED_VARS=("SECRET_KEY_BASE" "REACT_APP_SITE")

ENV_VARS=(
  # Backend
  "DB_USERNAME|Postgres DB username (e.g., postgres)|postgres|postgres"
  "DB_PASSWORD|Postgres DB password|postgres|postgres"
  "DB_HOST|Database hostname (e.g., db)|db|db"
  "DB_PORT|Database port|5432|5432"
  "DB_NAME|Database name (e.g., stackoverflow_be_dev or prod_db)|stackoverflow_be_dev|prod_db"
  "POOL_SIZE|Ecto connection pool size|10|10"
  "DATABASE_URL|Full DB URL (leave blank to auto-generate)||"
  "SECRET_KEY_BASE|Phoenix secret key (leave blank to auto-generate)||"
  "PHX_SERVER|Start Phoenix server (true/false)|true|true"
  "PHX_HOST|Domain or host (e.g., localhost or yourdomain.com)|localhost|yourdomain.com"
  "PORT|Phoenix port|4000|4000"
  "DNS_CLUSTER_QUERY|Clustering DNS query (optional)||"
  "SSL_KEY_PATH|Path to SSL key file (optional)||certs/key.pem"
  "SSL_CERT_PATH|Path to SSL cert file (optional)||certs/cert.pem"
  "OPENAI_API_KEY|OpenAI API Key (optional)||"
  "LLM_API_URL|LLM service URL|http://llm:11434/api/generate|http://llm:11434/api/generate"
  "MAILGUN_API_KEY|Mailgun API Key (optional)||"
  "MAILGUN_DOMAIN|Mailgun domain (optional)||"

  # Frontend
  "REACT_APP_API_URL|Frontend-only: Backend base URL (used in Docker Compose)|http://localhost:4000|https://yourdomain.com"
  "REACT_APP_API_SUFFIX|API path suffix (e.g., /api/ or /api/v1/)|/api/|/api/"
  "REACT_APP_SITE|Frontend site name (required)|localhost|yourdomain.com"
  "REACT_APP_CACHE_EXPIRATION|Frontend cache time in ms|86400000|86400000"
  "REACT_APP_STACKEXCHANGE_KEY|StackExchange API Key||"
  "REACT_APP_STACK_APP_KEY|Stack App Key||"
  "CHOKIDAR_USEPOLLING|Enable polling for file watching|true|false"
  "HOST|Frontend host|0.0.0.0|0.0.0.0"

  # General
  "ENVIRONMENT|Environment type (dev/prod)|dev|prod"
  "APP_NAME|App Name (for example: stackoverflow_clone)|stackoverflow_clone|stackoverflow_clone"
)

generate_secret() {
  if command -v openssl &> /dev/null; then
    echo $(openssl rand -base64 64 | tr -d '\n')
  else
    echo "⚠️  No suitable secret generator found. Please generate one manually."
    exit 1
  fi
}

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
  echo "# General settings" >> "$file_name"

  declare -A answers

  for entry in "${ENV_VARS[@]}"; do
    IFS="|" read -r var_name description dev_default prod_default <<< "$entry"
    default_val=""
    [[ $env_type == "dev" ]] && default_val="$dev_default"
    [[ $env_type == "prod" ]] && default_val="$prod_default"

    if [[ "$var_name" == "SECRET_KEY_BASE" && -z "$default_val" ]]; then
      default_val=$(generate_secret)
    fi

    while true; do
      prompt="➤ Enter $description"
      [[ -n "$default_val" ]] && prompt+=" [default: $default_val]"
      read -p "$prompt: " user_val

      val="${user_val:-$default_val}"

      if [[ " ${REQUIRED_VARS[*]} " =~ " $var_name " && -z "$val" ]]; then
        echo "❌ $var_name is required and cannot be empty."
      else
        answers[$var_name]="$val"
        break
      fi
    done
  done

  if [[ -z "${answers[DATABASE_URL]}" ]]; then
    db_url="ecto://${answers[DB_USERNAME]}:${answers[DB_PASSWORD]}@${answers[DB_HOST]}:${answers[DB_PORT]}/${answers[DB_NAME]}"
    echo "🧠 Auto-generating DATABASE_URL: $db_url"
    answers[DATABASE_URL]="$db_url"
  fi

  for var_name in "${!answers[@]}"; do
    echo "$var_name=${answers[$var_name]}" >> "$file_name"
  done

  echo "✅ $file_name created."

  if [[ $env_type == "prod" ]]; then
    echo ""
    echo "📢 Reminder: Make sure your SSL cert files exist at:"
    echo "   🔒 SSL_KEY_PATH: ${answers[SSL_KEY_PATH]}"
    echo "   📄 SSL_CERT_PATH: ${answers[SSL_CERT_PATH]}"
  fi
}

create_env_file ".env" "dev"
create_env_file ".env.prod" "prod"

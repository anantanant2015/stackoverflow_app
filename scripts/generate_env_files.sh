#!/bin/bash

echo "========================================="
echo "🌱 .env File Generator for Dev & Prod"
echo "========================================="

REQUIRED_VARS=("SECRET_KEY_BASE" "REACT_APP_SITE")

declare -A ENV_GROUPS=(
  ["General Settings"]="APP_NAME ENVIRONMENT OPEN_HOST"
  ["Database (PostgreSQL)"]="POSTGRES_DB POSTGRES_PASSWORD POSTGRES_USER POOL_SIZE"
  ["Phoenix Backend"]="DB_HOST DB_NAME DB_PASSWORD DB_PORT DB_USERNAME DATABASE_URL MIX_ENV SECRET_KEY_BASE PORT LLM_API_URL STACK_APP_CLIENT_ID STACK_APP_CLIENT_SECRET STACK_APP_REDIRECT_URI MAILGUN_API_KEY MAILGUN_DOMAIN OPENAI_API_KEY PHX_HOST PHX_SERVER SSL_CERT_PATH SSL_KEY_PATH DNS_CLUSTER_QUERY"
  ["Frontend (React)"]="CHOKIDAR_USEPOLLING REACT_HOST REACT_APP_STACK_APP_KEY REACT_APP_API_SUFFIX REACT_APP_API_URL REACT_APP_CACHE_EXPIRATION REACT_APP_SITE REACT_APP_STACKEXCHANGE_KEY"
  ["LLM (Ollama)"]="LLM_MODEL OLLAMA_CLEAN_UNUSED_MODELS OLLAMA_HOST"
)

ENV_GROUP_ORDER=("General Settings" "Database (PostgreSQL)" "Phoenix Backend" "Frontend (React)" "LLM (Ollama)")
declare -A GROUP_LOOKUP

for group in "${!ENV_GROUPS[@]}"; do
  for var in ${ENV_GROUPS[$group]}; do
    GROUP_LOOKUP["$var"]="$group"
  done
done

ENV_VARS=(
  # General
  "APP_NAME|App Name (e.g., stackoverflow_clone)|stackoverflow_clone|stackoverflow_clone"
  "ENVIRONMENT|Environment type (dev/prod)|dev|prod"
  "OPEN_HOST|Open host|0.0.0.0|0.0.0.0"

  # DB
  "POSTGRES_DB|Postgres DB name|stackoverflow_be_dev|prod_db"
  "POSTGRES_USER|Postgres user|postgres|postgres"
  "POSTGRES_PASSWORD|Postgres password|postgres|postgres"
  "POOL_SIZE|Connection pool size|10|10"

  "DB_USERNAME|DB Username|postgres|postgres"
  "DB_PASSWORD|DB Password|postgres|postgres"
  "DB_HOST|DB Hostname|db|db"
  "DB_PORT|DB Port|5432|5432"
  "DB_NAME|DB Name|stackoverflow_be_dev|prod_db"
  "DATABASE_URL|Full DB URL (optional)|db_url|db_url"
  "MIX_ENV|Mix environment|dev|prod"

  "SECRET_KEY_BASE|Phoenix secret key (auto-generate if blank)||"
  "PORT|Phoenix port|4000|4000"
  "PHX_HOST|Phoenix host (e.g. localhost)|localhost|yourdomain.com"
  "PHX_SERVER|Run Phoenix server|true|true"
  "SSL_KEY_PATH|SSL key path (optional)||certs/key.pem"
  "SSL_CERT_PATH|SSL cert path (optional)||certs/cert.pem"
  "DNS_CLUSTER_QUERY|DNS cluster query (optional)|dns_cluster_query|dns_cluster_query"

  "OPENAI_API_KEY|OpenAI API key (optional)||"
  "LLM_API_URL|LLM API URL|http://llm:11434/api/generate|http://llm:11434/api/generate"
  "STACK_APP_CLIENT_ID|Your stackexchange app client id|stackexchange_app_client_id|stackexchange_app_client_id"
  "STACK_APP_CLIENT_SECRET|Your stackexchane app client secret|stackexchane_app_client_secret|stackexchane_app_client_secret"
  "STACK_APP_REDIRECT_URI|Your stackexchange app redirect URL|stackexchange_app_redirect_url|stackexchange_app_redirect_url"
  "MAILGUN_API_KEY|Mailgun API Key|mailgun_api_key|mailgun_api_key"
  "MAILGUN_DOMAIN|Mailgun Domain|mailgun_domain|mailgun_domain"

  # React
  "CHOKIDAR_USEPOLLING|Enable polling|true|false"
  "REACT_HOST|React host|0.0.0.0|0.0.0.0"
  "REACT_APP_API_URL|Backend base URL|http://localhost:4000|https://yourdomain.com"
  "REACT_APP_API_SUFFIX|API path suffix|/api/|/api/"
  "REACT_APP_CACHE_EXPIRATION|Cache time (ms)|86400000|86400000"
  "REACT_APP_SITE|Frontend site (required)|stackoverflow|stackoverflow"
  "REACT_APP_STACK_APP_KEY|Stack App Key|stackexchange_app_key|stackexchange_app_key"
  "REACT_APP_STACKEXCHANGE_KEY|StackExchange Key|stackexchange_app_key|stackexchange_app_key"

  # LLM
  "LLM_MODEL|LLM model name (e.g., tinyllama)|tinyllama|tinyllama"
  "OLLAMA_CLEAN_UNUSED_MODELS|Delete unused models|false|false"
  "OLLAMA_HOST|Ollama server host|0.0.0.0:11434|0.0.0.0:11434"
)

generate_secret() {
  openssl rand -base64 64 | tr -d '\n'
}

prompt_for_vars() {
  local env_type=$1
  local use_defaults=$2
  declare -gA answers

  for entry in "${ENV_VARS[@]}"; do
    IFS="|" read -r var_name description dev_default prod_default <<< "$entry"
    default_val=""
    [[ $env_type == "dev" ]] && default_val="$dev_default"
    [[ $env_type == "prod" ]] && default_val="$prod_default"

    if [[ "$var_name" == "SECRET_KEY_BASE" && -z "$default_val" ]]; then
      default_val=$(generate_secret)
    fi

    if [[ "$use_defaults" == true ]]; then
      answers[$var_name]="$default_val"
    else
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
    fi
  done
}

create_env_file() {
  local file_name=$1
  local env_type=$2
  local use_defaults=$3

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

  prompt_for_vars "$env_type" "$use_defaults"

  if [[ -z "${answers[DATABASE_URL]}" ]]; then
    db_url="ecto://${answers[DB_USERNAME]}:${answers[DB_PASSWORD]}@${answers[DB_HOST]}:${answers[DB_PORT]}/${answers[DB_NAME]}"
    echo "🧠 Auto-generating DATABASE_URL: $db_url"
    answers[DATABASE_URL]="$db_url"
  fi

  echo "# Auto-generated on $(date)" > "$file_name"
  echo "" >> "$file_name"

  # Add grouped vars
  for group in "${ENV_GROUP_ORDER[@]}"; do
    echo "# ─────────────── $group ───────────────" >> "$file_name"
    IFS=' ' read -r -a group_vars <<< "${ENV_GROUPS[$group]}"
    for var in "${group_vars[@]}"; do
      [[ -n "${answers[$var]}" ]] && echo "$var=${answers[$var]}" >> "$file_name"
    done
    echo "" >> "$file_name"
  done

  # Add uncategorized vars (fallback group)
  echo "# ─────────────── Uncategorized ───────────────" >> "$file_name"
  for var in "${!answers[@]}"; do
    [[ -z "${GROUP_LOOKUP[$var]}" ]] && echo "$var=${answers[$var]}" >> "$file_name"
  done
  echo "" >> "$file_name"

  echo "✅ $file_name created."
}

# Ask whether to use defaults
echo ""
read -p "➤ Load default values for all questions? (press Enter to accept, type 'n' or 'no' to skip): " load_default_answer
use_defaults=true
if [[ "$load_default_answer" == "n" || "$load_default_answer" == "no" ]]; then
  use_defaults=false
fi

create_env_file ".env" "dev" "$use_defaults"
create_env_file ".env.prod" "prod" "$use_defaults"

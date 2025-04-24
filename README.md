---

# 🚀 Fullstack StackOverflow Clone

[![Docker](https://img.shields.io/badge/docker-ready-blue?logo=docker)](https://www.docker.com/)
[![Phoenix](https://img.shields.io/badge/phoenix-1.7.10-red?logo=elixir)](https://www.phoenixframework.org/)
[![React](https://img.shields.io/badge/react-frontend-61DAFB?logo=react)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/postgresql-database-336791?logo=postgresql)](https://www.postgresql.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-black?logo=openai)](https://openai.com/)
[![Ollama](https://img.shields.io/badge/Ollama-LLM-4B5563?logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTIiIGZpbGw9IiM0QjU1NjMiLz48L3N2Zz4=)
[![CI/CD](https://img.shields.io/github/actions/workflow/status/your-org/your-repo/deploy.yml?label=ci%2Fcd&logo=github)](./.github/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

---

## 📚 Table of Contents

- [📦 Project Structure](#-project-structure)
- [⚙️ Development Setup](#️-development-setup)
- [🚀 Using the Makefile](#-using-the-makefile)
- [⚙️ Manual Script Usage (Optional)](#️-manual-script-usage-optional)
- [🔐 SSL & CORS Configuration](#-ssl--cors-configuration)
- [🌐 Frontend Proxy (Nginx Config)](#-frontend-proxy-nginx-config)
- [🔁 CI/CD via GitHub Actions](#-cicd-via-github-actions)
- [🌍 Suggested Free Deployment](#-suggested-free-deployment)
- [💡 Useful Developer Commands](#-useful-developer-commands)
- [✅ Features Recap](#-features-recap)
- [🙌 Contributing](#-contributing)
- [📄 License](#-license)

---

## 📦 Project Structure

```
.
├── stackoverflow_be/         # Phoenix backend
├── stackoverflow_fe/         # React frontend
├── docker-compose.yml        # Common base Compose config
├── docker-compose.prod.yml   # Production overrides
├── .env                      # Dev environment config
├── .env.prod                 # Production config
├── scripts/                  # Utility shell scripts
│   ├── generate-env.sh       # Interactive .env file generator
│   ├── validate-env.sh       # Validates .env content
│   ├── docker-setup.sh       # Verifies Docker Desktop is installed & running
│   ├── start-server.sh       # Entrypoint for ENV=dev|prod
│   └── Makefile              # Recommended interface
└── .github/workflows/        # CI/CD pipeline (GitHub Actions)
```

---

## ⚙️ Development Setup

### 🔧 Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- (Optional) `make` installed (`brew install make` or `sudo apt install make`)

---

## 🚀 Using the Makefile

The `Makefile` provides an **automated, zero-config** experience for dev and prod environments.

### ▶️ Launch Environments

```bash
make -f scripts/Makefile up                # Starts development stack
make -f scripts/Makefile up ENV=prod       # Starts production stack
```

### 🛠 Behind the Scenes

- Validates `.env` / `.env.prod` and generates if missing
- Confirms Docker is available and running
- Starts correct `docker-compose` setup

> ✅ **Run from the project root**, always using `-f scripts/Makefile`.

---

## ⚙️ Manual Script Usage (Optional)

Useful if not using `make` or want fine-grained control.

### 1. Generate Env Files

```bash
./scripts/generate-env.sh
```

Creates or overwrites:
- `.env` (for dev)
- `.env.prod` (for prod)

### 2. Validate Env Files

```bash
./scripts/validate-env.sh .env
./scripts/validate-env.sh .env.prod
```

### 3. Start Server Manually

```bash
ENV=dev ./scripts/start-server.sh
ENV=prod ./scripts/start-server.sh
```

---

## 🔐 SSL & CORS Configuration

### ✅ CORS (`endpoint.ex`)

```elixir
plug CORSPlug, origin: ["http://localhost:3000", "https://yourdomain.com"]
```

Install:

```elixir
{:cors_plug, "~> 3.0"}
```

---

### ✅ SSL Setup (`config/prod.exs`)

```elixir
config :stackoverflow_be, StackoverflowBeWeb.Endpoint,
  url: [host: "yourdomain.com", port: 443],
  https: [
    port: 443,
    cipher_suite: :strong,
    keyfile: System.get_env("SSL_KEY_PATH"),
    certfile: System.get_env("SSL_CERT_PATH")
  ]
```

### 🧪 Dev SSL Certificate Generation

```bash
make -f scripts/Makefile generate-certs
```

Add these to your `.env` or `.env.prod`:

```env
SSL_CERT_PATH=certs/cert.pem
SSL_KEY_PATH=certs/key.pem
```

---

## 🌐 Frontend Proxy (Nginx Config)

Inside `stackoverflow_fe/nginx.conf`:

```nginx
server {
  listen 80;
  server_name localhost;

  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api/ {
    proxy_pass http://backend:4000/api/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

---

## 🔁 CI/CD via GitHub Actions

Workflow: `.github/workflows/deploy.yml`

- Auto builds Docker images
- Pushes to registry (if configured)
- Deploys based on branch and secret setup

---

## 🌍 Suggested Free Deployment

**Recommended**: [Render](https://render.com/)

- Backend: Docker → Web Service
- Frontend: Static Site (with custom Nginx if needed)
- Database: PostgreSQL via Render or Docker volume

---

## 💡 Useful Developer Commands

```bash
make -f scripts/Makefile up                 # Start stack (default: dev)
make -f scripts/Makefile up ENV=prod        # Start stack (prod)
make -f scripts/Makefile down               # Stop stack
docker-compose ps                           # Inspect container state
```

### Running Migrations

```bash
docker-compose exec backend mix ecto.migrate
```

---

## ✅ Features Recap

- ✅ Phoenix + React fullstack architecture
- ✅ Docker-first setup with `.env` generation & validation
- ✅ SSL and CORS support
- ✅ LLM support: OpenAI or local Ollama
- ✅ PostgreSQL + CI/CD + Nginx frontend proxy
- ✅ SSO login, query & result caching
- ✅ One-command setup using `Makefile`

---

## 🙌 Contributing

Star ⭐ the repo, fork, open issues, or submit pull requests. Contributions welcome!

---

## 📄 License

MIT

---

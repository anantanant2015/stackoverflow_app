```markdown
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
- [⚙️ Optional Manual Script Usage](#️-optional-manual-script-usage)
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
├── docker-compose.yml        # Common base for Compose
├── docker-compose.dev.yml    # Dev environment overrides
├── docker-compose.prod.yml   # Production deployment overrides
├── .env                      # Dev environment config (generated)
├── .env.prod                 # Production config (generated)
├── scripts/                  # Utility scripts
│   ├── generate-env.sh       # Generates .env files
│   ├── validate-env.sh       # Validates env files
│   ├── docker-setup.sh       # Verifies Docker Desktop is running
│   ├── start-server.sh       # Starts server (ENV=dev|prod)
│   └── Makefile              # Primary command interface
└── .github/workflows/        # GitHub Actions CI/CD
```

---

## ⚙️ Development Setup

### 🔧 Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/)
- (Optional) `make` installed

---

## 🚀 Using the Makefile

The `Makefile` is the **recommended way** to work with this project. It manages setup, validation, and environment control.

### ▶️ Start the Project

```bash
make -f scripts/Makefile up                # Starts the dev environment (ENV=dev by default)
make -f scripts/Makefile up ENV=prod       # Starts the production environment
```

These commands handle:
- Environment validation
- Script orchestration
- Docker Compose logic

> ✅ Always run from the **project root**, using `-f scripts/Makefile`.

---

## ⚙️ Optional Manual Script Usage

You can run scripts directly from the root:

### 1. Generate `.env` Files

```bash
./scripts/generate-env.sh
```

This creates:
- `.env` for development
- `.env.prod` for production

### 2. Validate `.env` Files

```bash
./scripts/validate-env.sh .env
./scripts/validate-env.sh .env.prod
```

### 3. Start Server Manually

```bash
ENV=dev ./scripts/start-server.sh
ENV=prod ./scripts/start-server.sh
```

> ⚠️ Scripts must be run from the **project root**.

---

## 🔐 SSL & CORS Configuration

### ✅ CORS (`endpoint.ex`)

```elixir
plug CORSPlug, origin: ["http://localhost:3000", "https://yourdomain.com"]
```

Add to `mix.exs`:

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

### 🧪 Generate SSL for Local Dev

```bash
make -f scripts/Makefile generate-certs
```

Then update `.env`:

```env
SSL_CERT_PATH=certs/cert.pem
SSL_KEY_PATH=certs/key.pem
```

---

## 🌐 Frontend Proxy (Nginx Config)

`stackoverflow_fe/nginx.conf`:

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

See `.github/workflows/deploy.yml`:

- ✅ Docker build and push on `main`
- ✅ Deploys via secrets and auto-hooks

---

## 🌍 Suggested Free Deployment

Use [Render](https://render.com/):

- Backend → Docker Web Service
- Frontend → Static Site + Nginx
- DB → Render PostgreSQL or Docker volume

---

## 💡 Useful Developer Commands

```bash
make -f scripts/Makefile up                 # Start stack (default ENV=dev)
make -f scripts/Makefile up ENV=prod        # Start production stack
make -f scripts/Makefile down               # Stop services
docker-compose ps                           # Check status
```

### Migrations

```bash
docker-compose exec backend mix ecto.migrate
```

---

## ✅ Features Recap

- ✅ Phoenix + React fullstack architecture
- ✅ Dockerized environments (dev/prod)
- ✅ `.env` generation and validation
- ✅ SSL and CORS support
- ✅ LLM reranking via OpenAI or local Ollama
- ✅ PostgreSQL database
- ✅ GitHub CI/CD
- ✅ One-command setup with `Makefile`

---

## 🙌 Contributing

Fork, star ⭐, open issues, or submit PRs. Feedback is welcome!

---

## 📄 License

MIT
```

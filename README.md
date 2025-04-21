
# 🚀 Fullstack StackOverflow Clone

A modern fullstack app featuring:

- ⚙️ Phoenix (Elixir) backend (`stackoverflow_be`)
- 💻 React frontend (`stackoverflow_fe`)
- 🐳 Docker/Docker Compose for development & production
- 🔐 SSL, CORS, and secure environment config
- 🧠 Locally hosted LLM (TinyLlama via Ollama)
- ⚙️ Unified `.env` management with interactive generator script
- ✅ `Makefile` automation and `.env` validation
- 🎛️ Configurable environments via `ENV=dev|prod`

---

## 📦 Project Structure

```
.
├── stackoverflow_be/         # Phoenix backend
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   └── .env.production (generated)
├── stackoverflow_fe/         # React frontend
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   ├── nginx.conf
│   └── .env.production (generated)
├── docker-compose.yml        # Common base for Compose
├── docker-compose.dev.yml    # Dev environment overrides
├── docker-compose.prod.yml   # Production deployment overrides
├── .env                      # Dev environment config (generated)
├── .env.prod                 # Production config (generated)
├── scripts/                  # Utility scripts
│   ├── generate-env.sh       # Interactive .env generator
│   ├── validate-env.sh       # Ensures required .env variables are present
│   ├── docker-setup.sh       # Verifies Docker Desktop is installed and running
│   └── start-server.sh       # Unified server starter (ENV=dev|prod)
├── Makefile                  # Common developer commands
└── .github/workflows/        # GitHub Actions CI/CD
```

---

## ⚙️ Development Setup

### 🔧 Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/)
- (Optional) `make` installed

---

### ▶️ Start with `Makefile` (Recommended)

```bash
make up                  # defaults to ENV=dev
make up ENV=prod         # starts production stack
```

> Internally runs the env validation + script-based startup.

---

### ▶️ Manual Dev Setup

```bash
./scripts/generate-env.sh     # generates .env and .env.prod
ENV=dev ./scripts/start-server.sh
```

- Backend → http://localhost:4000
- Frontend → http://localhost:3000

> Frontend proxies `/api/*` requests to backend.

---

## 🛠 Environment Setup

### 1. Generate `.env` Files

```bash
./scripts/generate-env.sh
```

This generates:

- `.env` → for development
- `.env.prod` → for production

### 2. Validate Your Environment

```bash
./scripts/validate-env.sh .env
./scripts/validate-env.sh .env.prod
```

This ensures required variables are defined.

---

### 🔍 Environment Variables

#### Backend (Phoenix):
- `DB_USERNAME`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `POOL_SIZE`, `DATABASE_URL`
- `SECRET_KEY_BASE`, `PHX_SERVER`, `PHX_HOST`, `PORT`, `SSL_KEY_PATH`, `SSL_CERT_PATH`
- `LLM_API_URL`, `OPENAI_API_KEY`, `MAILGUN_API_KEY`, `MAILGUN_DOMAIN`

#### Frontend (React):
- `REACT_APP_API_BASE_URL`, `REACT_APP_CACHE_EXPIRATION`
- `REACT_APP_SITE`, `REACT_APP_STACKEXCHANGE_KEY`, `REACT_APP_STACK_APP_KEY`

---

## 🚀 Production Deployment

### 1. Setup Environment

```bash
make up ENV=prod
```

Or manually:

```bash
ENV=prod ./scripts/start-server.sh
```

> Make sure `.env.prod`, `.env.production`, and Nginx certs are correctly set up.

### 2. Build & Run Production Stack

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

- Frontend served via Nginx (port 80)
- Phoenix backend runs on port 4000
- PostgreSQL uses Docker volume for persistence

---

## 🔐 SSL & CORS Setup

### ✅ CORS in `endpoint.ex`

```elixir
plug CORSPlug, origin: ["http://localhost:3000", "https://yourdomain.com"]
```

Add to `mix.exs`:

```elixir
{:cors_plug, "~> 3.0"}
```

---

### ✅ SSL in `config/prod.exs`

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

---

## 🌐 Nginx Config (React Frontend)

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

## 🔁 CI/CD (GitHub Actions)

See `.github/workflows/deploy.yml`:

- ✅ Build Docker images on push to `main`
- ✅ Push to Docker Hub (with GitHub Secrets)

---

## 🌍 Free Deployment Suggestion

Deploy using **[Render](https://render.com/)**:

- Backend → Docker Web Service
- Frontend → Static Site + Nginx
- PostgreSQL → Render Add-on or Docker

---

## 🧪 Useful Commands

### Run Locally

```bash
make up                      # ENV=dev by default
make up ENV=prod
```

### Stop Services

```bash
make down                   # docker-compose down
```

### Phoenix Migrations

```bash
docker-compose exec backend mix ecto.migrate
```

### Backend Release (Phoenix)

```bash
MIX_ENV=prod mix release
```

---

## ✅ What's Included

- ✅ LLM reranking (local or OpenAI)
- ✅ Unified `.env` management with validation
- ✅ Dockerized backend/frontend
- ✅ Makefile + helper scripts
- ✅ Secure production configs
- ✅ PostgreSQL volume persistence
- ✅ Auto-restart services
- ✅ GitHub Actions CI/CD

---

## 🙌 Contributing

Feel free to fork, open issues, and submit PRs! Contributions and feedback are always welcome.

---

## 📄 License

MIT

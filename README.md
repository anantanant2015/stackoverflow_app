
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
├── stackoverflow_fe/         # React frontend
├── docker-compose.yml        # Common base for Compose
├── docker-compose.dev.yml    # Dev environment overrides
├── docker-compose.prod.yml   # Production deployment overrides
├── .env                      # Dev environment config (generated)
├── .env.prod                 # Production config (generated)
├── scripts/                  # Utility scripts (optional)
│   ├── generate-env.sh       # Generates .env files
│   ├── validate-env.sh       # Validates env files
│   ├── docker-setup.sh       # Verifies Docker Desktop is running
│   ├── start-server.sh       # Starts server (ENV=dev|prod)
│   └── generate-certs.sh     # Generates local SSL certs
├── Makefile                  # Primary command interface
└── .github/workflows/        # GitHub Actions CI/CD
```

---

## ⚙️ Development Setup

### 🔧 Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/)
- (Optional) `make` installed

---

## 🚀 Primary Touchpoint: `Makefile`

The `Makefile` is the **recommended way** to work with this project. It manages all setup and environment switching for you.

### ▶️ Start the Project

```bash
make up                    # Starts the dev environment (ENV=dev by default)
make up ENV=prod           # Starts the production environment
```

These commands handle:
- Environment variable validation
- Script execution
- Docker Compose orchestration

> ✅ Always run from the **project root**.

---

## ⚙️ Optional Manual Setup

You can also run individual scripts directly from the root directory:

### 1. Generate Environment Files

```bash
./scripts/generate-env.sh
```

This creates:
- `.env` for development
- `.env.prod` for production

### 2. Validate Environment Files

```bash
./scripts/validate-env.sh .env
./scripts/validate-env.sh .env.prod
```

### 3. Start Server (Manually)

```bash
ENV=dev ./scripts/start-server.sh
ENV=prod ./scripts/start-server.sh
```

> ⚠️ All scripts are designed to be run from the **root**, not from inside the `scripts/` folder.

---

## 🔐 SSL & CORS Configuration

### ✅ CORS (in `endpoint.ex`)

```elixir
plug CORSPlug, origin: ["http://localhost:3000", "https://yourdomain.com"]
```

Add to `mix.exs`:

```elixir
{:cors_plug, "~> 3.0"}
```

---

### ✅ SSL Setup (in `config/prod.exs`)

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

### 🧪 Generate SSL Certs for Local Dev

```bash
make generate-certs
```

Update `.env`:

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

- ✅ Builds Docker images on push to `main`
- ✅ Pushes to Docker Hub (via GitHub Secrets)

---

## 🌍 Suggested Free Deployment

Deploy using **[Render](https://render.com/)**:

- Backend → Docker Web Service
- Frontend → Static Site + Nginx
- PostgreSQL → Render Add-on or Docker volume

---

## 💡 Useful Developer Commands

```bash
make up                     # Start stack (default ENV=dev)
make up ENV=prod            # Start production stack
make down                   # Stop all services
docker-compose ps           # Check status
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
- ✅ Local and OpenAI-powered LLM reranking
- ✅ PostgreSQL with Docker volume
- ✅ CI/CD with GitHub Actions
- ✅ One-command `Makefile` control

---

## 🙌 Contributing

Fork, star ⭐, open issues, or submit PRs! Contributions and feedback are welcome.

---

## 📄 License

MIT

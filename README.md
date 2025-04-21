
# 🚀 Fullstack StackOverflow Clone

A modern fullstack app featuring:

- ⚙️ Phoenix (Elixir) backend (`stackoverflow_be`)
- 💻 React frontend (`stackoverflow_fe`)
- 🐳 Docker/Docker Compose for development & production
- 🔐 SSL, CORS, and secure environment config
- 🧠 Locally hosted LLM (TinyLlama via Ollama)
- ⚙️ Unified `.env` management with interactive generator script

---

## 📦 Project Structure

```
.
├── stackoverflow_be/         # Phoenix backend
│   ├── Dockerfile
│   └── .env.production (generated)
├── stackoverflow_fe/         # React frontend
│   ├── Dockerfile
│   ├── nginx.conf
│   └── .env.production (generated)
├── docker-compose.yml        # Dev environment
├── docker-compose.prod.yml   # Production deployment
├── .github/workflows/        # GitHub Actions CI/CD
├── .env                      # Dev environment config (generated)
└── .env.prod                 # Production config (generated)
```

---

## ⚙️ Development Setup

### 🔧 Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/)

---

### ▶️ Start Development Environment

```bash
docker-compose up --build
```

- Backend → http://localhost:4000
- Frontend → http://localhost:3000

> Frontend proxies `/api/*` requests to backend.

---

## 🛠 Environment Setup

### 1. Generate `.env` Files

Run the environment file generator:

```bash
./generate-env.sh
```

This will prompt you for inputs and generate:

- `.env` → for development
- `.env.prod` → for production

Both files include **backend + frontend** settings:
- DB credentials, ports, LLM URL
- Mailgun and OpenAI API keys
- Frontend URLs and caching settings

### 2. Environment Variables Breakdown

#### Backend (Phoenix):
- `DB_USERNAME`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `POOL_SIZE`, `DATABASE_URL`
- `SECRET_KEY_BASE`, `PHX_SERVER`, `PHX_HOST`, `PORT`, `SSL_KEY_PATH`, `SSL_CERT_PATH`
- `LLM_API_URL`, `OPENAI_API_KEY`, `MAILGUN_API_KEY`, `MAILGUN_DOMAIN`

#### Frontend (React):
- `REACT_APP_API_BASE_URL`, `REACT_APP_CACHE_EXPIRATION`
- `REACT_APP_SITE`, `REACT_APP_STACKEXCHANGE_KEY`, `REACT_APP_STACK_APP_KEY`

---

## 🚀 Production Deployment

### 📁 1. Environment Files

Generated via script (`.env.prod`), or manually:

#### `stackoverflow_be/.env.production`

```env
MIX_ENV=prod
DATABASE_URL=ecto://postgres:postgres@db/prod_db
SECRET_KEY_BASE=YOUR_SECRET_KEY
SSL_CERT_PATH=/certs/fullchain.pem
SSL_KEY_PATH=/certs/privkey.pem
```

#### `stackoverflow_fe/.env.production`

```env
REACT_APP_API_BASE_URL=https://yourdomain.com/api
```

> Generate `SECRET_KEY_BASE` with:
> ```bash
> mix phx.gen.secret
> ```

---

### 🏗️ 2. Build & Run Production

```bash
docker-compose -f docker-compose.prod.yml up --build
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

### Backend Release (Phoenix)

```bash
MIX_ENV=prod mix release
```

### Phoenix Migrations

```bash
docker-compose exec backend mix ecto.migrate
```

---

## ✅ What's Included

- ✅ LLM reranking (local or OpenAI)
- ✅ Unified `.env` management
- ✅ Dockerized backend/frontend
- ✅ Secure production configs
- ✅ Auto-restart services
- ✅ PostgreSQL volume persistence
- ✅ GitHub Actions-based CI/CD

---

## 🙌 Contributing

Feel free to fork, open issues, and submit PRs! Contributions and feedback are always welcome.

---

## 📄 License

MIT

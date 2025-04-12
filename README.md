
# 🚀 Fullstack StackOverflow Clone

This project includes:

- ⚙️ Phoenix (Elixir) backend (`stackoverflow_be`)
- 💻 React frontend (`stackoverflow_fe`)
- 🐳 Docker/Docker Compose setup for dev and prod
- 🔐 SSL, CORS, environment configs for production

---

## 📦 Project Structure

```
.
├── stackoverflow_be/         # Phoenix backend
│   ├── Dockerfile
│   └── .env.production
├── stackoverflow_fe/         # React frontend
│   ├── Dockerfile
│   ├── nginx.conf
│   └── .env.production
├── docker-compose.yml        # Dev environment
├── docker-compose.prod.yml   # Production deployment
├── .github/workflows/        # GitHub Actions CI/CD
```

---

## ⚙️ Development Setup

### 🔧 Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/)

### ▶️ Start Dev Environment

```bash
docker-compose up --build
```

- Backend → http://localhost:4000  
- Frontend → http://localhost:3000  

> Frontend proxies `/api/*` to backend.

---

## 🚀 Production Deployment

### 📁 1. Environment Files

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
REACT_APP_API_URL=https://yourdomain.com/api
```

> Generate `SECRET_KEY_BASE` using:
> ```bash
> mix phx.gen.secret
> ```

---

### 🛠 2. Build Production Images

```bash
docker-compose -f docker-compose.prod.yml up --build
```

- Serves React app via Nginx on port `80`
- Phoenix API runs on port `4000`
- PostgreSQL DB persists via Docker volume

---

## 🔐 SSL & CORS

### ✅ CORS in Phoenix (`endpoint.ex`)

```elixir
plug CORSPlug, origin: ["http://localhost:3000", "https://yourdomain.com"]
```

Add to `mix.exs`:

```elixir
{:cors_plug, "~> 3.0"}
```

### ✅ SSL in `config/prod.exs`

```elixir
config :your_app, YourAppWeb.Endpoint,
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

Create `stackoverflow_fe/nginx.conf`:

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

See `.github/workflows/deploy.yml` to:

- Build Docker images on push to `main`
- Push to Docker Hub (credentials via GitHub Secrets)

---

## 🌍 Free Deployment Suggestion

Use **[Render](https://render.com/)**:

- Backend → Web Service (Docker)
- Frontend → Static Site
- Database → PostgreSQL (Render Add-on)

---

## 🧪 Useful Commands

### Generate a Release (Backend)
```bash
MIX_ENV=prod mix release
```

### Phoenix Migrations
```bash
docker-compose exec backend mix ecto.migrate
```

---

## ✅ What's Included

- ✅ Clean Docker images
- ✅ Secure production configs
- ✅ Auto-retry services with `depends_on`
- ✅ Volume-based DB persistence

---

## 🙌 Contributing

Feel free to fork, improve, and PR! For major changes, open an issue to discuss your proposal.

---

## 📄 License

MIT

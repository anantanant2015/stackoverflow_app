# ---- Build Stage ----
  FROM node:20-alpine as build
  WORKDIR /app
  COPY package.json package-lock.json* ./
  RUN npm install
  COPY . .
  RUN npm run build

  # ---- Serve Stage ----
  FROM nginx:alpine
  COPY --from=build /app/build /usr/share/nginx/html
  COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

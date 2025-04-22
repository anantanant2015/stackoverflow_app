#!/bin/bash

CERT_DIR="certs"
CERT_PATH="$CERT_DIR/cert.pem"
KEY_PATH="$CERT_DIR/key.pem"

echo "🔐 Generating self-signed SSL certificate..."

mkdir -p "$CERT_DIR"

openssl req -x509 -newkey rsa:4096 -nodes -keyout "$KEY_PATH" -out "$CERT_PATH" -days 365 \
  -subj "/C=US/ST=Local/L=Dev/O=Dev Cert/CN=localhost"

if [ $? -eq 0 ]; then
  echo "✅ SSL certificate generated:"
  echo "  - Cert: $CERT_PATH"
  echo "  - Key:  $KEY_PATH"
else
  echo "❌ Failed to generate SSL certificate."
  exit 1
fi

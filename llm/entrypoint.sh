#!/bin/bash

echo "Starting Ollama with model: $LLM_MODEL"

ollama serve &

# Wait for Ollama server to be ready
until curl -s http://localhost:11434 > /dev/null; do
  echo "Waiting for Ollama to start..."
  sleep 1
done

# Pull model if needed
if ! ollama list | grep -q "$LLM_MODEL"; then
  echo "Model '$LLM_MODEL' not found. Pulling..."
  ollama pull "$LLM_MODEL"
else
  echo "Model '$LLM_MODEL' already pulled."
fi

# Wait for the model to show up in /api/tags
echo "Waiting for model '$LLM_MODEL' to be available..."
until curl -s http://localhost:11434/api/tags | grep -q "$LLM_MODEL"; do
  echo "Model not yet available, retrying..."
  sleep 1
done

echo "Model '$LLM_MODEL' is ready!"

# Keep container running
wait

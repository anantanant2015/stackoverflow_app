#!/bin/bash

echo "Starting Ollama with model: $LLM_MODEL"

# Optional cleanup of unused models
if [ "$OLLAMA_CLEAN_UNUSED_MODELS" = "true" ]; then
  echo "Cleaning up unused Ollama models..."
  ollama list | awk 'NR>1 {print $1}' | while read -r model; do
    ollama rm "$model"
  done
fi

# Start Ollama server with the selected model
exec ollama serve

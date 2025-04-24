#!/bin/bash

echo "Ollama version:"
ollama version

echo "Starting Ollama with model: $LLM_MODEL"

# Optional cleanup
if [ "$OLLAMA_CLEAN_UNUSED_MODELS" = "true" ]; then
  echo "Cleaning up unused Ollama models..."
  ollama list | awk 'NR>1 {print $1}' | while read -r model; do
    ollama rm "$model"
  done
fi

# Serve with proper binding
exec ollama serve

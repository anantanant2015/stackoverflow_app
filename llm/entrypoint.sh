#!/bin/bash

# Start Ollama server in the background
ollama serve &

# Wait briefly to ensure the server starts
sleep 3

# Pull the model (configurable)
ollama pull "${LLM_MODEL:-tinyllama}"

# Keep container running
tail -f /dev/null

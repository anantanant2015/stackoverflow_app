#!/bin/bash

# Check Docker installation
echo "Checking Docker installation..."
if ! command -v docker &> /dev/null
then
    echo "Docker is not installed. Please install Docker Desktop first."
    exit 1
fi

# Check Docker Desktop status
echo "Checking if Docker Desktop is running..."
if ! docker info > /dev/null 2>&1
then
    echo "Docker Desktop is not running. Please start Docker Desktop and try again."
    exit 1
fi

echo "Docker is installed and running."

# Check Docker Compose installation
echo "Checking Docker Compose installation..."
if ! command -v docker-compose &> /dev/null
then
    echo "Docker Compose is not installed. Installing Docker Compose..."

    # Ensure Docker Compose installation
    if [ "$(uname -s)" == "Linux" ]; then
        # For Linux systems
        sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
    elif [ "$(uname -s)" == "Darwin" ]; then
        # For macOS, Docker Compose should be installed with Docker Desktop, but let's double-check
        echo "Please ensure that Docker Desktop on macOS has Docker Compose included."
    else
        echo "Unsupported OS for Docker Compose installation."
        exit 1
    fi

    echo "Docker Compose installed successfully."
fi

# Set up Docker group permissions
echo "Adding user to Docker group for Docker permissions..."
if ! sudo usermod -aG docker $(whoami); then
    echo "Failed to add user to Docker group. Exiting."
    exit 1
fi

echo "User $(whoami) added to Docker group successfully."

# Suggest logging out and back in for group changes
echo "Please log out and log back in for the group changes to take effect."

# Check Docker networks and volumes
echo "Checking Docker networks and volumes..."

# Check if the required Docker network exists, and create it if necessary
NETWORK_NAME="my_docker_network"
if ! docker network inspect $NETWORK_NAME &>/dev/null; then
    echo "Docker network '$NETWORK_NAME' not found. Creating it..."
    docker network create $NETWORK_NAME
    echo "Network '$NETWORK_NAME' created successfully."
else
    echo "Docker network '$NETWORK_NAME' already exists."
fi

# Check if the required Docker volume exists, and create it if necessary
VOLUME_NAME="my_docker_volume"
if ! docker volume inspect $VOLUME_NAME &>/dev/null; then
    echo "Docker volume '$VOLUME_NAME' not found. Creating it..."
    docker volume create $VOLUME_NAME
    echo "Volume '$VOLUME_NAME' created successfully."
else
    echo "Docker volume '$VOLUME_NAME' already exists."
fi

echo "Docker setup completed successfully."

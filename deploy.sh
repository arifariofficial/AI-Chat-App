#!/bin/bash

# Step 1: Build and push Docker image
echo "Building Docker image..."
docker build --platform linux/amd64 -t sipeai/sipeai . --no-cache

echo "Pushing Docker image to Docker Hub..."
docker push sipeai/sipeai:latest

# Step 2: Git push the code
echo "Pushing code to GitLab..."
git add .
git commit -m "Auto: Build & Push Docker image"
git push origin main

echo "Deployment completed!"

#!/bin/bash

set -e

echo "Starting deployment..."

# Determine docker compose command
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
elif docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    echo "Error: docker-compose not found"
    exit 1
fi

echo "Using: $DOCKER_COMPOSE"

# Create necessary directories
mkdir -p /opt/ivorian-realty
mkdir -p /opt/ivorian-realty/frontend
mkdir -p /opt/ivorian-realty/backend/microservices/infrastructure/nginx
mkdir -p /opt/ivorian-realty/logs

# Copy frontend build
if [ -d "/tmp/frontend-build" ]; then
  echo "Copying frontend build..."
  cp -r /tmp/frontend-build/* /opt/ivorian-realty/frontend/
fi

# Stop existing containers
echo "Stopping existing containers..."
cd /opt/ivorian-realty
$DOCKER_COMPOSE -f docker-compose.yml down || true

# Start infrastructure services (MongoDB, Redis)
echo "Starting infrastructure services..."
$DOCKER_COMPOSE -f docker-compose.yml up -d mongodb redis

# Wait for MongoDB to be ready
echo "Waiting for MongoDB to be ready..."
timeout=60
counter=0
until docker exec ivorian-mongodb mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; do
  sleep 2
  counter=$((counter + 2))
  if [ $counter -ge $timeout ]; then
    echo "MongoDB failed to start within $timeout seconds"
    exit 1
  fi
done
echo "MongoDB is ready!"

# Wait for Redis to be ready
echo "Waiting for Redis to be ready..."
timeout=30
counter=0
until docker exec ivorian-redis redis-cli ping > /dev/null 2>&1; do
  sleep 2
  counter=$((counter + 2))
  if [ $counter -ge $timeout ]; then
    echo "Redis failed to start within $timeout seconds"
    exit 1
  fi
done
echo "Redis is ready!"

# Start application services
echo "Starting application services..."
$DOCKER_COMPOSE -f docker-compose.yml up -d api-gateway auth-service property-service

# Wait for services to be healthy
echo "Waiting for services to be healthy..."
sleep 10

# Check service health
echo "Checking service health..."
for service in api-gateway auth-service property-service; do
  container_name="ivorian-${service}"
  if docker ps | grep -q "$container_name"; then
    echo "$service is running"
  else
    echo "WARNING: $service is not running"
    docker logs "$container_name" || true
  fi
done

# Start Nginx if not already running
if ! docker ps | grep -q ivorian-nginx; then
  echo "Starting Nginx..."
  $DOCKER_COMPOSE -f docker-compose.yml up -d nginx
fi

echo "Deployment completed successfully!"
echo "Services are running:"
$DOCKER_COMPOSE -f docker-compose.yml ps


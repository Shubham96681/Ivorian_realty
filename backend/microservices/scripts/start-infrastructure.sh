#!/bin/bash

# Ivorian Realty Infrastructure Startup Script

echo "🏗️ Starting Ivorian Realty Infrastructure..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Navigate to infrastructure directory
cd "$(dirname "$0")/../infrastructure"

# Set environment
ENVIRONMENT=${1:-dev}

if [ "$ENVIRONMENT" = "prod" ]; then
    echo "🚀 Starting Production Infrastructure..."
    docker-compose -f docker-compose.yml up -d
else
    echo "🔧 Starting Development Infrastructure..."
    docker-compose -f docker-compose.dev.yml up -d
fi

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service health
echo "🏥 Checking service health..."

# Check MongoDB
if docker exec ivorian-mongodb-dev mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
    echo "✅ MongoDB is healthy"
else
    echo "❌ MongoDB is not responding"
fi

# Check Redis
if docker exec ivorian-redis-dev redis-cli ping > /dev/null 2>&1; then
    echo "✅ Redis is healthy"
else
    echo "❌ Redis is not responding"
fi

echo ""
echo "🎉 Infrastructure is ready!"
echo ""
echo "📋 Service URLs:"
echo "   MongoDB:         mongodb://localhost:27017"
echo "   Redis:           redis://localhost:6379"
echo ""
if [ "$ENVIRONMENT" = "prod" ]; then
    echo "📊 Monitoring:"
    echo "   Prometheus:      http://localhost:9090"
    echo "   Grafana:         http://localhost:3001 (admin/admin123)"
    echo ""
fi
echo "🔧 To stop infrastructure:"
echo "   docker-compose -f docker-compose.dev.yml down"
echo ""
echo "📝 To view logs:"
echo "   docker-compose -f docker-compose.dev.yml logs -f"
echo ""
echo "🚀 Ready for microservices development!"

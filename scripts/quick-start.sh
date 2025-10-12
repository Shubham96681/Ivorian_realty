#!/bin/bash

# Ivorian Realty Quick Start Script

echo "🏗️ Starting Ivorian Realty Platform..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Start infrastructure
echo "🚀 Starting infrastructure services..."
cd backend/microservices/infrastructure
docker-compose -f docker-compose.dev.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for infrastructure to be ready..."
sleep 10

# Check infrastructure health
echo "🏥 Checking infrastructure health..."
if docker exec ivorian-mongodb-dev mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
    echo "✅ MongoDB is healthy"
else
    echo "❌ MongoDB is not responding"
fi

if docker exec ivorian-redis-dev redis-cli ping > /dev/null 2>&1; then
    echo "✅ Redis is healthy"
else
    echo "❌ Redis is not responding"
fi

# Start backend services
echo "🔧 Starting backend services..."

# API Gateway
echo "Starting API Gateway..."
cd ../api-gateway
if [ ! -d "node_modules" ]; then
    npm install
fi
npm run dev &
API_GATEWAY_PID=$!

# Auth Service
echo "Starting Auth Service..."
cd ../auth-service
if [ ! -d "node_modules" ]; then
    npm install
fi
npm run dev &
AUTH_SERVICE_PID=$!

# Property Service
echo "Starting Property Service..."
cd ../property-service
if [ ! -d "node_modules" ]; then
    npm install
fi
npm run dev &
PROPERTY_SERVICE_PID=$!

# Start frontend
echo "🎨 Starting frontend..."
cd ../../../frontend
if [ ! -d "node_modules" ]; then
    npm install
fi
npm run dev &
FRONTEND_PID=$!

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 15

# Check service health
echo "🏥 Checking service health..."

services=("3000:API Gateway" "3001:Auth Service" "3002:Property Service")

for service in "${services[@]}"; do
    port=$(echo $service | cut -d: -f1)
    name=$(echo $service | cut -d: -f2)
    
    if curl -f http://localhost:$port/health > /dev/null 2>&1; then
        echo "✅ $name is healthy"
    else
        echo "❌ $name is not responding"
    fi
done

echo ""
echo "🎉 Ivorian Realty Platform is starting up!"
echo ""
echo "📋 Service URLs:"
echo "   Frontend:         http://localhost:3000"
echo "   API Gateway:      http://localhost:3000/api"
echo "   Auth Service:     http://localhost:3001"
echo "   Property Service: http://localhost:3002"
echo ""
echo "🗄️ Infrastructure:"
echo "   MongoDB:          mongodb://localhost:27017"
echo "   Redis:            redis://localhost:6379"
echo ""
echo "🔧 To stop all services:"
echo "   Press Ctrl+C to stop this script"
echo "   Or run: ./scripts/stop-all.sh"
echo ""
echo "📚 Documentation:"
echo "   Backend:          ./backend/README.md"
echo "   Frontend:         ./frontend/README.md"
echo "   Team Setup:       ./backend/microservices/TEAM-SETUP.md"
echo ""
echo "🚀 Happy coding!"

# Keep script running
wait

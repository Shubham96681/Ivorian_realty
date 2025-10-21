#!/bin/bash

echo "🏗️ Starting Ivorian Realty Backend Services..."
echo

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
echo

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

# Start infrastructure
echo "🚀 Starting infrastructure services (MongoDB, Redis)..."
cd microservices/infrastructure
docker-compose -f docker-compose.dev.yml up -d

# Wait for infrastructure to be ready
echo "⏳ Waiting for infrastructure to be ready..."
sleep 15

# Go back to backend root
cd ..

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

echo
echo "🔧 Starting backend microservices..."

# Start API Gateway
echo "Starting API Gateway (Port 3000)..."
cd api-gateway
if [ ! -d "node_modules" ]; then
    echo "Installing API Gateway dependencies..."
    npm install
fi
npm run dev &
API_GATEWAY_PID=$!

# Start Auth Service
echo "Starting Auth Service (Port 3001)..."
cd ../auth-service
if [ ! -d "node_modules" ]; then
    echo "Installing Auth Service dependencies..."
    npm install
fi
npm run dev &
AUTH_SERVICE_PID=$!

# Start Property Service
echo "Starting Property Service (Port 3002)..."
cd ../property-service
if [ ! -d "node_modules" ]; then
    echo "Installing Property Service dependencies..."
    npm install
fi
npm run dev &
PROPERTY_SERVICE_PID=$!

# Go back to backend root
cd ..

echo
echo "🎉 Backend services are starting up!"
echo
echo "📋 Service URLs:"
echo "   API Gateway:      http://localhost:3000"
echo "   Auth Service:     http://localhost:3001"
echo "   Property Service: http://localhost:3002"
echo
echo "🗄️ Infrastructure:"
echo "   MongoDB:          mongodb://localhost:27017"
echo "   Redis:            redis://localhost:6379"
echo
echo "🔧 To stop all services:"
echo "   Press Ctrl+C to stop this script"
echo "   Or run: ./stop-backend.sh"
echo
echo "🚀 Backend is ready for development!"
echo

# Function to cleanup on exit
cleanup() {
    echo
    echo "🛑 Stopping backend services..."
    kill $API_GATEWAY_PID $AUTH_SERVICE_PID $PROPERTY_SERVICE_PID 2>/dev/null
    echo "✅ Backend services stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Keep script running
wait

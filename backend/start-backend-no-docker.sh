#!/bin/bash

echo "🏗️ Starting Ivorian Realty Backend Services (No Docker)..."
echo

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

echo "🔧 Starting backend microservices (without infrastructure)..."

# Start API Gateway
echo "Starting API Gateway (Port 3000)..."
cd microservices/api-gateway
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
echo "⚠️  NOTE: This version runs WITHOUT Docker infrastructure."
echo "   You'll need to set up MongoDB and Redis separately, or use cloud services."
echo
echo "📋 Service URLs:"
echo "   API Gateway:      http://localhost:3000"
echo "   Auth Service:     http://localhost:3001"
echo "   Property Service: http://localhost:3002"
echo
echo "🗄️ Infrastructure Setup Required:"
echo "   MongoDB:          Install locally or use MongoDB Atlas (cloud)"
echo "   Redis:            Install locally or use Redis Cloud"
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

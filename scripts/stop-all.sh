#!/bin/bash

# Ivorian Realty Stop All Script

echo "🛑 Stopping Ivorian Realty Platform..."

# Stop infrastructure
echo "🛑 Stopping infrastructure services..."
cd backend/microservices/infrastructure
docker-compose -f docker-compose.dev.yml down

# Stop any running Node.js processes
echo "🛑 Stopping Node.js processes..."
pkill -f "npm run dev"
pkill -f "node.*server"

echo "✅ All services stopped"
echo ""
echo "🔧 To start again:"
echo "   ./scripts/quick-start.sh"
echo ""
echo "📚 For individual service development:"
echo "   cd backend/microservices/<service-name> && npm run dev"
echo "   cd frontend && npm run dev"

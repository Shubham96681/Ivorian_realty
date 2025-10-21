#!/bin/bash

echo "🛑 Stopping Ivorian Realty Backend Services..."
echo

# Stop infrastructure services
echo "🚀 Stopping infrastructure services..."
cd microservices/infrastructure
docker-compose -f docker-compose.dev.yml down

echo
echo "✅ Backend services stopped successfully!"
echo
echo "🧹 To clean up completely, you can also run:"
echo "   docker system prune -f"
echo

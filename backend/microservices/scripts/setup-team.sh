#!/bin/bash

# Ivorian Realty Team Setup Script

echo "🏗️ Setting up Ivorian Realty Microservices for Team Development..."

# Check if service name is provided
if [ -z "$1" ]; then
    echo "❌ Please provide a service name"
    echo "Usage: ./setup-team.sh <service-name>"
    echo "Available services: api-gateway, auth-service, property-service, user-service, notification-service, file-service"
    exit 1
fi

SERVICE_NAME=$1
SERVICE_DIR="../$SERVICE_NAME"

# Check if service directory exists
if [ ! -d "$SERVICE_DIR" ]; then
    echo "❌ Service directory $SERVICE_DIR does not exist"
    exit 1
fi

echo "📁 Setting up $SERVICE_NAME..."

# Navigate to service directory
cd "$SERVICE_DIR"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file
if [ ! -f ".env" ]; then
    echo "⚙️ Setting up environment configuration..."
    cp env.example .env
    echo "✅ Environment file created. Please configure your settings in .env"
else
    echo "✅ Environment file already exists"
fi

# Create logs directory
mkdir -p logs

# Create uploads directory (for file service)
if [ "$SERVICE_NAME" = "file-service" ]; then
    mkdir -p uploads
fi

# Build the service
echo "🔨 Building service..."
npm run build

echo ""
echo "🎉 Setup complete for $SERVICE_NAME!"
echo ""
echo "📋 Next steps:"
echo "1. Configure your .env file with your specific settings"
echo "2. Start the development server: npm run dev"
echo "3. Check health: curl http://localhost:<port>/health"
echo ""
echo "🔧 Service Information:"
case $SERVICE_NAME in
    "api-gateway")
        echo "   Port: 3000"
        echo "   Health: http://localhost:3000/health"
        ;;
    "auth-service")
        echo "   Port: 3001"
        echo "   Health: http://localhost:3001/health"
        ;;
    "property-service")
        echo "   Port: 3002"
        echo "   Health: http://localhost:3002/health"
        ;;
    "user-service")
        echo "   Port: 3003"
        echo "   Health: http://localhost:3003/health"
        ;;
    "notification-service")
        echo "   Port: 3004"
        echo "   Health: http://localhost:3004/health"
        ;;
    "file-service")
        echo "   Port: 3005"
        echo "   Health: http://localhost:3005/health"
        ;;
esac
echo ""
echo "📚 Documentation: ./README.md"
echo "🐳 Docker: docker build -f Dockerfile.dev -t $SERVICE_NAME-dev ."
echo ""
echo "Happy coding! 🚀"

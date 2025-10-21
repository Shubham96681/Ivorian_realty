# Backend Startup Guide

This guide provides multiple ways to start the Ivorian Realty backend services with a single command.

## 🚀 Quick Start Options

### Option 1: Using npm scripts (Recommended)
```bash
# Navigate to backend directory
cd backend

# Install dependencies and start all services
npm run dev

# Or start services only (if dependencies are already installed)
npm start
```

### Option 2: Using Docker Compose (All-in-one)
```bash
# Navigate to backend directory
cd backend

# Start all services with Docker
docker-compose -f docker-compose.backend.yml up -d

# Stop all services
docker-compose -f docker-compose.backend.yml down
```

### Option 3: Using Batch Scripts (Windows)
```cmd
# Navigate to backend directory
cd backend

# Start all services
start-backend.bat

# Stop all services
stop-backend.bat
```

### Option 4: Using Shell Scripts (Linux/Mac)
```bash
# Navigate to backend directory
cd backend

# Make scripts executable (first time only)
chmod +x start-backend.sh stop-backend.sh

# Start all services
./start-backend.sh

# Stop all services
./stop-backend.sh
```

## 📋 Service URLs

Once started, the following services will be available:

- **API Gateway**: http://localhost:3000
- **Auth Service**: http://localhost:3001  
- **Property Service**: http://localhost:3002
- **MongoDB**: mongodb://localhost:27017
- **Redis**: redis://localhost:6379

## 🔧 Prerequisites

- **Node.js** 18+ installed
- **Docker Desktop** running
- **npm** or **yarn** package manager

## 📦 Available npm Scripts

```bash
# Development
npm run dev              # Install dependencies and start all services
npm start                # Start all services (dependencies must be installed)
npm run start:infrastructure  # Start only MongoDB and Redis
npm run start:services   # Start only microservices

# Individual services
npm run start:api-gateway    # Start API Gateway only
npm run start:auth          # Start Auth Service only  
npm run start:property      # Start Property Service only

# Installation
npm run install:all     # Install all dependencies
npm run install:shared  # Install shared library dependencies
npm run install:services # Install service dependencies

# Building
npm run build:all       # Build all services
npm run build:shared   # Build shared library
npm run build:services # Build all microservices

# Cleanup
npm run clean          # Clean all build artifacts
npm run stop           # Stop infrastructure services
```

## 🏥 Health Checks

The services include health check endpoints:

- API Gateway: `GET http://localhost:3000/health`
- Auth Service: `GET http://localhost:3001/health`
- Property Service: `GET http://localhost:3002/health`

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**: Make sure no other services are running on ports 3000, 3001, 3002, 27017, or 6379
2. **Docker not running**: Ensure Docker Desktop is started
3. **Node.js not found**: Install Node.js 18+ from https://nodejs.org
4. **Dependencies not installed**: Run `npm run install:all` first

### Logs

- **Docker services**: `docker-compose -f docker-compose.backend.yml logs [service-name]`
- **Individual services**: Check the terminal windows opened by the startup scripts

### Clean Restart

```bash
# Stop all services
npm run stop

# Clean everything
npm run clean

# Remove Docker containers and volumes
docker-compose -f docker-compose.backend.yml down -v

# Start fresh
npm run dev
```

## 🚀 Production Deployment

For production deployment, use the production docker-compose files in the `microservices/infrastructure/` directory and ensure proper environment variable configuration.

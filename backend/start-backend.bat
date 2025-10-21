@echo off
echo 🏗️ Starting Ivorian Realty Backend Services...
echo.

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker Desktop first.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed
echo.

REM Install dependencies if needed
if not exist "node_modules" (
    echo 📦 Installing backend dependencies...
    npm install
)

REM Start infrastructure
echo 🚀 Starting infrastructure services (MongoDB, Redis)...
cd microservices\infrastructure
docker-compose -f docker-compose.dev.yml up -d

REM Wait for infrastructure to be ready
echo ⏳ Waiting for infrastructure to be ready...
timeout /t 15 /nobreak >nul

REM Go back to backend root
cd ..

REM Check infrastructure health
echo 🏥 Checking infrastructure health...
docker exec ivorian-mongodb-dev mongosh --eval "db.adminCommand('ping')" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MongoDB is healthy
) else (
    echo ❌ MongoDB is not responding
)

docker exec ivorian-redis-dev redis-cli ping >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Redis is healthy
) else (
    echo ❌ Redis is not responding
)

echo.
echo 🔧 Starting backend microservices...

REM Start API Gateway
echo Starting API Gateway (Port 3000)...
cd api-gateway
if not exist "node_modules" (
    echo Installing API Gateway dependencies...
    npm install
)
start "API Gateway" cmd /k "npm run dev"

REM Start Auth Service
echo Starting Auth Service (Port 3001)...
cd ..\auth-service
if not exist "node_modules" (
    echo Installing Auth Service dependencies...
    npm install
)
start "Auth Service" cmd /k "npm run dev"

REM Start Property Service
echo Starting Property Service (Port 3002)...
cd ..\property-service
if not exist "node_modules" (
    echo Installing Property Service dependencies...
    npm install
)
start "Property Service" cmd /k "npm run dev"

REM Go back to backend root
cd ..

echo.
echo 🎉 Backend services are starting up!
echo.
echo 📋 Service URLs:
echo    API Gateway:      http://localhost:3000
echo    Auth Service:     http://localhost:3001
echo    Property Service: http://localhost:3002
echo.
echo 🗄️ Infrastructure:
echo    MongoDB:          mongodb://localhost:27017
echo    Redis:            redis://localhost:6379
echo.
echo 🔧 To stop all services:
echo    Close the terminal windows or run: stop-backend.bat
echo.
echo 🚀 Backend is ready for development!
echo.
pause

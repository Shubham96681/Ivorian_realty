@echo off
echo 🏗️ Starting Ivorian Realty Platform...

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

REM Start infrastructure
echo 🚀 Starting infrastructure services...
cd backend\microservices\infrastructure
docker-compose -f docker-compose.dev.yml up -d

REM Wait for services to be ready
echo ⏳ Waiting for infrastructure to be ready...
timeout /t 10 /nobreak >nul

REM Go back to root
cd ..\..

echo 🔧 Starting backend services...

REM Start API Gateway
echo Starting API Gateway...
cd backend\microservices\api-gateway
if not exist "node_modules" (
    echo Installing API Gateway dependencies...
    npm install
)
start "API Gateway" cmd /k "npm run dev"

REM Start Auth Service
echo Starting Auth Service...
cd ..\auth-service
if not exist "node_modules" (
    echo Installing Auth Service dependencies...
    npm install
)
start "Auth Service" cmd /k "npm run dev"

REM Start Property Service
echo Starting Property Service...
cd ..\property-service
if not exist "node_modules" (
    echo Installing Property Service dependencies...
    npm install
)
start "Property Service" cmd /k "npm run dev"

REM Start frontend
echo 🎨 Starting frontend...
cd ..\..\..\frontend
if not exist "node_modules" (
    echo Installing Frontend dependencies...
    npm install
)
start "Frontend" cmd /k "npm run dev"

echo.
echo 🎉 Ivorian Realty Platform is starting up!
echo.
echo 📋 Service URLs:
echo    Frontend:         http://localhost:3000
echo    API Gateway:      http://localhost:3000/api
echo    Auth Service:     http://localhost:3001
echo    Property Service: http://localhost:3002
echo.
echo 🗄️ Infrastructure:
echo    MongoDB:          mongodb://localhost:27017
echo    Redis:            redis://localhost:6379
echo.
echo 🔧 To stop all services:
echo    Close the terminal windows or run: stop-services.bat
echo.
echo 🚀 Happy coding!
pause

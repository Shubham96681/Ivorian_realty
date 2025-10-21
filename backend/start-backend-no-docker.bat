@echo off
echo 🏗️ Starting Ivorian Realty Backend Services (No Docker)...
echo.

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

echo 🔧 Starting backend microservices (without infrastructure)...

REM Start API Gateway
echo Starting API Gateway (Port 3000)...
cd microservices\api-gateway
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
echo ⚠️  NOTE: This version runs WITHOUT Docker infrastructure.
echo    You'll need to set up MongoDB and Redis separately, or use cloud services.
echo.
echo 📋 Service URLs:
echo    API Gateway:      http://localhost:3000
echo    Auth Service:     http://localhost:3001
echo    Property Service: http://localhost:3002
echo.
echo 🗄️ Infrastructure Setup Required:
echo    MongoDB:          Install locally or use MongoDB Atlas (cloud)
echo    Redis:            Install locally or use Redis Cloud
echo.
echo 🔧 To stop all services:
echo    Close the terminal windows or run: stop-backend.bat
echo.
echo 🚀 Backend is ready for development!
echo.
pause

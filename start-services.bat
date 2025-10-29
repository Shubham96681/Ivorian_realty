@echo off
echo 🏗️ Starting Ivorian Realty Platform with Dynamic Ports...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js check passed

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️ Docker is not running. Starting in Docker-less mode...
    echo 📋 Make sure MongoDB is installed and running locally
    echo.
    node scripts/start-without-docker.js
    pause
    exit /b 0
)

echo ✅ Docker is running

REM Use the Docker-based dynamic port startup script
echo 🚀 Starting services with Docker and dynamic port allocation...
node scripts/start-with-dynamic-ports.js

pause

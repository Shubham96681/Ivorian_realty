@echo off
echo 🛑 Stopping Ivorian Realty Platform...

REM Stop infrastructure services
echo 🚀 Stopping infrastructure services...
cd backend\microservices\infrastructure
docker-compose -f docker-compose.dev.yml down

echo ✅ All services stopped successfully!
pause

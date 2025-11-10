# Ivorian Realty - Manual Server Startup Script
# Run this script to start all servers efficiently

Write-Host "=== IVORIAN REALTY SERVER STARTUP ===" -ForegroundColor Green
Write-Host ""

# Stop existing processes
Write-Host "1. Stopping existing processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Write-Host "   ✅ Stopped existing node processes"

# Start MongoDB
Write-Host "2. Starting MongoDB..." -ForegroundColor Yellow
$mongoProcess = Get-Process -Name "mongod" -ErrorAction SilentlyContinue
if ($mongoProcess) {
    Write-Host "   ✅ MongoDB already running (PID: $($mongoProcess.Id))"
} else {
    Write-Host "   🚀 Starting MongoDB..."
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host '🗄️ MongoDB Server'; & 'C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe' --dbpath 'C:\data\db'"
}

# Start Backend Server
Write-Host "3. Starting Backend Server..." -ForegroundColor Yellow
Write-Host "   🚀 Starting API Gateway..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host '🔧 Backend Server'; Set-Location 'D:\ivorian realty\Ivorian_realty\backend\microservices\api-gateway'; node src/simple-server.cjs"

# Start Frontend Server
Write-Host "4. Starting Frontend Server..." -ForegroundColor Yellow
Write-Host "   🚀 Starting React App..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host '🎨 Frontend Server'; Set-Location 'D:\ivorian realty\Ivorian_realty\frontend'; npm run dev"

# Wait and test
Write-Host "5. Waiting for servers to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 8

Write-Host "6. Testing servers..." -ForegroundColor Yellow

# Test MongoDB
$mongoProcess = Get-Process -Name "mongod" -ErrorAction SilentlyContinue
if ($mongoProcess) {
    Write-Host "   ✅ MongoDB: Running (PID: $($mongoProcess.Id))" -ForegroundColor Green
} else {
    Write-Host "   ❌ MongoDB: Not running" -ForegroundColor Red
}

# Test Backend
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/health" -TimeoutSec 5
    Write-Host "   ✅ Backend API: Running on port 8000" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Backend API: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Frontend
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 5
    Write-Host "   ✅ Frontend: Running on port 3000" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Frontend: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== SERVERS STARTED ===" -ForegroundColor Green
Write-Host "🗄️  MongoDB: localhost:27017"
Write-Host "🔧 Backend API: http://localhost:8000"
Write-Host "🎨 Frontend: http://localhost:3000"
Write-Host "📤 Image Upload: http://localhost:8000/api/properties/upload-images"
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")





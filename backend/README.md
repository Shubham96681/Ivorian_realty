# Backend - Ivorian Realty Microservices

The backend consists of 6 independent microservices, each designed for team-based development.

## 🏗️ Architecture

```
backend/
├── microservices/
│   ├── api-gateway/           # Team A - Entry point (Port 3000)
│   ├── auth-service/          # Team B - Authentication (Port 3001)
│   ├── property-service/      # Team C - Property management (Port 3002)
│   ├── user-service/          # Team D - User management (Port 3003)
│   ├── notification-service/  # Team E - Notifications (Port 3004)
│   ├── file-service/          # Team F - File handling (Port 3005)
│   ├── shared-lib/            # Shared utilities (All teams)
│   ├── infrastructure/        # Infrastructure setup (DevOps)
│   └── scripts/               # Setup and utility scripts
└── README.md                  # This file
```

## 🚀 Quick Start

### 1. Start Infrastructure

```bash
cd backend/microservices/infrastructure
docker-compose -f docker-compose.dev.yml up -d
```

### 2. Start Individual Services

Each team can start their service independently:

```bash
# Team A - API Gateway
cd backend/microservices/api-gateway
npm install
npm run dev

# Team B - Auth Service
cd backend/microservices/auth-service
npm install
npm run dev

# Continue for other services...
```

### 3. Verify Setup

```bash
# Check API Gateway
curl http://localhost:3000/health

# Check individual services
curl http://localhost:3001/health  # Auth
curl http://localhost:3002/health  # Property
curl http://localhost:3003/health  # User
curl http://localhost:3004/health  # Notification
curl http://localhost:3005/health  # File
```

## 👥 Team Development

### For Each Team

1. **Navigate to your service:**
   ```bash
   cd backend/microservices/<your-service-name>
   ```

2. **Setup your service:**
   ```bash
   ../scripts/setup-team.sh <your-service-name>
   ```

3. **Start development:**
   ```bash
   npm run dev
   ```

## 📋 Service Details

| Service | Port | Team | Purpose |
|---------|------|------|---------|
| API Gateway | 3000 | Team A | Entry point and routing |
| Auth Service | 3001 | Team B | Authentication & authorization |
| Property Service | 3002 | Team C | Property management |
| User Service | 3003 | Team D | User profiles |
| Notification Service | 3004 | Team E | Email, SMS, push notifications |
| File Service | 3005 | Team F | File upload & storage |

## 🔧 Development

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- MongoDB (via Docker)
- Redis (via Docker)

### Environment Setup

Each service has its own environment configuration:

```bash
# Copy environment template
cp env.example .env

# Configure your settings
# Edit .env file with your specific configuration
```

### Shared Library

All services use the shared library:

```bash
cd backend/microservices/shared-lib
npm install
npm run build
```

## 🐳 Docker Development

### Individual Service

```bash
cd backend/microservices/<service-name>
docker build -f Dockerfile.dev -t <service-name>-dev .
docker run -p <port>:<port> --env-file .env <service-name>-dev
```

### Full Stack

```bash
cd backend/microservices/infrastructure
docker-compose -f docker-compose.dev.yml up -d
```

## 📊 Monitoring

### Health Checks

- API Gateway: `http://localhost:3000/health`
- Auth Service: `http://localhost:3001/health`
- Property Service: `http://localhost:3002/health`
- User Service: `http://localhost:3003/health`
- Notification Service: `http://localhost:3004/health`
- File Service: `http://localhost:3005/health`

### Logging

All services use structured logging:
- Console output for development
- File logging for production
- JSON format for log aggregation

## 🚀 Deployment

### Development

```bash
# Start infrastructure
cd backend/microservices/infrastructure
docker-compose -f docker-compose.dev.yml up -d

# Start your service
cd ../<your-service>
npm run dev
```

### Production

```bash
# Build and deploy
cd backend/microservices/<your-service>
docker build -t <service-name> .
docker run -p <port>:<port> --env-file .env <service-name>
```

## 📚 Documentation

- [Microservices Overview](./microservices/README.md)
- [Team Setup Guide](./microservices/TEAM-SETUP.md)
- [API Gateway](./microservices/api-gateway/README.md)
- [Auth Service](./microservices/auth-service/README.md)
- [Property Service](./microservices/property-service/README.md)
- [User Service](./microservices/user-service/README.md)
- [Notification Service](./microservices/notification-service/README.md)
- [File Service](./microservices/file-service/README.md)
- [Shared Library](./microservices/shared-lib/README.md)
- [Infrastructure](./microservices/infrastructure/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT

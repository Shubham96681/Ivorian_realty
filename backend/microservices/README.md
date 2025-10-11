# Ivorian Realty Microservices

A comprehensive microservices architecture for the Ivorian Realty platform, designed for independent team development.

## 🏗️ Architecture Overview

The platform consists of 6 independent microservices, each with its own repository, deployment pipeline, and team ownership:

- **🚪 API Gateway** - Entry point and request routing
- **🔐 Authentication Service** - User authentication and authorization
- **🏠 Property Service** - Property management and search
- **👤 User Service** - User profile and management
- **📧 Notification Service** - Email, SMS, and push notifications
- **📁 File Service** - File upload and storage

## 📁 Project Structure

```
services/
├── api-gateway/           # API Gateway service (Team A)
├── auth-service/          # Authentication service (Team B)
├── property-service/      # Property management (Team C)
├── user-service/          # User management (Team D)
├── notification-service/  # Notifications (Team E)
├── file-service/          # File handling (Team F)
├── shared-lib/            # Shared utilities (All teams)
└── infrastructure/        # Infrastructure setup (DevOps)
```

## 👥 Team Development Setup

### For Each Team

Each service is completely independent and can be developed by separate teams:

1. **Clone the specific service:**
   ```bash
   git clone <service-repo-url>
   cd <service-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment:**
   ```bash
   cp env.example .env
   # Configure your service-specific environment variables
   ```

4. **Start development:**
   ```bash
   npm run dev
   ```

### Shared Library

All services depend on the shared library:

```bash
# In each service directory
npm install ../shared-lib
```

## 🚀 Quick Start

### 1. Start Infrastructure

```bash
cd infrastructure
docker-compose -f docker-compose.dev.yml up -d
```

### 2. Start Individual Services

Each team can start their service independently:

```bash
# Team A - API Gateway
cd api-gateway
npm run dev

# Team B - Auth Service
cd auth-service
npm run dev

# Team C - Property Service
cd property-service
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

## 🔧 Development Workflow

### For Each Team

1. **Create feature branch:**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Develop locally:**
   ```bash
   npm run dev
   ```

3. **Run tests:**
   ```bash
   npm test
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Submit pull request**

### Shared Library Updates

When updating the shared library:

1. **Update shared-lib:**
   ```bash
   cd shared-lib
   # Make changes
   npm run build
   npm version patch
   ```

2. **Update dependent services:**
   ```bash
   # In each service
   npm update @ivorian-realty/shared-lib
   ```

## 🐳 Docker Development

### Individual Service

```bash
# Build and run a single service
cd api-gateway
docker build -f Dockerfile.dev -t api-gateway-dev .
docker run -p 3000:3000 --env-file .env api-gateway-dev
```

### Full Stack

```bash
# Start all services with Docker Compose
docker-compose -f docker-compose.dev.yml up -d
```

## 📊 Monitoring

### Health Checks

Each service provides health check endpoints:
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

## 🔒 Security

### Authentication

- JWT-based authentication
- Role-based access control
- Token refresh mechanism
- Secure password policies

### API Security

- Rate limiting
- CORS configuration
- Input validation
- Error handling

## 🧪 Testing

### Unit Tests

```bash
# In each service directory
npm test
```

### Integration Tests

```bash
# Test service interactions
npm run test:integration
```

### End-to-End Tests

```bash
# Test complete workflows
npm run test:e2e
```

## 🚀 Deployment

### Individual Service Deployment

Each service can be deployed independently:

```bash
# Build production image
docker build -t <service-name> .

# Deploy to production
docker run -p <port>:<port> --env-file .env <service-name>
```

### Full Stack Deployment

```bash
# Deploy all services
docker-compose -f docker-compose.yml up -d
```

## 📚 Documentation

Each service has its own documentation:

- [API Gateway](./api-gateway/README.md)
- [Authentication Service](./auth-service/README.md)
- [Property Service](./property-service/README.md)
- [User Service](./user-service/README.md)
- [Notification Service](./notification-service/README.md)
- [File Service](./file-service/README.md)
- [Shared Library](./shared-lib/README.md)
- [Infrastructure](./infrastructure/README.md)

## 🤝 Contributing

### For Teams

1. **Fork your service repository**
2. **Create feature branch**
3. **Make changes**
4. **Add tests**
5. **Submit pull request**

### For Shared Library

1. **Create feature branch**
2. **Make changes**
3. **Update version**
4. **Submit pull request**
5. **Notify dependent services**

## 📞 Support

### Team Communication

- **Slack**: #ivorian-realty-dev
- **Email**: dev@ivorianrealty.com
- **Issues**: GitHub Issues for each service

### Documentation

- **API Docs**: Each service's README
- **Architecture**: This README
- **Deployment**: Infrastructure README

## 🔄 Updates

### Service Updates

```bash
# Update a specific service
cd <service-name>
git pull origin main
npm install
npm run build
```

### Full Stack Updates

```bash
# Update all services
git submodule update --remote
```

## 📄 License

MIT

---

**Built with ❤️ for Ivorian Realty Teams**

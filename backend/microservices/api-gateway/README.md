# API Gateway Service

The API Gateway serves as the single entry point for all client requests to the Ivorian Realty microservices architecture.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker (optional)

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Copy environment file:**
   ```bash
   cp env.example .env
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

### Docker Development

```bash
docker build -f Dockerfile.dev -t api-gateway-dev .
docker run -p 3000:3000 --env-file .env api-gateway-dev
```

## 📋 API Endpoints

### Health Check
- `GET /health` - Service health status

### Service Routing
- `/api/auth/*` → Authentication Service
- `/api/properties/*` → Property Service
- `/api/users/*` → User Service
- `/api/notifications/*` → Notification Service
- `/api/files/*` → File Service

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment | development |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |
| `AUTH_SERVICE_URL` | Auth service URL | http://localhost:3001 |
| `PROPERTY_SERVICE_URL` | Property service URL | http://localhost:3002 |
| `USER_SERVICE_URL` | User service URL | http://localhost:3003 |
| `NOTIFICATION_SERVICE_URL` | Notification service URL | http://localhost:3004 |
| `FILE_SERVICE_URL` | File service URL | http://localhost:3005 |
| `REDIS_URL` | Redis connection URL | redis://localhost:6379 |
| `JWT_SECRET` | JWT secret key | - |
| `RATE_LIMIT_MAX_REQUESTS` | Rate limit per window | 100 |

## 🏗️ Architecture

- **Express.js** - Web framework
- **http-proxy-middleware** - Service routing
- **express-rate-limit** - Rate limiting
- **helmet** - Security headers
- **cors** - Cross-origin requests
- **winston** - Logging

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📦 Build

```bash
# Build for production
npm run build

# Clean build artifacts
npm run clean
```

## 🚀 Deployment

### Production Docker

```bash
docker build -t api-gateway .
docker run -p 3000:3000 --env-file .env api-gateway
```

### Health Check

```bash
curl http://localhost:3000/health
```

## 📝 Development Notes

- Uses TypeScript for type safety
- Implements circuit breaker pattern for service calls
- Includes comprehensive error handling
- Supports service discovery
- Implements request/response logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT

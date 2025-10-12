# Team Setup Guide

This guide helps each team set up their independent microservice for development.

## 🎯 Quick Setup

### 1. Choose Your Service

Each team should work on one of these services:

- **Team A**: API Gateway (`api-gateway`)
- **Team B**: Authentication Service (`auth-service`)
- **Team C**: Property Service (`property-service`)
- **Team D**: User Service (`user-service`)
- **Team E**: Notification Service (`notification-service`)
- **Team F**: File Service (`file-service`)

### 2. Setup Your Service

```bash
# Navigate to your service directory
cd services/<your-service-name>

# Run the setup script
../scripts/setup-team.sh <your-service-name>
```

### 3. Start Development

```bash
# Start your service
npm run dev

# In another terminal, start infrastructure
../scripts/start-infrastructure.sh
```

## 📋 Service Details

### API Gateway (Team A)
- **Port**: 3000
- **Purpose**: Entry point for all requests
- **Tech Stack**: Express.js, http-proxy-middleware
- **Dependencies**: All other services

### Authentication Service (Team B)
- **Port**: 3001
- **Purpose**: User authentication and authorization
- **Tech Stack**: Express.js, JWT, bcryptjs, MongoDB
- **Dependencies**: MongoDB, Redis

### Property Service (Team C)
- **Port**: 3002
- **Purpose**: Property management and search
- **Tech Stack**: Express.js, MongoDB, Sharp (image processing)
- **Dependencies**: MongoDB, File Service

### User Service (Team D)
- **Port**: 3003
- **Purpose**: User profile and management
- **Tech Stack**: Express.js, MongoDB
- **Dependencies**: MongoDB, Auth Service

### Notification Service (Team E)
- **Port**: 3004
- **Purpose**: Email, SMS, and push notifications
- **Tech Stack**: Express.js, nodemailer, Twilio, Firebase
- **Dependencies**: MongoDB, Auth Service

### File Service (Team F)
- **Port**: 3005
- **Purpose**: File upload and storage
- **Tech Stack**: Express.js, Multer, Sharp, AWS S3
- **Dependencies**: MongoDB, AWS S3

## 🔧 Development Workflow

### Daily Development

1. **Start infrastructure:**
   ```bash
   cd services/infrastructure
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Start your service:**
   ```bash
   cd services/<your-service>
   npm run dev
   ```

3. **Test your changes:**
   ```bash
   curl http://localhost:<port>/health
   ```

### Making Changes

1. **Create feature branch:**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make changes and test:**
   ```bash
   npm test
   npm run build
   ```

3. **Submit pull request**

### Updating Shared Library

When the shared library is updated:

```bash
# Update shared library
cd services/shared-lib
git pull origin main
npm run build

# Update your service
cd ../<your-service>
npm update @ivorian-realty/shared-lib
```

## 🐳 Docker Development

### Individual Service

```bash
# Build and run your service
docker build -f Dockerfile.dev -t <service-name>-dev .
docker run -p <port>:<port> --env-file .env <service-name>-dev
```

### Full Stack Testing

```bash
# Start all services
docker-compose -f docker-compose.dev.yml up -d
```

## 📊 Monitoring

### Health Checks

Each service provides health check endpoints:
- Check your service: `http://localhost:<port>/health`
- Check all services: `http://localhost:3000/health` (via API Gateway)

### Logging

- **Development**: Console output
- **Production**: File logging in `logs/` directory
- **Format**: JSON structured logs

## 🔒 Security

### Authentication

- Use JWT tokens for authentication
- Implement role-based access control
- Validate all inputs with Joi schemas

### API Security

- Rate limiting is configured
- CORS is properly set up
- Helmet provides security headers

## 🧪 Testing

### Unit Tests

```bash
npm test
```

### Integration Tests

```bash
npm run test:integration
```

### Manual Testing

```bash
# Test your service endpoints
curl http://localhost:<port>/health
curl http://localhost:<port>/api/your-endpoint
```

## 🚀 Deployment

### Development

```bash
npm run build
npm start
```

### Production

```bash
docker build -t <service-name> .
docker run -p <port>:<port> --env-file .env <service-name>
```

## 📚 Resources

### Documentation

- **Service README**: `./README.md`
- **API Documentation**: In your service's README
- **Shared Library**: `../shared-lib/README.md`

### Support

- **Slack**: #ivorian-realty-dev
- **Email**: dev@ivorianrealty.com
- **Issues**: GitHub Issues for your service

## 🤝 Team Collaboration

### Communication

- **Daily Standups**: Share progress and blockers
- **Code Reviews**: Review each other's pull requests
- **Documentation**: Keep README files updated

### Best Practices

- **Git Flow**: Use feature branches
- **Testing**: Write tests for new features
- **Documentation**: Update API documentation
- **Security**: Follow security best practices

## 🔄 Updates

### Service Updates

```bash
git pull origin main
npm install
npm run build
```

### Infrastructure Updates

```bash
cd ../infrastructure
git pull origin main
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up -d
```

## 📞 Getting Help

### Common Issues

1. **Port conflicts**: Check if port is already in use
2. **Database connection**: Ensure MongoDB is running
3. **Environment variables**: Check your `.env` file
4. **Dependencies**: Run `npm install`

### Support Channels

- **Team Lead**: Contact your team lead
- **DevOps**: For infrastructure issues
- **Architecture Team**: For design decisions

---

**Happy coding! 🚀**

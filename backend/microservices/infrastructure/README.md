# Infrastructure Setup

Infrastructure components for the Ivorian Realty microservices architecture.

## 🏗️ Components

- **MongoDB** - Primary database
- **Redis** - Caching and session storage
- **Nginx** - Reverse proxy and load balancer
- **Prometheus** - Metrics collection
- **Grafana** - Monitoring dashboards

## 🚀 Quick Start

### Development Environment

1. **Start infrastructure services:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Check service health:**
   ```bash
   # MongoDB
   docker exec ivorian-mongodb-dev mongosh --eval "db.adminCommand('ping')"
   
   # Redis
   docker exec ivorian-redis-dev redis-cli ping
   ```

### Production Environment

1. **Start all infrastructure:**
   ```bash
   docker-compose -f docker-compose.yml up -d
   ```

2. **Access monitoring:**
   - Prometheus: http://localhost:9090
   - Grafana: http://localhost:3001 (admin/admin123)

## 📊 Monitoring

### Prometheus Metrics

- Service health checks
- Request/response metrics
- Database connection metrics
- Custom business metrics

### Grafana Dashboards

- Service overview
- Database performance
- API response times
- Error rates

## 🔧 Configuration

### Environment Variables

Each service can be configured with environment variables:

- `MONGODB_URI` - MongoDB connection string
- `REDIS_URL` - Redis connection string
- `LOG_LEVEL` - Logging level

### Nginx Configuration

Located in `nginx/nginx.conf`:
- Load balancing
- SSL termination
- Rate limiting
- CORS headers

## 🧪 Testing

```bash
# Test MongoDB connection
docker exec ivorian-mongodb-dev mongosh --eval "db.adminCommand('ping')"

# Test Redis connection
docker exec ivorian-redis-dev redis-cli ping

# Test Nginx
curl http://localhost/health
```

## 🚀 Deployment

### Production Deployment

1. **Configure SSL certificates** in `nginx/ssl/`
2. **Update Nginx configuration** for your domain
3. **Set up monitoring** with Prometheus and Grafana
4. **Configure backups** for MongoDB and Redis

### Scaling

```bash
# Scale Redis
docker-compose up -d --scale redis=3

# Scale MongoDB (requires replica set)
docker-compose up -d --scale mongodb=3
```

## 📝 Development Notes

- All services use health checks
- Persistent volumes for data
- Network isolation between services
- Environment-specific configurations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the infrastructure
5. Submit a pull request

## 📄 License

MIT

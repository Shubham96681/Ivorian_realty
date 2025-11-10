# CI/CD Pipeline Documentation

This directory contains GitHub Actions workflows for continuous integration and continuous deployment of the Ivorian Realty platform.

## Workflows

### 1. CI - Build and Test (`ci.yml`)

**Trigger:** 
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**Purpose:**
- Builds and tests all backend microservices
- Builds the frontend application
- Runs linting checks
- Validates code quality

**Jobs:**
- `shared-lib`: Builds the shared library (required by all services)
- `api-gateway`: Builds and tests API Gateway
- `auth-service`: Builds and tests Auth Service
- `property-service`: Builds and tests Property Service
- `frontend`: Builds the React frontend
- `build-summary`: Provides a summary of all builds

### 2. CD - Deploy to Production (`cd.yml`)

**Trigger:**
- Push to `main` branch
- Manual workflow dispatch

**Purpose:**
- Builds Docker images for all services
- Builds production frontend
- Deploys to production server (65.0.122.243)

**Jobs:**
- `build-images`: Builds Docker images for all microservices
- `build-frontend`: Builds production frontend bundle
- `deploy`: Deploys to production server via SSH

**Requirements:**
- SSH access to production server
- Docker installed on production server
- Required GitHub Secrets (see Setup section)

### 3. Docker Build and Push (`docker-build.yml`)

**Trigger:**
- Push to `main` or `develop` branches
- Push tags starting with `v*`
- Manual workflow dispatch

**Purpose:**
- Builds and pushes Docker images to GitHub Container Registry
- Creates versioned tags for releases

**Features:**
- Multi-service matrix build
- Automatic versioning based on git tags
- Caching for faster builds

## Setup Instructions

### 1. GitHub Secrets Configuration

Go to your repository settings → Secrets and variables → Actions, and add the following secrets:

#### Required Secrets for Deployment:

- `SSH_PRIVATE_KEY`: Private SSH key for server access
  ```bash
  # Generate if needed:
  ssh-keygen -t ed25519 -C "github-actions"
  # Copy private key content to secret
  ```

- `SSH_USER`: SSH username (default: `root`)
- `SERVER_HOST`: Server IP or hostname (default: `65.0.122.243`)

#### Optional Secrets:

- `VITE_API_URL`: Frontend API URL (default: `http://65.0.122.243/api`)
- `MONGO_ROOT_USERNAME`: MongoDB root username
- `MONGO_ROOT_PASSWORD`: MongoDB root password
- `JWT_SECRET`: JWT secret key for authentication
- `MONGODB_URI`: Full MongoDB connection string

### 2. Server Setup

#### Initial Server Configuration:

1. **SSH into your server:**
   ```bash
   ssh root@65.0.122.243
   ```

2. **Install Docker and Docker Compose:**
   ```bash
   # For Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   
   # Install Docker Compose
   apt-get update
   apt-get install docker-compose-plugin -y
   ```

3. **Create deployment directory:**
   ```bash
   mkdir -p /opt/ivorian-realty
   mkdir -p /opt/ivorian-realty/frontend
   mkdir -p /opt/ivorian-realty/nginx
   mkdir -p /opt/ivorian-realty/logs
   ```

4. **Add SSH public key to server:**
   ```bash
   # On your local machine, copy public key
   cat ~/.ssh/id_ed25519.pub
   
   # On server, add to authorized_keys
   mkdir -p ~/.ssh
   echo "YOUR_PUBLIC_KEY" >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   chmod 700 ~/.ssh
   ```

5. **Create environment file (optional):**
   ```bash
   cd /opt/ivorian-realty
   cat > .env << EOF
   MONGO_ROOT_USERNAME=admin
   MONGO_ROOT_PASSWORD=your-secure-password
   JWT_SECRET=your-jwt-secret-key
   MONGODB_URI=mongodb://admin:your-secure-password@mongodb:27017/ivorian_realty?authSource=admin
   EOF
   ```

### 3. Nginx SSL Configuration (Optional)

To enable HTTPS:

1. **Generate SSL certificates** (using Let's Encrypt):
   ```bash
   apt-get install certbot -y
   certbot certonly --standalone -d your-domain.com
   ```

2. **Copy certificates to nginx directory:**
   ```bash
   mkdir -p /opt/ivorian-realty/nginx/ssl
   cp /etc/letsencrypt/live/your-domain.com/fullchain.pem /opt/ivorian-realty/nginx/ssl/cert.pem
   cp /etc/letsencrypt/live/your-domain.com/privkey.pem /opt/ivorian-realty/nginx/ssl/key.pem
   ```

3. **Uncomment HTTPS server block** in `nginx.conf`

## Deployment Process

### Automatic Deployment

1. **Push to main branch:**
   ```bash
   git push origin main
   ```

2. **Workflow automatically:**
   - Runs CI tests
   - Builds Docker images
   - Builds frontend
   - Deploys to server

### Manual Deployment

1. **Go to Actions tab** in GitHub
2. **Select "CD - Deploy to Production"** workflow
3. **Click "Run workflow"**
4. **Select branch** and click "Run workflow"

### Deployment Steps

The deployment process:

1. ✅ Builds all Docker images
2. ✅ Builds frontend production bundle
3. ✅ Transfers files to server via SCP
4. ✅ Loads Docker images on server
5. ✅ Stops existing containers
6. ✅ Starts infrastructure (MongoDB, Redis)
7. ✅ Waits for services to be ready
8. ✅ Starts application services
9. ✅ Starts Nginx reverse proxy
10. ✅ Performs health checks

## Monitoring

### Health Checks

- **Frontend:** `http://65.0.122.243/health`
- **API Gateway:** `http://65.0.122.243/api/health`
- **Auth Service:** `http://65.0.122.243:3001/health`
- **Property Service:** `http://65.0.122.243:3002/health`

### Logs

View service logs on the server:

```bash
# All services
docker-compose -f /opt/ivorian-realty/docker-compose.yml logs -f

# Specific service
docker logs ivorian-api-gateway -f
docker logs ivorian-auth-service -f
docker logs ivorian-property-service -f
docker logs ivorian-nginx -f
```

### Service Status

```bash
cd /opt/ivorian-realty
docker-compose ps
```

## Troubleshooting

### Deployment Fails

1. **Check SSH connection:**
   ```bash
   ssh -i ~/.ssh/your_key root@65.0.122.243
   ```

2. **Verify Docker is running:**
   ```bash
   docker ps
   ```

3. **Check disk space:**
   ```bash
   df -h
   ```

4. **View deployment logs:**
   - Go to GitHub Actions → Failed workflow → View logs

### Services Not Starting

1. **Check container logs:**
   ```bash
   docker logs ivorian-api-gateway
   docker logs ivorian-auth-service
   ```

2. **Verify environment variables:**
   ```bash
   docker exec ivorian-api-gateway env
   ```

3. **Check MongoDB connection:**
   ```bash
   docker exec ivorian-mongodb mongosh --eval "db.adminCommand('ping')"
   ```

### Frontend Not Loading

1. **Check Nginx logs:**
   ```bash
   docker logs ivorian-nginx
   ```

2. **Verify frontend files:**
   ```bash
   ls -la /opt/ivorian-realty/frontend/
   ```

3. **Test Nginx configuration:**
   ```bash
   docker exec ivorian-nginx nginx -t
   ```

## Rollback

To rollback to a previous version:

1. **Find previous image tag:**
   ```bash
   docker images | grep ivorian-realty
   ```

2. **Update docker-compose.yml** with previous image tag

3. **Redeploy:**
   ```bash
   cd /opt/ivorian-realty
   docker-compose pull
   docker-compose up -d
   ```

## Best Practices

1. **Always test on develop branch first**
2. **Use feature branches for new features**
3. **Review pull requests before merging**
4. **Monitor deployment logs**
5. **Set up alerts for failed deployments**
6. **Keep secrets secure and rotate regularly**
7. **Use environment-specific configurations**
8. **Backup database before major deployments**

## Support

For issues or questions:
- Check GitHub Actions logs
- Review server logs
- Contact DevOps team
- Create an issue in the repository


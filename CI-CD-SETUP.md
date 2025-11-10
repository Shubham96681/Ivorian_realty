# CI/CD Setup Guide for Ivorian Realty

This guide will help you set up the complete CI/CD pipeline for the Ivorian Realty platform.

## 📋 Prerequisites

- GitHub repository: https://github.com/Shubham96681/Ivorian
- Server IP: 65.0.122.243
- SSH access to the server
- Docker and Docker Compose installed on the server

## 🚀 Quick Setup

### Step 1: Configure GitHub Secrets

1. Go to your GitHub repository: https://github.com/Shubham96681/Ivorian
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add the following:

#### Required Secrets:

| Secret Name | Description | Example |
|------------|-------------|---------|
| `SSH_PRIVATE_KEY` | Your SSH private key for server access | Content of `~/.ssh/id_rsa` or `~/.ssh/id_ed25519` |
| `SSH_USER` | SSH username (usually `root`) | `root` |
| `SERVER_HOST` | Server IP address | `65.0.122.243` |

#### Optional Secrets:

| Secret Name | Description | Default |
|------------|-------------|---------|
| `VITE_API_URL` | Frontend API URL | `http://65.0.122.243/api` |
| `MONGO_ROOT_USERNAME` | MongoDB root username | `admin` |
| `MONGO_ROOT_PASSWORD` | MongoDB root password | `password123` |
| `JWT_SECRET` | JWT secret for authentication | Auto-generated |

### Step 2: Generate SSH Key Pair (if needed)

If you don't have an SSH key pair:

```bash
# Generate new SSH key
ssh-keygen -t ed25519 -C "github-actions-ivorian" -f ~/.ssh/github_actions_ivorian

# Display public key (add to server)
cat ~/.ssh/github_actions_ivorian.pub

# Display private key (add to GitHub Secrets)
cat ~/.ssh/github_actions_ivorian
```

### Step 3: Configure Server

SSH into your server and run these commands:

```bash
# Connect to server
ssh root@65.0.122.243

# Install Docker (if not installed)
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt-get update
apt-get install docker-compose-plugin -y

# Create deployment directories
mkdir -p /opt/ivorian-realty
mkdir -p /opt/ivorian-realty/frontend
mkdir -p /opt/ivorian-realty/nginx
mkdir -p /opt/ivorian-realty/logs

# Add your SSH public key to authorized_keys
mkdir -p ~/.ssh
nano ~/.ssh/authorized_keys
# Paste your public key here, then save (Ctrl+X, Y, Enter)

# Set correct permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# Test SSH connection (from your local machine)
ssh root@65.0.122.243
```

### Step 4: Test the Pipeline

1. **Push code to main branch:**
   ```bash
   git add .
   git commit -m "Add CI/CD pipeline"
   git push origin main
   ```

2. **Monitor deployment:**
   - Go to GitHub repository
   - Click on **Actions** tab
   - Watch the workflow run

3. **Verify deployment:**
   ```bash
   # SSH into server
   ssh root@65.0.122.243
   
   # Check running containers
   docker ps
   
   # Check service health
   curl http://localhost/health
   curl http://localhost/api/health
   ```

## 📁 Workflow Files Created

The following CI/CD workflows have been created:

1. **`.github/workflows/ci.yml`** - Continuous Integration
   - Builds and tests all services
   - Runs on every push and pull request

2. **`.github/workflows/cd.yml`** - Continuous Deployment
   - Builds Docker images
   - Deploys to production server
   - Runs on push to main branch

3. **`.github/workflows/docker-build.yml`** - Docker Image Building
   - Builds and pushes images to GitHub Container Registry
   - Creates versioned tags

4. **`.github/scripts/deploy.sh`** - Deployment script
   - Handles server-side deployment tasks

## 🔧 Manual Deployment

If you need to deploy manually:

```bash
# On your local machine
git clone https://github.com/Shubham96681/Ivorian.git
cd Ivorian/Ivorian_realty

# Build and push to server
scp -r backend/microservices root@65.0.122.243:/opt/ivorian-realty/
scp -r frontend/dist root@65.0.122.243:/opt/ivorian-realty/frontend/

# SSH into server
ssh root@65.0.122.243

# Navigate to deployment directory
cd /opt/ivorian-realty

# Build and start services
cd backend/microservices
docker-compose -f infrastructure/docker-compose.prod.yml up -d
```

## 🐛 Troubleshooting

### Issue: SSH Connection Failed

**Solution:**
```bash
# Test SSH connection
ssh -v root@65.0.122.243

# Check if SSH key is added correctly
cat ~/.ssh/authorized_keys

# Verify permissions
ls -la ~/.ssh/
```

### Issue: Docker Not Found on Server

**Solution:**
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Verify installation
docker --version
docker-compose --version
```

### Issue: Services Not Starting

**Solution:**
```bash
# Check logs
docker logs ivorian-api-gateway
docker logs ivorian-auth-service
docker logs ivorian-mongodb

# Check container status
docker ps -a

# Restart services
cd /opt/ivorian-realty
docker-compose -f backend/microservices/infrastructure/docker-compose.prod.yml restart
```

### Issue: Frontend Not Loading

**Solution:**
```bash
# Check Nginx logs
docker logs ivorian-nginx

# Verify frontend files exist
ls -la /opt/ivorian-realty/frontend/

# Test Nginx configuration
docker exec ivorian-nginx nginx -t

# Restart Nginx
docker restart ivorian-nginx
```

## 📊 Monitoring

### Health Check Endpoints

- Frontend: `http://65.0.122.243/health`
- API Gateway: `http://65.0.122.243/api/health`
- Auth Service: `http://65.0.122.243:3001/health`
- Property Service: `http://65.0.122.243:3002/health`

### View Logs

```bash
# All services
docker-compose -f /opt/ivorian-realty/backend/microservices/infrastructure/docker-compose.prod.yml logs -f

# Specific service
docker logs -f ivorian-api-gateway
docker logs -f ivorian-auth-service
docker logs -f ivorian-property-service
```

### Service Status

```bash
# Check running containers
docker ps

# Check resource usage
docker stats

# Check network
docker network ls
docker network inspect ivorian-network
```

## 🔒 Security Best Practices

1. **Change default passwords:**
   - MongoDB root password
   - JWT secret
   - Any default credentials

2. **Use environment variables:**
   - Store secrets in GitHub Secrets
   - Use `.env` files on server (not committed to git)

3. **Enable HTTPS:**
   - Set up SSL certificates (Let's Encrypt)
   - Configure Nginx for HTTPS

4. **Firewall configuration:**
   ```bash
   # Allow only necessary ports
   ufw allow 22/tcp    # SSH
   ufw allow 80/tcp    # HTTP
   ufw allow 443/tcp   # HTTPS
   ufw enable
   ```

5. **Regular updates:**
   ```bash
   # Update system packages
   apt-get update && apt-get upgrade -y
   
   # Update Docker images
   docker-compose pull
   docker-compose up -d
   ```

## 📝 Next Steps

1. ✅ Set up GitHub Secrets
2. ✅ Configure server
3. ✅ Test deployment
4. ⬜ Set up SSL certificates (optional)
5. ⬜ Configure monitoring and alerts
6. ⬜ Set up database backups
7. ⬜ Configure custom domain (optional)

## 🆘 Support

If you encounter any issues:

1. Check GitHub Actions logs
2. Review server logs
3. Verify all secrets are set correctly
4. Ensure server has required dependencies
5. Check network connectivity

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

**Note:** Make sure to replace all placeholder values (passwords, secrets, etc.) with secure, production-ready values before deploying to production.


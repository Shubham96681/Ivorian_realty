# Docker Setup Guide

This guide helps you set up Docker for the Ivorian Realty backend services.

## 🐳 Docker Desktop Installation

### Windows
1. **Download Docker Desktop**: Go to [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
2. **Install**: Run the installer and follow the setup wizard
3. **Enable WSL 2**: Docker Desktop will prompt you to enable WSL 2 backend
4. **Restart**: Restart your computer after installation
5. **Start Docker Desktop**: Launch Docker Desktop from Start Menu

### Linux
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER

# Log out and back in for group changes to take effect
```

### macOS
1. **Download Docker Desktop**: Go to [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/)
2. **Install**: Drag Docker.app to Applications folder
3. **Start**: Launch Docker Desktop from Applications

## ✅ Verify Installation

```bash
# Check Docker version
docker --version

# Check Docker is running
docker info

# Test with hello-world
docker run hello-world
```

## 🚀 Start Backend with Docker

Once Docker is running:

```bash
cd backend
npm run dev
```

## 🔧 Alternative: No Docker Setup

If you prefer not to use Docker, you can run the services without infrastructure:

```bash
cd backend
npm run start:no-docker
```

**Note**: You'll need to set up MongoDB and Redis separately:
- **MongoDB**: Install locally or use [MongoDB Atlas](https://www.mongodb.com/atlas) (cloud)
- **Redis**: Install locally or use [Redis Cloud](https://redis.com/redis-enterprise-cloud/)

## 🐛 Troubleshooting

### Docker Desktop Not Starting
1. **Windows**: Make sure WSL 2 is enabled and updated
2. **macOS**: Check if virtualization is enabled in System Preferences
3. **Linux**: Ensure Docker daemon is running (`sudo systemctl status docker`)

### Port Conflicts
If ports 27017 (MongoDB) or 6379 (Redis) are in use:
```bash
# Check what's using the ports
netstat -ano | findstr :27017
netstat -ano | findstr :6379

# Stop conflicting services or change ports in docker-compose.dev.yml
```

### Permission Issues (Linux)
```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Log out and back in
exit
# Then log back in
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [MongoDB Docker Hub](https://hub.docker.com/_/mongo)
- [Redis Docker Hub](https://hub.docker.com/_/redis)

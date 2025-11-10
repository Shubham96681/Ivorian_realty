# CI/CD Quick Start Guide

## 🚀 Setup in 5 Minutes

### 1. Add GitHub Secrets (Required)

Go to: `https://github.com/Shubham96681/Ivorian/settings/secrets/actions`

Add these secrets:

```
SSH_PRIVATE_KEY    → Your SSH private key
SSH_USER           → root
SERVER_HOST        → 65.0.122.243
```

### 2. Generate SSH Key (if needed)

```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions
cat ~/.ssh/github_actions    # Copy to SSH_PRIVATE_KEY secret
cat ~/.ssh/github_actions.pub # Add to server's ~/.ssh/authorized_keys
```

### 3. Setup Server (One-time)

```bash
ssh root@65.0.122.243

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh

# Install Docker Compose
apt-get update && apt-get install docker-compose-plugin -y

# Create directories
mkdir -p /opt/ivorian-realty/{frontend,nginx,logs}

# Add SSH public key
mkdir -p ~/.ssh
echo "YOUR_PUBLIC_KEY" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### 4. Deploy!

```bash
git push origin main
```

That's it! Check the **Actions** tab to see the deployment progress.

## 📋 What Gets Deployed

- ✅ Frontend (React) → `http://65.0.122.243`
- ✅ API Gateway → Port 3000
- ✅ Auth Service → Port 3001
- ✅ Property Service → Port 3002
- ✅ MongoDB → Port 27017
- ✅ Redis → Port 6379
- ✅ Nginx → Port 80/443

## 🔍 Verify Deployment

```bash
# Check services
ssh root@65.0.122.243
docker ps

# Test endpoints
curl http://65.0.122.243/health
curl http://65.0.122.243/api/health
```

## 📚 Full Documentation

See `CI-CD-SETUP.md` for detailed documentation.


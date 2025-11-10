# EC2 Server Setup Guide

## ✅ Step 1: Add PEM Key to GitHub Secrets

1. **Open your PEM file:**
   ```powershell
   # In PowerShell or Notepad
   notepad "C:\Users\shubh\Downloads\Ivorian.pem"
   ```

2. **Copy the entire content** (including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`)

3. **Go to GitHub Secrets:**
   - Navigate to: `https://github.com/Shubham96681/Ivorian/settings/secrets/actions`
   - Click **"New repository secret"**
   - Name: `SSH_PRIVATE_KEY`
   - Value: Paste the entire PEM file content
   - Click **"Add secret"**

4. **Add other secrets:**
   - `SSH_USER` → `ec2-user`
   - `SERVER_HOST` → `65.0.122.243`

## ✅ Step 2: Setup EC2 Server

SSH into your EC2 instance and run these commands:

```bash
ssh -i "C:\Users\shubh\Downloads\Ivorian.pem" ec2-user@65.0.122.243
```

### Install Docker and Docker Compose

```bash
# Update system
sudo yum update -y

# Install Docker
sudo yum install docker -y

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add ec2-user to docker group (so we don't need sudo)
sudo usermod -aG docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installations
docker --version
docker-compose --version
```

**Important:** Log out and log back in for the docker group changes to take effect:

```bash
exit
# Then SSH back in
ssh -i "C:\Users\shubh\Downloads\Ivorian.pem" ec2-user@65.0.122.243
```

### Create Deployment Directories

```bash
# Create necessary directories
sudo mkdir -p /opt/ivorian-realty
sudo mkdir -p /opt/ivorian-realty/frontend
sudo mkdir -p /opt/ivorian-realty/backend/microservices/infrastructure/nginx
sudo mkdir -p /opt/ivorian-realty/logs

# Change ownership to ec2-user
sudo chown -R ec2-user:ec2-user /opt/ivorian-realty

# Verify
ls -la /opt/ivorian-realty
```

### Configure Security Group (AWS Console)

Make sure your EC2 security group allows these ports:

1. **SSH (22)** - Already open
2. **HTTP (80)** - For web traffic
3. **HTTPS (443)** - For SSL (optional)
4. **Custom TCP (3000-3002)** - For backend services (optional, only if accessing directly)

**To configure:**
1. Go to AWS Console → EC2 → Security Groups
2. Select your instance's security group
3. Edit Inbound Rules
4. Add rules:
   - Type: HTTP, Port: 80, Source: 0.0.0.0/0
   - Type: HTTPS, Port: 443, Source: 0.0.0.0/0 (optional)

## ✅ Step 3: Test Docker Access

```bash
# Test Docker without sudo (after re-login)
docker ps

# Test Docker Compose
docker-compose --version
```

If you get "permission denied", log out and log back in.

## ✅ Step 4: Deploy!

Now you're ready to deploy. Push to your main branch:

```bash
git add .
git commit -m "Setup CI/CD for EC2"
git push origin main
```

## 🔍 Verify Deployment

After deployment completes:

```bash
# SSH into server
ssh -i "C:\Users\shubh\Downloads\Ivorian.pem" ec2-user@65.0.122.243

# Check running containers
docker ps

# Check service health
curl http://localhost/health
curl http://localhost/api/health

# View logs
cd /opt/ivorian-realty
docker compose -f docker-compose.yml logs -f
```

## 🐛 Troubleshooting

### Issue: "Permission denied" when running docker

**Solution:**
```bash
# Add user to docker group (if not done)
sudo usermod -aG docker ec2-user

# Log out and log back in
exit
# SSH back in
```

### Issue: "Cannot connect to Docker daemon"

**Solution:**
```bash
# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Check status
sudo systemctl status docker
```

### Issue: Port 80 already in use

**Solution:**
```bash
# Check what's using port 80
sudo lsof -i :80

# Stop the service (usually httpd on Amazon Linux)
sudo systemctl stop httpd
sudo systemctl disable httpd
```

### Issue: Cannot create directory in /opt

**Solution:**
```bash
# Use sudo to create, then change ownership
sudo mkdir -p /opt/ivorian-realty
sudo chown -R ec2-user:ec2-user /opt/ivorian-realty
```

## 📝 Quick Reference

### Useful Commands

```bash
# View all containers
docker ps -a

# View logs
docker logs <container-name>

# Restart services
cd /opt/ivorian-realty
docker compose -f docker-compose.yml restart

# Stop all services
docker compose -f docker-compose.yml down

# Start all services
docker compose -f docker-compose.yml up -d

# View resource usage
docker stats
```

### Service URLs

- Frontend: `http://65.0.122.243`
- API Gateway: `http://65.0.122.243/api`
- Health Check: `http://65.0.122.243/health`

## 🔒 Security Notes

1. **Keep your PEM file secure** - Never commit it to git
2. **Use environment variables** for sensitive data
3. **Regularly update** your EC2 instance: `sudo yum update -y`
4. **Monitor logs** regularly for security issues
5. **Set up CloudWatch** for monitoring (optional)

## ✅ Next Steps

1. ✅ Add PEM key to GitHub Secrets
2. ✅ Setup EC2 server (Docker, directories)
3. ✅ Configure security group
4. ✅ Push code to trigger deployment
5. ⬜ Set up SSL certificate (optional)
6. ⬜ Configure domain name (optional)
7. ⬜ Set up monitoring and alerts

---

**Need help?** Check the main `CI-CD-SETUP.md` file for more details.


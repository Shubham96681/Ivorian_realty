# Quick EC2 Setup - Step by Step

## ✅ Step 1: Add PEM Key to GitHub

1. **Open your PEM file in Notepad:**
   ```
   C:\Users\shubh\Downloads\Ivorian.pem
   ```

2. **Copy ALL content** (from `-----BEGIN` to `-----END`)

3. **Go to GitHub:**
   - https://github.com/Shubham96681/Ivorian/settings/secrets/actions
   - Click **"New repository secret"**
   - Name: `SSH_PRIVATE_KEY`
   - Value: Paste the entire PEM file content
   - Click **"Add secret"**

4. **Add these secrets too:**
   - `SSH_USER` → Value: `ec2-user`
   - `SERVER_HOST` → Value: `65.0.122.243`

## ✅ Step 2: Setup EC2 Server

**SSH into your server:**
```bash
ssh -i "C:\Users\shubh\Downloads\Ivorian.pem" ec2-user@65.0.122.243
```

**Then run these commands on the server:**

```bash
# Update system
sudo yum update -y

# Install Docker
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker

# Add ec2-user to docker group (IMPORTANT!)
sudo usermod -aG docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create directories
sudo mkdir -p /opt/ivorian-realty
sudo mkdir -p /opt/ivorian-realty/frontend
sudo mkdir -p /opt/ivorian-realty/backend/microservices/infrastructure/nginx
sudo mkdir -p /opt/ivorian-realty/logs

# Change ownership
sudo chown -R ec2-user:ec2-user /opt/ivorian-realty

# Verify Docker (should work without sudo after re-login)
docker --version
docker-compose --version
```

**IMPORTANT:** Log out and log back in for docker group to work:
```bash
exit
# Then SSH back in
ssh -i "C:\Users\shubh\Downloads\Ivorian.pem" ec2-user@65.0.122.243
# Test: docker ps (should work without sudo)
```

## ✅ Step 3: Configure AWS Security Group

1. Go to **AWS Console** → **EC2** → **Security Groups**
2. Select your instance's security group
3. Click **"Edit inbound rules"**
4. Add these rules:
   - **Type:** HTTP, **Port:** 80, **Source:** 0.0.0.0/0
   - **Type:** HTTPS, **Port:** 443, **Source:** 0.0.0.0/0 (optional)

## ✅ Step 4: Deploy!

**Push your code:**
```bash
git add .
git commit -m "Setup CI/CD"
git push origin main
```

**Check deployment:**
- Go to: https://github.com/Shubham96681/Ivorian/actions
- Watch the workflow run

## ✅ Step 5: Verify

**SSH into server:**
```bash
ssh -i "C:\Users\shubh\Downloads\Ivorian.pem" ec2-user@65.0.122.243
```

**Check services:**
```bash
docker ps
curl http://localhost/health
```

**Access your app:**
- Frontend: http://65.0.122.243
- API: http://65.0.122.243/api

## 🐛 Troubleshooting

**"Permission denied" for docker:**
```bash
# Log out and log back in (docker group needs refresh)
exit
# SSH back in
```

**Port 80 in use:**
```bash
sudo systemctl stop httpd
sudo systemctl disable httpd
```

**View logs:**
```bash
cd /opt/ivorian-realty
docker-compose -f docker-compose.yml logs -f
```

---

**That's it!** Your CI/CD is now set up! 🚀


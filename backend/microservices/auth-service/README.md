# Authentication Service

Handles user authentication, authorization, and session management for the Ivorian Realty platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB
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
docker build -f Dockerfile.dev -t auth-service-dev .
docker run -p 3001:3001 --env-file .env auth-service-dev
```

## 📋 API Endpoints

### Authentication
- `POST /register` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /refresh` - Refresh access token

### Password Management
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password with token
- `POST /change-password` - Change password (authenticated)

### Email Verification
- `GET /verify/:token` - Verify email address
- `POST /resend-verification` - Resend verification email

### User Profile
- `GET /me` - Get current user profile
- `PUT /me` - Update user profile

### Health Check
- `GET /health` - Service health status

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017 |
| `DB_NAME` | Database name | ivorian_realty |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRES_IN` | Access token expiry | 24h |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry | 7d |
| `SMTP_HOST` | SMTP server host | smtp.gmail.com |
| `SMTP_PORT` | SMTP server port | 587 |
| `SMTP_USER` | SMTP username | - |
| `SMTP_PASS` | SMTP password | - |
| `FROM_EMAIL` | From email address | - |

## 🏗️ Architecture

- **Express.js** - Web framework
- **MongoDB** - User data storage
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **nodemailer** - Email sending
- **joi** - Input validation
- **winston** - Logging

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting on auth endpoints
- Email verification
- Password reset functionality
- Role-based access control
- CORS protection
- Helmet security headers

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
docker build -t auth-service .
docker run -p 3001:3001 --env-file .env auth-service
```

### Health Check

```bash
curl http://localhost:3001/health
```

## 📝 Development Notes

- Uses TypeScript for type safety
- Implements secure password policies
- Supports multiple user roles (admin, agent, client)
- Includes comprehensive input validation
- Implements proper error handling
- Supports email verification workflow

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT

# @ivorian-realty/shared-lib

Shared utilities, types, and configurations for Ivorian Realty microservices.

## 📦 Installation

```bash
npm install @ivorian-realty/shared-lib
```

## 🚀 Usage

```typescript
import { 
  ApiResponse, 
  User, 
  Property, 
  validate, 
  authenticateToken,
  createLogger 
} from '@ivorian-realty/shared-lib';
```

## 📚 API Reference

### Types
- `User` - User interface
- `Property` - Property interface
- `Notification` - Notification interface
- `File` - File interface
- `ApiResponse` - Standard API response format

### Utilities
- `validate()` - Request validation middleware
- `authenticateToken()` - JWT authentication middleware
- `createLogger()` - Winston logger factory
- `generateTokenPair()` - JWT token generation
- `verifyToken()` - JWT token verification

### Database
- `database` - MongoDB connection singleton
- `dbOperations` - Common database operations

## 🔧 Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm test

# Watch mode for development
npm run dev
```

## 📄 License

MIT

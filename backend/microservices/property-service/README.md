# Property Service

Manages property listings, search, and related operations for the Ivorian Realty platform.

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
docker build -f Dockerfile.dev -t property-service-dev .
docker run -p 3002:3002 --env-file .env property-service-dev
```

## 📋 API Endpoints

### Properties
- `GET /` - Get properties with filters and pagination
- `GET /:id` - Get property by ID
- `POST /` - Create new property (authenticated)
- `PUT /:id` - Update property (authenticated)
- `DELETE /:id` - Delete property (authenticated)

### Search & Filtering
- `GET /search` - Advanced property search
- `GET /featured` - Get featured properties
- `GET /city/:city` - Get properties by city
- `GET /type/:type` - Get properties by type
- `GET /price-range` - Get properties by price range

### User Properties
- `GET /user/my-properties` - Get user's properties (authenticated)
- `GET /user/favorites` - Get user's favorite properties (authenticated)
- `POST /user/favorites/:id` - Add property to favorites (authenticated)
- `DELETE /user/favorites/:id` - Remove property from favorites (authenticated)

### Analytics
- `GET /:id/views` - Get property view count
- `POST /:id/view` - Increment property view count
- `GET /analytics/popular` - Get popular properties

### Health Check
- `GET /health` - Service health status

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3002 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017 |
| `DB_NAME` | Database name | ivorian_realty |
| `MAX_FILE_SIZE` | Max file upload size | 10485760 (10MB) |
| `ALLOWED_FILE_TYPES` | Allowed file types | image/jpeg,image/png,image/gif,image/webp,application/pdf |
| `AWS_ACCESS_KEY_ID` | AWS access key | - |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | - |
| `AWS_REGION` | AWS region | us-east-1 |
| `AWS_S3_BUCKET` | S3 bucket name | - |

## 🏗️ Architecture

- **Express.js** - Web framework
- **MongoDB** - Property data storage
- **Sharp** - Image processing
- **Multer** - File upload handling
- **joi** - Input validation
- **winston** - Logging

## 🔍 Search Features

- Full-text search across property fields
- Advanced filtering (price, location, type, features)
- Geographic search with coordinates
- Pagination and sorting
- Featured property highlighting
- View count tracking

## 📸 Image Management

- Automatic image resizing and optimization
- Thumbnail generation
- Multiple image formats support
- AWS S3 integration for production
- Local file storage for development

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
docker build -t property-service .
docker run -p 3002:3002 --env-file .env property-service
```

### Health Check

```bash
curl http://localhost:3002/health
```

## 📝 Development Notes

- Uses TypeScript for type safety
- Implements comprehensive property search
- Supports multiple property types and listing types
- Includes image processing and optimization
- Implements proper error handling
- Supports geographic search with coordinates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT

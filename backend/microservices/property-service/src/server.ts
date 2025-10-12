import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import winston from 'winston';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'property-service'
  });
});

// Mock property database (in production, this would be MongoDB)
const properties: any[] = [
  {
    id: uuidv4(),
    title: 'Beautiful Family Home',
    description: 'A spacious 4-bedroom family home with a large backyard and modern amenities.',
    price: 450000,
    location: {
      address: '123 Main Street',
      city: 'Abidjan',
      state: 'Abidjan',
      zipCode: '00225',
      coordinates: {
        lat: 5.3599,
        lng: -4.0083
      }
    },
    type: 'house',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2500,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'
    ],
    agentId: 'agent-1',
    status: 'available',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    title: 'Modern Apartment in City Center',
    description: 'Contemporary 2-bedroom apartment with city views and premium finishes.',
    price: 280000,
    location: {
      address: '456 Business District',
      city: 'Abidjan',
      state: 'Abidjan',
      zipCode: '00225',
      coordinates: {
        lat: 5.3600,
        lng: -4.0080
      }
    },
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'
    ],
    agentId: 'agent-2',
    status: 'available',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Get all properties
app.get('/', (req, res) => {
  try {
    const { page = 1, limit = 10, type, minPrice, maxPrice, bedrooms } = req.query;
    
    let filteredProperties = [...properties];
    
    // Apply filters
    if (type) {
      filteredProperties = filteredProperties.filter(p => p.type === type);
    }
    
    if (minPrice) {
      filteredProperties = filteredProperties.filter(p => p.price >= parseInt(minPrice as string));
    }
    
    if (maxPrice) {
      filteredProperties = filteredProperties.filter(p => p.price <= parseInt(maxPrice as string));
    }
    
    if (bedrooms) {
      filteredProperties = filteredProperties.filter(p => p.bedrooms >= parseInt(bedrooms as string));
    }
    
    // Pagination
    const startIndex = (parseInt(page as string) - 1) * parseInt(limit as string);
    const endIndex = startIndex + parseInt(limit as string);
    const paginatedProperties = filteredProperties.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedProperties,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total: filteredProperties.length,
        totalPages: Math.ceil(filteredProperties.length / parseInt(limit as string))
      }
    });
    
  } catch (error) {
    logger.error('Get properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get property by ID
app.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const property = properties.find(p => p.id === id);
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }
    
    res.json({
      success: true,
      data: property
    });
    
  } catch (error) {
    logger.error('Get property error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new property
app.post('/', (req, res) => {
  try {
    const {
      title,
      description,
      price,
      location,
      type,
      bedrooms,
      bathrooms,
      squareFeet,
      images,
      agentId
    } = req.body;
    
    // Validate required fields
    if (!title || !description || !price || !location || !type || !bedrooms || !bathrooms || !agentId) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }
    
    const property = {
      id: uuidv4(),
      title,
      description,
      price: parseInt(price),
      location,
      type,
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      squareFeet: parseInt(squareFeet) || 0,
      images: images || [],
      agentId,
      status: 'available',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    properties.push(property);
    
    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: property
    });
    
  } catch (error) {
    logger.error('Create property error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Search properties
app.get('/search', (req, res) => {
  try {
    const { q, city, type, minPrice, maxPrice } = req.query;
    
    let filteredProperties = [...properties];
    
    // Text search
    if (q) {
      const searchTerm = (q as string).toLowerCase();
      filteredProperties = filteredProperties.filter(p => 
        p.title.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.location.city.toLowerCase().includes(searchTerm) ||
        p.location.address.toLowerCase().includes(searchTerm)
      );
    }
    
    // City filter
    if (city) {
      filteredProperties = filteredProperties.filter(p => 
        p.location.city.toLowerCase() === (city as string).toLowerCase()
      );
    }
    
    // Type filter
    if (type) {
      filteredProperties = filteredProperties.filter(p => p.type === type);
    }
    
    // Price range filter
    if (minPrice) {
      filteredProperties = filteredProperties.filter(p => p.price >= parseInt(minPrice as string));
    }
    
    if (maxPrice) {
      filteredProperties = filteredProperties.filter(p => p.price <= parseInt(maxPrice as string));
    }
    
    res.json({
      success: true,
      data: filteredProperties,
      total: filteredProperties.length
    });
    
  } catch (error) {
    logger.error('Search properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Property service server running on port ${PORT}`);
  console.log(`🏠 Property service running on http://localhost:${PORT}`);
});

export default app;

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  crossOriginEmbedderPolicy: false
}));
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images with CORS-friendly headers
const uploadsDir = path.join(__dirname, 'uploads');
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
}, express.static(uploadsDir));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'api-gateway'
  });
});

// Input sanitization function
function sanitizeInput(input) {
  if (typeof input === 'string') {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();
  }
  if (typeof input === 'object' && input !== null) {
    const sanitized = {};
    for (const key in input) {
      sanitized[key] = sanitizeInput(input[key]);
    }
    return sanitized;
  }
  return input;
}

// Sanitization middleware
app.use((req, res, next) => {
  if (req.body) {
    req.body = sanitizeInput(req.body);
  }
  if (req.query) {
    req.query = sanitizeInput(req.query);
  }
  if (req.params) {
    req.params = sanitizeInput(req.params);
  }
  next();
});

// Validation functions
function validateRegistration(req, res, next) {
  const { firstName, lastName, email, password, role } = req.body;
  const errors = [];

  if (!firstName || firstName.length < 2) {
    errors.push({ field: 'firstName', message: 'First name is required and must be at least 2 characters' });
  }
  if (!lastName || lastName.length < 2) {
    errors.push({ field: 'lastName', message: 'Last name is required and must be at least 2 characters' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: 'email', message: 'Valid email is required' });
  }
  if (!password || password.length < 8) {
    errors.push({ field: 'password', message: 'Password must be at least 8 characters' });
  }
  if (!role || !['buyer', 'seller', 'agent', 'admin'].includes(role)) {
    errors.push({ field: 'role', message: 'Valid role is required' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: 'email', message: 'Valid email is required' });
  }
  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  next();
}

// Database connection
let db;
async function connectToDatabase() {
  try {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    db = client.db('ivorian_realty');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}

// Authentication endpoints
app.post('/api/auth/register', validateRegistration, async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, phone } = req.body;
    
    const users = db.collection('users');

    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      phone: phone || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await users.insertOne(newUser);
    const userId = result.insertedId.toString();

    // Generate JWT token
    const token = jwt.sign(
      { userId, email, role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        token,
        user: {
          _id: userId,
          firstName,
          lastName,
          email,
          role,
          phone: phone || ''
        }
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
});

app.post('/api/auth/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const users = db.collection('users');

    // Find user
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          _id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          phone: user.phone || ''
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

app.get('/api/auth/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const users = db.collection('users');
    const user = await users.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        _id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phone: user.phone || ''
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

// Property endpoints
app.get('/api/properties', async (req, res) => {
  try {
    const properties = db.collection('properties');
    
    const {
      search,
      type,
      minPrice,
      maxPrice,
      city,
      status = 'available',
      page = 1,
      limit = 10
    } = req.query;

    // Build query - only show approved properties to public
    const query = { 
      status,
      $and: [
        {
          $or: [
            { approvalStatus: 'approved' },
            { approvalStatus: { $exists: false } } // Include old properties without approval status
          ]
        }
      ]
    };
    
    if (search) {
      query.$and.push({
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { 'location.city': { $regex: search, $options: 'i' } }
        ]
      });
    }
    
    if (type) {
      query.type = type;
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await properties.countDocuments(query);
    const propertiesList = await properties
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .toArray();

    res.status(200).json({
      success: true,
      message: 'Properties retrieved successfully',
      data: {
        properties: propertiesList,
        total,
        page: Number(page),
        limit: Number(limit)
      }
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve properties'
    });
  }
});

// Get properties pending approval (admin only)
app.get('/api/properties/pending', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const properties = db.collection('properties');
    
    // Get all properties and filter for pending
    const allProperties = await properties
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    // Filter for pending properties
    const pendingProperties = allProperties.filter(prop => 
      !prop.approvalStatus || prop.approvalStatus === 'pending'
    );
    
    const total = pendingProperties.length;
    const propertiesList = pendingProperties.slice(skip, skip + parseInt(limit));

    return res.status(200).json({
      success: true,
      message: 'Pending properties retrieved successfully',
      data: {
        properties: propertiesList,
        total,
        page: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get pending properties error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve pending properties'
    });
  }
});

app.get('/api/properties/:id', async (req, res) => {
  try {
    const properties = db.collection('properties');
    const id = req.params.id;
    const query = /^[0-9a-fA-F]{24}$/.test(id) ? { _id: new ObjectId(id) } : { _id: id };
    const property = await properties.findOne(query);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Property retrieved successfully',
      data: property
    });
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve property'
    });
  }
});

// Create property endpoint
app.post('/api/properties', async (req, res) => {
  try {
    const { title, description, price, type, location, images, bedrooms, bathrooms, area, features, ownerId } = req.body;

    // Validate required fields
    if (!title || !price || !type) {
      return res.status(400).json({
        success: false,
        message: 'Title, price, and type are required'
      });
    }

    const properties = db.collection('properties');

    const newProperty = {
      title,
      description: description || '',
      price: parseFloat(price),
      type,
      location: location || { city: '', address: '' },
      images: images || [],
      bedrooms: bedrooms ? parseInt(bedrooms) : undefined,
      bathrooms: bathrooms ? parseInt(bathrooms) : undefined,
      area: area ? parseFloat(area) : undefined,
      features: features || [],
      status: 'available',
      approvalStatus: 'pending', // New properties need admin approval
      approvedBy: null,
      approvedAt: null,
      ownerId: ownerId || 'default-owner',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await properties.insertOne(newProperty);
    const propertyId = result.insertedId.toString();

    return res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: {
        _id: propertyId,
        ...newProperty
      }
    });
  } catch (error) {
    console.error('Create property error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create property'
    });
  }
});

// Get properties by owner ID
app.get('/api/properties/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const properties = db.collection('properties');
    
    const total = await properties.countDocuments({ ownerId: userId });
    const propertiesList = await properties
      .find({ ownerId: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    return res.status(200).json({
      success: true,
      message: 'User properties retrieved successfully',
      data: {
        properties: propertiesList,
        total,
        page: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get user properties error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve user properties'
    });
  }
});

// Approve property (admin only)
app.put('/api/properties/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const { approvedBy } = req.body;

    const result = await properties.updateOne(
      { _id: id },
      {
        $set: {
          approvalStatus: 'approved',
          approvedBy: approvedBy || 'admin',
          approvedAt: new Date(),
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Property approved successfully'
    });
  } catch (error) {
    console.error('Approve property error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to approve property'
    });
  }
});

// Reject property (admin only)
app.put('/api/properties/:id/reject', async (req, res) => {
  try {
    const { id } = req.params;
    const { rejectedBy, rejectionReason } = req.body;

    const result = await properties.updateOne(
      { _id: id },
      {
        $set: {
          approvalStatus: 'rejected',
          rejectedBy: rejectedBy || 'admin',
          rejectionReason: rejectionReason || 'No reason provided',
          rejectedAt: new Date(),
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Property rejected successfully'
    });
  } catch (error) {
    console.error('Reject property error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to reject property'
    });
  }
});

// Default route
app.get('/', (req, res) => {
  res.json({
    message: 'Ivorian Realty API Gateway',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      properties: '/api/properties',
      pending: '/api/properties/pending'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
    path: req.originalUrl
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Initialize and start server
async function startServer() {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Start server
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
      console.log(`📊 MongoDB connected successfully`);
      console.log(`🔐 Authentication endpoints: /api/auth/*`);
      console.log(`🏠 Property endpoints: /api/properties/*`);
    });

  } catch (error) {
    console.error('Failed to start API Gateway:', error);
    process.exit(1);
  }
}

// Start the server
startServer();

module.exports = app;

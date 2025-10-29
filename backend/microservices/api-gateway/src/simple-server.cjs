const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'ivorian_realty';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false
}));
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically with CORS headers
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

// Input sanitization
function sanitizeInput(input) {
  if (typeof input === 'string') {
    return input.trim();
  }
  if (typeof input === 'object' && input !== null) {
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        input[key] = sanitizeInput(input[key]);
      }
    }
  }
  return input;
}

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

// Validation middleware
const validateRegistration = [
  body('firstName')
    .trim()
    .isLength({ min: 2 })
    .withMessage('First name is required and must be at least 2 characters'),
  body('lastName')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Last name is required and must be at least 2 characters'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  body('role')
    .isIn(['buyer', 'seller', 'agent', 'admin'])
    .withMessage('Role must be one of: buyer, seller, agent, admin'),
  body('phone').optional().trim().isMobilePhone('any').withMessage('Invalid phone number format'),
];

const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

// Error handling middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.type === 'field' ? error.path : 'unknown',
        message: error.msg,
        value: error.type === 'field' ? error.value : undefined
      }))
    });
  }
  return next();
};

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API Gateway is running',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Authentication endpoints
app.post('/api/auth/register', validateRegistration, handleValidationErrors, async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, phone } = req.body;
    
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    const users = db.collection('users');

    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      await client.close();
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

    await client.close();

    return res.status(201).json({
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
    return res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
});

app.post('/api/auth/login', validateLogin, handleValidationErrors, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    const users = db.collection('users');

    // Find user
    const user = await users.findOne({ email });
    if (!user) {
      await client.close();
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      await client.close();
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

    await client.close();

    return res.status(200).json({
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
    return res.status(500).json({
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
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    const users = db.collection('users');
    const user = await users.findOne({ _id: new ObjectId(decoded.userId) });

    if (!user) {
      await client.close();
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await client.close();

    return res.status(200).json({
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
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

// Property endpoints
app.get('/api/properties', async (req, res) => {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    const properties = db.collection('properties');

    const { search, type, minPrice, maxPrice, city, page = 1, limit = 10 } = req.query;
    
    // Build query - only show approved properties to public
    const query = { 
      status: 'available',
      approvalStatus: 'approved' // Only show approved properties
    };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } }
      ];
    }
    
    if (type) {
      query.type = type;
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    
    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await properties.countDocuments(query);
    
    const propertiesList = await properties
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    await client.close();

    return res.status(200).json({
      success: true,
      message: 'Properties retrieved successfully',
      data: {
        properties: propertiesList,
        total,
        page: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get properties error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve properties'
    });
  }
});

app.get('/api/properties/:id', async (req, res) => {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    const properties = db.collection('properties');
    const property = await properties.findOne({ _id: new ObjectId(req.params.id) });

    if (!property) {
      await client.close();
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    await client.close();

    return res.status(200).json({
      success: true,
      message: 'Property retrieved successfully',
      data: property
    });
  } catch (error) {
    console.error('Get property error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve property'
    });
  }
});

// Get properties by owner ID
app.get('/api/properties/user/:userId', async (req, res) => {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    const properties = db.collection('properties');
    
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await properties.countDocuments({ ownerId: userId });
    
    const propertiesList = await properties
      .find({ ownerId: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    await client.close();

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

// Get properties pending approval (admin only)
app.get('/api/properties/pending', async (req, res) => {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    const properties = db.collection('properties');
    
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // First, let's get all properties and filter in JavaScript for now
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

    await client.close();

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

// Approve property (admin only)
app.put('/api/properties/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const { approvedBy } = req.body; // Admin user ID who approved

    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    const properties = db.collection('properties');

    const result = await properties.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          approvalStatus: 'approved',
          approvedBy: approvedBy || 'admin',
          approvedAt: new Date(),
          updatedAt: new Date()
        }
      }
    );

    await client.close();

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
    const { rejectedBy, rejectionReason } = req.body; // Admin user ID and reason

    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    const properties = db.collection('properties');

    const result = await properties.updateOne(
      { _id: new ObjectId(id) },
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

    await client.close();

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

// Create property endpoint
app.post('/api/properties', async (req, res) => {
  try {
    const { title, description, price, type, location, images, bedrooms, bathrooms, area, features, ownerId } = req.body;

    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    const properties = db.collection('properties');

    const newProperty = {
      title,
      description,
      price: parseFloat(price),
      type,
      location,
      images: images || [],
      bedrooms: bedrooms ? parseInt(bedrooms) : undefined,
      bathrooms: bathrooms ? parseInt(bathrooms) : undefined,
      area: parseFloat(area),
      features: features || [],
      status: 'available',
      approvalStatus: 'pending', // New properties need admin approval
      approvedBy: null, // Will be set when admin approves
      approvedAt: null, // Will be set when admin approves
      ownerId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await properties.insertOne(newProperty);
    const propertyId = result.insertedId.toString();

    await client.close();

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: {
        _id: propertyId,
        ...newProperty
      }
    });
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create property'
    });
  }
});

// Image upload endpoint
app.post('/api/properties/:id/images', upload.array('images', 10), async (req, res) => {
  try {
    const propertyId = req.params.id;
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No images uploaded'
      });
    }

    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    const properties = db.collection('properties');

    // Check if property exists
    const property = await properties.findOne({ _id: new ObjectId(propertyId) });
    if (!property) {
      await client.close();
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Generate image URLs
    const imageUrls = req.files.map(file => 
      `http://localhost:${PORT}/uploads/${file.filename}`
    );

    // Update property with new images
    await properties.updateOne(
      { _id: new ObjectId(propertyId) },
      { 
        $push: { images: { $each: imageUrls } },
        $set: { updatedAt: new Date() }
      }
    );

    await client.close();

    res.status(200).json({
      success: true,
      message: 'Images uploaded successfully',
      data: {
        images: imageUrls
      }
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload images'
    });
  }
});

// Upload images for new property (without property ID)
app.post('/api/properties/upload-images', upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No images uploaded'
      });
    }

    // Generate image URLs
    const imageUrls = req.files.map(file => 
      `http://localhost:${PORT}/uploads/${file.filename}`
    );

    res.status(200).json({
      success: true,
      message: 'Images uploaded successfully',
      data: {
        images: imageUrls
      }
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload images'
    });
  }
});

// Default route
app.get('/', (req, res) => {
  res.json({
    message: 'Ivorian Realty API Gateway',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString()
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

// Start server
async function startServer() {
  try {
    console.log('🚀 Starting Ivorian Realty API Gateway...');
    console.log(`📡 Port: ${PORT}`);
    console.log(`🗄️  MongoDB: ${MONGODB_URI}`);
    console.log(`📊 Database: ${DB_NAME}`);
    
    app.listen(PORT, () => {
      console.log(`✅ API Gateway running on port ${PORT}`);
      console.log(`🌐 Health check: http://localhost:${PORT}/health`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Input sanitization function
export const sanitizeInput = (input: any): any => {
  if (typeof input === 'string') {
    // Remove potential XSS attacks
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();
  }
  if (typeof input === 'object' && input !== null) {
    const sanitized: any = {};
    for (const key in input) {
      sanitized[key] = sanitizeInput(input[key]);
    }
    return sanitized;
  }
  return input;
};

// Validation rules for registration
export const validateRegistration = [
  body('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
  
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  body('role')
    .isIn(['buyer', 'seller', 'agent', 'admin'])
    .withMessage('Role must be one of: buyer, seller, agent, admin'),
  
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number')
];

// Validation rules for login
export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 1 })
    .withMessage('Password cannot be empty')
];

// Validation rules for property search
export const validatePropertySearch = [
  body('search')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Search term must be less than 100 characters'),
  
  body('type')
    .optional()
    .isIn(['house', 'apartment', 'land', 'commercial'])
    .withMessage('Property type must be one of: house, apartment, land, commercial'),
  
  body('minPrice')
    .optional()
    .isNumeric()
    .withMessage('Minimum price must be a number')
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be positive'),
  
  body('maxPrice')
    .optional()
    .isNumeric()
    .withMessage('Maximum price must be a number')
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be positive')
];

// Error handling middleware
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
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

// Sanitization middleware
export const sanitizeRequest = (req: Request, _res: Response, next: NextFunction) => {
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
};

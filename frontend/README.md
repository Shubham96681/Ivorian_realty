# Frontend - Ivorian Realty React Application

The frontend is a React application built with Vite, Tailwind CSS, and modern web technologies.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Home/           # Home page components
│   │   ├── Layout/         # Layout components
│   │   └── UI/             # Generic UI components
│   ├── pages/              # Page components
│   │   ├── auth/           # Authentication pages
│   │   ├── buy/            # Property buying pages
│   │   ├── rent/           # Property rental pages
│   │   └── ...             # Other pages
│   ├── services/           # API service layer
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main App component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── eslint.config.js        # ESLint configuration
└── README.md               # This file
```

## 🎨 Technologies

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Heroicons** - Icon library
- **ESLint** - Code linting

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_AUTH_SERVICE_URL=http://localhost:3001
VITE_PROPERTY_SERVICE_URL=http://localhost:3002
VITE_USER_SERVICE_URL=http://localhost:3003
VITE_NOTIFICATION_SERVICE_URL=http://localhost:3004
VITE_FILE_SERVICE_URL=http://localhost:3005

# App Configuration
VITE_APP_NAME=Ivorian Realty
VITE_APP_VERSION=1.0.0
```

### API Integration

The frontend is configured to work with the microservices backend:

- **API Gateway**: Main entry point at `http://localhost:3000`
- **Direct Service Access**: Individual service URLs for specific operations
- **Authentication**: JWT token-based authentication
- **Error Handling**: Centralized error handling and user feedback

## 📱 Features

### Authentication
- User registration and login
- Password reset functionality
- Email verification
- Protected routes

### Property Management
- Property search and filtering
- Property details and images
- Featured properties
- Property favorites
- Advanced search filters

### User Experience
- Responsive design
- Modern UI components
- Loading states and error handling
- Accessibility features
- Performance optimization

## 🎯 Pages

### Public Pages
- **Home** (`/`) - Landing page with featured properties
- **Properties** (`/properties`) - Property search and listings
- **About** (`/about`) - Company information
- **Contact** (`/contact`) - Contact form and information

### Authentication Pages
- **Login** (`/login`) - User login
- **Register** (`/register`) - User registration
- **Forgot Password** (`/forgot-password`) - Password reset

### Property Pages
- **Property Details** (`/property/:id`) - Individual property details
- **Buy Properties** (`/buy/*`) - Property buying pages
- **Rent Properties** (`/rent/*`) - Property rental pages

### User Pages
- **Dashboard** (`/dashboard`) - User dashboard (authenticated)
- **Profile** (`/profile`) - User profile management

## 🔌 API Integration

### Service Layer

The frontend uses a service layer to communicate with the backend:

```javascript
// Example API call
import { propertyService } from './services/propertyService';

const properties = await propertyService.getProperties({
  city: 'Mumbai',
  propertyType: 'apartment',
  minPrice: 1000000,
  maxPrice: 5000000
});
```

### Authentication

```javascript
import { authService } from './services/authService';

// Login
const response = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Store token
localStorage.setItem('token', response.data.accessToken);
```

## 🎨 Styling

### Tailwind CSS

The application uses Tailwind CSS for styling:

```jsx
<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
  <h2 className="text-xl font-semibold text-gray-900 mb-4">
    Property Title
  </h2>
  <p className="text-gray-600">
    Property description...
  </p>
</div>
```

### Custom Components

Reusable components in `src/components/UI/`:
- `LoadingSpinner` - Loading indicators
- `ErrorMessage` - Error display
- `ComingSoonModal` - Feature coming soon modal

## 🧪 Testing

### Running Tests

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Testing Tools

- **Vitest** - Test runner
- **React Testing Library** - Component testing
- **Jest** - Test framework

## 🚀 Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Docker Deployment

```bash
# Build Docker image
docker build -t ivorian-realty-frontend .

# Run container
docker run -p 3000:3000 ivorian-realty-frontend
```

## 🔧 Development

### Code Quality

- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **TypeScript** - Type safety (optional)

### Performance

- **Vite** - Fast build and HMR
- **Code Splitting** - Lazy loading of components
- **Image Optimization** - Optimized images
- **Bundle Analysis** - Bundle size monitoring

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## ♿ Accessibility

- **ARIA Labels** - Screen reader support
- **Keyboard Navigation** - Full keyboard support
- **Color Contrast** - WCAG compliant colors
- **Focus Management** - Proper focus handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT

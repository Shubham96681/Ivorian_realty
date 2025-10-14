import axios from 'axios';

// Create axios instance with default configuration for microservices
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Service-specific API instances for direct communication (if needed)
export const authAPI = axios.create({
  baseURL: import.meta.env.VITE_AUTH_SERVICE_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const propertyAPI = axios.create({
  baseURL: import.meta.env.VITE_PROPERTY_SERVICE_URL || 'http://localhost:3002',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userAPI = axios.create({
  baseURL: import.meta.env.VITE_USER_SERVICE_URL || 'http://localhost:3003',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const notificationAPI = axios.create({
  baseURL: import.meta.env.VITE_NOTIFICATION_SERVICE_URL || 'http://localhost:3004',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fileAPI = axios.create({
  baseURL: import.meta.env.VITE_FILE_SERVICE_URL || 'http://localhost:3005',
  timeout: 30000, // Longer timeout for file uploads
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth interceptors to all service APIs
[authAPI, propertyAPI, userAPI, notificationAPI, fileAPI].forEach(serviceAPI => {
  serviceAPI.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  serviceAPI.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
});

export default api;

import api, { authAPI } from './api';

export const authService = {
  // User registration
  register: async (userData) => {
    try {
      const response = await authAPI.post('/register', userData);
      const { token, user } = response.data.data;
      
      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { token, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  // User login
  login: async (credentials) => {
    try {
      const response = await authAPI.post('/login', credentials);
      const { token, user } = response.data.data;
      
      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { token, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  // User logout
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of API call success
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  // Get current user profile
  getCurrentUser: async () => {
    try {
      const response = await authAPI.get('/me');
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get user profile');
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await authAPI.put('/profile', userData);
      const updatedUser = response.data.data;
      
      // Update stored user data
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await api.put('/auth/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send reset email');
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', { 
        token, 
        password: newPassword 
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to reset password');
    }
  },

  // Verify email
  verifyEmail: async (token) => {
    try {
      const response = await api.post('/auth/verify-email', { token });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to verify email');
    }
  },

  // Resend verification email
  resendVerification: async () => {
    try {
      const response = await api.post('/auth/resend-verification');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to resend verification email');
    }
  },

  // Social login (Google/Facebook)
  socialLogin: async (provider, token) => {
    try {
      const response = await api.post('/auth/social-login', { 
        provider, 
        token 
      });
      const { token: authToken, user } = response.data;
      
      // Store token and user data
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { token: authToken, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Social login failed');
    }
  }
};

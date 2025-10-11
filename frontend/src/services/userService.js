import api, { userAPI } from './api';

export const userService = {
  // Get user profile
  getProfile: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
    }
  },

  // Update user profile
  updateProfile: async (userId, userData) => {
    try {
      const response = await api.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  },

  // Get user's properties
  getUserProperties: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/properties`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user properties');
    }
  },

  // Get user's favorite properties
  getUserFavorites: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/favorites`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user favorites');
    }
  },

  // Get user's inquiries
  getUserInquiries: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/inquiries`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user inquiries');
    }
  },

  // Upload profile picture
  uploadProfilePicture: async (userId, image) => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', image);

      const response = await api.post(`/users/${userId}/profile-picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload profile picture');
    }
  },

  // Delete user account
  deleteAccount: async (userId) => {
    try {
      const response = await api.delete(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete account');
    }
  },

  // Get real estate agents
  getAgents: async (filters = {}) => {
    try {
      const response = await api.get('/users/agents', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch agents');
    }
  },

  // Get agent profile
  getAgentProfile: async (agentId) => {
    try {
      const response = await api.get(`/users/agents/${agentId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch agent profile');
    }
  },

  // Contact agent
  contactAgent: async (agentId, message) => {
    try {
      const response = await api.post(`/users/agents/${agentId}/contact`, message);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to contact agent');
    }
  },

  // Get user notifications
  getNotifications: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/notifications`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch notifications');
    }
  },

  // Mark notification as read
  markNotificationAsRead: async (userId, notificationId) => {
    try {
      const response = await api.put(`/users/${userId}/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to mark notification as read');
    }
  },

  // Mark all notifications as read
  markAllNotificationsAsRead: async (userId) => {
    try {
      const response = await api.put(`/users/${userId}/notifications/read-all`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to mark all notifications as read');
    }
  }
};

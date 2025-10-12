import api, { propertyAPI, fileAPI } from './api';

export const propertyService = {
  // Get all properties with filters
  getProperties: async (filters = {}) => {
    try {
      const response = await api.get('/properties', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch properties');
    }
  },

  // Get single property by ID
  getProperty: async (id) => {
    try {
      const response = await api.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch property');
    }
  },

  // Create new property (for owners/agents)
  createProperty: async (propertyData) => {
    try {
      const response = await api.post('/properties', propertyData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create property');
    }
  },

  // Update property
  updateProperty: async (id, propertyData) => {
    try {
      const response = await api.put(`/properties/${id}`, propertyData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update property');
    }
  },

  // Delete property
  deleteProperty: async (id) => {
    try {
      const response = await api.delete(`/properties/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete property');
    }
  },

  // Get user's properties
  getUserProperties: async (userId) => {
    try {
      const response = await api.get(`/properties/user/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user properties');
    }
  },

  // Search properties
  searchProperties: async (searchParams) => {
    try {
      const response = await api.get('/properties/search', { params: searchParams });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search properties');
    }
  },

  // Get featured properties
  getFeaturedProperties: async () => {
    try {
      const response = await api.get('/properties/featured');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch featured properties');
    }
  },

  // Get properties by city
  getPropertiesByCity: async (city) => {
    try {
      const response = await api.get(`/properties/city/${city}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch properties by city');
    }
  },

  // Get property types
  getPropertyTypes: async () => {
    try {
      const response = await api.get('/properties/types');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch property types');
    }
  },

  // Upload property images
  uploadPropertyImages: async (propertyId, images) => {
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append(`images`, image);
      });

      const response = await api.post(`/properties/${propertyId}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload images');
    }
  },

  // Delete property image
  deletePropertyImage: async (propertyId, imageId) => {
    try {
      const response = await api.delete(`/properties/${propertyId}/images/${imageId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete image');
    }
  },

  // Contact property owner/agent
  contactPropertyOwner: async (propertyId, message) => {
    try {
      const response = await api.post(`/properties/${propertyId}/contact`, message);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send message');
    }
  },

  // Save property to favorites
  saveToFavorites: async (propertyId) => {
    try {
      const response = await api.post(`/properties/${propertyId}/favorite`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to save to favorites');
    }
  },

  // Remove property from favorites
  removeFromFavorites: async (propertyId) => {
    try {
      const response = await api.delete(`/properties/${propertyId}/favorite`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to remove from favorites');
    }
  },

  // Get user's favorite properties
  getFavoriteProperties: async () => {
    try {
      const response = await api.get('/properties/favorites');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch favorite properties');
    }
  }
};

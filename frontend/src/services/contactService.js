import api from './api';

export const contactService = {
  // Submit contact form
  submitContactForm: async (contactData) => {
    try {
      const response = await api.post('/contact', contactData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit contact form');
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

  // Schedule property tour
  scheduleTour: async (propertyId, tourData) => {
    try {
      const response = await api.post(`/properties/${propertyId}/schedule-tour`, tourData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to schedule tour');
    }
  },

  // Get contact inquiries (for agents/admins)
  getContactInquiries: async () => {
    try {
      const response = await api.get('/contact/inquiries');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch contact inquiries');
    }
  }
};

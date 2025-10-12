// Error handling utilities

export const getErrorMessage = (error) => {
  if (error.response) {
    // Server responded with error status
    return error.response.data?.message || error.response.data?.error || 'Server error occurred';
  } else if (error.request) {
    // Request was made but no response received
    return 'Network error. Please check your connection.';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred';
  }
};

export const isNetworkError = (error) => {
  return !error.response && error.request;
};

export const isServerError = (error) => {
  return error.response && error.response.status >= 500;
};

export const isClientError = (error) => {
  return error.response && error.response.status >= 400 && error.response.status < 500;
};

export const isAuthError = (error) => {
  return error.response && error.response.status === 401;
};

export const isForbiddenError = (error) => {
  return error.response && error.response.status === 403;
};

export const isNotFoundError = (error) => {
  return error.response && error.response.status === 404;
};

export const isValidationError = (error) => {
  return error.response && error.response.status === 422;
};

export const getValidationErrors = (error) => {
  if (isValidationError(error) && error.response.data?.errors) {
    return error.response.data.errors;
  }
  return null;
};

export const logError = (error, context = '') => {
  if (import.meta.env.VITE_ENABLE_DEBUG === 'true') {
    console.error(`[${context}] Error:`, error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
};

export const handleApiError = (error, context = '') => {
  logError(error, context);
  
  const message = getErrorMessage(error);
  
  // You can add additional error handling logic here
  // For example, redirect to login on auth errors
  if (isAuthError(error)) {
    // This will be handled by the axios interceptor
    return message;
  }
  
  return message;
};

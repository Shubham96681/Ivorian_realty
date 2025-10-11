import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export const LoadingButton = ({ loading, children, className = '', ...props }) => {
  return (
    <button
      className={`relative ${className}`}
      disabled={loading}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="sm" />
        </div>
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
};

export const LoadingPage = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size="xl" className="mb-4" />
        <p className="text-gray-600 text-lg">{message}</p>
      </div>
    </div>
  );
};

export const LoadingCard = ({ message = 'Loading...' }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-center">
        <LoadingSpinner size="md" className="mr-3" />
        <span className="text-gray-600">{message}</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;

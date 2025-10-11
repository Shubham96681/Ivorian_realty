import React from 'react';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ErrorMessage = ({ 
  error, 
  onDismiss, 
  className = '',
  showIcon = true,
  variant = 'error' // 'error', 'warning', 'info'
}) => {
  if (!error) return null;

  const variants = {
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-600',
      icon: 'text-red-400'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-600',
      icon: 'text-yellow-400'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600',
      icon: 'text-blue-400'
    }
  };

  const currentVariant = variants[variant];

  return (
    <div className={`${currentVariant.bg} ${currentVariant.border} border rounded-md p-4 ${className}`}>
      <div className="flex">
        {showIcon && (
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon 
              className={`h-5 w-5 ${currentVariant.icon}`} 
              aria-hidden="true" 
            />
          </div>
        )}
        <div className="ml-3 flex-1">
          <p className={`text-sm font-medium ${currentVariant.text}`}>
            {error}
          </p>
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onDismiss}
                className={`inline-flex rounded-md p-1.5 ${currentVariant.text} hover:${currentVariant.bg} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-600`}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const SuccessMessage = ({ 
  message, 
  onDismiss, 
  className = '',
  showIcon = true
}) => {
  if (!message) return null;

  return (
    <div className={`bg-green-50 border border-green-200 rounded-md p-4 ${className}`}>
      <div className="flex">
        {showIcon && (
          <div className="flex-shrink-0">
            <svg 
              className="h-5 w-5 text-green-400" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        )}
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-green-600">
            {message}
          </p>
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onDismiss}
                className="inline-flex rounded-md p-1.5 text-green-600 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-600"
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;

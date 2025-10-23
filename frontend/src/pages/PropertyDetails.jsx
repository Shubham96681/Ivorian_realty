import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { propertyService } from '../services/propertyService';
import { 
  ArrowLeftIcon,
  HomeIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  HeartIcon,
  ShareIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    message: ''
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        const propertyData = await propertyService.getProperty(id);
        setProperty(propertyData);
      } catch (error) {
        setError(error.message || 'Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      if (isFavorite) {
        await propertyService.removeFromFavorites(id);
        setIsFavorite(false);
      } else {
        await propertyService.saveToFavorites(id);
        setIsFavorite(true);
      }
    } catch {
      console.error('Error toggling favorite');
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await propertyService.contactPropertyOwner(id, contactForm);
      window.alert('Message sent successfully!');
      setShowContactForm(false);
      setContactForm(prev => ({ ...prev, message: '' }));
    } catch {
      window.alert('Failed to send message. Please try again.');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property?.title,
          text: `Check out this property: ${property?.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      window.alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ErrorMessage error={error} />
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <p className="text-gray-600 mb-4">The property you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleShare}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <ShareIcon className="h-5 w-5" />
              </button>
              <button
                onClick={handleFavoriteToggle}
                className={`p-2 rounded-lg ${
                  isFavorite 
                    ? 'text-red-600 hover:bg-red-50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {isFavorite ? (
                  <HeartSolidIcon className="h-5 w-5" />
                ) : (
                  <HeartIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Images */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={property.image || '/api/placeholder/800/600'}
                  alt={property.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    <span>{property.address}, {property.city}, {property.state}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    {property.priceDisplay || `₹${property.price?.toLocaleString()}`}
                  </div>
                  {property.listingType && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full mt-1">
                      {property.listingType}
                    </span>
                  )}
                </div>
              </div>

              {/* Property Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <HomeIcon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Bedrooms</div>
                  <div className="text-lg font-semibold">{property.bedrooms || 'N/A'}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <CurrencyDollarIcon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Bathrooms</div>
                  <div className="text-lg font-semibold">{property.bathrooms || 'N/A'}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="h-6 w-6 text-blue-600 mx-auto mb-2 flex items-center justify-center">
                    <span className="text-lg">📐</span>
                  </div>
                  <div className="text-sm text-gray-600">Area</div>
                  <div className="text-lg font-semibold">{property.area || 'N/A'}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <CalendarIcon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Year Built</div>
                  <div className="text-lg font-semibold">{property.yearBuilt || 'N/A'}</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {property.description || 'No description available for this property.'}
                </p>
              </div>

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckIcon className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Agent</h3>
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <UserIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{property.agent?.name || 'Property Agent'}</div>
                  <div className="text-sm text-gray-600">{property.agent?.company || 'Real Estate Agent'}</div>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  <span>{property.agent?.phone || '+91 98765 43210'}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <EnvelopeIcon className="h-4 w-4 mr-2" />
                  <span>{property.agent?.email || 'agent@example.com'}</span>
                </div>
              </div>

              <button
                onClick={() => setShowContactForm(true)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Agent
              </button>
            </div>

            {/* Property Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property ID</span>
                  <span className="font-medium">#{property.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type</span>
                  <span className="font-medium capitalize">{property.propertyType || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium capitalize">{property.status || 'Active'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Views</span>
                  <span className="font-medium">{property.views || '0'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Contact Agent</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="contact-message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="I'm interested in this property..."
                  required
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;

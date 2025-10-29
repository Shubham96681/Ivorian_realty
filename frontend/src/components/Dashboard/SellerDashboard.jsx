import { useState, useEffect, useCallback } from 'react';
import { 
  PlusIcon, 
  EyeIcon, 
  PencilIcon, 
  TrashIcon,
  ChartBarIcon,
  BellIcon,
  XMarkIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import { propertyService } from '../../services/propertyService';
import { useAuth } from '../../hooks/useAuth';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [newProperty, setNewProperty] = useState({
    title: '',
    description: '',
    price: '',
    type: 'house',
    location: {
      city: '',
      address: ''
    },
    bedrooms: '',
    bathrooms: '',
    area: '',
    features: []
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const { user } = useAuth();

  // Load properties on component mount and when user changes
  useEffect(() => {
    if (user?.id) {
      loadProperties();
    }
  }, [user?.id, loadProperties]);

  const loadProperties = useCallback(async () => {
    try {
      setLoading(true);
      if (!user?.id) {
        setError('User not authenticated');
        return;
      }
      
      const response = await propertyService.getUserProperties(user.id);
      console.log('User properties response:', response);
      
      if (response.success) {
        setProperties(response.data.properties || []);
      } else {
        setError('Failed to load your properties');
      }
    } catch (error) {
      console.error('Error loading properties:', error);
      setError('Failed to load properties');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const handleAddProperty = async (e) => {
    e.preventDefault();
    
    // Validate that at least one image is selected
    if (selectedImages.length === 0) {
      setError('Please add at least one photo of the property');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Upload images first
      const formData = new FormData();
      selectedImages.forEach((file) => {
        formData.append('images', file);
      });

      const uploadResponse = await fetch('http://localhost:8000/api/properties/upload-images', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload images');
      }

      const uploadData = await uploadResponse.json();
      const imageUrls = uploadData.data.images;
      
      const propertyData = {
        ...newProperty,
        price: parseFloat(newProperty.price),
        bedrooms: newProperty.bedrooms ? parseInt(newProperty.bedrooms) : undefined,
        bathrooms: newProperty.bathrooms ? parseInt(newProperty.bathrooms) : undefined,
        area: parseFloat(newProperty.area),
        ownerId: user?.id || 'default-owner',
        images: imageUrls
      };

      const response = await propertyService.createProperty(propertyData);
      if (response.success) {
        setProperties([response.data, ...properties]);
        setShowAddPropertyModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error creating property:', error);
      setError(error.message || 'Failed to create property');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewProperty({
      title: '',
      description: '',
      price: '',
      type: 'house',
      location: { city: '', address: '' },
      bedrooms: '',
      bathrooms: '',
      area: '',
      features: []
    });
    setSelectedImages([]);
    setImagePreviews([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setNewProperty(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value
        }
      }));
    } else {
      setNewProperty(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      setError('Please select only image files (JPEG, PNG, WebP)');
      return;
    }

    // Limit to 10 images maximum
    if (files.length > 10) {
      setError('Maximum 10 images allowed');
      return;
    }

    setSelectedImages(prev => [...prev, ...files].slice(0, 10));
    
    // Create previews
    files.forEach(file => {
      const reader = new window.FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const stats = [
    { name: 'Total Properties', value: properties.length.toString(), change: '+2', changeType: 'positive' },
    { name: 'Active Listings', value: properties.filter(p => p.status === 'available').length.toString(), change: '+1', changeType: 'positive' },
    { name: 'Total Views', value: '1,234', change: '+156', changeType: 'positive' },
    { name: 'Inquiries', value: '45', change: '+8', changeType: 'positive' }
  ];

  const recentInquiries = [
    {
      id: 1,
      property: 'Modern Family Home',
      buyer: 'John Doe',
      email: 'john@example.com',
      phone: '+225 20 30 40 50',
      message: 'Interested in viewing this property',
      date: '2 hours ago'
    },
    {
      id: 2,
      property: 'Luxury Apartment',
      buyer: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+225 20 30 40 51',
      message: 'What is the best price you can offer?',
      date: '5 hours ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={`stat-${index}`} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                  <ChartBarIcon className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Overview' },
              { id: 'properties', name: 'My Properties' },
              { id: 'inquiries', name: 'Inquiries' },
              { id: 'analytics', name: 'Analytics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                <button 
                  onClick={() => setShowAddPropertyModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add Property
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Recent Inquiries</h4>
                  <div className="space-y-3">
                    {recentInquiries.slice(0, 3).map((inquiry) => (
                      <div key={inquiry.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{inquiry.buyer}</p>
                            <p className="text-sm text-gray-600">{inquiry.property}</p>
                            <p className="text-xs text-gray-500">{inquiry.date}</p>
                          </div>
                          <BellIcon className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Top Performing Properties</h4>
                  <div className="space-y-3">
                    {properties.slice(0, 2).map((property, index) => (
                      <div key={property._id || property.id || `property-${index}`} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{property.title}</p>
                            <p className="text-sm text-gray-600">{property.views} views</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-green-600">{property.inquiries} inquiries</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'properties' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">My Properties</h3>
                <button 
                  onClick={() => setShowAddPropertyModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add Property
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="text-gray-500">Loading properties...</div>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                  {error}
                </div>
              ) : properties.length === 0 ? (
                <div className="text-center py-8">
                  <HomeIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No properties</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by adding your first property.</p>
                  <div className="mt-6">
                    <button
                      onClick={() => setShowAddPropertyModal(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center mx-auto"
                    >
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Add Property
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {properties.map((property) => (
                    <div key={property._id || property.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="h-48 bg-gray-200">
                        {property.images && property.images.length > 0 ? (
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <HomeIcon className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900">{property.title}</h4>
                        <p className="text-sm text-gray-600">
                          {typeof property.location === 'string' ? property.location : property.location?.city || 'N/A'}
                        </p>
                        <p className="text-lg font-semibold text-green-600">
                          FCFA {property.price?.toLocaleString() || 'N/A'}
                        </p>
                        <div className="flex justify-between items-center mt-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            property.status === 'available' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {property.status || 'available'}
                          </span>
                          <div className="flex space-x-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600">
                              <EyeIcon className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-green-600">
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600">
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                          <span>{property.bedrooms || 0} beds</span>
                          <span>{property.bathrooms || 0} baths</span>
                          <span>{property.area || 0} sq ft</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Property Inquiries</h3>
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-gray-900">{inquiry.buyer}</h4>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            New
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{inquiry.property}</p>
                        <p className="text-sm text-gray-700 mt-2">{inquiry.message}</p>
                        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                          <span>{inquiry.email}</span>
                          <span>{inquiry.phone}</span>
                          <span>{inquiry.date}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                          Reply
                        </button>
                        <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50">
                          View Property
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Property Analytics</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Views Over Time</h4>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <p>Chart visualization would go here</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Inquiry Sources</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Website</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Mobile App</span>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Social Media</span>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Property Modal */}
      {showAddPropertyModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add New Property</h3>
                <button
                  onClick={() => {
                    setShowAddPropertyModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}

              <form onSubmit={handleAddProperty} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Property Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newProperty.title}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter property title"
                    />
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Property Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={newProperty.type}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="commercial">Commercial</option>
                      <option value="land">Land</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newProperty.description}
                    onChange={handleInputChange}
                    rows={3}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Describe your property"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Price (FCFA)
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={newProperty.price}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      id="bedrooms"
                      name="bedrooms"
                      value={newProperty.bedrooms}
                      onChange={handleInputChange}
                      min="0"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      id="bathrooms"
                      name="bathrooms"
                      value={newProperty.bathrooms}
                      onChange={handleInputChange}
                      min="0"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                      Area (sq ft)
                    </label>
                    <input
                      type="number"
                      id="area"
                      name="area"
                      value={newProperty.area}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label htmlFor="location.city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      id="location.city"
                      name="location.city"
                      value={newProperty.location.city}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter city"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location.address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="location.address"
                    name="location.address"
                    value={newProperty.location.address}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter full address"
                  />
                </div>

                {/* Image Upload Section */}
                <div>
                  <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
                    Property Photos <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Add at least 1 photo (maximum 10). Supported formats: JPEG, PNG, WebP
                  </p>
                  
                  {/* File Input */}
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="images"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload photos</span>
                          <input
                            id="images"
                            name="images"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, WebP up to 10MB each</p>
                    </div>
                  </div>

                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Selected Photos ({imagePreviews.length}/10)
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {imagePreviews.map((preview, index) => (
                          <div key={`preview-${index}`} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <XMarkIcon className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddPropertyModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Adding...' : 'Add Property'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;

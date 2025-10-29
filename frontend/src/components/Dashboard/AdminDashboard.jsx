import { useState, useEffect } from 'react';
import { 
  UserIcon, 
  ChartBarIcon, 
  BellIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon,
  HomeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { propertyService } from '../../services/propertyService';
import { useAuth } from '../../hooks/useAuth';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [newProperty, setNewProperty] = useState({
    title: '',
    description: '',
    price: '',
    location: {
      city: '',
      address: ''
    },
    type: 'house',
    bedrooms: '',
    bathrooms: '',
    area: '',
    status: 'available'
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [pendingProperties, setPendingProperties] = useState([]);
  const [pendingLoading, setPendingLoading] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [propertyToReject, setPropertyToReject] = useState(null);

  // Mock data
  const stats = [
    { name: 'Total Users', value: '1,234', change: '+45', changeType: 'positive' },
    { name: 'Active Properties', value: '567', change: '+23', changeType: 'positive' },
    { name: 'Pending Approvals', value: '12', change: '-3', changeType: 'negative' },
    { name: 'System Health', value: '99.9%', change: '+0.1%', changeType: 'positive' }
  ];

  const recentUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'buyer',
      status: 'active',
      joinDate: '2 hours ago'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'agent',
      status: 'pending',
      joinDate: '5 hours ago'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'seller',
      status: 'active',
      joinDate: '1 day ago'
    }
  ];

  const [properties, setProperties] = useState([]);

  // Load properties from API
  useEffect(() => {
    loadProperties();
  }, []);

  // Load pending properties when approvals tab is active
  useEffect(() => {
    if (activeTab === 'approvals') {
      loadPendingProperties();
    }
  }, [activeTab]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const response = await propertyService.getProperties();
      if (response.success) {
        console.log('Properties loaded:', response.data.properties);
        const jeetProperty = response.data.properties.find(p => p.title === 'Jeet)properties');
        if (jeetProperty) {
          console.log('Jeet property found:', jeetProperty);
          console.log('Jeet property images:', jeetProperty.images);
        }
        setProperties(response.data.properties || []);
      }
    } catch (error) {
      console.error('Error loading properties:', error);
      setError('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const loadPendingProperties = async () => {
    try {
      setPendingLoading(true);
      setError('');
      const response = await propertyService.getPendingProperties();
      if (response.success) {
        setPendingProperties(response.data.properties || []);
      }
    } catch (error) {
      console.error('Error loading pending properties:', error);
      setError('Failed to load pending properties');
    } finally {
      setPendingLoading(false);
    }
  };

  const handleApproveProperty = async (propertyId) => {
    try {
      setLoading(true);
      const response = await propertyService.approveProperty(propertyId, user?.id || 'admin');
      if (response.success) {
        // Reload both pending and approved properties
        await Promise.all([loadPendingProperties(), loadProperties()]);
        setError('');
      }
    } catch (error) {
      console.error('Error approving property:', error);
      setError('Failed to approve property');
    } finally {
      setLoading(false);
    }
  };

  const handleRejectProperty = async () => {
    if (!propertyToReject || !rejectionReason.trim()) {
      setError('Please provide a reason for rejection');
      return;
    }

    try {
      setLoading(true);
      const response = await propertyService.rejectProperty(
        propertyToReject._id || propertyToReject.id,
        user?.id || 'admin',
        rejectionReason
      );
      if (response.success) {
        // Reload pending properties
        await loadPendingProperties();
        setShowRejectModal(false);
        setRejectionReason('');
        setPropertyToReject(null);
        setError('');
      }
    } catch (error) {
      console.error('Error rejecting property:', error);
      setError('Failed to reject property');
    } finally {
      setLoading(false);
    }
  };

  const openRejectModal = (property) => {
    setPropertyToReject(property);
    setShowRejectModal(true);
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!newProperty.title || !newProperty.price || !newProperty.location.city) {
      setError('Please fill in all required fields');
      return;
    }

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
        title: newProperty.title,
        description: newProperty.description,
        price: parseFloat(newProperty.price),
        type: newProperty.type || 'house',
        location: {
          city: newProperty.location.city,
          address: newProperty.location.address
        },
        bedrooms: newProperty.bedrooms ? parseInt(newProperty.bedrooms) : undefined,
        bathrooms: newProperty.bathrooms ? parseInt(newProperty.bathrooms) : undefined,
        area: newProperty.area ? parseFloat(newProperty.area) : undefined,
        features: [],
        ownerId: user?.userId || 'admin',
        images: imageUrls
      };

      const response = await propertyService.createProperty(propertyData);
      
      if (response.success) {
        // Reload properties to get the updated list
        await loadProperties();
        resetForm();
        setShowAddPropertyModal(false);
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
      location: { city: '', address: '' },
      type: 'house',
      bedrooms: '',
      bathrooms: '',
      area: '',
      status: 'available'
    });
    setSelectedImages([]);
    setImagePreviews([]);
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

  const handleDeleteProperty = (propertyId) => {
    setProperties(properties.filter(prop => prop.id !== propertyId));
    setShowDeleteConfirm(false);
    setSelectedProperty(null);
  };


  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'High server load detected',
      time: '10 minutes ago'
    },
    {
      id: 2,
      type: 'info',
      message: 'Database backup completed',
      time: '1 hour ago'
    },
    {
      id: 3,
      type: 'success',
      message: 'New user registration spike',
      time: '2 hours ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
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
                  {stat.change} from last week
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* System Alerts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">System Alerts</h3>
        <div className="space-y-3">
          {systemAlerts.map((alert) => (
            <div key={alert.id} className={`flex items-center p-3 rounded-lg ${
              alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
              alert.type === 'error' ? 'bg-red-50 border border-red-200' :
              alert.type === 'success' ? 'bg-green-50 border border-green-200' :
              'bg-blue-50 border border-blue-200'
            }`}>
              <div className="flex-shrink-0">
                {alert.type === 'warning' && <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />}
                {alert.type === 'error' && <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />}
                {alert.type === 'success' && <CheckCircleIcon className="w-5 h-5 text-green-600" />}
                {alert.type === 'info' && <BellIcon className="w-5 h-5 text-blue-600" />}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                <p className="text-xs text-gray-500">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Overview' },
              { id: 'users', name: 'User Management' },
              { id: 'properties', name: 'Property Management' },
              { id: 'approvals', name: 'Property Approvals' },
              { id: 'settings', name: 'System Settings' }
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Recent User Registrations</h4>
                  <div className="space-y-3">
                    {recentUsers.slice(0, 3).map((user) => (
                      <div key={user.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <p className="text-xs text-gray-500 capitalize">{user.role} • {user.joinDate}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {user.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Recent Property Submissions</h4>
                  <div className="space-y-3">
                    {properties.slice(0, 3).map((property) => (
                      <div key={property.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{property.title}</p>
                            <p className="text-sm text-gray-600">{property.owner}</p>
                            <p className="text-xs text-gray-500">{property.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-green-600">{property.price}</p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              property.status === 'approved' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {property.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">User Management</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
                  <UserIcon className="w-4 h-4 mr-2" />
                  Add User
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <UserIcon className="h-6 w-6 text-gray-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.joinDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'properties' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Property Management</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('table')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        viewMode === 'table' 
                          ? 'bg-white text-gray-900 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Table
                    </button>
                    <button
                      onClick={() => setViewMode('cards')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        viewMode === 'cards' 
                          ? 'bg-white text-gray-900 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Cards
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setShowAddPropertyModal(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                    >
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Add Property
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                      Approve All
                    </button>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                      Reject All
                    </button>
                  </div>
                </div>
              </div>

              {viewMode === 'table' ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                          Loading properties...
                        </td>
                      </tr>
                    ) : properties.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                          No properties found
                        </td>
                      </tr>
                    ) : (
                      properties.map((property) => (
                        <tr key={property._id || property.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-12 w-16 flex-shrink-0">
                                {property.images && property.images.length > 0 ? (
                                  <img
                                    src={property.images[0]}
                                    alt={property.title}
                                    className="h-12 w-16 rounded-lg object-cover"
                                    onLoad={() => {
                                      console.log('Table image loaded successfully:', property.images[0]);
                                    }}
                                    onError={(e) => {
                                      console.error('Table image failed to load:', property.images[0], e);
                                      e.target.style.display = 'none';
                                      e.target.nextSibling.style.display = 'flex';
                                    }}
                                  />
                                ) : null}
                                <div 
                                  className={`h-12 w-16 rounded-lg bg-gray-300 flex items-center justify-center ${property.images && property.images.length > 0 ? 'hidden' : 'flex'}`}
                                >
                                  <HomeIcon className="h-6 w-6 text-gray-600" />
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{property.title}</div>
                                <div className="text-sm text-gray-500">
                                  {typeof property.location === 'string' ? property.location : property.location?.city || 'N/A'}
                                </div>
                                {property.images && property.images.length > 0 && (
                                  <div className="text-xs text-gray-400">
                                    {property.images.length} image{property.images.length > 1 ? 's' : ''}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {property.owner || 'Admin'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                            {property.type || 'house'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            FCFA {property.price?.toLocaleString() || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              property.status === 'approved' 
                                ? 'bg-green-100 text-green-800' 
                                : property.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : property.status === 'available'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {property.status || 'pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleApproveProperty(property._id || property.id)}
                              className="text-green-600 hover:text-green-900"
                              title="Approve"
                            >
                              <CheckCircleIcon className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleRejectProperty(property._id || property.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Reject"
                            >
                              <ExclamationTriangleIcon className="w-4 h-4" />
                            </button>
                            <button 
                              className="text-blue-600 hover:text-blue-900"
                              title="View"
                            >
                              <EyeIcon className="w-4 h-4" />
                            </button>
                            <button 
                              className="text-gray-600 hover:text-gray-900"
                              title="Edit"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedProperty(property);
                                setShowDeleteConfirm(true);
                              }}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {loading ? (
                    <div className="col-span-full text-center text-gray-500 py-8">
                      Loading properties...
                    </div>
                  ) : properties.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500 py-8">
                      No properties found
                    </div>
                  ) : (
                    properties.map((property) => (
                      <div key={property._id || property.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-48 bg-gray-200">
                          {property.images && property.images.length > 0 ? (
                            <img
                              src={property.images[0]}
                              alt={property.title}
                              className="w-full h-full object-cover"
                              onLoad={() => {
                                console.log('Image loaded successfully:', property.images[0]);
                              }}
                              onError={(e) => {
                                console.error('Image failed to load:', property.images[0], e);
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div 
                            className={`w-full h-full flex items-center justify-center ${property.images && property.images.length > 0 ? 'hidden' : 'flex'}`}
                          >
                            <HomeIcon className="h-12 w-12 text-gray-400" />
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-medium text-gray-900 truncate">{property.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              property.status === 'approved' 
                                ? 'bg-green-100 text-green-800' 
                                : property.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : property.status === 'available'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {property.status || 'pending'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {typeof property.location === 'string' ? property.location : property.location?.city || 'N/A'}
                          </p>
                          <p className="text-lg font-semibold text-green-600 mb-3">
                            FCFA {property.price?.toLocaleString() || 'N/A'}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <span className="capitalize">{property.type || 'house'}</span>
                            <span>{property.bedrooms || 0} beds • {property.bathrooms || 0} baths</span>
                          </div>
                          {property.images && property.images.length > 0 && (
                            <div className="text-xs text-gray-400 mb-3">
                              {property.images.length} image{property.images.length > 1 ? 's' : ''}
                            </div>
                          )}
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleApproveProperty(property._id || property.id)}
                              className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 text-sm"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => handleRejectProperty(property._id || property.id)}
                              className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 text-sm"
                            >
                              Reject
                            </button>
                            <button 
                              className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
                              title="View"
                            >
                              <EyeIcon className="w-4 h-4" />
                            </button>
                            <button 
                              className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
                              title="Edit"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedProperty(property);
                                setShowDeleteConfirm(true);
                              }}
                              className="px-3 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 text-sm"
                              title="Delete"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'approvals' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Property Approvals</h3>
                <button
                  onClick={loadPendingProperties}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                >
                  <EyeIcon className="w-4 h-4 mr-2" />
                  Refresh
                </button>
              </div>

              {pendingLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="text-gray-500">Loading pending properties...</div>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                  {error}
                </div>
              ) : pendingProperties.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircleIcon className="mx-auto h-12 w-12 text-green-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No pending approvals</h3>
                  <p className="mt-1 text-sm text-gray-500">All properties have been reviewed.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingProperties.map((property) => (
                    <div key={property._id || property.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div className="h-20 w-20 flex-shrink-0">
                              {property.images && property.images.length > 0 ? (
                                <img
                                  src={Array.isArray(property.images) ? property.images[0] : property.images.split(' ')[0]}
                                  alt={property.title}
                                  className="h-20 w-20 rounded-lg object-cover"
                                />
                              ) : (
                                <div className="h-20 w-20 rounded-lg bg-gray-200 flex items-center justify-center">
                                  <HomeIcon className="h-8 w-8 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-medium text-gray-900">{property.title}</h4>
                              <p className="text-sm text-gray-600">
                                {typeof property.location === 'string' 
                                  ? property.location 
                                  : `${property.location?.address || ''}, ${property.location?.city || ''}`.replace(/^,\s*|,\s*$/g, '')
                                }
                              </p>
                              <p className="text-lg font-semibold text-green-600">
                                FCFA {property.price?.toLocaleString() || 'N/A'}
                              </p>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                <span>{property.bedrooms || 0} beds</span>
                                <span>{property.bathrooms || 0} baths</span>
                                <span>{property.area || 0} sq ft</span>
                                <span className="capitalize">{property.type}</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-2">{property.description}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2 ml-4">
                          <button
                            onClick={() => handleApproveProperty(property._id || property.id)}
                            disabled={loading}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center"
                          >
                            <CheckCircleIcon className="w-4 h-4 mr-2" />
                            Approve
                          </button>
                          <button
                            onClick={() => openRejectModal(property)}
                            disabled={loading}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center"
                          >
                            <XMarkIcon className="w-4 h-4 mr-2" />
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">System Settings</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">General Settings</h4>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="site-name" className="block text-sm font-medium text-gray-700">Site Name</label>
                      <input id="site-name" type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" defaultValue="Ivorian Realty" />
                    </div>
                    <div>
                      <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700">Admin Email</label>
                      <input id="admin-email" type="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" defaultValue="admin@ivorianrealty.com" />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Security Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input id="two-factor" type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
                      <label htmlFor="two-factor" className="ml-2 text-sm text-gray-700">Enable two-factor authentication</label>
                    </div>
                    <div className="flex items-center">
                      <input id="email-verification" type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
                      <label htmlFor="email-verification" className="ml-2 text-sm text-gray-700">Require email verification</label>
                    </div>
                    <div className="flex items-center">
                      <input id="maintenance-mode" type="checkbox" className="h-4 w-4 text-blue-600" />
                      <label htmlFor="maintenance-mode" className="ml-2 text-sm text-gray-700">Enable maintenance mode</label>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <PlusIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Add New Property</h3>
                  <p className="text-sm text-gray-500">Fill in the details to add a new property listing</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowAddPropertyModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6">
              <form onSubmit={handleAddProperty} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                    {error}
                  </div>
                )}
                
                {/* Basic Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <HomeIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Basic Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label htmlFor="property-title" className="block text-sm font-medium text-gray-700 mb-2">
                        Property Title *
                      </label>
                      <input
                        id="property-title"
                        type="text"
                        value={newProperty.title}
                        onChange={(e) => setNewProperty({...newProperty, title: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                        placeholder="e.g., Modern Family Home in Abidjan"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="property-type" className="block text-sm font-medium text-gray-700 mb-2">
                        Property Type *
                      </label>
                      <select
                        id="property-type"
                        value={newProperty.type}
                        onChange={(e) => setNewProperty({...newProperty, type: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                        required
                      >
                        <option value="">Select property type</option>
                        <option value="House">House</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Land">Land</option>
                        <option value="Villa">Villa</option>
                        <option value="Office">Office</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="property-price" className="block text-sm font-medium text-gray-700 mb-2">
                        Price *
                      </label>
                      <input
                        id="property-price"
                        type="text"
                        value={newProperty.price}
                        onChange={(e) => setNewProperty({...newProperty, price: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                        placeholder="FCFA 0"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Location & Description */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Location & Description
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="property-location" className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>
                      <input
                        id="property-location"
                        type="text"
                        value={newProperty.location}
                        onChange={(e) => setNewProperty({...newProperty, location: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                        placeholder="e.g., Abidjan, Côte d'Ivoire"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="property-description" className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        id="property-description"
                        value={newProperty.description}
                        onChange={(e) => setNewProperty({...newProperty, description: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                        rows={4}
                        placeholder="Describe the property features, amenities, and unique selling points..."
                      />
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Property Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="property-bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
                        Bedrooms
                      </label>
                      <input
                        id="property-bedrooms"
                        type="number"
                        min="0"
                        value={newProperty.bedrooms}
                        onChange={(e) => setNewProperty({...newProperty, bedrooms: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label htmlFor="property-bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
                        Bathrooms
                      </label>
                      <input
                        id="property-bathrooms"
                        type="number"
                        min="0"
                        value={newProperty.bathrooms}
                        onChange={(e) => setNewProperty({...newProperty, bathrooms: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label htmlFor="property-area" className="block text-sm font-medium text-gray-700 mb-2">
                        Area
                      </label>
                      <input
                        id="property-area"
                        type="text"
                        value={newProperty.area}
                        onChange={(e) => setNewProperty({...newProperty, area: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                        placeholder="e.g., 250 sqm"
                      />
                    </div>
                  </div>
                </div>

                {/* Image Upload Section */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Property Photos <span className="text-red-500">*</span>
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
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

                {/* Status */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <CheckCircleIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Property Status
                  </h4>
                  <div>
                    <label htmlFor="property-status" className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      id="property-status"
                      value={newProperty.status}
                      onChange={(e) => setNewProperty({...newProperty, status: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="sold">Sold</option>
                      <option value="rented">Rented</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddPropertyModal(false);
                      resetForm();
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    {loading ? 'Adding Property...' : 'Add Property'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedProperty && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-lg font-medium text-gray-900">Delete Property</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete &quot;{selectedProperty.title}&quot;? This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex justify-center space-x-3 mt-6">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteProperty(selectedProperty.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Property Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Reject Property</h3>
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Rejecting: <span className="font-medium">{propertyToReject?.title}</span>
                </p>
                <label htmlFor="rejection-reason" className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for rejection *
                </label>
                <textarea
                  id="rejection-reason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please provide a reason for rejecting this property..."
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectionReason('');
                    setPropertyToReject(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRejectProperty}
                  disabled={loading || !rejectionReason.trim()}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? 'Rejecting...' : 'Reject Property'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

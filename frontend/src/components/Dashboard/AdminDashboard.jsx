import { useState } from 'react';
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
  HomeIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [newProperty, setNewProperty] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    status: 'active'
  });

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

  const [properties, setProperties] = useState([
    {
      id: 1,
      title: 'Modern Family Home',
      owner: 'John Doe',
      status: 'pending',
      price: 'FCFA 45,000,000',
      date: '2 hours ago',
      type: 'House',
      bedrooms: 4,
      bathrooms: 3,
      area: '250 sqm',
      location: 'Abidjan, Côte d\'Ivoire'
    },
    {
      id: 2,
      title: 'Luxury Apartment',
      owner: 'Jane Smith',
      status: 'approved',
      price: 'FCFA 25,000,000',
      date: '5 hours ago',
      type: 'Apartment',
      bedrooms: 2,
      bathrooms: 2,
      area: '120 sqm',
      location: 'Yamoussoukro, Côte d\'Ivoire'
    },
    {
      id: 3,
      title: 'Commercial Office Space',
      owner: 'Mike Johnson',
      status: 'active',
      price: 'FCFA 15,000,000',
      date: '1 day ago',
      type: 'Commercial',
      bedrooms: 0,
      bathrooms: 2,
      area: '500 sqm',
      location: 'San-Pédro, Côte d\'Ivoire'
    }
  ]);

  const handleAddProperty = () => {
    if (newProperty.title && newProperty.price && newProperty.location) {
      const property = {
        id: Date.now(),
        ...newProperty,
        owner: 'Admin',
        date: 'Just now'
      };
      setProperties([...properties, property]);
      setNewProperty({
        title: '',
        description: '',
        price: '',
        location: '',
        type: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        status: 'active'
      });
      setShowAddPropertyModal(false);
    }
  };

  const handleDeleteProperty = (propertyId) => {
    setProperties(properties.filter(prop => prop.id !== propertyId));
    setShowDeleteConfirm(false);
    setSelectedProperty(null);
  };

  const handleApproveProperty = (propertyId) => {
    setProperties(properties.map(prop => 
      prop.id === propertyId ? { ...prop, status: 'approved' } : prop
    ));
  };

  const handleRejectProperty = (propertyId) => {
    setProperties(properties.map(prop => 
      prop.id === propertyId ? { ...prop, status: 'rejected' } : prop
    ));
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
                    {properties.map((property) => (
                      <tr key={property.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="h-10 w-10 rounded-lg bg-gray-300 flex items-center justify-center">
                                <HomeIcon className="h-6 w-6 text-gray-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{property.title}</div>
                              <div className="text-sm text-gray-500">{property.location}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{property.owner}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{property.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{property.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            property.status === 'approved' 
                              ? 'bg-green-100 text-green-800' 
                              : property.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {property.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleApproveProperty(property.id)}
                              className="text-green-600 hover:text-green-900"
                              title="Approve"
                            >
                              <CheckCircleIcon className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleRejectProperty(property.id)}
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
                    ))}
                  </tbody>
                </table>
              </div>
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
                onClick={() => setShowAddPropertyModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6">
              <form onSubmit={(e) => { e.preventDefault(); handleAddProperty(); }} className="space-y-6">
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
                    onClick={() => setShowAddPropertyModal(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center"
                  >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add Property
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
    </div>
  );
};

export default AdminDashboard;

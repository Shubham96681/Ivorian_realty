import { useState } from 'react';
import { 
  PlusIcon, 
  EyeIcon, 
  PencilIcon, 
  TrashIcon,
  ChartBarIcon,
  BellIcon
} from '@heroicons/react/24/outline';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const properties = [
    {
      id: 1,
      title: 'Modern Family Home',
      location: 'Abidjan, Côte d\'Ivoire',
      price: 'FCFA 45,000,000',
      status: 'Active',
      views: 156,
      inquiries: 8,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80'
    },
    {
      id: 2,
      title: 'Luxury Apartment',
      location: 'Yamoussoukro, Côte d\'Ivoire',
      price: 'FCFA 25,000,000',
      status: 'Pending',
      views: 89,
      inquiries: 3,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80'
    }
  ];

  const stats = [
    { name: 'Total Properties', value: '12', change: '+2', changeType: 'positive' },
    { name: 'Active Listings', value: '8', change: '+1', changeType: 'positive' },
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
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
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
                    {properties.slice(0, 2).map((property) => (
                      <div key={property.id} className="bg-gray-50 rounded-lg p-4">
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
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add Property
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {properties.map((property) => (
                  <div key={property.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="h-48 bg-gray-200">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-900">{property.title}</h4>
                      <p className="text-sm text-gray-600">{property.location}</p>
                      <p className="text-lg font-semibold text-green-600">{property.price}</p>
                      <div className="flex justify-between items-center mt-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          property.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {property.status}
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
                        <span>{property.views} views</span>
                        <span>{property.inquiries} inquiries</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
    </div>
  );
};

export default SellerDashboard;

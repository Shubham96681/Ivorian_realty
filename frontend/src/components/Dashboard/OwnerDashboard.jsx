import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusIcon, 
  HomeIcon, 
  BellIcon,
  CurrencyDollarIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const OwnerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalViews: 0,
    totalInquiries: 0,
    monthlyRevenue: 0
  });

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setProperties([
      { 
        id: 1, 
        title: 'Modern 3BR Apartment', 
        location: 'Downtown', 
        price: '$520,000',
        status: 'Active',
        views: 45,
        inquiries: 3,
        image: '/api/placeholder/300/200'
      },
      { 
        id: 2, 
        title: 'Family House with Garden', 
        location: 'Suburbs', 
        price: '$780,000',
        status: 'Pending',
        views: 32,
        inquiries: 1,
        image: '/api/placeholder/300/200'
      }
    ]);

    setMessages([
      { id: 1, property: 'Modern 3BR Apartment', sender: 'John Doe', message: 'Interested in viewing this property', time: '2 hours ago' },
      { id: 2, property: 'Family House with Garden', sender: 'Jane Smith', message: 'What are the property taxes?', time: '1 day ago' }
    ]);

    setStats({
      totalProperties: 2,
      totalViews: 77,
      totalInquiries: 4,
      monthlyRevenue: 0
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Property Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Property Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <HomeIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-600">Total Properties</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalProperties}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <EyeIcon className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-green-600">Total Views</p>
                <p className="text-2xl font-bold text-green-900">{stats.totalViews}</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center">
              <BellIcon className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-purple-600">Inquiries</p>
                <p className="text-2xl font-bold text-purple-900">{stats.totalInquiries}</p>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-8 w-8 text-orange-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-orange-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-orange-900">${stats.monthlyRevenue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/list-property"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center">
            <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
              <PlusIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">List Property</h4>
              <p className="text-sm text-gray-500">Add a new property listing</p>
            </div>
          </div>
        </Link>

        <Link
          to="/my-properties"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
              <HomeIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">My Properties</h4>
              <p className="text-sm text-gray-500">{properties.length} properties listed</p>
            </div>
          </div>
        </Link>

        <Link
          to="/messages"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center">
            <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
              <BellIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Messages</h4>
              <p className="text-sm text-gray-500">{messages.length} new messages</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Messages</h3>
          <Link to="/messages" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="space-y-3">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
              <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400 mr-3 mt-1" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{message.sender}</p>
                  <span className="text-sm text-gray-400">{message.time}</span>
                </div>
                <p className="text-sm text-gray-600">{message.property}</p>
                <p className="text-sm text-gray-500 mt-1">{message.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Properties */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">My Properties</h3>
          <Link to="/my-properties" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
            Manage All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {properties.map((property) => (
            <div key={property.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="h-32 bg-gray-200 rounded-lg mb-3"></div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{property.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  property.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {property.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-2">{property.location}</p>
              <p className="text-lg font-bold text-blue-600 mb-3">{property.price}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <EyeIcon className="h-4 w-4 mr-1" />
                  {property.views} views
                </div>
                <div className="flex items-center">
                  <HeartIcon className="h-4 w-4 mr-1" />
                  {property.inquiries} inquiries
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Property Performance */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Property Performance</h3>
        <div className="text-center py-8">
          <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Property performance analytics coming soon</p>
          <p className="text-sm text-gray-400 mt-2">
            Track views, inquiries, and conversion rates for your listings
          </p>
        </div>
      </div>

      {/* Property Owner Tips */}
      <div className="bg-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-purple-900 mb-2">Property Owner Tips</h3>
        <ul className="text-purple-800 space-y-1">
          <li>• Take high-quality photos of your property</li>
          <li>• Set competitive pricing based on market research</li>
          <li>• Respond quickly to inquiries from potential buyers/tenants</li>
          <li>• Keep your property information up to date</li>
        </ul>
      </div>
    </div>
  );
};

export default OwnerDashboard;

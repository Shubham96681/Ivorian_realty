import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusIcon, 
  HomeIcon, 
  UserIcon,
  CurrencyDollarIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

const AgentDashboard = () => {
  const [listings, setListings] = useState([]);
  const [clients, setClients] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({
    totalListings: 0,
    activeClients: 0,
    totalViews: 0,
    monthlyCommission: 0
  });

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setListings([
      { 
        id: 1, 
        title: 'Luxury Penthouse', 
        location: 'Downtown', 
        price: '$1,200,000',
        status: 'Active',
        views: 89,
        inquiries: 7,
        client: 'John Smith',
        image: '/api/placeholder/300/200'
      },
      { 
        id: 2, 
        title: 'Modern Family Home', 
        location: 'Suburbs', 
        price: '$850,000',
        status: 'Under Contract',
        views: 156,
        inquiries: 12,
        client: 'Sarah Johnson',
        image: '/api/placeholder/300/200'
      }
    ]);

    setClients([
      { id: 1, name: 'John Smith', email: 'john@email.com', phone: '+1 234 567 8900', status: 'Active' },
      { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+1 234 567 8901', status: 'Active' },
      { id: 3, name: 'Mike Davis', email: 'mike@email.com', phone: '+1 234 567 8902', status: 'Prospect' }
    ]);

    setMessages([
      { id: 1, client: 'John Smith', property: 'Luxury Penthouse', message: 'When can we schedule a viewing?', time: '1 hour ago' },
      { id: 2, client: 'Sarah Johnson', property: 'Modern Family Home', message: 'The buyer is interested in making an offer', time: '3 hours ago' }
    ]);

    setStats({
      totalListings: 2,
      activeClients: 3,
      totalViews: 245,
      monthlyCommission: 12500
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Agent Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Agent Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <HomeIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-600">Active Listings</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalListings}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <UsersIcon className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-green-600">Active Clients</p>
                <p className="text-2xl font-bold text-green-900">{stats.activeClients}</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center">
              <EyeIcon className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-purple-600">Total Views</p>
                <p className="text-2xl font-bold text-purple-900">{stats.totalViews}</p>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-8 w-8 text-orange-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-orange-600">Monthly Commission</p>
                <p className="text-2xl font-bold text-orange-900">${stats.monthlyCommission.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/add-property"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center">
            <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
              <PlusIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Add Property</h4>
              <p className="text-sm text-gray-500">Create new listing</p>
            </div>
          </div>
        </Link>

        <Link
          to="/my-listings"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
              <HomeIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">My Listings</h4>
              <p className="text-sm text-gray-500">{listings.length} active listings</p>
            </div>
          </div>
        </Link>

        <Link
          to="/clients"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center">
            <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
              <UserIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">My Clients</h4>
              <p className="text-sm text-gray-500">{clients.length} total clients</p>
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
                  <p className="font-medium text-gray-900">{message.client}</p>
                  <span className="text-sm text-gray-400">{message.time}</span>
                </div>
                <p className="text-sm text-gray-600">{message.property}</p>
                <p className="text-sm text-gray-500 mt-1">{message.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Listings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">My Listings</h3>
          <Link to="/my-listings" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
            Manage All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {listings.map((listing) => (
            <div key={listing.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="h-32 bg-gray-200 rounded-lg mb-3"></div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{listing.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  listing.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {listing.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-1">{listing.location}</p>
              <p className="text-sm text-gray-600 mb-2">Client: {listing.client}</p>
              <p className="text-lg font-bold text-blue-600 mb-3">{listing.price}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <EyeIcon className="h-4 w-4 mr-1" />
                  {listing.views} views
                </div>
                <div className="flex items-center">
                  <HeartIcon className="h-4 w-4 mr-1" />
                  {listing.inquiries} inquiries
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Client Management */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">My Clients</h3>
          <Link to="/clients" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
            Manage All
          </Link>
        </div>
        <div className="space-y-3">
          {clients.map((client) => (
            <div key={client.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <UserIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{client.name}</p>
                  <p className="text-sm text-gray-500">{client.email}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  client.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {client.status}
                </span>
                <p className="text-sm text-gray-500 mt-1">{client.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Analytics */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Analytics</h3>
        <div className="text-center py-8">
          <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Performance analytics coming soon</p>
          <p className="text-sm text-gray-400 mt-2">
            Track your sales performance, client satisfaction, and market trends
          </p>
        </div>
      </div>

      {/* Agent Tips */}
      <div className="bg-indigo-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-indigo-900 mb-2">Real Estate Agent Tips</h3>
        <ul className="text-indigo-800 space-y-1">
          <li>• Build strong relationships with your clients</li>
          <li>• Stay updated with market trends and pricing</li>
          <li>• Use professional photography for your listings</li>
          <li>• Leverage social media for marketing</li>
          <li>• Respond quickly to client inquiries</li>
        </ul>
      </div>
    </div>
  );
};

export default AgentDashboard;

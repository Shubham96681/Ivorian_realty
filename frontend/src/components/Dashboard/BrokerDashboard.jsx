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
  UsersIcon,
  CogIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const BrokerDashboard = () => {
  const [listings, setListings] = useState([]);
  const [agents, setAgents] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({
    totalListings: 0,
    totalAgents: 0,
    totalClients: 0,
    monthlyRevenue: 0
  });

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setListings([
      { 
        id: 1, 
        title: 'Commercial Office Space', 
        location: 'Business District', 
        price: '$2,500,000',
        status: 'Active',
        views: 156,
        inquiries: 8,
        agent: 'Sarah Wilson',
        image: '/api/placeholder/300/200'
      },
      { 
        id: 2, 
        title: 'Luxury Residential Complex', 
        location: 'Uptown', 
        price: '$5,000,000',
        status: 'Under Contract',
        views: 234,
        inquiries: 15,
        agent: 'Mike Johnson',
        image: '/api/placeholder/300/200'
      }
    ]);

    setAgents([
      { id: 1, name: 'Sarah Wilson', email: 'sarah@brokerage.com', phone: '+1 234 567 8900', listings: 12, status: 'Active' },
      { id: 2, name: 'Mike Johnson', email: 'mike@brokerage.com', phone: '+1 234 567 8901', listings: 8, status: 'Active' },
      { id: 3, name: 'Lisa Brown', email: 'lisa@brokerage.com', phone: '+1 234 567 8902', listings: 5, status: 'Active' }
    ]);


    setMessages([
      { id: 1, sender: 'Sarah Wilson', subject: 'New listing inquiry', message: 'Client interested in commercial property', time: '2 hours ago' },
      { id: 2, sender: 'Mike Johnson', subject: 'Contract update', message: 'Luxury complex deal progressing well', time: '4 hours ago' }
    ]);

    setStats({
      totalListings: 25,
      totalAgents: 3,
      totalClients: 0,
      monthlyRevenue: 45000
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Broker Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Brokerage Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <HomeIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-600">Total Listings</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalListings}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <UsersIcon className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-green-600">Active Agents</p>
                <p className="text-2xl font-bold text-green-900">{stats.totalAgents}</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center">
              <BuildingOfficeIcon className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-purple-600">Total Clients</p>
                <p className="text-2xl font-bold text-purple-900">{stats.totalClients}</p>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-8 w-8 text-orange-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-orange-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-orange-900">${stats.monthlyRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <h4 className="text-lg font-medium text-gray-900">All Listings</h4>
              <p className="text-sm text-gray-500">{listings.length} total listings</p>
            </div>
          </div>
        </Link>

        <Link
          to="/team"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center">
            <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
              <UserIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Team Management</h4>
              <p className="text-sm text-gray-500">{agents.length} agents</p>
            </div>
          </div>
        </Link>

        <Link
          to="/analytics"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center">
            <div className="h-12 w-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
              <CogIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Analytics</h4>
              <p className="text-sm text-gray-500">Business insights</p>
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
                <p className="text-sm text-gray-600">{message.subject}</p>
                <p className="text-sm text-gray-500 mt-1">{message.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Performance */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Team Performance</h3>
          <Link to="/team" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
            Manage Team
          </Link>
        </div>
        <div className="space-y-3">
          {agents.map((agent) => (
            <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <UserIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{agent.name}</p>
                  <p className="text-sm text-gray-500">{agent.email}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  agent.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {agent.status}
                </span>
                <p className="text-sm text-gray-500 mt-1">{agent.listings} listings</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Listings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Listings</h3>
          <Link to="/my-listings" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
            View All
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
              <p className="text-sm text-gray-600 mb-2">Agent: {listing.agent}</p>
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

      {/* Business Analytics */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Business Analytics</h3>
        <div className="text-center py-8">
          <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Business analytics coming soon</p>
          <p className="text-sm text-gray-400 mt-2">
            Track team performance, revenue trends, and market insights
          </p>
        </div>
      </div>

      {/* Broker Tips */}
      <div className="bg-teal-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-teal-900 mb-2">Broker Management Tips</h3>
        <ul className="text-teal-800 space-y-1">
          <li>• Monitor your team&apos;s performance and provide training</li>
          <li>• Analyze market data to guide business decisions</li>
          <li>• Maintain compliance with real estate regulations</li>
          <li>• Build strategic partnerships with other professionals</li>
          <li>• Foster a positive company culture</li>
        </ul>
      </div>
    </div>
  );
};

export default BrokerDashboard;

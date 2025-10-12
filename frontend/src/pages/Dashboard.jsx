import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { 
  HomeIcon, 
  UserIcon, 
  HeartIcon, 
  BellIcon,
  CogIcon,
  PlusIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getWelcomeMessage = () => {
    if (!user) return 'Welcome!';
    
    const roleMessages = {
      buyer: 'Ready to find your dream home?',
      tenant: 'Looking for the perfect rental?',
      owner: 'Manage your property listings',
      dealer: 'Help clients find their perfect property',
      builder: 'Showcase your new developments',
      admin: 'Manage the platform'
    };
    
    return roleMessages[user.role] || 'Welcome to your dashboard!';
  };

  const getQuickActions = () => {
    if (!user) return [];

    const actions = {
      buyer: [
        { name: 'Search Properties', href: '/search', icon: MagnifyingGlassIcon, color: 'bg-blue-500' },
        { name: 'Saved Properties', href: '/favorites', icon: HeartIcon, color: 'bg-red-500' },
        { name: 'My Inquiries', href: '/inquiries', icon: BellIcon, color: 'bg-green-500' }
      ],
      tenant: [
        { name: 'Find Rentals', href: '/rental-search', icon: MagnifyingGlassIcon, color: 'bg-blue-500' },
        { name: 'Saved Rentals', href: '/favorites', icon: HeartIcon, color: 'bg-red-500' },
        { name: 'My Applications', href: '/applications', icon: BellIcon, color: 'bg-green-500' }
      ],
      owner: [
        { name: 'List Property', href: '/list-property', icon: PlusIcon, color: 'bg-green-500' },
        { name: 'My Properties', href: '/my-properties', icon: HomeIcon, color: 'bg-blue-500' },
        { name: 'Messages', href: '/messages', icon: BellIcon, color: 'bg-purple-500' }
      ],
      dealer: [
        { name: 'Add Property', href: '/add-property', icon: PlusIcon, color: 'bg-green-500' },
        { name: 'My Listings', href: '/my-listings', icon: HomeIcon, color: 'bg-blue-500' },
        { name: 'Client Messages', href: '/messages', icon: BellIcon, color: 'bg-purple-500' }
      ],
      builder: [
        { name: 'Add Development', href: '/add-development', icon: PlusIcon, color: 'bg-green-500' },
        { name: 'My Projects', href: '/my-projects', icon: HomeIcon, color: 'bg-blue-500' },
        { name: 'Inquiries', href: '/inquiries', icon: BellIcon, color: 'bg-purple-500' }
      ],
      admin: [
        { name: 'Manage Users', href: '/admin/users', icon: UserIcon, color: 'bg-red-500' },
        { name: 'Manage Properties', href: '/admin/properties', icon: HomeIcon, color: 'bg-blue-500' },
        { name: 'System Settings', href: '/admin/settings', icon: CogIcon, color: 'bg-gray-500' }
      ]
    };

    return actions[user.role] || [];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {getWelcomeMessage()}
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                  {user?.role}
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                to="/profile"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <CogIcon className="h-4 w-4 mr-2" />
                Profile Settings
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getQuickActions().map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center">
                  <div className={`h-12 w-12 ${action.color} rounded-lg flex items-center justify-center mr-4`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{action.name}</h4>
                    <p className="text-sm text-gray-500">Click to get started</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="text-center py-8">
            <BellIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No recent activity to show</p>
            <p className="text-sm text-gray-400 mt-2">
              Your recent searches, saved properties, and messages will appear here
            </p>
          </div>
        </div>

        {/* Role-specific Information */}
        {user?.role === 'buyer' && (
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Buying Tips</h3>
            <ul className="text-blue-800 space-y-1">
              <li>• Get pre-approved for a mortgage before house hunting</li>
              <li>• Consider location, schools, and commute times</li>
              <li>• Factor in additional costs like property taxes and maintenance</li>
            </ul>
          </div>
        )}

        {user?.role === 'tenant' && (
          <div className="mt-8 bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-green-900 mb-2">Rental Tips</h3>
            <ul className="text-green-800 space-y-1">
              <li>• Check your credit score before applying</li>
              <li>• Have references and documents ready</li>
              <li>• Read the lease agreement carefully</li>
            </ul>
          </div>
        )}

        {user?.role === 'owner' && (
          <div className="mt-8 bg-purple-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-purple-900 mb-2">Property Owner Tips</h3>
            <ul className="text-purple-800 space-y-1">
              <li>• Take high-quality photos of your property</li>
              <li>• Set competitive pricing based on market research</li>
              <li>• Respond quickly to inquiries from potential buyers/tenants</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

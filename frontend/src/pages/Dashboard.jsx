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

// Import role-specific dashboard components
import BuyerDashboard from '../components/Dashboard/BuyerDashboard';
import SellerDashboard from '../components/Dashboard/SellerDashboard';
import AgentDashboard from '../components/Dashboard/AgentDashboard';
import AdminDashboard from '../components/Dashboard/AdminDashboard';

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
      seller: 'Manage your property listings',
      agent: 'Help clients find their perfect property',
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
      seller: [
        { name: 'List Property', href: '/list-property', icon: PlusIcon, color: 'bg-green-500' },
        { name: 'My Properties', href: '/my-properties', icon: HomeIcon, color: 'bg-blue-500' },
        { name: 'Messages', href: '/messages', icon: BellIcon, color: 'bg-purple-500' }
      ],
      agent: [
        { name: 'Add Property', href: '/add-property', icon: PlusIcon, color: 'bg-green-500' },
        { name: 'My Listings', href: '/my-listings', icon: HomeIcon, color: 'bg-blue-500' },
        { name: 'Client Messages', href: '/messages', icon: BellIcon, color: 'bg-purple-500' }
      ],
      admin: [
        { name: 'Manage Users', href: '/admin/users', icon: UserIcon, color: 'bg-red-500' },
        { name: 'Manage Properties', href: '/admin/properties', icon: HomeIcon, color: 'bg-blue-500' },
        { name: 'System Settings', href: '/admin/settings', icon: CogIcon, color: 'bg-gray-500' }
      ]
    };

    return actions[user.role] || [];
  };

  const renderRoleSpecificDashboard = () => {
    if (!user) return null;

    switch (user.role) {
      case 'buyer':
        return <BuyerDashboard />;
      case 'seller':
        return <SellerDashboard />;
      case 'agent':
        return <AgentDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Welcome to your dashboard!</h3>
            <p className="text-gray-600">Your role-specific dashboard will appear here once your account is fully set up.</p>
          </div>
        );
    }
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

        {/* Role-specific Dashboard */}
        {renderRoleSpecificDashboard()}
      </div>
    </div>
  );
};

export default Dashboard;

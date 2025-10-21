import { useState } from 'react';
import { 
  UserIcon, 
  ChartBarIcon, 
  BellIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

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

  const recentProperties = [
    {
      id: 1,
      title: 'Modern Family Home',
      owner: 'John Doe',
      status: 'pending',
      price: 'FCFA 45,000,000',
      date: '2 hours ago'
    },
    {
      id: 2,
      title: 'Luxury Apartment',
      owner: 'Jane Smith',
      status: 'approved',
      price: 'FCFA 25,000,000',
      date: '5 hours ago'
    }
  ];

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
                    {recentProperties.slice(0, 3).map((property) => (
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
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                    Approve All
                  </button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                    Reject All
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {recentProperties.map((property) => (
                  <div key={property.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{property.title}</h4>
                        <p className="text-sm text-gray-600">Owner: {property.owner}</p>
                        <p className="text-lg font-semibold text-green-600">{property.price}</p>
                        <p className="text-sm text-gray-500">{property.date}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          property.status === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {property.status}
                        </span>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700">
                            Approve
                          </button>
                          <button className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700">
                            Reject
                          </button>
                          <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
    </div>
  );
};

export default AdminDashboard;

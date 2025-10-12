import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  HeartIcon, 
  BellIcon,
  HomeIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  ClockIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const TenantDashboard = () => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [savedRentals, setSavedRentals] = useState([]);
  const [applications, setApplications] = useState([]);
  const [rentalStats, setRentalStats] = useState({
    avgRent: 0,
    totalRentals: 0,
    rentChange: 0
  });

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setRecentSearches([
      { id: 1, location: 'Downtown', type: 'Studio', rent: '$1,200/month', date: '1 day ago' },
      { id: 2, location: 'Midtown', type: '1BR', rent: '$1,500/month', date: '3 days ago' }
    ]);
    
    setSavedRentals([
      { id: 1, title: 'Modern Studio Apartment', location: 'Downtown', rent: '$1,200/month', image: '/api/placeholder/300/200' },
      { id: 2, title: 'Cozy 1BR with Balcony', location: 'Midtown', rent: '$1,500/month', image: '/api/placeholder/300/200' }
    ]);

    setApplications([
      { id: 1, property: 'Modern Studio Apartment', status: 'Under Review', date: '2 days ago' },
      { id: 2, property: 'Cozy 1BR with Balcony', status: 'Approved', date: '1 week ago' }
    ]);

    setRentalStats({
      avgRent: 1400,
      totalRentals: 856,
      rentChange: 3.2
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Rental Market Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Rental Market Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-green-600">Average Rent</p>
                <p className="text-2xl font-bold text-green-900">${rentalStats.avgRent}/month</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <HomeIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-600">Available Rentals</p>
                <p className="text-2xl font-bold text-blue-900">{rentalStats.totalRentals.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-purple-600">Rent Change</p>
                <p className="text-2xl font-bold text-purple-900">+{rentalStats.rentChange}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/rental-search"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
              <MagnifyingGlassIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Find Rentals</h4>
              <p className="text-sm text-gray-500">Search available rentals</p>
            </div>
          </div>
        </Link>

        <Link
          to="/favorites"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center">
            <div className="h-12 w-12 bg-red-500 rounded-lg flex items-center justify-center mr-4">
              <HeartIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Saved Rentals</h4>
              <p className="text-sm text-gray-500">{savedRentals.length} rentals saved</p>
            </div>
          </div>
        </Link>

        <Link
          to="/applications"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center">
            <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
              <DocumentTextIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">My Applications</h4>
              <p className="text-sm text-gray-500">Track application status</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Searches */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Searches</h3>
        <div className="space-y-3">
          {recentSearches.map((search) => (
            <div key={search.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">{search.location} - {search.type}</p>
                  <p className="text-sm text-gray-500">{search.rent}</p>
                </div>
              </div>
              <span className="text-sm text-gray-400">{search.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Application Status */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Application Status</h3>
        <div className="space-y-3">
          {applications.map((application) => (
            <div key={application.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{application.property}</p>
                <p className="text-sm text-gray-500">Applied {application.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                application.status === 'Approved' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {application.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Rentals */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Saved Rentals</h3>
          <Link to="/favorites" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedRentals.map((rental) => (
            <div key={rental.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="h-32 bg-gray-200 rounded-lg mb-3"></div>
              <h4 className="font-medium text-gray-900">{rental.title}</h4>
              <p className="text-sm text-gray-500 flex items-center mt-1">
                <MapPinIcon className="h-4 w-4 mr-1" />
                {rental.location}
              </p>
              <p className="text-lg font-bold text-green-600 mt-2">{rental.rent}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rental Tips */}
      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-green-900 mb-2">Rental Tips</h3>
        <ul className="text-green-800 space-y-1">
          <li>• Check your credit score before applying</li>
          <li>• Have references and documents ready</li>
          <li>• Read the lease agreement carefully</li>
          <li>• Consider location, amenities, and commute</li>
        </ul>
      </div>
    </div>
  );
};

export default TenantDashboard;

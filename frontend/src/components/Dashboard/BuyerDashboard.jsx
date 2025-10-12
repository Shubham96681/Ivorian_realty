import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  HeartIcon, 
  BellIcon,
  HomeIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const BuyerDashboard = () => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);
  const [marketStats, setMarketStats] = useState({
    avgPrice: 0,
    totalListings: 0,
    priceChange: 0
  });

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setRecentSearches([
      { id: 1, location: 'Downtown', type: 'Apartment', price: '$500,000', date: '2 days ago' },
      { id: 2, location: 'Suburbs', type: 'House', price: '$750,000', date: '1 week ago' }
    ]);
    
    setSavedProperties([
      { id: 1, title: 'Modern 3BR Apartment', location: 'Downtown', price: '$520,000', image: '/api/placeholder/300/200' },
      { id: 2, title: 'Family House with Garden', location: 'Suburbs', price: '$780,000', image: '/api/placeholder/300/200' }
    ]);

    setMarketStats({
      avgPrice: 650000,
      totalListings: 1247,
      priceChange: 5.2
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Market Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-600">Average Price</p>
                <p className="text-2xl font-bold text-blue-900">${marketStats.avgPrice.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <HomeIcon className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-green-600">Available Properties</p>
                <p className="text-2xl font-bold text-green-900">{marketStats.totalListings.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-purple-600">Price Change</p>
                <p className="text-2xl font-bold text-purple-900">+{marketStats.priceChange}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/search"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
              <MagnifyingGlassIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Search Properties</h4>
              <p className="text-sm text-gray-500">Find your dream home</p>
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
              <h4 className="text-lg font-medium text-gray-900">Saved Properties</h4>
              <p className="text-sm text-gray-500">{savedProperties.length} properties saved</p>
            </div>
          </div>
        </Link>

        <Link
          to="/inquiries"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center">
            <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
              <BellIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">My Inquiries</h4>
              <p className="text-sm text-gray-500">Track your property inquiries</p>
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
                  <p className="text-sm text-gray-500">{search.price}</p>
                </div>
              </div>
              <span className="text-sm text-gray-400">{search.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Properties */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Saved Properties</h3>
          <Link to="/favorites" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedProperties.map((property) => (
            <div key={property.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="h-32 bg-gray-200 rounded-lg mb-3"></div>
              <h4 className="font-medium text-gray-900">{property.title}</h4>
              <p className="text-sm text-gray-500 flex items-center mt-1">
                <MapPinIcon className="h-4 w-4 mr-1" />
                {property.location}
              </p>
              <p className="text-lg font-bold text-blue-600 mt-2">{property.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Buying Tips */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-2">Buying Tips</h3>
        <ul className="text-blue-800 space-y-1">
          <li>• Get pre-approved for a mortgage before house hunting</li>
          <li>• Consider location, schools, and commute times</li>
          <li>• Factor in additional costs like property taxes and maintenance</li>
          <li>• Work with a qualified real estate agent</li>
        </ul>
      </div>
    </div>
  );
};

export default BuyerDashboard;

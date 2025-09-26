import React, { useState } from 'react';
import { HomeIcon, MapPinIcon, CurrencyDollarIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const HomeValuesSearch = () => {
  const [searchAddress, setSearchAddress] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Home Values Search</h1>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Get instant home value estimates and market insights. 
              Discover what your property is worth in today&apos;s market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Free Estimate
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                View Market Trends
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <MapPinIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
              <input
                type="text"
                placeholder="Enter your home address"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                className="w-full pl-10 pr-4 py-4 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
            </div>
            <button className="w-full mt-4 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg">
              Get Home Value Estimate
            </button>
          </div>
        </div>

        {/* Sample Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <ChartBarIcon className="h-6 w-6 mr-2 text-blue-500" />
              Estimated Value
            </h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">$485,000</div>
            <p className="text-gray-600 mb-4">Based on recent sales and market data</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Price per sq ft:</span>
                <span className="font-semibold">$285</span>
              </div>
              <div className="flex justify-between">
                <span>Market trend:</span>
                <span className="font-semibold text-green-600">+5.2%</span>
              </div>
              <div className="flex justify-between">
                <span>Last updated:</span>
                <span className="font-semibold">Today</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Market Insights</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">Recent Sales</h4>
                <p className="text-sm text-gray-600">3 similar homes sold in the last 6 months</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">Price Range</h4>
                <p className="text-sm text-gray-600">$450K - $520K based on comparable sales</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold">Market Status</h4>
                <p className="text-sm text-gray-600">Active market with moderate competition</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <CurrencyDollarIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Accurate Estimates</h3>
            <p className="text-gray-600">Get precise home value estimates using advanced algorithms</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <ChartBarIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Market Trends</h3>
            <p className="text-gray-600">Track market trends and neighborhood insights</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <HomeIcon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Property Details</h3>
            <p className="text-gray-600">Comprehensive property information and history</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeValuesSearch;

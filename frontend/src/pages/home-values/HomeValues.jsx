import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  HomeIcon,
  ChartBarIcon,
  HeartIcon,
  ShareIcon,
  EyeIcon,
  TrophyIcon,
  GlobeAltIcon,
  CalculatorIcon,
  DocumentTextIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const HomeValues = () => {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showValuationForm, setShowValuationForm] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [favorites, setFavorites] = useState(new Set());

  const handleSearchValues = () => {
    setShowSearchResults(true);
    // Scroll to search results
    setTimeout(() => {
      document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleGetValuation = () => {
    setShowValuationForm(true);
    // Scroll to valuation form
    setTimeout(() => {
      document.getElementById('valuation-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFilterChange = (filter, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };

  const toggleFavorite = (propertyId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return newFavorites;
    });
  };

  const homeValues = [
    {
      id: 1,
      address: "123 Oak Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      currentValue: 1250000,
      previousValue: 1180000,
      changePercent: 5.9,
      changeDirection: "up",
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1800,
      yearBuilt: 2015,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      description: "Beautiful Victorian home in the heart of San Francisco with modern amenities and historic charm.",
      neighborhood: "Mission District",
      schoolDistrict: "San Francisco Unified",
      walkScore: 92,
      transitScore: 88,
      bikeScore: 95
    },
    {
      id: 2,
      address: "456 Maple Avenue",
      city: "Austin",
      state: "TX",
      zipCode: "78701",
      currentValue: 750000,
      previousValue: 720000,
      changePercent: 4.2,
      changeDirection: "up",
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 2200,
      yearBuilt: 2018,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      description: "Modern single-family home in Austin&apos;s trendy East Side with open floor plan and energy-efficient features.",
      neighborhood: "East Austin",
      schoolDistrict: "Austin Independent School District",
      walkScore: 78,
      transitScore: 65,
      bikeScore: 82
    },
    {
      id: 3,
      address: "789 Pine Street",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      currentValue: 950000,
      previousValue: 980000,
      changePercent: -3.1,
      changeDirection: "down",
      bedrooms: 3,
      bathrooms: 2.5,
      squareFeet: 1950,
      yearBuilt: 2012,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      description: "Contemporary townhouse in Seattle&apos;s Capitol Hill with stunning city views and rooftop deck.",
      neighborhood: "Capitol Hill",
      schoolDistrict: "Seattle Public Schools",
      walkScore: 95,
      transitScore: 90,
      bikeScore: 88
    },
    {
      id: 4,
      address: "321 Elm Drive",
      city: "Denver",
      state: "CO",
      zipCode: "80202",
      currentValue: 650000,
      previousValue: 620000,
      changePercent: 4.8,
      changeDirection: "up",
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1600,
      yearBuilt: 2019,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      description: "Chic loft-style condo in Denver&apos;s LoDo district with exposed brick and industrial design elements.",
      neighborhood: "LoDo",
      schoolDistrict: "Denver Public Schools",
      walkScore: 88,
      transitScore: 85,
      bikeScore: 90
    },
    {
      id: 5,
      address: "654 Cedar Lane",
      city: "Portland",
      state: "OR",
      zipCode: "97201",
      currentValue: 580000,
      previousValue: 560000,
      changePercent: 3.6,
      changeDirection: "up",
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1750,
      yearBuilt: 2016,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      description: "Sustainable home in Portland&apos;s Pearl District with green building features and urban garden.",
      neighborhood: "Pearl District",
      schoolDistrict: "Portland Public Schools",
      walkScore: 90,
      transitScore: 82,
      bikeScore: 95
    },
    {
      id: 6,
      address: "987 Birch Boulevard",
      city: "Miami",
      state: "FL",
      zipCode: "33101",
      currentValue: 850000,
      previousValue: 820000,
      changePercent: 3.7,
      changeDirection: "up",
      bedrooms: 3,
      bathrooms: 3,
      squareFeet: 2100,
      yearBuilt: 2017,
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      description: "Luxury waterfront home in Miami&apos;s Brickell area with private dock and panoramic bay views.",
      neighborhood: "Brickell",
      schoolDistrict: "Miami-Dade County Public Schools",
      walkScore: 85,
      transitScore: 75,
      bikeScore: 80
    }
  ];

  const marketStats = [
    { label: 'Average Home Value', value: '$750,000', icon: HomeIcon, color: 'blue', change: '+5.2%' },
    { label: 'Properties Tracked', value: '2.5M+', icon: ChartBarIcon, color: 'green', change: '+12%' },
    { label: 'Market Accuracy', value: '98.5%', icon: TrophyIcon, color: 'purple', change: '+0.3%' },
    { label: 'Active Markets', value: '500+', icon: GlobeAltIcon, color: 'orange', change: '+8%' }
  ];

  const topMarkets = [
    { city: 'San Francisco', state: 'CA', avgValue: '$1,250,000', change: '+8.5%', trend: 'up' },
    { city: 'Seattle', state: 'WA', avgValue: '$850,000', change: '+6.2%', trend: 'up' },
    { city: 'Austin', state: 'TX', avgValue: '$650,000', change: '+4.8%', trend: 'up' },
    { city: 'Denver', state: 'CO', avgValue: '$580,000', change: '+3.9%', trend: 'up' },
    { city: 'Portland', state: 'OR', avgValue: '$520,000', change: '+2.1%', trend: 'up' },
    { city: 'Miami', state: 'FL', avgValue: '$480,000', change: '-1.2%', trend: 'down' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-purple-100">
              Home Values
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Discover the current market value of any property. Get accurate home valuations, market trends, and neighborhood insights to make informed real estate decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleSearchValues}
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Search Home Values
              </button>
              <button
                onClick={handleGetValuation}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200"
              >
                Get Free Valuation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {marketStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`bg-${stat.color}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10`}>
                    <IconComponent className={`h-8 w-8 text-${stat.color}-600 flex-shrink-0 relative z-20`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-gray-600 mb-1">{stat.label}</p>
                  <p className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Markets Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Performing Markets</h2>
            <p className="text-lg text-gray-600">See which markets are leading in home value appreciation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topMarkets.map((market, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{market.city}</h3>
                    <p className="text-gray-600">{market.state}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{market.avgValue}</p>
                    <div className="flex items-center">
                      {market.trend === 'up' ? (
                        <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm font-semibold ${market.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {market.change}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Year over Year</span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search Filters */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Search Home Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={searchFilters.address}
                  onChange={(e) => handleFilterChange('address', e.target.value)}
                  placeholder="Enter street address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={searchFilters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  placeholder="Enter city"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <select
                  id="state"
                  value={searchFilters.state}
                  onChange={(e) => handleFilterChange('state', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select State</option>
                  <option value="CA">California</option>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                  <option value="NY">New York</option>
                  <option value="WA">Washington</option>
                  <option value="CO">Colorado</option>
                  <option value="OR">Oregon</option>
                </select>
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  value={searchFilters.zipCode}
                  onChange={(e) => handleFilterChange('zipCode', e.target.value)}
                  placeholder="Enter ZIP code"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleSearchValues}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                Search Home Values
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Property Values</h2>
            <p className="text-lg text-gray-600">Explore current market values for properties across different markets</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeValues.slice(0, 6).map((property) => (
              <div key={property.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <img
                      src={property.image}
                      alt={property.address}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80';
                      }}
                      loading="lazy"
                    />
                  </div>
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200 z-30"
                  >
                    {favorites.has(property.id) ? (
                      <HeartSolidIcon className="h-5 w-5 text-red-500" />
                    ) : (
                      <HeartIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  <div className="absolute top-4 left-4 z-20">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      property.changeDirection === 'up' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {property.changeDirection === 'up' ? '+' : ''}{property.changePercent}%
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{property.address}</h3>
                    <div className="flex items-center">
                      {property.changeDirection === 'up' ? (
                        <ArrowUpIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        <ArrowDownIcon className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3 flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    {property.city}, {property.state} {property.zipCode}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">
                        ${property.currentValue.toLocaleString()}
                      </span>
                      <p className="text-sm text-gray-500">Current Value</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold text-gray-600">
                        ${property.previousValue.toLocaleString()}
                      </span>
                      <p className="text-sm text-gray-500">Previous Value</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <p className="text-sm text-gray-500">Bedrooms</p>
                      <p className="font-semibold">{property.bedrooms}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bathrooms</p>
                      <p className="font-semibold">{property.bathrooms}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Sq Ft</p>
                      <p className="font-semibold">{property.squareFeet.toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{property.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                        <ShareIcon className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search Results Section */}
      {showSearchResults && (
        <div id="search-results" className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Home Value Search Results</h2>
              <p className="text-lg text-gray-600">Found {homeValues.length} properties matching your search</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {homeValues.map((property) => (
                <div key={property.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <img
                        src={property.image}
                        alt={property.address}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80';
                        }}
                        loading="lazy"
                      />
                    </div>
                    <button
                      onClick={() => toggleFavorite(property.id)}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200 z-30"
                    >
                      {favorites.has(property.id) ? (
                        <HeartSolidIcon className="h-5 w-5 text-red-500" />
                      ) : (
                        <HeartIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        property.changeDirection === 'up' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {property.changeDirection === 'up' ? '+' : ''}{property.changePercent}%
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{property.address}</h3>
                      <div className="flex items-center">
                      {property.changeDirection === 'up' ? (
                        <ArrowUpIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        <ArrowDownIcon className="h-5 w-5 text-red-500" />
                      )}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3 flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      {property.city}, {property.state} {property.zipCode}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">
                          ${property.currentValue.toLocaleString()}
                        </span>
                        <p className="text-sm text-gray-500">Current Value</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-semibold text-gray-600">
                          ${property.previousValue.toLocaleString()}
                        </span>
                        <p className="text-sm text-gray-500">Previous Value</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                          <ShareIcon className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Valuation Form Section */}
      {showValuationForm && (
        <div id="valuation-form" className="bg-blue-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Your Free Home Valuation</h2>
                <p className="text-lg text-gray-600">Get an accurate estimate of your home&apos;s current market value</p>
              </div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="valuationAddress" className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="valuationAddress"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your street address"
                    />
                  </div>
                  <div>
                    <label htmlFor="valuationCity" className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      id="valuationCity"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your city"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="valuationState" className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <select
                      id="valuationState"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select State</option>
                      <option value="CA">California</option>
                      <option value="TX">Texas</option>
                      <option value="FL">Florida</option>
                      <option value="NY">New York</option>
                      <option value="WA">Washington</option>
                      <option value="CO">Colorado</option>
                      <option value="OR">Oregon</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="valuationZip" className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="valuationZip"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your ZIP code"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Bedrooms
                    </label>
                    <select
                      id="bedrooms"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Bedrooms</option>
                      <option value="1">1 Bedroom</option>
                      <option value="2">2 Bedrooms</option>
                      <option value="3">3 Bedrooms</option>
                      <option value="4">4 Bedrooms</option>
                      <option value="5+">5+ Bedrooms</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Bathrooms
                    </label>
                    <select
                      id="bathrooms"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Bathrooms</option>
                      <option value="1">1 Bathroom</option>
                      <option value="1.5">1.5 Bathrooms</option>
                      <option value="2">2 Bathrooms</option>
                      <option value="2.5">2.5 Bathrooms</option>
                      <option value="3">3 Bathrooms</option>
                      <option value="3+">3+ Bathrooms</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="squareFeet" className="block text-sm font-medium text-gray-700 mb-2">
                    Square Footage
                  </label>
                  <input
                    type="number"
                    id="squareFeet"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter square footage"
                  />
                </div>
                <div>
                  <label htmlFor="yearBuilt" className="block text-sm font-medium text-gray-700 mb-2">
                    Year Built
                  </label>
                  <input
                    type="number"
                    id="yearBuilt"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter year built"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowValuationForm(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Get Valuation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Our Home Values</h2>
            <p className="text-xl text-purple-100">Accurate and reliable property valuations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <ChartBarIcon className="h-8 w-8 text-black flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Accurate Data</h3>
              <p className="text-purple-100">98.5% accuracy rate based on real market data</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <ArrowUpIcon className="h-8 w-8 text-black flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Market Trends</h3>
              <p className="text-purple-100">Real-time market analysis and trend predictions</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <CalculatorIcon className="h-8 w-8 text-black flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Free Valuation</h3>
              <p className="text-purple-100">Get instant property valuations at no cost</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <DocumentTextIcon className="h-8 w-8 text-black flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Detailed Reports</h3>
              <p className="text-purple-100">Comprehensive property analysis and insights</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Discover Your Home&apos;s Value?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Get an accurate, free home valuation and see how your property compares to the market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleSearchValues}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Search Home Values
            </button>
            <button
              onClick={handleGetValuation}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200"
            >
              Get Free Valuation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeValues;

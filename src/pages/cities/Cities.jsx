import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  HomeIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  StarIcon,
  HeartIcon,
  ShareIcon,
  EyeIcon,
  CheckIcon,
  UserGroupIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  AcademicCapIcon,
  TrophyIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  UserIcon,
  CalculatorIcon,
  DocumentTextIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon,
  BuildingOffice2Icon,
  ShoppingBagIcon,
  TruckIcon,
  AcademicCapIcon as SchoolIcon,
  HomeIcon as HouseIcon,
  UserGroupIcon as PeopleIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

const Cities = () => {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showCityForm, setShowCityForm] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    city: '',
    state: '',
    priceRange: '',
    propertyType: ''
  });
  const [favorites, setFavorites] = useState(new Set());

  const handleSearchCities = () => {
    setShowSearchResults(true);
    // Scroll to search results
    setTimeout(() => {
      document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAddCity = () => {
    setShowCityForm(true);
    // Scroll to city form
    setTimeout(() => {
      document.getElementById('city-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFilterChange = (filter, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };

  const toggleFavorite = (cityId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(cityId)) {
        newFavorites.delete(cityId);
      } else {
        newFavorites.add(cityId);
      }
      return newFavorites;
    });
  };

  const cities = [
    {
      id: 1,
      name: "San Francisco",
      state: "CA",
      population: "873,965",
      avgHomePrice: 1250000,
      priceChange: 8.5,
      changeDirection: "up",
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      description: "Tech hub with stunning bay views, world-class dining, and vibrant neighborhoods.",
      walkScore: 89,
      transitScore: 80,
      bikeScore: 70,
      jobGrowth: 4.2,
      unemploymentRate: 2.8,
      medianIncome: 126000,
      topNeighborhoods: ["Mission District", "Castro", "Haight-Ashbury", "Marina"],
      topEmployers: ["Google", "Salesforce", "Uber", "Airbnb"],
      climate: "Mediterranean",
      attractions: ["Golden Gate Bridge", "Alcatraz", "Fisherman's Wharf", "Lombard Street"]
    },
    {
      id: 2,
      name: "Austin",
      state: "TX",
      population: "978,908",
      avgHomePrice: 650000,
      priceChange: 4.8,
      changeDirection: "up",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      description: "Live music capital with a thriving tech scene, great food, and no state income tax.",
      walkScore: 45,
      transitScore: 35,
      bikeScore: 55,
      jobGrowth: 3.8,
      unemploymentRate: 3.2,
      medianIncome: 78000,
      topNeighborhoods: ["South Austin", "East Austin", "Downtown", "Zilker"],
      topEmployers: ["Dell", "Apple", "Tesla", "Oracle"],
      climate: "Subtropical",
      attractions: ["South by Southwest", "Austin City Limits", "Barton Springs", "State Capitol"]
    },
    {
      id: 3,
      name: "Seattle",
      state: "WA",
      population: "749,256",
      avgHomePrice: 850000,
      priceChange: 6.2,
      changeDirection: "up",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      description: "Emerald City with coffee culture, tech giants, and stunning natural beauty.",
      walkScore: 75,
      transitScore: 60,
      bikeScore: 65,
      jobGrowth: 3.5,
      unemploymentRate: 3.8,
      medianIncome: 95000,
      topNeighborhoods: ["Capitol Hill", "Fremont", "Ballard", "Queen Anne"],
      topEmployers: ["Amazon", "Microsoft", "Boeing", "Starbucks"],
      climate: "Marine West Coast",
      attractions: ["Space Needle", "Pike Place Market", "Mount Rainier", "Chihuly Garden"]
    },
    {
      id: 4,
      name: "Denver",
      state: "CO",
      population: "715,522",
      avgHomePrice: 580000,
      priceChange: 3.9,
      changeDirection: "up",
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      description: "Mile High City with outdoor recreation, craft breweries, and growing tech scene.",
      walkScore: 60,
      transitScore: 45,
      bikeScore: 70,
      jobGrowth: 2.8,
      unemploymentRate: 3.5,
      medianIncome: 72000,
      topNeighborhoods: ["LoDo", "RiNo", "Capitol Hill", "Highland"],
      topEmployers: ["Lockheed Martin", "Arrow Electronics", "DaVita", "Western Union"],
      climate: "Semi-arid",
      attractions: ["Red Rocks", "Denver Art Museum", "Union Station", "Coors Field"]
    },
    {
      id: 5,
      name: "Portland",
      state: "OR",
      population: "647,805",
      avgHomePrice: 520000,
      priceChange: 2.1,
      changeDirection: "up",
      image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      description: "Keep Portland Weird - a city of food trucks, craft beer, and sustainable living.",
      walkScore: 65,
      transitScore: 50,
      bikeScore: 80,
      jobGrowth: 2.2,
      unemploymentRate: 4.1,
      medianIncome: 68000,
      topNeighborhoods: ["Pearl District", "Alberta Arts", "Hawthorne", "Mississippi"],
      topEmployers: ["Nike", "Intel", "Adidas", "Columbia Sportswear"],
      climate: "Marine West Coast",
      attractions: ["Powell's Books", "Washington Park", "Pittock Mansion", "Japanese Garden"]
    },
    {
      id: 6,
      name: "Miami",
      state: "FL",
      population: "467,963",
      avgHomePrice: 480000,
      priceChange: -1.2,
      changeDirection: "down",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      description: "Magic City with beautiful beaches, vibrant nightlife, and international flair.",
      walkScore: 85,
      transitScore: 40,
      bikeScore: 60,
      jobGrowth: 1.8,
      unemploymentRate: 4.5,
      medianIncome: 45000,
      topNeighborhoods: ["Brickell", "Wynwood", "Coconut Grove", "South Beach"],
      topEmployers: ["Carnival Corporation", "Royal Caribbean", "American Airlines", "FedEx"],
      climate: "Tropical",
      attractions: ["South Beach", "Art Deco District", "Vizcaya", "Wynwood Walls"]
    }
  ];

  const cityStats = [
    { label: 'Cities Tracked', value: '500+', icon: MapPinIcon, color: 'blue', change: '+12%' },
    { label: 'Average Home Price', value: '$650K', icon: HomeIcon, color: 'green', change: '+5.2%' },
    { label: 'Population Growth', value: '3.2%', icon: UserGroupIcon, color: 'purple', change: '+0.8%' },
    { label: 'Job Growth Rate', value: '2.8%', icon: ChartBarIcon, color: 'orange', change: '+1.1%' }
  ];

  const topCities = [
    { name: 'San Francisco', state: 'CA', avgPrice: '$1,250,000', growth: '+8.5%', trend: 'up' },
    { name: 'Seattle', state: 'WA', avgPrice: '$850,000', growth: '+6.2%', trend: 'up' },
    { name: 'Austin', state: 'TX', avgPrice: '$650,000', growth: '+4.8%', trend: 'up' },
    { name: 'Denver', state: 'CO', avgPrice: '$580,000', growth: '+3.9%', trend: 'up' },
    { name: 'Portland', state: 'OR', avgPrice: '$520,000', growth: '+2.1%', trend: 'up' },
    { name: 'Miami', state: 'FL', avgPrice: '$480,000', growth: '-1.2%', trend: 'down' }
  ];

  const propertyTypes = [
    { name: 'Single Family', icon: HouseIcon, count: 1250 },
    { name: 'Condos', icon: BuildingOffice2Icon, count: 890 },
    { name: 'Townhouses', icon: BuildingOfficeIcon, count: 340 },
    { name: 'Multi-Family', icon: PeopleIcon, count: 180 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-purple-100">
              Cities
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Explore the best cities to live, work, and invest in. Discover market trends, demographics, and lifestyle factors that make each city unique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleSearchCities}
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Search Cities
              </button>
              <button
                onClick={handleAddCity}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200"
              >
                Add Your City
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {cityStats.map((stat, index) => {
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

      {/* Top Cities Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Performing Cities</h2>
            <p className="text-lg text-gray-600">See which cities are leading in growth and opportunity</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCities.map((city, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{city.name}</h3>
                    <p className="text-gray-600">{city.state}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{city.avgPrice}</p>
                    <div className="flex items-center">
                      {city.trend === 'up' ? (
                        <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm font-semibold ${city.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {city.growth}
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

      {/* Property Types Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Property Types by City</h2>
            <p className="text-lg text-gray-600">Explore different property types available in each city</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {propertyTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    handleFilterChange('propertyType', type.name);
                    handleSearchCities();
                  }}
                  className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-200 group"
                >
                  <IconComponent className="h-8 w-8 text-gray-600 group-hover:text-blue-600 mx-auto mb-3 flex-shrink-0" />
                  <h3 className="font-semibold text-gray-900 mb-1">{type.name}</h3>
                  <p className="text-sm text-gray-500">{type.count} properties</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search Filters */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Search Cities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City Name
                </label>
                <input
                  type="text"
                  id="city"
                  value={searchFilters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  placeholder="Enter city name"
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
                  <option value="">All States</option>
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
                <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  id="priceRange"
                  value={searchFilters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any Price</option>
                  <option value="under-300k">Under $300K</option>
                  <option value="300k-500k">$300K - $500K</option>
                  <option value="500k-750k">$500K - $750K</option>
                  <option value="750k-1m">$750K - $1M</option>
                  <option value="over-1m">Over $1M</option>
                </select>
              </div>
              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select
                  id="propertyType"
                  value={searchFilters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  <option value="Single Family">Single Family</option>
                  <option value="Condos">Condos</option>
                  <option value="Townhouses">Townhouses</option>
                  <option value="Multi-Family">Multi-Family</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleSearchCities}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                Search Cities
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Cities */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Cities</h2>
            <p className="text-lg text-gray-600">Discover what makes these cities special</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cities.slice(0, 6).map((city) => (
              <div key={city.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80';
                      }}
                      loading="lazy"
                    />
                  </div>
                  <button
                    onClick={() => toggleFavorite(city.id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200 z-30"
                  >
                    {favorites.has(city.id) ? (
                      <HeartSolidIcon className="h-5 w-5 text-red-500" />
                    ) : (
                      <HeartIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  <div className="absolute top-4 left-4 z-20">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      city.changeDirection === 'up' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {city.changeDirection === 'up' ? '+' : ''}{city.priceChange}%
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{city.name}</h3>
                    <div className="flex items-center">
                      {city.changeDirection === 'up' ? (
                        <ArrowUpIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        <ArrowDownIcon className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3 flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    {city.state} • Population: {city.population}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">
                        ${city.avgHomePrice.toLocaleString()}
                      </span>
                      <p className="text-sm text-gray-500">Average Home Price</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold text-gray-600">
                        {city.walkScore}
                      </span>
                      <p className="text-sm text-gray-500">Walk Score</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{city.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Job Growth</p>
                      <p className="font-semibold text-green-600">+{city.jobGrowth}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Unemployment</p>
                      <p className="font-semibold text-gray-600">{city.unemploymentRate}%</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Top Neighborhoods:</h4>
                    <div className="flex flex-wrap gap-2">
                      {city.topNeighborhoods.slice(0, 2).map((neighborhood, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {neighborhood}
                        </span>
                      ))}
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
                      Explore City
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
        <div id="search-results" className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">City Search Results</h2>
              <p className="text-lg text-gray-600">Found {cities.length} cities matching your search</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cities.map((city) => (
                <div key={city.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <img
                        src={city.image}
                        alt={city.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80';
                        }}
                        loading="lazy"
                      />
                    </div>
                    <button
                      onClick={() => toggleFavorite(city.id)}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200 z-30"
                    >
                      {favorites.has(city.id) ? (
                        <HeartSolidIcon className="h-5 w-5 text-red-500" />
                      ) : (
                        <HeartIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        city.changeDirection === 'up' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {city.changeDirection === 'up' ? '+' : ''}{city.priceChange}%
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{city.name}</h3>
                      <div className="flex items-center">
                        {city.changeDirection === 'up' ? (
                          <ArrowUpIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <ArrowDownIcon className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3 flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      {city.state} • Population: {city.population}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">
                          ${city.avgHomePrice.toLocaleString()}
                        </span>
                        <p className="text-sm text-gray-500">Average Home Price</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-semibold text-gray-600">
                          {city.walkScore}
                        </span>
                        <p className="text-sm text-gray-500">Walk Score</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{city.description}</p>
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
                        Explore City
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* City Form Section */}
      {showCityForm && (
        <div id="city-form" className="bg-blue-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Add Your City</h2>
                <p className="text-lg text-gray-600">Help us expand our city database with your local knowledge</p>
              </div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="cityName" className="block text-sm font-medium text-gray-700 mb-2">
                      City Name
                    </label>
                    <input
                      type="text"
                      id="cityName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter city name"
                    />
                  </div>
                  <div>
                    <label htmlFor="cityState" className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <select
                      id="cityState"
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
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="population" className="block text-sm font-medium text-gray-700 mb-2">
                      Population
                    </label>
                    <input
                      type="number"
                      id="population"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter population"
                    />
                  </div>
                  <div>
                    <label htmlFor="avgPrice" className="block text-sm font-medium text-gray-700 mb-2">
                      Average Home Price
                    </label>
                    <input
                      type="number"
                      id="avgPrice"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter average home price"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    City Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe what makes this city special"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowCityForm(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Submit City
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
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Our City Data</h2>
            <p className="text-xl text-purple-100">Comprehensive city information you can trust</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <MapPinIcon className="h-8 w-8 text-black flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Comprehensive Data</h3>
              <p className="text-purple-100">Detailed information on 500+ cities nationwide</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <ChartBarIcon className="h-8 w-8 text-black flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Market Trends</h3>
              <p className="text-purple-100">Real-time market data and growth projections</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <UserGroupIcon className="h-8 w-8 text-black flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Local Insights</h3>
              <p className="text-purple-100">Demographics, lifestyle, and community information</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <TrophyIcon className="h-8 w-8 text-black flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Expert Analysis</h3>
              <p className="text-purple-100">Professional insights and market predictions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Explore Cities?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Discover the perfect city for your lifestyle, career, and investment goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleSearchCities}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Search Cities
            </button>
            <button
              onClick={handleAddCity}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200"
            >
              Add Your City
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cities;

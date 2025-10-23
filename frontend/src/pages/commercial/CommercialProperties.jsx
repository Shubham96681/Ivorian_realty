import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  BuildingOfficeIcon, 
  CurrencyDollarIcon, 
  StarIcon,
  HeartIcon,
  ShareIcon,
  EyeIcon,
  ShoppingBagIcon,
  AcademicCapIcon,
  BuildingOffice2Icon,
  TruckIcon,
  HomeIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

const CommercialProperties = () => {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    size: ''
  });
  const [favorites, setFavorites] = useState(new Set());

  const handleSearchProperties = () => {
    setShowSearchResults(true);
    // Scroll to search results
    setTimeout(() => {
      document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleContactAgent = () => {
    setShowContactForm(true);
    // Scroll to contact form
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
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

  const commercialProperties = [
    {
      id: 1,
      title: "Downtown Office Building",
      location: "123 Business Ave, Downtown",
      price: "$2,500,000",
      size: "15,000 sq ft",
      type: "Office",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      features: ["Parking", "Elevator", "Security", "HVAC"],
      description: "Prime downtown office building with modern amenities and excellent visibility.",
      agent: "Sarah Johnson",
      rating: 4.9,
      yearBuilt: 2018
    },
    {
      id: 2,
      title: "Retail Shopping Center",
      location: "456 Commerce St, Midtown",
      price: "$3,200,000",
      size: "25,000 sq ft",
      type: "Retail",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      features: ["High Traffic", "Parking", "Loading Dock", "Storefront"],
      description: "High-traffic retail center with excellent foot traffic and parking.",
      agent: "Mike Chen",
      rating: 4.8,
      yearBuilt: 2015
    },
    {
      id: 3,
      title: "Industrial Warehouse",
      location: "789 Industrial Blvd, Industrial District",
      price: "$1,800,000",
      size: "50,000 sq ft",
      type: "Industrial",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      features: ["Loading Dock", "High Ceilings", "Office Space", "Security"],
      description: "Large industrial warehouse perfect for manufacturing or distribution.",
      agent: "Lisa Rodriguez",
      rating: 4.7,
      yearBuilt: 2020
    },
    {
      id: 4,
      title: "Medical Office Complex",
      location: "321 Health Plaza, Medical District",
      price: "$4,100,000",
      size: "30,000 sq ft",
      type: "Medical",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      features: ["Medical Grade", "Parking", "Accessibility", "HVAC"],
      description: "Specialized medical office complex with modern healthcare facilities.",
      agent: "David Kim",
      rating: 4.9,
      yearBuilt: 2019
    },
    {
      id: 5,
      title: "Restaurant Space",
      location: "654 Food Court, Entertainment District",
      price: "$850,000",
      size: "3,500 sq ft",
      type: "Restaurant",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      features: ["Kitchen Equipment", "Dining Area", "Parking", "High Visibility"],
      description: "Turnkey restaurant space with full kitchen and dining area.",
      agent: "Maria Garcia",
      rating: 4.6,
      yearBuilt: 2017
    },
    {
      id: 6,
      title: "Mixed-Use Development",
      location: "987 Urban Ave, City Center",
      price: "$5,500,000",
      size: "75,000 sq ft",
      type: "Mixed-Use",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      features: ["Residential", "Commercial", "Parking", "Modern Design"],
      description: "Modern mixed-use development with residential and commercial spaces.",
      agent: "James Wilson",
      rating: 4.8,
      yearBuilt: 2021
    }
  ];

  const propertyTypes = [
    { name: 'Office', icon: BuildingOfficeIcon, count: 45 },
    { name: 'Retail', icon: ShoppingBagIcon, count: 32 },
    { name: 'Industrial', icon: TruckIcon, count: 28 },
    { name: 'Medical', icon: AcademicCapIcon, count: 15 },
    { name: 'Restaurant', icon: HomeIcon, count: 22 },
    { name: 'Mixed-Use', icon: BuildingOffice2Icon, count: 18 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-purple-100">
              Commercial Properties
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Find the perfect commercial space for your business. From office buildings to retail centers, we have the right property for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleSearchProperties}
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Search Properties
              </button>
              <button
                onClick={handleContactAgent}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200"
              >
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <BuildingOfficeIcon className="h-8 w-8 text-blue-600 flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">160+</h3>
              <p className="text-gray-600">Properties</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <CurrencyDollarIcon className="h-8 w-8 text-green-600 flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">$2.5M</h3>
              <p className="text-gray-600">Avg. Price</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <MapPinIcon className="h-8 w-8 text-purple-600 flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">25+</h3>
              <p className="text-gray-600">Locations</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <StarIcon className="h-8 w-8 text-orange-600 flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">4.8</h3>
              <p className="text-gray-600">Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Property Types */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Property Types</h2>
            <p className="text-lg text-gray-600">Explore different types of commercial properties</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {propertyTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    handleFilterChange('propertyType', type.name);
                    handleSearchProperties();
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
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Search Commercial Properties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={searchFilters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  placeholder="Enter city or address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
                  <option value="Office">Office</option>
                  <option value="Retail">Retail</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Medical">Medical</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Mixed-Use">Mixed-Use</option>
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
                  <option value="under-500k">Under $500K</option>
                  <option value="500k-1m">$500K - $1M</option>
                  <option value="1m-2m">$1M - $2M</option>
                  <option value="2m-5m">$2M - $5M</option>
                  <option value="over-5m">Over $5M</option>
                </select>
              </div>
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <select
                  id="size"
                  value={searchFilters.size}
                  onChange={(e) => handleFilterChange('size', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any Size</option>
                  <option value="under-5k">Under 5,000 sq ft</option>
                  <option value="5k-10k">5,000 - 10,000 sq ft</option>
                  <option value="10k-25k">10,000 - 25,000 sq ft</option>
                  <option value="25k-50k">25,000 - 50,000 sq ft</option>
                  <option value="over-50k">Over 50,000 sq ft</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleSearchProperties}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                Search Properties
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Commercial Properties</h2>
            <p className="text-lg text-gray-600">Discover our top commercial real estate listings</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commercialProperties.slice(0, 6).map((property) => (
              <div key={property.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80';
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
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {property.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
                    <div className="flex items-center">
                      <StarSolidIcon className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">{property.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3 flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    {property.location}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">{property.price}</span>
                    <span className="text-gray-600">{property.size}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{property.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.features.map((feature, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <BuildingOfficeIcon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{property.agent}</p>
                        <p className="text-xs text-gray-500">Commercial Agent</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                        <ShareIcon className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                    </div>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Search Results</h2>
              <p className="text-lg text-gray-600">Found {commercialProperties.length} commercial properties</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {commercialProperties.map((property) => (
                <div key={property.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80';
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
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {property.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
                      <div className="flex items-center">
                        <StarSolidIcon className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">{property.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3 flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      {property.location}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-blue-600">{property.price}</span>
                      <span className="text-gray-600">{property.size}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{property.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.features.map((feature, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <BuildingOfficeIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{property.agent}</p>
                          <p className="text-xs text-gray-500">Commercial Agent</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                          <ShareIcon className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Section */}
      {showContactForm && (
        <div id="contact-form" className="bg-blue-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Our Commercial Team</h2>
                <p className="text-lg text-gray-600">Get expert advice on commercial real estate investments</p>
              </div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type Interest
                  </label>
                  <select
                    id="propertyType"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select property type</option>
                    <option value="Office">Office</option>
                    <option value="Retail">Retail</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Medical">Medical</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Mixed-Use">Mixed-Use</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your commercial real estate needs"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Send Message
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
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Our Commercial Services</h2>
            <p className="text-xl text-purple-100">Expert commercial real estate guidance</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <UserGroupIcon className="h-8 w-8 text-blue-950 flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Expert Knowledge</h3>
              <p className="text-purple-100">Deep understanding of commercial real estate markets</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <ShieldCheckIcon className="h-8 w-8  text-blue-950 flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Verified Properties</h3>
              <p className="text-purple-100">All properties are thoroughly vetted and verified</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <BanknotesIcon className="h-8 w-8 text-blue-950 flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Best Deals</h3>
              <p className="text-purple-100">Access to exclusive commercial property deals</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <UserIcon className="h-8 w-8  text-blue-950 flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Customer First</h3>
              <p className="text-purple-100">Your success is our priority</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Commercial Property?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Let our commercial real estate experts help you find the perfect property for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleSearchProperties}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Start Your Search
            </button>
            <button
              onClick={handleContactAgent}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200"
            >
              Contact Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialProperties;

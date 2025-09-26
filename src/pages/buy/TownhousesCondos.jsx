import React, { useState } from 'react';
import { BuildingOfficeIcon, MapPinIcon, CurrencyDollarIcon, HeartIcon, EyeIcon, ShareIcon, StarIcon, TrophyIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const TownhousesCondos = () => {
  const [filters, setFilters] = useState({
    location: '',
    priceRange: '',
    propertyType: ''
  });
  const [favorites, setFavorites] = useState(new Set());
  const [sortBy, setSortBy] = useState('newest');

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
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

  const properties = [
    {
      id: 1,
      title: "Modern Downtown Condo",
      location: "Financial District",
      price: 750000,
      priceDisplay: "$750,000",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      type: "Condo",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      areaDisplay: "1,200 sq ft",
      yearBuilt: 2021,
      features: ["City Views", "Gym", "Concierge", "Parking"]
    },
    {
      id: 2,
      title: "Luxury Townhouse",
      location: "Historic Quarter",
      price: 950000,
      priceDisplay: "$950,000",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
      type: "Townhouse",
      bedrooms: 3,
      bathrooms: 3,
      area: 1800,
      areaDisplay: "1,800 sq ft",
      yearBuilt: 2019,
      features: ["Private Garden", "Rooftop Deck", "Modern Kitchen", "Hardwood Floors"]
    },
    {
      id: 3,
      title: "Contemporary Loft",
      location: "Arts District",
      price: 550000,
      priceDisplay: "$550,000",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      type: "Loft",
      bedrooms: 1,
      bathrooms: 1,
      area: 900,
      areaDisplay: "900 sq ft",
      yearBuilt: 2020,
      features: ["High Ceilings", "Exposed Brick", "Open Floor Plan", "Industrial Design"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Townhouses & Condos for Sale</h1>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Experience urban living at its finest with our curated collection of townhouses and condos. 
              From modern high-rises to charming townhouses, find your perfect urban home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Explore Properties
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                Virtual Tours
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BuildingOfficeIcon className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">1,800+</h3>
            <p className="text-gray-600">Townhouses & Condos</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CurrencyDollarIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">$680K</h3>
            <p className="text-gray-600">Average Price</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPinIcon className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">35+</h3>
            <p className="text-gray-600">Urban Districts</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <StarIcon className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">4.9/5</h3>
            <p className="text-gray-600">Customer Rating</p>
          </div>
        </div>

        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label htmlFor="location-condo" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                id="location-condo"
                type="text"
                placeholder="Enter city or neighborhood"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="price-range-condo" className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select 
                id="price-range-condo" 
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Any Price</option>
                <option value="under-300k">Under $300K</option>
                <option value="300k-600k">$300K - $600K</option>
                <option value="600k-1m">$600K - $1M</option>
                <option value="above-1m">Above $1M</option>
              </select>
            </div>
            <div>
              <label htmlFor="property-type" className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select 
                id="property-type" 
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="townhouse">Townhouse</option>
                <option value="condo">Condo</option>
                <option value="loft">Loft</option>
              </select>
            </div>
            <div>
              <button className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors">
                Search Properties
              </button>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex justify-between items-center border-t pt-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="area">Largest First</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              {properties.length} properties found
            </div>
          </div>
        </div>

        {/* Featured Properties */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative">
                <img src={property.image} alt={property.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button onClick={() => toggleFavorite(property.id)} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                    {favorites.has(property.id) ? (<HeartSolidIcon className="h-5 w-5 text-red-500" />) : (<HeartIcon className="h-5 w-5 text-gray-400" />)}
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                    <ShareIcon className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">For Sale</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors">{property.title}</h3>
                <p className="text-gray-600 mb-3 flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {property.location}
                </p>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-purple-600">{property.priceDisplay}</span>
                  <span className="text-sm text-gray-500">Built {property.yearBuilt}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span className="flex items-center">
                    <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                    {property.bedrooms} Beds
                  </span>
                  <span className="flex items-center">
                    <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                    {property.bathrooms} Baths
                  </span>
                  <span>{property.areaDisplay}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {property.features.slice(0, 2).map((feature, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">{feature}</span>
                  ))}
                  {property.features.length > 2 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">+{property.features.length - 2} more</span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">View Details</button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <EyeIcon className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Market Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <CurrencyDollarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Average Price</h3>
                <p className="text-2xl font-bold text-purple-600">$680,000</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">+3.8% from last year</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Days on Market</h3>
                <p className="text-2xl font-bold text-blue-600">22 days</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">Fast-moving urban market</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <MapPinIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Hot Areas</h3>
                <p className="text-2xl font-bold text-green-600">5</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">Trending districts</p>
          </div>
        </div>

        {/* Why Choose Townhouses & Condos */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Townhouses & Condos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BuildingOfficeIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Low Maintenance</h3>
              <p className="text-gray-600 text-sm">Enjoy homeownership with minimal upkeep</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPinIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Prime Locations</h3>
              <p className="text-gray-600 text-sm">Access to urban amenities and transportation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Community Living</h3>
              <p className="text-gray-600 text-sm">Shared amenities and social opportunities</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Modern Living</h3>
              <p className="text-gray-600 text-sm">Contemporary design and smart features</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Townhouses & Condos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrophyIcon className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Premium Quality</h3>
              <p className="text-gray-600">
                Every property is carefully selected for quality, location, and modern amenities.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserGroupIcon className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Guidance</h3>
              <p className="text-gray-600">
                Our urban living specialists help you find the perfect city home.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <StarIcon className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Proven Track Record</h3>
              <p className="text-gray-600">
                Over 8,000 successful urban property sales with 99% customer satisfaction.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What Our Urban Homeowners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &ldquo;Found the perfect downtown condo with amazing city views! The building amenities are incredible.&rdquo;
              </p>
              <p className="font-semibold text-gray-900">- David Martinez</p>
              <p className="text-sm text-gray-500">Condo Owner, Financial District</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &ldquo;The townhouse has the perfect blend of privacy and community. Love the rooftop deck!&rdquo;
              </p>
              <p className="font-semibold text-gray-900">- Lisa Thompson</p>
              <p className="text-sm text-gray-500">Townhouse Owner, Historic Quarter</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &ldquo;The loft&rsquo;s industrial design is exactly what I wanted. Great location in the arts district!&rdquo;
              </p>
              <p className="font-semibold text-gray-900">- Alex Chen</p>
              <p className="text-sm text-gray-500">Loft Owner, Arts District</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Urban Home?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of urban homeowners who found their perfect townhouse or condo with us. 
            Experience city living at its finest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contact an Agent
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Schedule a Tour
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Get Pre-approved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TownhousesCondos;

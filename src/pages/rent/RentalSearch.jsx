import React, { useState } from 'react';
import { HomeIcon, MapPinIcon, CurrencyDollarIcon, HeartIcon, EyeIcon, ShareIcon, StarIcon, TrophyIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const RentalSearch = () => {
  const [filters, setFilters] = useState({
    location: '',
    rentRange: '',
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
      title: "Modern Downtown Apartment",
      location: "Financial District",
      rent: 2800,
      rentDisplay: "$2,800/month",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      type: "Apartment",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      areaDisplay: "1,200 sq ft",
      yearBuilt: 2021,
      features: ["City Views", "Gym", "Concierge", "Parking"],
      available: "Available Now"
    },
    {
      id: 2,
      title: "Charming Townhouse",
      location: "Historic Quarter",
      rent: 3200,
      rentDisplay: "$3,200/month",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
      type: "Townhouse",
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      areaDisplay: "1,800 sq ft",
      yearBuilt: 2019,
      features: ["Private Garden", "Rooftop Deck", "Modern Kitchen", "Hardwood Floors"],
      available: "Available Dec 1"
    },
    {
      id: 3,
      title: "Contemporary Loft",
      location: "Arts District",
      rent: 2200,
      rentDisplay: "$2,200/month",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      type: "Loft",
      bedrooms: 1,
      bathrooms: 1,
      area: 900,
      areaDisplay: "900 sq ft",
      yearBuilt: 2020,
      features: ["High Ceilings", "Exposed Brick", "Open Floor Plan", "Industrial Design"],
      available: "Available Now"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Rental Home</h1>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Discover amazing rental properties from apartments to houses. 
              Find your ideal home with flexible lease terms and modern amenities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Browse Rentals
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                Schedule Tour
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HomeIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">3,200+</h3>
            <p className="text-gray-600">Rental Properties</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">$2,400</h3>
            <p className="text-gray-600">Average Rent</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPinIcon className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">50+</h3>
            <p className="text-gray-600">Neighborhoods</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <StarIcon className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">4.7/5</h3>
            <p className="text-gray-600">Tenant Rating</p>
          </div>
        </div>

        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label htmlFor="rental-location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                id="rental-location"
                type="text"
                placeholder="Enter city or neighborhood"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="rent-range" className="block text-sm font-medium text-gray-700 mb-2">Rent Range</label>
              <select 
                id="rent-range" 
                value={filters.rentRange}
                onChange={(e) => handleFilterChange('rentRange', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Price</option>
                <option value="under-1500">Under $1,500</option>
                <option value="1500-2500">$1,500 - $2,500</option>
                <option value="2500-4000">$2,500 - $4,000</option>
                <option value="above-4000">Above $4,000</option>
              </select>
            </div>
            <div>
              <label htmlFor="rental-property-type" className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select 
                id="rental-property-type" 
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
              </select>
            </div>
            <div>
              <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
                Search Rentals
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
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="rent-low">Rent: Low to High</option>
                <option value="rent-high">Rent: High to Low</option>
                <option value="area">Largest First</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              {properties.length} properties found
            </div>
          </div>
        </div>

        {/* Featured Rentals */}
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
                  <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">For Rent</span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">{property.available}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">{property.title}</h3>
                <p className="text-gray-600 mb-3 flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {property.location}
                </p>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">{property.rentDisplay}</span>
                  <span className="text-sm text-gray-500">Built {property.yearBuilt}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span className="flex items-center">
                    <HomeIcon className="h-4 w-4 mr-1" />
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
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{feature}</span>
                  ))}
                  {property.features.length > 2 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">+{property.features.length - 2} more</span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">View Details</button>
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
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Average Rent</h3>
                <p className="text-2xl font-bold text-green-600">$2,400</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">+2.1% from last year</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <ClockIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Average Lease</h3>
                <p className="text-2xl font-bold text-blue-600">12 months</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">Flexible terms available</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <MapPinIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Hot Areas</h3>
                <p className="text-2xl font-bold text-purple-600">8</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">Trending neighborhoods</p>
          </div>
        </div>

        {/* Why Choose Rental Living */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Rental Living?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Maintenance</h3>
              <p className="text-gray-600 text-sm">Landlord handles all repairs and upkeep</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Flexible Terms</h3>
              <p className="text-gray-600 text-sm">Short and long-term lease options</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPinIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Prime Locations</h3>
              <p className="text-gray-600 text-sm">Access to urban amenities and transport</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Community</h3>
              <p className="text-gray-600 text-sm">Shared amenities and social spaces</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Rental Properties?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrophyIcon className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Verified Properties</h3>
              <p className="text-gray-600">
                Every rental property is thoroughly inspected and verified for quality and safety.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserGroupIcon className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Easy Application</h3>
              <p className="text-gray-600">
                Streamlined application process with quick approval and digital documentation.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <StarIcon className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock support for all your rental needs and maintenance requests.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What Our Tenants Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &ldquo;Found the perfect apartment in just 3 days! The application process was so smooth and the landlord is amazing.&rdquo;
              </p>
              <p className="font-semibold text-gray-900">- Jessica Park</p>
              <p className="text-sm text-gray-500">Tenant, Downtown Apartment</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &ldquo;The townhouse is perfect for our family. Great location and the maintenance team responds quickly to any issues.&rdquo;
              </p>
              <p className="font-semibold text-gray-900">- Robert Wilson</p>
              <p className="text-sm text-gray-500">Tenant, Family Townhouse</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &ldquo;Love the loft&rsquo;s industrial design! The building amenities are fantastic and the location is perfect for work.&rdquo;
              </p>
              <p className="font-semibold text-gray-900">- Maria Santos</p>
              <p className="text-sm text-gray-500">Tenant, Arts District Loft</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Rental?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of happy tenants who found their ideal rental home with us. 
            Start your rental journey today with flexible terms and modern amenities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Browse Rentals
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Schedule Tour
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalSearch;

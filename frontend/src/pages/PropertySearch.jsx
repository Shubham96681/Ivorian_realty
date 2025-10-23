import { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { propertyService } from '../services/propertyService';
import ComingSoonModal from '../components/UI/ComingSoonModal';
import { useComingSoon } from '../hooks/useComingSoon';
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  HomeIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  HeartIcon,
  FunnelIcon,
  XMarkIcon,
  StarIcon,
  TrophyIcon,
  UserGroupIcon,
  ClockIcon,
  EyeIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const PropertySearch = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const { isOpen, modalContent, showComingSoon, hideComingSoon } = useComingSoon();
  
  const [filters, setFilters] = useState({
    search: searchParams.get('location') || '',
    propertyType: searchParams.get('propertyType') || '',
    priceRange: '',
    bedrooms: searchParams.get('bedrooms') || '',
    location: searchParams.get('location') || '',
    sortBy: 'newest'
  });

  // Handle URL parameters on component mount
  useEffect(() => {
    const location = searchParams.get('location');
    const propertyType = searchParams.get('propertyType');
    const bedrooms = searchParams.get('bedrooms');
    const bathrooms = searchParams.get('bathrooms');
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');

    if (location || propertyType || bedrooms || bathrooms || priceMin || priceMax) {
      setFilters(prev => ({
        ...prev,
        search: location || '',
        propertyType: propertyType || '',
        bedrooms: bedrooms || '',
        location: location || ''
      }));
    }
  }, [searchParams]);

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await propertyService.getProperties();
        console.log('API Response:', response); // Debug log
        
        // Ensure we have an array of properties
        let propertiesData = [];
        if (Array.isArray(response)) {
          propertiesData = response;
        } else if (response && Array.isArray(response.properties)) {
          propertiesData = response.properties;
        } else if (response && Array.isArray(response.data)) {
          propertiesData = response.data;
        } else {
          console.warn('No properties array found in response:', response);
          propertiesData = [];
        }
        
        // Transform API data to match component expectations
        const transformedProperties = propertiesData.map(property => {
          // Handle location object properly
          let locationString = '';
          if (typeof property.location === 'string') {
            locationString = property.location;
          } else if (property.location && typeof property.location === 'object') {
            // If location is an object, extract the relevant parts
            const { address, city, state, zipCode } = property.location;
            locationString = [address, city, state, zipCode].filter(Boolean).join(', ');
          } else if (property.address || property.city) {
            locationString = `${property.address || ''}, ${property.city || ''}`.replace(/^,\s*|,\s*$/g, '');
          } else {
            locationString = 'Location not specified';
          }

          return {
            id: property.id || property._id,
            title: property.title || 'Property',
            location: locationString,
            price: property.price || 0,
            priceDisplay: property.priceDisplay || `₹${(property.price || 0).toLocaleString()}`,
            image: property.image || '/images/property1.jpg',
            type: property.type || property.propertyType || 'house',
            bedrooms: property.bedrooms || 0,
            bathrooms: property.bathrooms || 0,
            area: property.area || 'N/A',
            areaDisplay: property.area || 'N/A',
            postedDate: property.createdAt?.split('T')[0] || property.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
            verified: true,
            amenities: property.amenities || property.features || []
          };
        });
        
        setProperties(transformedProperties);
        setFilteredProperties(transformedProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
        
        // Fallback to mock data for development
        const mockProperties = [
          {
            id: '1',
            title: 'Luxury Villa in Cocody',
            location: 'Cocody, Abidjan',
            price: 500000,
            priceDisplay: '₹500,000',
            image: '/images/property1.jpg',
            type: 'villa',
            bedrooms: 4,
            bathrooms: 3,
            area: '2500 sq ft',
            areaDisplay: '2500 sq ft',
            postedDate: new Date().toISOString().split('T')[0],
            verified: true,
            amenities: ['Swimming Pool', 'Garden', 'Parking']
          },
          {
            id: '2',
            title: 'Modern Apartment in Plateau',
            location: 'Plateau, Abidjan',
            price: 150000,
            priceDisplay: '₹150,000',
            image: '/images/property2.jpg',
            type: 'apartment',
            bedrooms: 2,
            bathrooms: 1,
            area: '1200 sq ft',
            areaDisplay: '1200 sq ft',
            postedDate: new Date().toISOString().split('T')[0],
            verified: true,
            amenities: ['Balcony', 'Security', 'Elevator']
          },
          {
            id: '3',
            title: 'Family House in Yopougon',
            location: 'Yopougon, Abidjan',
            price: 300000,
            priceDisplay: '₹300,000',
            image: '/images/property3.jpg',
            type: 'house',
            bedrooms: 3,
            bathrooms: 2,
            area: '1800 sq ft',
            areaDisplay: '1800 sq ft',
            postedDate: new Date().toISOString().split('T')[0],
            verified: true,
            amenities: ['Garden', 'Parking', 'Security']
          }
        ];
        
        setProperties(mockProperties);
        setFilteredProperties(mockProperties);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyFilters = useCallback(() => {
    let filtered = [...properties];

    if (filters.search) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.location.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.propertyType) {
      filtered = filtered.filter(property => property.type === filters.propertyType);
    }

    // Handle price range from URL parameters or filters
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(property => {
        if (max) {
          return property.price >= min * 100000 && property.price <= max * 100000;
        } else {
          return property.price >= min * 100000;
        }
      });
    } else if (priceMin || priceMax) {
      filtered = filtered.filter(property => {
        const minPrice = priceMin ? parseInt(priceMin) : 0;
        const maxPrice = priceMax ? parseInt(priceMax) : Infinity;
        return property.price >= minPrice && property.price <= maxPrice;
      });
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= parseInt(filters.bedrooms));
    }

    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
        break;
      default:
        break;
    }

    setFilteredProperties(filtered);
  }, [filters, properties, searchParams, setFilteredProperties]);

  useEffect(() => {
    applyFilters();
  }, [filters, properties, applyFilters]);

  const toggleFavorite = async (propertyId) => {
    try {
      if (favorites.has(propertyId)) {
        await propertyService.removeFromFavorites(propertyId);
        setFavorites(prev => {
          const newFavorites = new Set(prev);
          newFavorites.delete(propertyId);
          return newFavorites;
        });
        window.alert('Property removed from favorites');
      } else {
        await propertyService.saveToFavorites(propertyId);
        setFavorites(prev => {
          const newFavorites = new Set(prev);
          newFavorites.add(propertyId);
          return newFavorites;
        });
        window.alert('Property added to favorites');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      window.alert('Failed to update favorites. Please try again.');
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      propertyType: '',
      priceRange: '',
      bedrooms: '',
      location: '',
      sortBy: 'newest'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Property</h1>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Discover amazing properties from apartments to villas. 
              Find your ideal home with our comprehensive search and filtering options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Your Search
              </button>
              <button 
                onClick={() => showComingSoon(
                  "Virtual Tours Coming Soon", 
                  "Immersive 360° virtual tours will be available soon! You'll be able to explore properties from the comfort of your home with interactive virtual reality experiences."
                )}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
              >
                View Virtual Tours
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-600 mb-2">{filteredProperties.length}+</h3>
              <p className="text-gray-600">Properties Available</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">₹2.5 Cr</h3>
              <p className="text-gray-600">Average Price</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPinIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-purple-600 mb-2">25+</h3>
              <p className="text-gray-600">Locations</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-orange-600 mb-2">4.8/5</h3>
              <p className="text-gray-600">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search and Filters */}
        <div id="search-section" className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by location, project, or landmark..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <FunnelIcon className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <select
                    id="propertyType"
                    value={filters.propertyType}
                    onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Studio">Studio</option>
                    <option value="Penthouse">Penthouse</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select
                    id="priceRange"
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Any Price</option>
                    <option value="0-50">Under ₹50 Lakh</option>
                    <option value="50-100">₹50 Lakh - ₹1 Cr</option>
                    <option value="100-200">₹1 Cr - ₹2 Cr</option>
                    <option value="200-500">₹2 Cr - ₹5 Cr</option>
                    <option value="500">Above ₹5 Cr</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                  <select
                    id="bedrooms"
                    value={filters.bedrooms}
                    onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Any</option>
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5">5+ BHK</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    id="sortBy"
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                >
                  <XMarkIcon className="h-4 w-4" />
                  <span>Clear Filters</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  >
                    {favorites.has(property.id) ? (
                      <HeartSolidIcon className="h-5 w-5 text-red-500" />
                    ) : (
                      <HeartIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  <button 
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: property.title,
                          text: `Check out this property: ${property.title}`,
                          url: window.location.origin + `/property/${property.id}`
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.origin + `/property/${property.id}`);
                        window.alert('Property link copied to clipboard!');
                      }
                    }}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                    title="Share Property"
                  >
                    <ShareIcon className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
                {property.verified && (
                  <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Verified
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">{property.title}</h3>
                <p className="text-gray-600 mb-3 flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {typeof property.location === 'string' ? property.location : 'Location not specified'}
                </p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">{property.priceDisplay}</span>
                  <span className="text-sm text-gray-500">Posted {new Date(property.postedDate).toLocaleDateString()}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span className="flex items-center">
                    <HomeIcon className="h-4 w-4 mr-1" />
                    {property.bedrooms} Beds
                  </span>
                  <span className="flex items-center">
                    <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                    {property.bathrooms} Baths
                  </span>
                  <span>{property.areaDisplay}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {property.amenities.slice(0, 2).map((amenity, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{amenity}</span>
                  ))}
                  {property.amenities.length > 2 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">+{property.amenities.length - 2} more</span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Link
                    to={`/property/${property.id}`}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium text-center"
                  >
                    View Details
                  </Link>
                  <button 
                    onClick={() => showComingSoon(
                      "Quick View Coming Soon", 
                      "Quick view feature will be available soon! You'll be able to preview property details in a popup without leaving the search page."
                    )}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Quick View"
                  >
                    <EyeIcon className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <HomeIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No properties found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Market Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Average Price</h3>
                <p className="text-2xl font-bold text-green-600">₹2.5 Cr</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">+5.2% from last year</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <ClockIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Average Days</h3>
                <p className="text-2xl font-bold text-blue-600">45 days</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">Time to sell</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <MapPinIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Hot Areas</h3>
                <p className="text-2xl font-bold text-purple-600">12</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">Trending locations</p>
          </div>
        </div>

        {/* Why Choose Our Properties */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Properties?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrophyIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Properties</h3>
              <p className="text-gray-600 text-sm">All properties are thoroughly verified for quality and authenticity</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Guidance</h3>
              <p className="text-gray-600 text-sm">Professional real estate agents to guide you through the process</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Best Deals</h3>
              <p className="text-gray-600 text-sm">Competitive prices and exclusive deals for our customers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Customer First</h3>
              <p className="text-gray-600 text-sm">Dedicated support throughout your property journey</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Property?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of happy homeowners who found their perfect property with us. 
            Our expert team is ready to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact an Agent
            </button>
            <button 
              onClick={() => showComingSoon(
                "Schedule a Tour Coming Soon", 
                "You'll be able to schedule property tours directly through our platform. Our agents will contact you to arrange convenient viewing times."
              )}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Schedule a Tour
            </button>
            <button 
              onClick={() => showComingSoon(
                "Pre-approval Coming Soon", 
                "Get pre-approved for your mortgage directly through our platform. Connect with our trusted lending partners for quick pre-approval."
              )}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Get Pre-approved
            </button>
          </div>
        </div>
      </div>

      {/* Coming Soon Modal */}
      <ComingSoonModal
        isOpen={isOpen}
        onClose={hideComingSoon}
        title={modalContent.title}
        message={modalContent.message}
      />
    </div>
  );
};

export default PropertySearch;

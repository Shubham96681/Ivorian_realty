import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ComingSoonModal from '../UI/ComingSoonModal';
import { useComingSoon } from '../../hooks/useComingSoon';
import { propertyService } from '../../services/propertyService';
import { 
  MapPinIcon, 
  HomeIcon, 
  CurrencyDollarIcon,
  HeartIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const FeaturedProperties = () => {
  const { t } = useTranslation();
  // Build absolute URLs for images coming from backend '/uploads'
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
  const API_ORIGIN = API_BASE.replace(/\/api\/?$/, '');
  const toImageUrl = (src) => {
    if (!src) return 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400';
    if (/^https?:\/\//i.test(src)) return src;
    if (src.startsWith('/uploads')) return `${API_ORIGIN}${src}`;
    if (src.startsWith('uploads')) return `${API_ORIGIN}/${src}`;
    return src;
  };
  const { isOpen, modalContent, showComingSoon, hideComingSoon } = useComingSoon();
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await propertyService.getProperties();
        
        // Ensure we have an array of properties
        let propertiesData = [];
        if (Array.isArray(response)) {
          propertiesData = response;
        } else if (response && response.data && Array.isArray(response.data.properties)) {
          propertiesData = response.data.properties;
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
            // If it's a string representation of an object, try to parse it
            if (property.location.includes('city=') && property.location.includes('address=')) {
              // Extract city and address from string like "@{city=Noida; address=kestopur,balaji bhawan}"
              const cityMatch = property.location.match(/city=([^;]+)/);
              const addressMatch = property.location.match(/address=([^}]+)/);
              const city = cityMatch ? cityMatch[1] : '';
              const address = addressMatch ? addressMatch[1] : '';
              locationString = [address, city].filter(Boolean).join(', ');
            } else {
              locationString = property.location;
            }
          } else if (property.location && typeof property.location === 'object') {
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
            price: `FCFA ${(property.price || 0).toLocaleString()}`,
            image: (() => {
              if (Array.isArray(property.images) && property.images.length > 0) {
                return toImageUrl(property.images[0]);
              } else if (typeof property.images === 'string' && property.images.trim()) {
                return toImageUrl(property.images.split(' ')[0]); // Take first image if it's a space-separated string
              }
              return 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400';
            })(),
            type: property.type || 'house',
            bedrooms: property.bedrooms || 0,
            bathrooms: property.bathrooms || 0,
            area: property.area ? `${property.area} sq ft` : 'N/A',
            featured: true
          };
        });
        
        setFeaturedProperties(transformedProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
        // Fallback to empty array if API fails
        setFeaturedProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Duplicate properties for seamless carousel
  const carouselProperties = [...featuredProperties, ...featuredProperties];

  if (loading) {
    return (
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">{t('common.loading')}</p>
          </div>
        </div>
      </section>
    );
  }

  if (featuredProperties.length === 0) {
    return (
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('search.noPropertiesFound')}</h2>
            <p className="text-gray-600">{t('search.tryAdjustingCriteria')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-32 w-40 h-40 bg-purple-200/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-32 w-36 h-36 bg-indigo-200/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-blue-200/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-6 py-3 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg">
            <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm font-semibold text-white tracking-wide">FEATURED PROPERTIES</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {t('home.featuredProperties.title')}
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('home.featuredProperties.subtitle')}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {carouselProperties.map((property, index) => (
              <div key={`${property.id}-${index}`} className="flex-shrink-0 w-80 sm:w-96 mx-4">
                <div className="group bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:border-blue-300 relative">
                  {/* Property Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => showComingSoon(
                            "Favorites Coming Soon", 
                            "Add to favorites feature will be available soon! You'll be able to save your favorite properties and access them easily from your dashboard."
                          )}
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-300"
                          title="Add to Favorites"
                        >
                          <HeartIcon className="h-5 w-5 text-gray-700 hover:text-red-500" />
                        </button>
                        <button 
                          onClick={() => showComingSoon(
                            "Quick View Coming Soon", 
                            "Quick view feature will be available soon! You'll be able to preview featured property details in a popup without leaving the homepage."
                          )}
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-300"
                          title="Quick View"
                        >
                          <EyeIcon className="h-5 w-5 text-gray-700 hover:text-blue-500" />
                        </button>
                      </div>
                    </div>

                    {/* Featured Badge */}
                    {property.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Property Type Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        {property.type}
                      </span>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {property.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-2 text-blue-500" />
                      {property.location}
                    </p>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <CurrencyDollarIcon className="h-5 w-5 text-green-500 mr-1" />
                        <span className="text-2xl font-bold text-green-600">{property.price}</span>
                      </div>
                    </div>

                    {/* Property Features */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <HomeIcon className="h-4 w-4 mr-1 text-blue-500" />
                        <span>{property.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center">
                        <span>{property.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center">
                        <span>{property.area}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      to={`/property/${property.id}`}
                      className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {t('home.featuredProperties.viewDetails')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-flex items-center space-x-4">
            <Link to="/search" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              {t('home.featuredProperties.viewAll')}
            </Link>
            <Link to="/contact" className="bg-white/80 backdrop-blur-sm border border-blue-200 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all duration-300">
              {t('home.featuredProperties.getAdvice')}
            </Link>
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
    </section>
  );
};

export default FeaturedProperties;

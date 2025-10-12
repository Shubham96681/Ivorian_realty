import React from 'react';
import { Link } from 'react-router-dom';
import ComingSoonModal from '../UI/ComingSoonModal';
import { useComingSoon } from '../../hooks/useComingSoon';
import { 
  MapPinIcon, 
  HomeIcon, 
  CurrencyDollarIcon,
  HeartIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const FeaturedProperties = () => {
  const { isOpen, modalContent, showComingSoon, hideComingSoon } = useComingSoon();
  const featuredProperties = [
    {
      id: 1,
      title: "Luxury 3BHK Apartment",
      location: "DLF Phase 2, Gurgaon",
      price: "₹1.2 Cr",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      type: "Apartment",
      bedrooms: 3,
      bathrooms: 2,
      area: "1200 sq ft",
      featured: true
    },
    {
      id: 2,
      title: "Modern Villa",
      location: "Sector 57, Gurgaon",
      price: "₹2.5 Cr",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
      type: "Villa",
      bedrooms: 4,
      bathrooms: 3,
      area: "2500 sq ft",
      featured: true
    },
    {
      id: 3,
      title: "Commercial Office Space",
      location: "Cyber City, Gurgaon",
      price: "₹50 Lakh",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400",
      type: "Commercial",
      bedrooms: 0,
      bathrooms: 2,
      area: "800 sq ft",
      featured: false
    },
    {
      id: 4,
      title: "Premium Penthouse",
      location: "Bandra West, Mumbai",
      price: "₹8.5 Cr",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
      type: "Penthouse",
      bedrooms: 4,
      bathrooms: 4,
      area: "3200 sq ft",
      featured: true
    },
    {
      id: 5,
      title: "Cozy Studio Apartment",
      location: "Koramangala, Bangalore",
      price: "₹45 Lakh",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
      type: "Studio",
      bedrooms: 1,
      bathrooms: 1,
      area: "600 sq ft",
      featured: false
    },
    {
      id: 6,
      title: "Luxury Farmhouse",
      location: "Greater Noida, Delhi NCR",
      price: "₹3.2 Cr",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      type: "Farmhouse",
      bedrooms: 5,
      bathrooms: 4,
      area: "4500 sq ft",
      featured: true
    }
  ];

  // Duplicate properties for seamless carousel
  const carouselProperties = [...featuredProperties, ...featuredProperties];

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
              Premium Properties
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our handpicked selection of premium properties with exceptional value and prime locations
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
                      View Details
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
              View All Properties
            </Link>
            <Link to="/contact" className="bg-white/80 backdrop-blur-sm border border-blue-200 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all duration-300">
              Get Expert Advice
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

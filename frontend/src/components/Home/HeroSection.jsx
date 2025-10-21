import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  MapPinIcon
} from '@heroicons/react/24/outline';
import ComingSoonModal from '../UI/ComingSoonModal';
import { useComingSoon } from '../../hooks/useComingSoon';

const HeroSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('buy');
  const [searchForm, setSearchForm] = useState({
    location: '',
    propertyType: '',
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    bathrooms: ''
  });
  const { isOpen, modalContent, showComingSoon, hideComingSoon } = useComingSoon();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (field, value) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Build search URL with all form parameters
    // eslint-disable-next-line no-undef
    const searchParams = new URLSearchParams();
    searchParams.set('type', activeTab);
    if (searchForm.location) searchParams.set('location', searchForm.location);
    if (searchForm.propertyType) searchParams.set('propertyType', searchForm.propertyType);
    if (searchForm.priceMin) searchParams.set('priceMin', searchForm.priceMin);
    if (searchForm.priceMax) searchParams.set('priceMax', searchForm.priceMax);
    if (searchForm.bedrooms) searchParams.set('bedrooms', searchForm.bedrooms);
    if (searchForm.bathrooms) searchParams.set('bathrooms', searchForm.bathrooms);
    
    navigate(`/search?${searchParams.toString()}`);
  };

  const clearForm = () => {
    setSearchForm({
      location: '',
      propertyType: '',
      priceMin: '',
      priceMax: '',
      bedrooms: '',
      bathrooms: ''
    });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background Image */}
      <div 
        className="absolute inset-0 hero-bg-animation"
        style={{
          backgroundImage: 'url(/nilanka-kariyawasam-2.jpg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center'
        }}
      ></div>
      
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-32 w-40 h-40 bg-purple-200/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-32 w-36 h-36 bg-indigo-200/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-blue-200/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '3s'}}></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-200/50 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-purple-200/50 rounded-full animate-bounce" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-indigo-200/50 rounded-full animate-bounce" style={{animationDelay: '3.5s'}}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg">
              <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-semibold text-white tracking-wide">IVORIAN REALTY PLATFORM</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white drop-shadow-2xl">
                Connecting Buyers and Renters
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">
                with Their Dream Home!
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 leading-relaxed font-light drop-shadow-lg">
              Find your perfect home with our comprehensive real estate platform. Discover verified properties, get expert guidance, and secure the best deals.
            </p>
            
            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm sm:text-base">
              <div className="flex items-center space-x-3 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl border border-blue-300 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                <span className="font-semibold text-gray-800">Verified Properties</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl border border-purple-300 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
                <span className="font-semibold text-gray-800">Expert Guidance</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl border border-indigo-300 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"></div>
                <span className="font-semibold text-gray-800">Best Deals</span>
              </div>
            </div>
          </div>
          
          {/* Right Side - Search Form */}
          <div className="bg-white/98 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-2xl border-2 border-white/80">
            {/* Buy/Rent Tabs */}
            <div className="flex mb-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-1 shadow-inner">
              <button 
                onClick={() => handleTabChange('buy')}
                className={`flex-1 px-4 py-2 rounded-lg font-bold text-sm shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  activeTab === 'buy' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'text-purple-700 hover:bg-white hover:shadow-md'
                }`}
              >
                <span className="flex items-center justify-center space-x-1">
                  <span className="text-sm">🏠</span>
                  <span>Buy</span>
                </span>
              </button>
              <button 
                onClick={() => handleTabChange('rent')}
                className={`flex-1 px-4 py-2 rounded-lg font-bold text-sm shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  activeTab === 'rent' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'text-purple-700 hover:bg-white hover:shadow-md'
                }`}
              >
                <span className="flex items-center justify-center space-x-1">
                  <span className="text-sm">🔑</span>
                  <span>Rent</span>
                </span>
              </button>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="space-y-4 mb-4">
              <div>
                <div className="relative">
                  <MapPinIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
                  <input
                    type="text"
                    placeholder="Enter city, neighborhood, or address"
                    value={searchForm.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-300 hover:border-blue-300 bg-white focus:bg-white placeholder-gray-600 placeholder-opacity-90 shadow-md hover:shadow-lg"
                  />
                </div>
              </div>
              <div>
                <select 
                  value={searchForm.propertyType}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  className="w-full p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-300 hover:border-blue-300 bg-white focus:bg-white text-gray-700 shadow-md hover:shadow-lg"
                >
                  <option value="" disabled className="text-gray-500">Select Property Type</option>
                  <option value="single-family">🏠 Single Family</option>
                  <option value="townhouse-condo">🏢 Townhouse/Condo</option>
                  <option value="acreage">🌳 Acreage</option>
                  <option value="mid-high-rise">🏙️ Mid/High-Rise</option>
                  <option value="lots">📐 Lots</option>
                  <option value="multi-family">🏘️ Multi-Family</option>
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white p-3 rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 flex items-center justify-center space-x-2 text-sm font-bold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                  <span>Search {activeTab === 'buy' ? 'Properties to Buy' : 'Properties to Rent'}</span>
                </button>
              </div>
            </form>

            {/* Advanced Filters */}
            <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-lg p-4 sm:p-6 border border-blue-100">
              <h3 className="text-sm font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <span className="mr-2">🔍</span>
                Refine Your Search
              </h3>
              <div className="space-y-4">
                {/* Price Range */}
                <div>
                  <label htmlFor="price-min" className="block text-xs font-semibold text-gray-700 mb-2">💰 Price Range</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select 
                      id="price-min" 
                      value={searchForm.priceMin}
                      onChange={(e) => handleInputChange('priceMin', e.target.value)}
                      className="w-full p-2.5 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs transition-all duration-300 hover:border-blue-300 bg-white focus:bg-white text-gray-700 shadow-sm"
                    >
                      <option value="" disabled className="text-gray-500">Min Price</option>
                      <option value="100000">$100K</option>
                      <option value="200000">$200K</option>
                      <option value="300000">$300K</option>
                      <option value="500000">$500K</option>
                    </select>
                    <select 
                      id="price-max" 
                      value={searchForm.priceMax}
                      onChange={(e) => handleInputChange('priceMax', e.target.value)}
                      className="w-full p-2.5 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs transition-all duration-300 hover:border-blue-300 bg-white focus:bg-white text-gray-700 shadow-sm"
                    >
                      <option value="" disabled className="text-gray-500">Max Price</option>
                      <option value="500000">$500K</option>
                      <option value="1000000">$1M</option>
                      <option value="2000000">$2M</option>
                      <option value="5000000">$5M</option>
                    </select>
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <label htmlFor="beds-min" className="block text-xs font-semibold text-gray-700 mb-2">🛏️ Bedrooms</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select 
                      id="beds-min" 
                      value={searchForm.bedrooms}
                      onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                      className="w-full p-2.5 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs transition-all duration-300 hover:border-blue-300 bg-white focus:bg-white text-gray-700 shadow-sm"
                    >
                      <option value="" disabled className="text-gray-500">Min Beds</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                    <select 
                      id="beds-max" 
                      value={searchForm.bedrooms}
                      onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                      className="w-full p-2.5 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs transition-all duration-300 hover:border-blue-300 bg-white focus:bg-white text-gray-700 shadow-sm"
                    >
                      <option value="" disabled className="text-gray-500">Max Beds</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </div>

                {/* Bathrooms */}
                <div>
                  <label htmlFor="baths-min" className="block text-xs font-semibold text-gray-700 mb-2">🛁 Bathrooms</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select 
                      id="baths-min" 
                      value={searchForm.bathrooms}
                      onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                      className="w-full p-2.5 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs transition-all duration-300 hover:border-blue-300 bg-white focus:bg-white text-gray-700 shadow-sm"
                    >
                      <option value="" disabled className="text-gray-500">Min Baths</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                    </select>
                    <select 
                      id="baths-max" 
                      value={searchForm.bathrooms}
                      onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                      className="w-full p-2.5 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs transition-all duration-300 hover:border-blue-300 bg-white focus:bg-white text-gray-700 shadow-sm"
                    >
                      <option value="" disabled className="text-gray-500">Max Baths</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={clearForm}
                    className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 p-2.5 rounded-lg hover:from-gray-200 hover:to-gray-300 text-xs font-semibold transition-all duration-300 hover:shadow-md"
                  >
                    Clear All Filters
                  </button>
                  <button 
                    type="button"
                    onClick={() => showComingSoon(
                      "Map Search Coming Soon", 
                      "Interactive map search with property locations will be available soon! You'll be able to explore properties visually on an interactive map."
                    )}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center"
                  >
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    <span className="text-xs">Search by Map</span>
                  </button>
                </div>
              </div>
            </div>
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

export default HeroSection;

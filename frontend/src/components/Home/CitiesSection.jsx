import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPinIcon,
  HomeIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

const CitiesSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-white via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-32 w-40 h-40 bg-indigo-200/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-32 w-36 h-36 bg-purple-200/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-blue-200/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-6 py-3 mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg">
            <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm font-semibold text-white tracking-wide">POPULAR CITIES</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Find Homes by Cities
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover properties in the most popular cities with detailed market insights and pricing trends
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Houston Card */}
          <div className="group bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-2xl p-6 sm:p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-blue-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPinIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Texas</div>
                  <div className="text-sm font-semibold text-gray-700">Population: 2.3M</div>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Houston</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <HomeIcon className="h-4 w-4 mr-2 text-blue-500" />
                  <span>17,000+ homes for sale</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ArrowTrendingUpIcon className="h-4 w-4 mr-2 text-green-500" />
                  <span>+5.2% price growth</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-blue-600">$489K</div>
                <div className="text-sm text-gray-500">avg. price</div>
              </div>
              <Link to="/houston" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 group-hover:translate-x-1 transition-all duration-300">
                Explore Houston →
              </Link>
            </div>
          </div>

          {/* San Antonio Card */}
          <div className="group bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-2xl p-6 sm:p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-green-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPinIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Texas</div>
                  <div className="text-sm font-semibold text-gray-700">Population: 1.5M</div>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">San Antonio</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <HomeIcon className="h-4 w-4 mr-2 text-green-500" />
                  <span>13,000+ homes for sale</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ArrowTrendingUpIcon className="h-4 w-4 mr-2 text-green-500" />
                  <span>+3.8% price growth</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-green-600">$370K</div>
                <div className="text-sm text-gray-500">avg. price</div>
              </div>
              <Link to="/san-antonio" className="inline-flex items-center text-sm font-semibold text-green-600 hover:text-green-700 group-hover:translate-x-1 transition-all duration-300">
                Explore San Antonio →
              </Link>
            </div>
          </div>

          {/* Austin Card */}
          <div className="group bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-2xl p-6 sm:p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-purple-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPinIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Texas</div>
                  <div className="text-sm font-semibold text-gray-700">Population: 965K</div>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Austin</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <HomeIcon className="h-4 w-4 mr-2 text-purple-500" />
                  <span>7,000+ homes for sale</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ArrowTrendingUpIcon className="h-4 w-4 mr-2 text-green-500" />
                  <span>+8.1% price growth</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-purple-600">$902K</div>
                <div className="text-sm text-gray-500">avg. price</div>
              </div>
              <Link to="/austin" className="inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-700 group-hover:translate-x-1 transition-all duration-300">
                Explore Austin →
              </Link>
            </div>
          </div>

          {/* Dallas Card */}
          <div className="group bg-white/80 backdrop-blur-sm border border-indigo-200/50 rounded-2xl p-6 sm:p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-indigo-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPinIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Texas</div>
                  <div className="text-sm font-semibold text-gray-700">Population: 1.3M</div>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Dallas</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <HomeIcon className="h-4 w-4 mr-2 text-indigo-500" />
                  <span>6,000+ homes for sale</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ArrowTrendingUpIcon className="h-4 w-4 mr-2 text-green-500" />
                  <span>+4.5% price growth</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-indigo-600">$803K</div>
                <div className="text-sm text-gray-500">avg. price</div>
              </div>
              <Link to="/dallas" className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 group-hover:translate-x-1 transition-all duration-300">
                Explore Dallas →
              </Link>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-flex items-center space-x-4">
            <Link to="/cities" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Explore All Cities
            </Link>
            <Link to="/search" className="bg-white/80 backdrop-blur-sm border border-indigo-200 text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300">
              Advanced Search
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CitiesSection;

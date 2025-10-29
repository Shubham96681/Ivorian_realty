import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const MarketOverview = () => {
  const { t } = useTranslation();
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
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
            <span className="text-sm font-semibold text-white tracking-wide">MARKET OVERVIEW</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {t('home.marketOverview.title')}
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('home.marketOverview.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Commercial Properties Card */}
          <div className="group bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-2xl p-6 sm:p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-blue-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <BuildingOfficeIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">2.5K+</div>
                  <div className="text-xs text-gray-500">Properties</div>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{t('home.marketOverview.commercialProperties')}</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">{t('home.marketOverview.commercialDescription')}</p>
              <Link to="/commercial" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 group-hover:translate-x-1 transition-all duration-300">
                {t('home.marketOverview.commercialProperties')} →
              </Link>
            </div>
          </div>

          {/* Global Properties Card */}
          <div className="group bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-2xl p-6 sm:p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-green-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPinIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">50+</div>
                  <div className="text-xs text-gray-500">Countries</div>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{t('home.marketOverview.globalProperties')}</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">{t('home.marketOverview.globalDescription')}</p>
              <Link to="/global" className="inline-flex items-center text-sm font-semibold text-green-600 hover:text-green-700 group-hover:translate-x-1 transition-all duration-300">
                {t('home.marketOverview.globalProperties')} →
              </Link>
            </div>
          </div>

          {/* Agents & Brokers Card */}
          <div className="group bg-white/80 backdrop-blur-sm border border-yellow-200/50 rounded-2xl p-6 sm:p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-yellow-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <StarIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-600">10K+</div>
                  <div className="text-xs text-gray-500">Professionals</div>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{t('home.marketOverview.agentsBrokers')}</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">{t('home.marketOverview.agentsDescription')}</p>
              <Link to="/agents" className="inline-flex items-center text-sm font-semibold text-yellow-600 hover:text-yellow-700 group-hover:translate-x-1 transition-all duration-300">
                {t('home.marketOverview.agentsBrokers')} →
              </Link>
            </div>
          </div>

          {/* Home Values Card */}
          <div className="group bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-2xl p-6 sm:p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-purple-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <CurrencyDollarIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">$2.1M</div>
                  <div className="text-xs text-gray-500">Avg. Value</div>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{t('home.marketOverview.homeValues')}</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">{t('home.marketOverview.valuesDescription')}</p>
              <Link to="/home-values" className="inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-700 group-hover:translate-x-1 transition-all duration-300">
                {t('home.marketOverview.homeValues')} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketOverview;

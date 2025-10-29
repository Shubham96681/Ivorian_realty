import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  HomeIcon, 
  UserGroupIcon, 
  MapPinIcon, 
  ClockIcon,
  StarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

const StatsSection = () => {
  const { t } = useTranslation();
  const stats = [
    { 
      label: t('home.achievements.propertiesListed'), 
      value: "10,000+", 
      icon: HomeIcon,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      description: t('home.achievements.propertiesDescription')
    },
    { 
      label: t('home.achievements.happyCustomers'), 
      value: "5,000+", 
      icon: UserGroupIcon,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500/10",
      description: t('home.achievements.customersDescription')
    },
    { 
      label: t('home.achievements.citiesCovered'), 
      value: "25+", 
      icon: MapPinIcon,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
      description: t('home.achievements.citiesDescription')
    },
    { 
      label: t('home.achievements.yearsExperience'), 
      value: "15+", 
      icon: ClockIcon,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500/10",
      description: t('home.achievements.experienceDescription')
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-32 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-32 w-36 h-36 bg-indigo-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '3s'}}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-6 py-3 mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 rounded-full shadow-lg">
            <StarIcon className="h-4 w-4 text-yellow-400 mr-3 animate-pulse" />
            <span className="text-sm font-semibold text-white tracking-wide">OUR ACHIEVEMENTS</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              {t('home.achievements.title')}
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            {t('home.achievements.subtitle')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index} 
                className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8 hover:bg-white/15 hover:scale-105 transition-all duration-500 hover:border-white/30 relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-8 w-8 text-white group-hover:text-blue-200 transition-colors duration-300`} />
                  </div>
                  
                  {/* Value */}
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  
                  {/* Label */}
                  <div className="text-sm sm:text-base font-semibold text-blue-100 mb-2">
                    {stat.label}
                  </div>
                  
                  {/* Description */}
                  <div className="text-xs sm:text-sm text-blue-200 opacity-80 leading-relaxed">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-flex items-center space-x-4">
            <div className="flex items-center text-yellow-400">
              <TrophyIcon className="h-6 w-6 mr-2" />
              <span className="text-sm font-semibold">Award Winning Service</span>
            </div>
            <div className="w-px h-6 bg-white/30"></div>
            <div className="flex items-center text-green-400">
              <StarIcon className="h-6 w-6 mr-2" />
              <span className="text-sm font-semibold">4.9/5 Customer Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

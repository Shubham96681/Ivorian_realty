import React from 'react';
import { Link } from 'react-router-dom';
import { 
  StarIcon,
  HomeIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ClockIcon,
  MapPinIcon,
  HeartIcon,
  CheckBadgeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const WhyChooseSection = () => {
  const handleStartSearch = () => {
    // Scroll to search section or navigate to search page
    const searchSection = document.getElementById('search-section');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to search page if search section not found
      window.location.href = '/search';
    }
  };

  const handleGetExpertAdvice = () => {
    // Navigate to agents page
    window.location.href = '/agents';
  };
  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Verified Properties",
      description: "All properties are thoroughly verified by our expert team to ensure authenticity and quality",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-200/50",
      stats: "100% Verified"
    },
    {
      icon: UserGroupIcon,
      title: "Expert Guidance",
      description: "Get personalized advice from our experienced real estate professionals and market experts",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-200/50",
      stats: "500+ Experts"
    },
    {
      icon: CurrencyDollarIcon,
      title: "Best Deals",
      description: "Access exclusive property deals and competitive pricing with our extensive network",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-200/50",
      stats: "Save 15% Avg"
    },
    {
      icon: ClockIcon,
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you with all your real estate needs",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-200/50",
      stats: "24/7 Available"
    },
    {
      icon: MapPinIcon,
      title: "Wide Coverage",
      description: "Properties available across major cities and emerging markets throughout India",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-200/50",
      stats: "25+ Cities"
    },
    {
      icon: HeartIcon,
      title: "Customer First",
      description: "Your satisfaction is our priority with dedicated support throughout your journey",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-200/50",
      stats: "98% Satisfaction"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-white via-blue-50 to-indigo-50 relative overflow-hidden">
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
            <SparklesIcon className="h-4 w-4 text-white mr-3 animate-pulse" />
            <span className="text-sm font-semibold text-white tracking-wide">WHY CHOOSE US</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Why Choose Ivorian Realty?
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the difference with our comprehensive real estate services designed to make your property journey seamless and successful
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="group bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 sm:p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:border-blue-300 relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-8 w-8 text-gray-700 group-hover:text-blue-600 transition-colors duration-300`} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Stats Badge */}
                  <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${feature.color} rounded-full shadow-lg`}>
                    <CheckBadgeIcon className="h-4 w-4 text-white mr-2" />
                    <span className="text-sm font-semibold text-white">{feature.stats}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-2xl p-8 sm:p-12 shadow-xl">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Ready to Find Your Dream Property?
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of satisfied customers who have found their perfect home with Ivorian Realty
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button 
                  onClick={handleStartSearch}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Start Your Search
                </button>
                <button 
                  onClick={handleGetExpertAdvice}
                  className="bg-white/80 backdrop-blur-sm border border-blue-200 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                >
                  Get Expert Advice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;

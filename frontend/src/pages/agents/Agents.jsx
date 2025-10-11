import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  StarIcon,
  HeartIcon,
  ShareIcon,
  EyeIcon,
  CheckIcon,
  UserGroupIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  AcademicCapIcon,
  TrophyIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  GlobeAltIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

const Agents = () => {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    specialty: '',
    experience: ''
  });
  const [favorites, setFavorites] = useState(new Set());

  const handleFindAgents = () => {
    setShowSearchResults(true);
    // Scroll to search results
    setTimeout(() => {
      document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleBecomeAgent = () => {
    setShowAgentForm(true);
    // Scroll to agent form
    setTimeout(() => {
      document.getElementById('agent-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFilterChange = (filter, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };

  const toggleFavorite = (agentId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(agentId)) {
        newFavorites.delete(agentId);
      } else {
        newFavorites.add(agentId);
      }
      return newFavorites;
    });
  };

  const agents = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Real Estate Agent",
      location: "New York, NY",
      specialty: "Luxury Properties",
      experience: "8 years",
      rating: 4.9,
      sales: 245,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
      description: "Specializing in luxury Manhattan properties with a focus on high-end condos and penthouses.",
      languages: ["English", "Spanish"],
      certifications: ["Certified Luxury Home Marketing Specialist", "Accredited Buyer&apos;s Representative"],
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@realestate.com",
      availability: "Available Now"
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Commercial Real Estate Specialist",
      location: "Los Angeles, CA",
      specialty: "Commercial Properties",
      experience: "12 years",
      rating: 4.8,
      sales: 189,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
      description: "Expert in commercial real estate transactions, from office buildings to retail spaces.",
      languages: ["English", "Mandarin"],
      certifications: ["Certified Commercial Investment Member", "Society of Industrial and Office Realtors"],
      phone: "+1 (555) 234-5678",
      email: "michael.chen@realestate.com",
      availability: "Available in 2 hours"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "First-Time Buyer Specialist",
      location: "Miami, FL",
      specialty: "Residential Properties",
      experience: "6 years",
      rating: 4.9,
      sales: 156,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
      description: "Dedicated to helping first-time homebuyers navigate the complex real estate market.",
      languages: ["English", "Spanish", "Portuguese"],
      certifications: ["Accredited Buyer&apos;s Representative", "Certified Residential Specialist"],
      phone: "+1 (555) 345-6789",
      email: "emily.rodriguez@realestate.com",
      availability: "Available Now"
    },
    {
      id: 4,
      name: "David Thompson",
      title: "Investment Property Expert",
      location: "Chicago, IL",
      specialty: "Investment Properties",
      experience: "15 years",
      rating: 4.7,
      sales: 312,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
      description: "Helping investors build wealth through strategic real estate acquisitions and management.",
      languages: ["English"],
      certifications: ["Certified Investment Property Specialist", "Real Estate Investment Analysis"],
      phone: "+1 (555) 456-7890",
      email: "david.thompson@realestate.com",
      availability: "Available Tomorrow"
    },
    {
      id: 5,
      name: "Lisa Wang",
      title: "Luxury Home Specialist",
      location: "San Francisco, CA",
      specialty: "Luxury Properties",
      experience: "10 years",
      rating: 4.9,
      sales: 198,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
      description: "Specializing in high-end properties in the Bay Area with a focus on tech executives and entrepreneurs.",
      languages: ["English", "Mandarin", "Cantonese"],
      certifications: ["Certified Luxury Home Marketing Specialist", "Accredited Buyer&apos;s Representative"],
      phone: "+1 (555) 567-8901",
      email: "lisa.wang@realestate.com",
      availability: "Available Now"
    },
    {
      id: 6,
      name: "James Wilson",
      title: "Commercial Real Estate Broker",
      location: "Houston, TX",
      specialty: "Commercial Properties",
      experience: "18 years",
      rating: 4.8,
      sales: 267,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
      description: "Expert in commercial real estate with extensive experience in industrial and office properties.",
      languages: ["English", "Spanish"],
      certifications: ["Certified Commercial Investment Member", "Society of Industrial and Office Realtors"],
      phone: "+1 (555) 678-9012",
      email: "james.wilson@realestate.com",
      availability: "Available in 1 hour"
    }
  ];

  const specialties = [
    { name: 'Luxury Properties', icon: TrophyIcon, count: 45 },
    { name: 'Commercial', icon: BuildingOfficeIcon, count: 38 },
    { name: 'Residential', icon: HomeIcon, count: 67 },
    { name: 'Investment', icon: ChartBarIcon, count: 34 },
    { name: 'First-Time Buyers', icon: UserGroupIcon, count: 56 },
    { name: 'International', icon: GlobeAltIcon, count: 23 }
  ];

  const stats = [
    { label: 'Total Agents', value: '500+', icon: UserGroupIcon, color: 'blue' },
    { label: 'Properties Sold', value: '2,500+', icon: HomeIcon, color: 'green' },
    { label: 'Client Rating', value: '4.8/5', icon: StarIcon, color: 'purple' },
    { label: 'Years Experience', value: '10+', icon: TrophyIcon, color: 'orange' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-purple-100">
              Real Estate Agents
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Connect with top-rated real estate professionals who can help you buy, sell, or invest in properties. Find the perfect agent for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleFindAgents}
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Find Agents
              </button>
              <button
                onClick={handleBecomeAgent}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200"
              >
                Become an Agent
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`bg-${stat.color}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10`}>
                    <IconComponent className={`h-8 w-8 text-${stat.color}-600 flex-shrink-0 relative z-20`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Specialties Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Agent Specialties</h2>
            <p className="text-lg text-gray-600">Find agents specialized in your specific needs</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {specialties.map((specialty, index) => {
              const IconComponent = specialty.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    handleFilterChange('specialty', specialty.name);
                    handleFindAgents();
                  }}
                  className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-200 group"
                >
                  <IconComponent className="h-8 w-8 text-gray-600 group-hover:text-blue-600 mx-auto mb-3 flex-shrink-0" />
                  <h3 className="font-semibold text-gray-900 mb-1">{specialty.name}</h3>
                  <p className="text-sm text-gray-500">{specialty.count} agents</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search Filters */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Find Your Perfect Agent</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={searchFilters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  placeholder="Enter city or state"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">
                  Specialty
                </label>
                <select
                  id="specialty"
                  value={searchFilters.specialty}
                  onChange={(e) => handleFilterChange('specialty', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Specialties</option>
                  <option value="Luxury Properties">Luxury Properties</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Residential">Residential</option>
                  <option value="Investment">Investment</option>
                  <option value="First-Time Buyers">First-Time Buyers</option>
                  <option value="International">International</option>
                </select>
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select
                  id="experience"
                  value={searchFilters.experience}
                  onChange={(e) => handleFilterChange('experience', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any Experience</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="4-7 years">4-7 years</option>
                  <option value="8-12 years">8-12 years</option>
                  <option value="13+ years">13+ years</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleFindAgents}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                Find Agents
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Agents */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Agents</h2>
            <p className="text-lg text-gray-600">Meet our top-performing real estate professionals</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.slice(0, 6).map((agent) => (
              <div key={agent.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="w-16 h-16 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face&auto=format&q=80';
                        }}
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
                      <p className="text-gray-600">{agent.title}</p>
                      <div className="flex items-center mt-1">
                        <StarSolidIcon className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">{agent.rating}</span>
                        <span className="text-sm text-gray-500 ml-2">({agent.sales} sales)</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(agent.id)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    >
                      {favorites.has(agent.id) ? (
                        <HeartSolidIcon className="h-5 w-5 text-red-500" />
                      ) : (
                        <HeartIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-600 mb-2 flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      {agent.location}
                    </p>
                    <p className="text-gray-600 mb-2 flex items-center">
                      <TrophyIcon className="h-4 w-4 mr-2" />
                      {agent.specialty}
                    </p>
                    <p className="text-gray-600 mb-2 flex items-center">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      {agent.experience} experience
                    </p>
                    <p className="text-green-600 font-semibold flex items-center">
                      <CheckIcon className="h-4 w-4 mr-2" />
                      {agent.availability}
                    </p>
                  </div>

                  <p className="text-gray-600 mb-4">{agent.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Languages:</h4>
                    <div className="flex flex-wrap gap-2">
                      {agent.languages.map((language, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Certifications:</h4>
                    <div className="space-y-1">
                      {agent.certifications.map((cert, index) => (
                        <p key={index} className="text-sm text-gray-600 flex items-center">
                          <CheckIcon className="h-3 w-3 mr-2 text-green-500" />
                          {cert}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                      <PhoneIcon className="h-4 w-4 mr-2" />
                      Call
                    </button>
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center">
                      <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                      Chat
                    </button>
                    <button className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <ShareIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search Results Section */}
      {showSearchResults && (
        <div id="search-results" className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Agent Search Results</h2>
              <p className="text-lg text-gray-600">Found {agents.length} agents matching your criteria</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {agents.map((agent) => (
                <div key={agent.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                        <img
                          src={agent.image}
                          alt={agent.name}
                          className="w-16 h-16 rounded-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face&auto=format&q=80';
                          }}
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
                        <p className="text-gray-600">{agent.title}</p>
                        <div className="flex items-center mt-1">
                          <StarSolidIcon className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm text-gray-600 ml-1">{agent.rating}</span>
                          <span className="text-sm text-gray-500 ml-2">({agent.sales} sales)</span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFavorite(agent.id)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                      >
                        {favorites.has(agent.id) ? (
                          <HeartSolidIcon className="h-5 w-5 text-red-500" />
                        ) : (
                          <HeartIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-600 mb-2 flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-2" />
                        {agent.location}
                      </p>
                      <p className="text-gray-600 mb-2 flex items-center">
                        <TrophyIcon className="h-4 w-4 mr-2" />
                        {agent.specialty}
                      </p>
                      <p className="text-gray-600 mb-2 flex items-center">
                        <ClockIcon className="h-4 w-4 mr-2" />
                        {agent.experience} experience
                      </p>
                      <p className="text-green-600 font-semibold flex items-center">
                        <CheckIcon className="h-4 w-4 mr-2" />
                        {agent.availability}
                      </p>
                    </div>

                    <p className="text-gray-600 mb-4">{agent.description}</p>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                        <PhoneIcon className="h-4 w-4 mr-2" />
                        Call
                      </button>
                      <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center">
                        <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                        Chat
                      </button>
                      <button className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <ShareIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Agent Application Form */}
      {showAgentForm && (
        <div id="agent-form" className="bg-blue-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Become a Real Estate Agent</h2>
                <p className="text-lg text-gray-600">Join our network of successful real estate professionals</p>
              </div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your preferred location"
                    />
                  </div>
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience
                    </label>
                    <select
                      id="experience"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select experience level</option>
                      <option value="0-1">0-1 years (New to real estate)</option>
                      <option value="2-5">2-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="11+">11+ years</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Specialty
                  </label>
                  <select
                    id="specialty"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select specialty</option>
                    <option value="Residential">Residential Properties</option>
                    <option value="Commercial">Commercial Properties</option>
                    <option value="Luxury">Luxury Properties</option>
                    <option value="Investment">Investment Properties</option>
                    <option value="First-Time Buyers">First-Time Buyers</option>
                    <option value="International">International Properties</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Tell us about yourself
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Share your background, goals, and why you want to become a real estate agent"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowAgentForm(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Our Agents</h2>
            <p className="text-xl text-purple-100">Professional real estate services you can trust</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <TrophyIcon className="h-8 w-8 text-black flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Top Rated</h3>
              <p className="text-purple-100">4.8+ average rating from satisfied clients</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <AcademicCapIcon className="h-8 w-8 text-black flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Expert Knowledge</h3>
              <p className="text-purple-100">Deep understanding of local markets</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <UserGroupIcon className="h-8 w-8 text-black flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Personal Service</h3>
              <p className="text-purple-100">Dedicated support throughout your journey</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <ChartBarIcon className="h-8 w-8 text-black flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Proven Results</h3>
              <p className="text-purple-100">Track record of successful transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Work with the Best?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Connect with our top-rated real estate agents and make your property dreams a reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleFindAgents}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Find Your Agent
            </button>
            <button
              onClick={handleBecomeAgent}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200"
            >
              Join Our Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agents;

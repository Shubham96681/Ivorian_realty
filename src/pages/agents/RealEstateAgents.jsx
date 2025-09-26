import React, { useState } from 'react';
import { UserIcon, StarIcon, PhoneIcon, EnvelopeIcon, MagnifyingGlassIcon, CheckIcon } from '@heroicons/react/24/outline';

const RealEstateAgents = () => {
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    specialty: '',
    rating: '',
    experience: ''
  });

  const handleFindAgents = () => {
    setShowSearchResults(true);
    setShowAgentForm(false);
    // Scroll to search results section
    setTimeout(() => {
      const searchSection = document.getElementById('search-results');
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleBecomeAgent = () => {
    setShowAgentForm(true);
    setShowSearchResults(false);
    // Scroll to agent form section
    setTimeout(() => {
      const formSection = document.getElementById('agent-form');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleFilterChange = (key, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Real Estate Agents</h1>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Connect with top-rated real estate professionals in your area. 
              Find the perfect agent to help you buy or sell your property.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleFindAgents}
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Find Agents
              </button>
              <button 
                onClick={handleBecomeAgent}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
              >
                Become an Agent
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="agent-location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                id="agent-location"
                type="text"
                placeholder="Enter city or area"
                value={searchFilters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="agent-specialty" className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
              <select 
                id="agent-specialty" 
                value={searchFilters.specialty}
                onChange={(e) => handleFilterChange('specialty', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Specialties</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="luxury">Luxury</option>
                <option value="first-time">First-time Buyers</option>
              </select>
            </div>
            <div>
              <label htmlFor="agent-experience" className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
              <select 
                id="agent-experience" 
                value={searchFilters.experience}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Experience</option>
                <option value="1-5">1-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>
            <div>
              <button 
                onClick={handleFindAgents}
                className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <MagnifyingGlassIcon className="h-4 w-4" />
                Find Agents
              </button>
            </div>
          </div>
        </div>

        {/* Featured Agents */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <UserIcon className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Sarah Johnson</h3>
                  <p className="text-gray-600">Senior Real Estate Agent</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">4.9/5 (127 reviews)</span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Experience:</span>
                  <span className="font-semibold">8 years</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Properties Sold:</span>
                  <span className="font-semibold">245</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Specialty:</span>
                  <span className="font-semibold">Luxury Homes</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  <PhoneIcon className="h-4 w-4 inline mr-1" />
                  Call
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  <EnvelopeIcon className="h-4 w-4 inline mr-1" />
                  Email
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Agent Benefits */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Work with Our Agents?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Local Expertise</h3>
              <p className="text-gray-600">Deep knowledge of local market conditions and neighborhoods</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Proven Track Record</h3>
              <p className="text-gray-600">Successfully closed hundreds of transactions</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Always available to answer your questions</p>
            </div>
          </div>
        </div>

        {/* Search Results Section */}
        {showSearchResults && (
          <div id="search-results" className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <UserIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Agent {item}</h3>
                      <div className="flex items-center">
                        <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">4.{item + 2}/5</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Specializes in {searchFilters.specialty || 'all areas'}</p>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
                      Contact
                    </button>
                    <button className="flex-1 border border-blue-600 text-blue-600 py-2 px-3 rounded text-sm hover:bg-blue-50 transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Become an Agent Form */}
        {showAgentForm && (
          <div id="agent-form" className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Become a Real Estate Agent</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    id="first-name"
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    id="last-name"
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">Real Estate Experience</label>
                <select id="experience" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select your experience level</option>
                  <option value="new">New to real estate</option>
                  <option value="1-2">1-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Tell us about yourself</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Why do you want to become a real estate agent?"
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the terms and conditions
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <CheckIcon className="h-4 w-4" />
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={() => setShowAgentForm(false)}
                  className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealEstateAgents;

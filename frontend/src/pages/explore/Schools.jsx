import React, { useState } from 'react';
import { AcademicCapIcon, StarIcon, MagnifyingGlassIcon, CheckIcon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const Schools = () => {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    schoolType: '',
    gradeLevel: '',
    rating: ''
  });

  const handleSearchSchools = () => {
    setShowSearchResults(true);
    setShowComparison(false);
    setTimeout(() => {
      const searchSection = document.getElementById('search-results');
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCompareRatings = () => {
    setShowComparison(true);
    setShowSearchResults(false);
    setTimeout(() => {
      const comparisonSection = document.getElementById('comparison');
      if (comparisonSection) {
        comparisonSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleFilterChange = (key, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleFavorite = (schoolId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(schoolId)) {
        newFavorites.delete(schoolId);
      } else {
        newFavorites.add(schoolId);
      }
      return newFavorites;
    });
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Schools & Education</h1>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Find the best schools in your area and compare educational options. 
              Make informed decisions about your children&apos;s education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleSearchSchools}
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Search Schools
              </button>
              <button 
                onClick={handleCompareRatings}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
              >
                Compare Ratings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Find Schools Near You</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="school-location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                id="school-location"
                type="text"
                placeholder="Enter city or zip code"
                value={searchFilters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="school-type" className="block text-sm font-medium text-gray-700 mb-2">School Type</label>
              <select 
                id="school-type" 
                value={searchFilters.schoolType}
                onChange={(e) => handleFilterChange('schoolType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="public">Public</option>
                <option value="charter">Charter</option>
                <option value="private">Private</option>
                <option value="magnet">Magnet</option>
              </select>
            </div>
            <div>
              <label htmlFor="grade-level" className="block text-sm font-medium text-gray-700 mb-2">Grade Level</label>
              <select 
                id="grade-level" 
                value={searchFilters.gradeLevel}
                onChange={(e) => handleFilterChange('gradeLevel', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Grades</option>
                <option value="elementary">Elementary (K-5)</option>
                <option value="middle">Middle (6-8)</option>
                <option value="high">High School (9-12)</option>
              </select>
            </div>
            <div>
              <button 
                onClick={handleSearchSchools}
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <MagnifyingGlassIcon className="h-4 w-4" />
                Search Schools
              </button>
            </div>
          </div>
        </div>

        {/* School Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <AcademicCapIcon className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Public Schools</h3>
            <p className="text-gray-600 mb-4">Explore public school options and ratings</p>
            <button 
              onClick={() => {
                handleFilterChange('schoolType', 'public');
                handleSearchSchools();
              }}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Public Schools
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <AcademicCapIcon className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Charter Schools</h3>
            <p className="text-gray-600 mb-4">Discover charter school alternatives</p>
            <button 
              onClick={() => {
                handleFilterChange('schoolType', 'charter');
                handleSearchSchools();
              }}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              View Charter Schools
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <AcademicCapIcon className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Private Schools</h3>
            <p className="text-gray-600 mb-4">Find private school options</p>
            <button 
              onClick={() => {
                handleFilterChange('schoolType', 'private');
                handleSearchSchools();
              }}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              View Private Schools
            </button>
          </div>
        </div>

        {/* Featured Schools */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Rated Schools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <AcademicCapIcon className="h-8 w-8 text-blue-500 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold">Lincoln Elementary School</h3>
                      <p className="text-gray-600 text-sm">Public School</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(item)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {favorites.has(item) ? (
                      <HeartSolidIcon className="h-5 w-5 text-red-500" />
                    ) : (
                      <HeartIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">4.8/5</span>
                </div>
                <p className="text-gray-600 mb-4 text-sm">Excellent academic performance with strong community support</p>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Grades K-5</span>
                  <span>450 Students</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* School Comparison */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Compare Schools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">School A</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Rating:</span>
                  <span className="font-semibold">4.8/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Student-Teacher Ratio:</span>
                  <span className="font-semibold">15:1</span>
                </div>
                <div className="flex justify-between">
                  <span>Test Scores:</span>
                  <span className="font-semibold">Above Average</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">School B</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Rating:</span>
                  <span className="font-semibold">4.5/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Student-Teacher Ratio:</span>
                  <span className="font-semibold">18:1</span>
                </div>
                <div className="flex justify-between">
                  <span>Test Scores:</span>
                  <span className="font-semibold">Average</span>
                </div>
              </div>
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
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <AcademicCapIcon className="h-6 w-6 text-blue-600 mr-2" />
                      <div>
                        <h3 className="font-semibold">School {item}</h3>
                        <div className="flex items-center">
                          <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-600">4.{item + 2}/5</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(item + 10)}
                      className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {favorites.has(item + 10) ? (
                        <HeartSolidIcon className="h-4 w-4 text-red-500" />
                      ) : (
                        <HeartIcon className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {searchFilters.schoolType ? `${searchFilters.schoolType.charAt(0).toUpperCase() + searchFilters.schoolType.slice(1)} School` : 'Public School'}
                  </p>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                    <button className="flex-1 border border-blue-600 text-blue-600 py-2 px-3 rounded text-sm hover:bg-blue-50 transition-colors">
                      Compare
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* School Comparison Section */}
        {showComparison && (
          <div id="comparison" className="mt-8 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">School Comparison Tool</h2>
              <button
                onClick={() => setShowComparison(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <AcademicCapIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Select First School</h3>
                <p className="text-gray-500 text-sm mb-4">Choose a school to compare</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Add School
                </button>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <AcademicCapIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Select Second School</h3>
                <p className="text-gray-500 text-sm mb-4">Choose another school to compare</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Add School
                </button>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparison Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Academic Performance</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Student-Teacher Ratio</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Extracurricular Activities</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Safety Ratings</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Parent Reviews</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Transportation Options</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schools;

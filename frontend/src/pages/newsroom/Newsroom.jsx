import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  MapPinIcon,
  ChartBarIcon,
  ShareIcon,
  PhoneIcon,
  TrophyIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  UserIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  NewspaperIcon,
  ArrowRightIcon,
  BookOpenIcon,
  PhotoIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';

const Newsroom = () => {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    category: '',
    dateRange: '',
    keyword: ''
  });
  const handleSearchNews = () => {
    setShowSearchResults(true);
    // Scroll to search results
    setTimeout(() => {
      document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleContactPress = () => {
    setShowContactForm(true);
    // Scroll to contact form
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFilterChange = (filter, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };

  const newsArticles = [
    {
      id: 1,
      title: "Ivorian Realty Reports Record Q3 Growth with 25% Increase in Property Sales",
      excerpt: "The company achieved its best quarterly performance, with significant growth across all major markets and a 25% increase in property transactions compared to the previous quarter.",
      content: "Ivorian Realty has announced record-breaking growth for the third quarter of 2024, with a 25% increase in property sales compared to the same period last year. The company attributes this success to its innovative digital platform, expanded market presence, and enhanced customer service initiatives. CEO Sarah Johnson stated, 'This quarter represents a milestone in our company&apos;s growth trajectory, demonstrating our commitment to delivering exceptional value to our clients.'",
      author: "Sarah Johnson",
      publishDate: "2024-01-15",
      category: "Company News",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      tags: ["Growth", "Q3 Results", "Market Performance"],
      featured: true
    },
    {
      id: 2,
      title: "New AI-Powered Property Valuation Tool Launched",
      excerpt: "Ivorian Realty introduces cutting-edge artificial intelligence technology to provide more accurate and faster property valuations for clients.",
      content: "Ivorian Realty has launched its revolutionary AI-powered property valuation tool, designed to provide more accurate and faster property assessments. The new technology leverages machine learning algorithms and real-time market data to deliver valuations with 98.5% accuracy. This innovation is expected to significantly improve the property buying and selling experience for clients.",
      author: "Michael Chen",
      publishDate: "2024-01-12",
      category: "Technology",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      tags: ["AI", "Technology", "Innovation"],
      featured: true
    },
    {
      id: 3,
      title: "Market Analysis: Real Estate Trends for 2024",
      excerpt: "Our experts analyze the current real estate market conditions and provide insights into what to expect in 2024.",
      content: "The real estate market in 2024 is showing promising signs of stability and growth. Key trends include increased demand for sustainable properties, the rise of smart home technology, and a shift towards suburban living. Our market analysts predict continued growth in the luxury segment while affordable housing remains a priority for many buyers.",
      author: "Emily Rodriguez",
      publishDate: "2024-01-10",
      category: "Market Analysis",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      tags: ["Market Trends", "2024 Outlook", "Analysis"],
      featured: false
    },
    {
      id: 4,
      title: "Ivorian Realty Expands to 5 New Cities",
      excerpt: "The company announces its expansion into five new metropolitan areas, bringing its services to more clients nationwide.",
      content: "Ivorian Realty has successfully expanded its operations to five new cities: Denver, Portland, Miami, Austin, and Seattle. This expansion represents a 40% increase in the company&apos;s market coverage and is expected to serve over 50,000 additional clients. The expansion includes the opening of new offices and the hiring of 200+ new team members.",
      author: "David Thompson",
      publishDate: "2024-01-08",
      category: "Expansion",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      tags: ["Expansion", "Growth", "New Markets"],
      featured: false
    },
    {
      id: 5,
      title: "Sustainable Real Estate: The Future of Property Development",
      excerpt: "Exploring how sustainability is reshaping the real estate industry and what it means for buyers and investors.",
      content: "Sustainability is becoming a key factor in real estate decisions, with eco-friendly properties commanding premium prices and faster sales. Green building certifications, energy-efficient systems, and sustainable materials are increasingly important to buyers. This trend is expected to continue growing as environmental consciousness rises among property buyers and investors.",
      author: "Lisa Wang",
      publishDate: "2024-01-05",
      category: "Sustainability",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      tags: ["Sustainability", "Green Building", "Future Trends"],
      featured: false
    },
    {
      id: 6,
      title: "Customer Success Story: From First-Time Buyer to Real Estate Investor",
      excerpt: "Follow the journey of a client who started as a first-time homebuyer and became a successful real estate investor with Ivorian Realty&apos;s guidance.",
      content: "Meet Jennifer Martinez, who started her real estate journey as a first-time homebuyer in 2019 and has since built a portfolio of five investment properties. With guidance from Ivorian Realty&apos;s investment specialists, Jennifer has achieved a 300% return on her initial investment and now helps other first-time buyers navigate the market.",
      author: "Jennifer Martinez",
      publishDate: "2024-01-03",
      category: "Success Stories",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
      tags: ["Success Story", "Investment", "Client Journey"],
      featured: false
    }
  ];

  const categories = [
    { name: 'Company News', count: 15, icon: BuildingOfficeIcon },
    { name: 'Technology', count: 8, icon: ComputerDesktopIcon },
    { name: 'Market Analysis', count: 12, icon: ChartBarIcon },
    { name: 'Sustainability', count: 6, icon: GlobeAltIcon },
    { name: 'Success Stories', count: 10, icon: TrophyIcon },
    { name: 'Expansion', count: 4, icon: MapPinIcon }
  ];

  const pressReleases = [
    {
      title: "Ivorian Realty Named Best Real Estate Platform 2024",
      date: "2024-01-20",
      summary: "Industry recognition for innovation and customer service excellence"
    },
    {
      title: "Partnership with Leading Mortgage Lenders Announced",
      date: "2024-01-18",
      summary: "New financing options for homebuyers across all markets"
    },
    {
      title: "Sustainability Initiative: Carbon-Neutral Operations by 2025",
      date: "2024-01-16",
      summary: "Commitment to environmental responsibility in real estate"
    }
  ];

  const mediaResources = [
    {
      title: "Company Logo Package",
      description: "High-resolution logos and brand assets",
      type: "Download",
      icon: PhotoIcon
    },
    {
      title: "Executive Headshots",
      description: "Professional photos of leadership team",
      type: "Download",
      icon: UserIcon
    },
    {
      title: "Company Fact Sheet",
      description: "Key statistics and company information",
      type: "Download",
      icon: DocumentTextIcon
    },
    {
      title: "Press Contact Information",
      description: "Media inquiries and press contact details",
      type: "Contact",
      icon: PhoneIcon
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-purple-100">
              Newsroom
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Stay updated with the latest news, insights, and announcements from Ivorian Realty. Discover industry trends, company updates, and success stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleSearchNews}
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Search News
              </button>
              <button
                onClick={handleContactPress}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200"
              >
                Contact Press
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured News Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured News</h2>
            <p className="text-lg text-gray-600">Latest updates and important announcements</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {newsArticles.filter(article => article.featured).map((article) => (
              <div key={article.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80';
                      }}
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {article.readTime}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <CalendarDaysIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">{new Date(article.publishDate).toLocaleDateString()}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">By {article.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <button className="text-blue-600 hover:text-blue-800 font-semibold flex items-center">
                      Read More
                      <ArrowRightIcon className="h-4 w-4 ml-1" />
                    </button>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                        <ShareIcon className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                        <BookOpenIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">News Categories</h2>
            <p className="text-lg text-gray-600">Browse news by category</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    handleFilterChange('category', category.name);
                    handleSearchNews();
                  }}
                  className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-200 group"
                >
                  <IconComponent className="h-8 w-8 text-gray-600 group-hover:text-blue-600 mx-auto mb-3 flex-shrink-0" />
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} articles</p>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Search News</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  value={searchFilters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  <option value="Company News">Company News</option>
                  <option value="Technology">Technology</option>
                  <option value="Market Analysis">Market Analysis</option>
                  <option value="Sustainability">Sustainability</option>
                  <option value="Success Stories">Success Stories</option>
                  <option value="Expansion">Expansion</option>
                </select>
              </div>
              <div>
                <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <select
                  id="dateRange"
                  value={searchFilters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Time</option>
                  <option value="last-week">Last Week</option>
                  <option value="last-month">Last Month</option>
                  <option value="last-quarter">Last Quarter</option>
                  <option value="last-year">Last Year</option>
                </select>
              </div>
              <div>
                <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-2">
                  Keyword
                </label>
                <input
                  type="text"
                  id="keyword"
                  value={searchFilters.keyword}
                  onChange={(e) => handleFilterChange('keyword', e.target.value)}
                  placeholder="Search articles..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleSearchNews}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                Search News
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* All News Articles */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All News Articles</h2>
            <p className="text-lg text-gray-600">Complete archive of our news and insights</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <div key={article.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80';
                      }}
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {article.readTime}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <CalendarDaysIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">{new Date(article.publishDate).toLocaleDateString()}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">By {article.author}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <button className="text-blue-600 hover:text-blue-800 font-semibold flex items-center">
                      Read More
                      <ArrowRightIcon className="h-4 w-4 ml-1" />
                    </button>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                        <ShareIcon className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                        <BookOpenIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Press Releases Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Press Releases</h2>
            <p className="text-lg text-gray-600">Official announcements and press statements</p>
          </div>
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{release.title}</h3>
                    <p className="text-gray-600 mb-3">{release.summary}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarDaysIcon className="h-4 w-4 mr-2" />
                      <span>{new Date(release.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                    Read Release
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Media Resources Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Media Resources</h2>
            <p className="text-lg text-gray-600">Assets and information for media professionals</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaResources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                      {resource.type}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search Results Section */}
      {showSearchResults && (
        <div id="search-results" className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Search Results</h2>
              <p className="text-lg text-gray-600">Found {newsArticles.length} articles matching your search</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.map((article) => (
                <div key={article.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80';
                        }}
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {article.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <CalendarDaysIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">{new Date(article.publishDate).toLocaleDateString()}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">By {article.author}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <button className="text-blue-600 hover:text-blue-800 font-semibold flex items-center">
                        Read More
                        <ArrowRightIcon className="h-4 w-4 ml-1" />
                      </button>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                          <ShareIcon className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                          <BookOpenIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Section */}
      {showContactForm && (
        <div id="contact-form" className="bg-blue-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Press Team</h2>
                <p className="text-lg text-gray-600">Get in touch with our media relations team</p>
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
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                      Organization
                    </label>
                    <input
                      type="text"
                      id="organization"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your organization"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select inquiry type</option>
                    <option value="interview">Interview Request</option>
                    <option value="press-release">Press Release</option>
                    <option value="media-kit">Media Kit Request</option>
                    <option value="expert-comment">Expert Comment</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your inquiry or request"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Send Inquiry
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
            <h2 className="text-3xl font-bold text-white mb-4">Why Follow Our News</h2>
            <p className="text-xl text-purple-100">Stay informed with industry insights and company updates</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <NewspaperIcon className="h-8 w-8 text-black flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Latest News</h3>
              <p className="text-purple-100">Stay updated with the latest company news and industry developments</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <ChartBarIcon className="h-8 w-8 text-black flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Market Insights</h3>
              <p className="text-purple-100">Expert analysis and market trends from our industry professionals</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <TrophyIcon className="h-8 w-8 text-black flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Success Stories</h3>
              <p className="text-purple-100">Real stories from our clients and their real estate journeys</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <GlobeAltIcon className="h-8 w-8 text-black flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Global Perspective</h3>
              <p className="text-purple-100">International real estate trends and global market insights</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Connected</h2>
          <p className="text-xl text-purple-100 mb-8">
            Subscribe to our newsletter and never miss important updates about the real estate market and our company.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleSearchNews}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Browse All News
            </button>
            <button
              onClick={handleContactPress}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200"
            >
              Contact Press Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsroom;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import LanguageSwitcher from '../LanguageSwitcher';
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserIcon, 
  HomeIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  PlusIcon,
  ChevronDownIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  SparklesIcon,
  FireIcon,
  StarIcon,
  ClockIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [favoriteCount] = useState(12);
  const [clickedDropdown, setClickedDropdown] = useState(null);
  const { user, isAuthenticated, logout } = useAuth();

  const getRoleDisplayName = (role) => {
    const roleMap = {
      buyer: 'Buyer',
      tenant: 'Tenant',
      owner: 'Owner',
      dealer: 'Agent',
      builder: 'Builder',
      admin: 'Admin'
    };
    return roleMap[role] || 'User';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search page with query
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 2) {
      // Mock search suggestions
      const suggestions = [
        'Houses for sale in downtown',
        'Apartments for rent',
        'Commercial properties',
        'Luxury homes',
        'New construction'
      ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    window.location.href = `/search?q=${encodeURIComponent(suggestion)}`;
  };


  const clearNotifications = () => {
    setNotificationCount(0);
  };

  const handleDropdownClick = (index) => {
    if (clickedDropdown === index) {
      setClickedDropdown(null);
      setActiveDropdown(null);
    } else {
      setClickedDropdown(index);
      setActiveDropdown(index);
    }
  };

  const handleLabelClick = (label) => {
    // Handle label clicks - could navigate to category pages or show more options
    console.log(`Label clicked: ${label}`);
    // You can add navigation logic here
    // For example: navigate to a category page
    // window.location.href = `/category/${label.toLowerCase().replace(/\s+/g, '-')}`;
  };

  const handleSubmenuClick = (submenuName, path) => {
    console.log(`Submenu clicked: ${submenuName} -> ${path}`);
    // You can add analytics or additional logic here
  };

  const handleDropdownMouseEnter = (index) => {
    if (clickedDropdown === null) {
      setActiveDropdown(index);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (clickedDropdown === null) {
      setActiveDropdown(null);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
      if (activeDropdown !== null && !event.target.closest('.dropdown-menu')) {
        setActiveDropdown(null);
        setClickedDropdown(null);
      }
      if (showSuggestions && !event.target.closest('.search-container')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen, activeDropdown, showSuggestions]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const navigationItems = [
    {
      label: t('navigation.buyRent'),
      dropdown: [
        { label: 'Buy', submenu: [
          { name: 'Single Family Homes', path: '/single-family-homes' },
          { name: 'Townhouses/Condos', path: '/townhouses-condos' },
          { name: 'Multi-Family Homes', path: '/search' },
          { name: 'Land and Lots', path: '/search' },
          { name: 'Country Homes/Acreage', path: '/search' },
          { name: 'Mid/High-Rise Condos', path: '/search' },
          { name: 'Search by Map', path: '/search' }
        ]},
        { label: 'Rent', submenu: [
          { name: 'Rental Search', path: '/rental-search' },
          { name: 'Single Family Homes', path: '/search' },
          { name: 'Townhouses/Condos', path: '/search' },
          { name: 'Multi-Family Homes', path: '/search' },
          { name: 'Mid/High-Rise Condos', path: '/search' },
          { name: 'Apartments', path: '/search' },
          { name: 'Search by Map', path: '/search' }
        ]},
        { label: 'Specialties', submenu: [
          { name: 'Drive Time', path: '/search' },
          { name: 'Just Listed', path: '/search' },
          { name: 'Open Houses', path: '/search' },
          { name: 'New Homes', path: '/search' },
          { name: 'Luxury Homes', path: '/search' },
          { name: 'Land and Lots', path: '/search' },
          { name: 'Price Reduction', path: '/search' },
          { name: 'Foreclosure', path: '/search' },
          { name: 'Commercial Properties', path: '/search' }
        ]}
      ]
    },
    {
      label: t('navigation.homeValues'),
      dropdown: [
        { label: 'Search & Compare', submenu: [
          { name: 'Home Values Search', path: '/home-values-search' },
          { name: 'Compare Home Values Instantly', path: '/home-values-search' },
          { name: 'Track Home Value', path: '/home-values-search' }
        ]},
        { label: 'Resources', submenu: [
          { name: 'List of Appraisal Districts', path: '/home-values-search' },
          { name: 'Home Value Resource', path: '/home-values-search' },
          { name: 'Videos About Home Values', path: '/home-values-search' }
        ]}
      ]
    },
    {
      label: t('navigation.explore'),
      dropdown: [
        { label: 'Schools', submenu: [
          { name: 'Public Schools', path: '/schools' },
          { name: 'Charter Schools', path: '/schools' },
          { name: 'Private Schools', path: '/schools' },
          { name: 'Compare Schools', path: '/schools' }
        ]},
        { label: 'Communities', submenu: [
          { name: 'Neighborhoods', path: '/search' },
          { name: 'High-Rise Living', path: '/search' },
          { name: 'Master-Planned Communities', path: '/search' },
          { name: 'Golf Course Communities', path: '/search' }
        ]},
        { label: 'Resources', submenu: [
          { name: 'Flood Resource', path: '/search' },
          { name: 'Ask a Pro', path: '/search' },
          { name: 'Real Estate Blogs', path: '/search' },
          { name: 'Knowledge Videos', path: '/search' }
        ]}
      ]
    },
    {
      label: t('navigation.agents'),
      dropdown: [
        { label: 'Find Agents', submenu: [
          { name: 'Real Estate Agents', path: '/real-estate-agents' },
          { name: 'Agents with Ratings', path: '/real-estate-agents' },
          { name: 'Platinum Agents', path: '/real-estate-agents' },
          { name: 'Multi-lingual Agents', path: '/real-estate-agents' }
        ]},
        { label: 'Services', submenu: [
          { name: 'Real Estate Firms', path: '/real-estate-agents' },
          { name: 'Service Providers', path: '/real-estate-agents' }
        ]}
      ]
    },
    {
      label: t('navigation.mortgage'),
      dropdown: [
        { label: 'Tools & Rates', submenu: [
          { name: 'Mortgage Center', path: '/mortgage-center' },
          { name: 'Mortgage Rates Nearby', path: '/mortgage-center' },
          { name: 'Mortgage Calculator', path: '/mortgage-center' }
        ]},
        { label: 'Resources', submenu: [
          { name: 'Mortgage & Finance Articles', path: '/mortgage-center' },
          { name: 'Down Payment Assistance Programs', path: '/mortgage-center' }
        ]}
      ]
    }
  ];

  return (
    <header className={`bg-white shadow-lg sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-xl' : 'shadow-lg'
    }`}>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 sm:py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row justify-between items-center text-xs sm:text-sm py-1">
            <div className="flex items-center">
              <span className="text-xs sm:text-sm">{t('header.welcomeMessage')}</span>
              <span className="hidden sm:inline text-xs sm:text-sm ml-4">{t('header.subtitle')}</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <UserIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm truncate max-w-20 sm:max-w-none">{user?.firstName} {user?.lastName}</span>
                  <span className="text-xs hidden sm:inline">({getRoleDisplayName(user?.role)})</span>
                </div>
              ) : (
                <>
                  <Link to="/register" className="hover:underline text-xs sm:text-sm">{t('navigation.signUp')}</Link>
                  <span className="hidden sm:inline">/</span>
                  <Link to="/login" className="hover:underline text-xs sm:text-sm">{t('navigation.signIn')}</Link>
                </>
              )}
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1 sm:space-x-2">
            <HomeIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <span className="text-lg sm:text-2xl font-bold text-gray-900">Ivorian Realty</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative w-full search-container">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('header.searchPlaceholder')}
                  value={searchQuery}
                  onChange={handleSearchInput}
                  onFocus={() => searchQuery.length > 2 && setShowSuggestions(true)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setShowSuggestions(false);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              {/* Search Suggestions */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 flex items-center"
                    >
                      <MagnifyingGlassIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative dropdown-menu">
                <button
                  onClick={() => handleDropdownClick(index)}
                  onMouseEnter={() => handleDropdownMouseEnter(index)}
                  onMouseLeave={handleDropdownMouseLeave}
                  className={`flex items-center space-x-1 py-2 text-sm xl:text-base transition-all duration-200 relative ${
                    activeDropdown === index 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <span className="relative">
                    {item.label}
                    {activeDropdown === index && (
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 animate-pulse"></div>
                    )}
                  </span>
                  <ChevronDownIcon className={`h-3 w-3 xl:h-4 xl:w-4 transition-transform duration-200 ${
                    activeDropdown === index ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {activeDropdown === index && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-56 xl:w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 transform transition-all duration-300 ease-out animate-in slide-in-from-top-2 fade-in"
                    onMouseEnter={() => setActiveDropdown(index)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {/* Scroll indicators */}
                    <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>
                    
                    {/* Scrollable content container */}
                    <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                      <div className="py-3">
                        {item.dropdown.map((dropdownItem, idx) => (
                          <div key={idx}>
                            {dropdownItem.name ? (
                              <Link
                                to={dropdownItem.path}
                                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 rounded-lg mx-2 group relative"
                                onClick={() => {
                                  handleSubmenuClick(dropdownItem.name, dropdownItem.path);
                                  setActiveDropdown(null);
                                  setClickedDropdown(null);
                                }}
                              >
                                <div className="w-2 h-2 bg-blue-100 rounded-full mr-3 group-hover:bg-blue-500 transition-colors duration-200"></div>
                                <span className="flex-1">{dropdownItem.name}</span>
                                {dropdownItem.name.includes('New') && (
                                  <SparklesIcon className="h-3 w-3 ml-2 text-yellow-500 animate-pulse" />
                                )}
                                {dropdownItem.name.includes('Hot') && (
                                  <FireIcon className="h-3 w-3 ml-2 text-red-500 animate-bounce" />
                                )}
                                {dropdownItem.name.includes('Popular') && (
                                  <StarIcon className="h-3 w-3 ml-2 text-purple-500" />
                                )}
                                {dropdownItem.name.includes('Just Listed') && (
                                  <ClockIcon className="h-3 w-3 ml-2 text-green-500" />
                                )}
                                {dropdownItem.name.includes('Open Houses') && (
                                  <EyeIcon className="h-3 w-3 ml-2 text-blue-500" />
                                )}
                                {/* Hover effect overlay */}
                                <div className="absolute inset-0 bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                              </Link>
                            ) : (
                              <div className="px-4 py-2">
                                <button
                                  onClick={() => handleLabelClick(dropdownItem.label)}
                                  className="w-full font-semibold text-gray-900 mb-2 text-sm flex items-center sticky top-0 bg-white py-1 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                                >
                                  <div className="w-1 h-4 bg-blue-500 rounded-full mr-2 group-hover:bg-blue-600 transition-colors duration-200"></div>
                                  <span className="flex-1 text-left">{dropdownItem.label}</span>
                                  <div className="w-2 h-2 bg-blue-100 rounded-full group-hover:bg-blue-500 transition-colors duration-200"></div>
                                </button>
                                <div className="space-y-1">
                                  {dropdownItem.submenu?.map((subItem, subIdx) => (
                                    <Link
                                      key={subIdx}
                                      to={subItem.path}
                                      className="flex items-center px-6 py-2 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                                      onClick={() => {
                                        handleSubmenuClick(subItem.name, subItem.path);
                                        setActiveDropdown(null);
                                        setClickedDropdown(null);
                                      }}
                                    >
                                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3 group-hover:bg-blue-500 transition-colors duration-200"></div>
                                      <span className="flex-1">{subItem.name}</span>
                                      {subItem.name.includes('New') && (
                                        <StarIcon className="h-3 w-3 ml-2 text-yellow-500" />
                                      )}
                                      {subItem.name.includes('Hot') && (
                                        <FireIcon className="h-3 w-3 ml-2 text-red-500" />
                                      )}
                                      {subItem.name.includes('Popular') && (
                                        <SparklesIcon className="h-3 w-3 ml-2 text-purple-500" />
                                      )}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Scroll indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-1 sm:space-x-2">

            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
            >
              <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {isAuthenticated && (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button 
                    onClick={clearNotifications}
                    className="p-1.5 sm:p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-all duration-200 relative group"
                  >
                    <BellIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse">
                        {notificationCount}
                      </span>
                    )}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {notificationCount > 0 ? `${notificationCount} new notifications` : 'No notifications'}
                    </div>
                  </button>
                </div>

                <Link to="/favorites" className="p-1.5 sm:p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-all duration-200 relative group">
                  <HeartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  {favoriteCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-pink-500 rounded-full text-xs text-white flex items-center justify-center">
                      {favoriteCount}
                    </span>
                  )}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {favoriteCount} saved properties
                  </div>
                </Link>
                
                {(user?.role === 'owner' || user?.role === 'dealer' || user?.role === 'builder') && (
                  <Link to="/list-property" className="p-1.5 sm:p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200">
                    <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                )}

                {/* User Profile Dropdown */}
                <div className="relative user-menu">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-1 p-1.5 sm:p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <UserCircleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline text-sm font-medium">{user?.firstName} {user?.lastName}</span>
                    <ChevronDownIcon className="h-3 w-3" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 z-50 transform transition-all duration-300 ease-out animate-in slide-in-from-top-2 fade-in">
                      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {user?.firstName?.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-semibold text-gray-900">{user?.firstName} {user?.lastName}</p>
                            <div className="text-xs text-gray-500 flex items-center">
                              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                              {user?.firstName} {user?.lastName}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 rounded-lg mx-2 group"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <UserIcon className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                          <span>{t('navigation.profile')}</span>
                          <div className="ml-auto w-2 h-2 bg-blue-100 rounded-full group-hover:bg-blue-500 transition-colors duration-200"></div>
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 rounded-lg mx-2 group"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Cog6ToothIcon className="h-4 w-4 mr-3 group-hover:rotate-90 transition-transform duration-200" />
                          <span>{t('navigation.settings')}</span>
                          <div className="ml-auto w-2 h-2 bg-blue-100 rounded-full group-hover:bg-blue-500 transition-colors duration-200"></div>
                        </Link>
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button 
                            onClick={async () => {
                              try {
                                await logout();
                                setIsUserMenuOpen(false);
                                window.location.href = '/';
                              } catch (error) {
                                console.error('Logout error:', error);
                              }
                            }}
                            className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 rounded-lg mx-2 group"
                          >
                            <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                            <span>{t('navigation.signOut')}</span>
                            <div className="ml-auto w-2 h-2 bg-red-100 rounded-full group-hover:bg-red-500 transition-colors duration-200"></div>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Bars3Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white p-4 search-container">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('header.searchPlaceholder')}
                  value={searchQuery}
                  onChange={handleSearchInput}
                  onFocus={() => searchQuery.length > 2 && setShowSuggestions(true)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setShowSuggestions(false);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              {/* Mobile Search Suggestions */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 flex items-center"
                    >
                      <MagnifyingGlassIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {navigationItems.map((item, index) => (
                <div key={index} className="border-b border-gray-100 last:border-b-0">
                  <button
                    onClick={() => handleDropdownClick(index)}
                    className="w-full px-3 py-2 text-sm font-medium text-gray-900 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
                  >
                    <span>{item.label}</span>
                    <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                      activeDropdown === index ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {activeDropdown === index && (
                    <div className="space-y-1 bg-blue-50 rounded-lg mx-2 mb-2">
                      {item.dropdown.map((dropdownItem, idx) => {
                        if (dropdownItem.name) {
                          return (
                            <Link
                              key={idx}
                              to={dropdownItem.path}
                              className="flex items-center px-6 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-100 transition-colors duration-150 group relative"
                              onClick={() => {
                                handleSubmenuClick(dropdownItem.name, dropdownItem.path);
                                setIsMenuOpen(false);
                                setActiveDropdown(null);
                                setClickedDropdown(null);
                              }}
                            >
                              <div className="w-2 h-2 bg-blue-200 rounded-full mr-3 group-hover:bg-blue-500 transition-colors duration-200"></div>
                              <span className="flex-1">{dropdownItem.name}</span>
                              {dropdownItem.name.includes('New') && (
                                <SparklesIcon className="h-3 w-3 text-yellow-500 animate-pulse" />
                              )}
                              {dropdownItem.name.includes('Hot') && (
                                <FireIcon className="h-3 w-3 text-red-500 animate-bounce" />
                              )}
                              {dropdownItem.name.includes('Popular') && (
                                <StarIcon className="h-3 w-3 text-purple-500" />
                              )}
                              {dropdownItem.name.includes('Just Listed') && (
                                <ClockIcon className="h-3 w-3 text-green-500" />
                              )}
                              {dropdownItem.name.includes('Open Houses') && (
                                <EyeIcon className="h-3 w-3 text-blue-500" />
                              )}
                              {/* Hover effect overlay */}
                              <div className="absolute inset-0 bg-blue-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                            </Link>
                          );
                        } else {
                          return (
                            <div key={idx} className="px-4 py-2">
                              <button
                                onClick={() => handleLabelClick(dropdownItem.label)}
                                className="w-full font-semibold text-gray-800 mb-2 text-sm flex items-center hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 group py-2"
                              >
                                <div className="w-1 h-4 bg-blue-500 rounded-full mr-2 group-hover:bg-blue-600 transition-colors duration-200"></div>
                                <span className="flex-1 text-left">{dropdownItem.label}</span>
                                <div className="w-2 h-2 bg-blue-200 rounded-full group-hover:bg-blue-500 transition-colors duration-200"></div>
                              </button>
                              <div className="space-y-1">
                                {dropdownItem.submenu?.map((subItem, subIdx) => (
                                  <Link
                                    key={subIdx}
                                    to={subItem.path}
                                    className="flex items-center px-8 py-2 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-150 group"
                                    onClick={() => {
                                      handleSubmenuClick(subItem.name, subItem.path);
                                      setIsMenuOpen(false);
                                      setActiveDropdown(null);
                                      setClickedDropdown(null);
                                    }}
                                  >
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 group-hover:bg-blue-500 transition-colors duration-200"></div>
                                    <span className="flex-1">{subItem.name}</span>
                                    {subItem.name.includes('New') && (
                                      <StarIcon className="h-3 w-3 text-yellow-500" />
                                    )}
                                    {subItem.name.includes('Hot') && (
                                      <FireIcon className="h-3 w-3 text-red-500" />
                                    )}
                                    {subItem.name.includes('Popular') && (
                                      <SparklesIcon className="h-3 w-3 text-purple-500" />
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile User Actions */}
              {isAuthenticated && (
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="px-3 py-2 text-sm font-medium text-gray-900 bg-gray-50">
                    Account
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center px-6 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserIcon className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  <Link
                    to="/favorites"
                    className="flex items-center px-6 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <HeartIcon className="h-4 w-4 mr-2" />
                    Favorites
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-6 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Cog6ToothIcon className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                  <button 
                    onClick={async () => {
                      try {
                        await logout();
                        setIsMenuOpen(false);
                        window.location.href = '/';
                      } catch (error) {
                        console.error('Logout error:', error);
                      }
                    }}
                    className="flex items-center w-full px-6 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

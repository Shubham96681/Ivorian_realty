import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserIcon, 
  HomeIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  PlusIcon,
  ChevronDownIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  BellIcon,
  SunIcon,
  MoonIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated } = useAuth();

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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Add theme toggle logic here
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
      if (activeDropdown !== null && !event.target.closest('.dropdown-menu')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen, activeDropdown]);

  const navigationItems = [
    {
      label: 'Buy/Rent',
      dropdown: [
        { label: 'Buy', submenu: [
          'Single Family Homes', 'Townhouses/Condos', 'Multi-Family Homes', 
          'Land and Lots', 'Country Homes/Acreage', 'Mid/High-Rise Condos', 'Search by Map'
        ]},
        { label: 'Rent', submenu: [
          'Rental Search', 'Single Family Homes', 'Townhouses/Condos', 
          'Multi-Family Homes', 'Mid/High-Rise Condos', 'Apartments', 'Search by Map'
        ]},
        { label: 'Specialties', submenu: [
          'Drive Time', 'Just Listed', 'Open Houses', 'New Homes', 
          'Luxury Homes', 'Land and Lots', 'Price Reduction', 'Foreclosure', 'Commercial Properties'
        ]}
      ]
    },
    {
      label: 'Home Values',
      dropdown: [
        'Home Values Search', 'Track Home Value', 'Compare Home Values Instantly', 
        'List of Appraisal Districts', 'Home Value Resource', 'Videos About Home Values'
      ]
    },
    {
      label: 'Explore',
      dropdown: [
        { label: 'Schools', submenu: ['Public Schools', 'Charter Schools', 'Private Schools', 'Compare Schools']},
        { label: 'Communities', submenu: ['Neighborhoods', 'High-Rise Living', 'Master-Planned Communities', 'Golf Course Communities']},
        { label: 'Resources', submenu: ['Flood Resource', 'Ask a Pro', 'Real Estate Blogs', 'Knowledge Videos']}
      ]
    },
    {
      label: 'Agents',
      dropdown: [
        'Real Estate Agents', 'Agents with Ratings', 'Platinum Agents', 
        'Multi-lingual Agents', 'Real Estate Firms', 'Service Providers'
      ]
    },
    {
      label: 'Mortgage',
      dropdown: [
        'Mortgage Center', 'Mortgage Rates Nearby', 'Mortgage Calculator', 
        'Mortgage & Finance Articles', 'Down Payment Assistance Programs'
      ]
    }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2 sm:py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row justify-between items-center text-xs sm:text-sm py-1">
            <div className="flex items-center">
              <span className="text-xs sm:text-sm">Enjoy all Benefits of Ivorian Realty</span>
              <span className="hidden sm:inline text-xs sm:text-sm ml-4">Save searches and favorites, ask questions, and connect with agents</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <UserIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm truncate max-w-20 sm:max-w-none">{user?.name}</span>
                  <span className="text-xs hidden sm:inline">({getRoleDisplayName(user?.role)})</span>
                </div>
              ) : (
                <>
                  <Link to="/register" className="hover:underline text-xs sm:text-sm">Sign up</Link>
                  <span className="hidden sm:inline">/</span>
                  <Link to="/login" className="hover:underline text-xs sm:text-sm">Sign In</Link>
                </>
              )}
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
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative dropdown-menu">
                <button
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 py-2 text-sm xl:text-base transition-colors duration-200"
                >
                  <span>{item.label}</span>
                  <ChevronDownIcon className="h-3 w-3 xl:h-4 xl:w-4" />
                </button>
                
                {activeDropdown === index && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-56 xl:w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200"
                    onMouseEnter={() => setActiveDropdown(index)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.dropdown.map((dropdownItem, idx) => (
                      <div key={idx}>
                        {typeof dropdownItem === 'string' ? (
                          <Link
                            to={`/${dropdownItem.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                          >
                            {dropdownItem}
                          </Link>
                        ) : (
                          <div className="px-4 py-2">
                            <div className="font-medium text-gray-900 mb-1 text-sm">{dropdownItem.label}</div>
                            {dropdownItem.submenu?.map((subItem, subIdx) => (
                              <Link
                                key={subIdx}
                                to={`/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block px-2 py-1 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors duration-150"
                              >
                                {subItem}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <SunIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <MoonIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>

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
                  <button className="p-1.5 sm:p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200">
                    <BellIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
                  </button>
                </div>

                <Link to="/favorites" className="p-1.5 sm:p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200">
                  <HeartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
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
                    <span className="hidden sm:inline text-sm font-medium">{user?.name}</span>
                    <ChevronDownIcon className="h-3 w-3" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{getRoleDisplayName(user?.role)}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <UserIcon className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Cog6ToothIcon className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                      <div className="border-t border-gray-100 mt-1">
                        <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150">
                          <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                          Sign Out
                        </button>
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
          <div className="md:hidden border-t border-gray-200 bg-white p-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 max-h-96 overflow-y-auto">
              {navigationItems.map((item, index) => (
                <div key={index} className="border-b border-gray-100 last:border-b-0">
                  <div className="px-3 py-2 text-sm font-medium text-gray-900 bg-gray-50 flex items-center justify-between">
                    <span>{item.label}</span>
                    <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="space-y-1">
                    {item.dropdown.slice(0, 3).map((dropdownItem, idx) => {
                      const itemText = typeof dropdownItem === 'string' ? dropdownItem : dropdownItem.label;
                      const itemPath = itemText.toLowerCase().replace(/\s+/g, '-');
                      return (
                        <Link
                          key={idx}
                          to={`/${itemPath}`}
                          className="block px-6 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {itemText}
                        </Link>
                      );
                    })}
                  </div>
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
                  <button className="flex items-center w-full px-6 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150">
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

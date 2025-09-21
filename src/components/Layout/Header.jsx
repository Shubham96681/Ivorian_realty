import { useState } from 'react';
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
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
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
      <div className="bg-blue-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>Enjoy all Benefits of Ivorian Realty</span>
              <span>Save searches and favorites, ask questions, and connect with agents</span>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-4 w-4" />
                  <span>{user?.name}</span>
                  <span className="text-xs">({getRoleDisplayName(user?.role)})</span>
                </div>
              ) : (
                <>
                  <Link to="/register" className="hover:underline">Sign up / Create an account</Link>
                  <Link to="/login" className="hover:underline">Sign In</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <HomeIcon className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Ivorian Realty</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative">
                <button
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 py-2"
                >
                  <span>{item.label}</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
                
                {activeDropdown === index && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg py-2 z-50"
                    onMouseEnter={() => setActiveDropdown(index)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.dropdown.map((dropdownItem, idx) => (
                      <div key={idx}>
                        {typeof dropdownItem === 'string' ? (
                          <Link
                            to={`/${dropdownItem.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {dropdownItem}
                          </Link>
                        ) : (
                          <div className="px-4 py-2">
                            <div className="font-medium text-gray-900 mb-1">{dropdownItem.label}</div>
                            {dropdownItem.submenu?.map((subItem, subIdx) => (
                              <Link
                                key={subIdx}
                                to={`/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block px-2 py-1 text-sm text-gray-600 hover:text-blue-600"
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
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <>
                <Link to="/favorites" className="text-gray-700 hover:text-blue-600">
                  <HeartIcon className="h-6 w-6" />
                </Link>
                {(user?.role === 'owner' || user?.role === 'dealer' || user?.role === 'builder') && (
                  <Link to="/list-property" className="text-gray-700 hover:text-blue-600">
                    <PlusIcon className="h-6 w-6" />
                  </Link>
                )}
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item, index) => (
                <div key={index}>
                  <div className="px-3 py-2 text-sm font-medium text-gray-900">
                    {item.label}
                  </div>
                  {item.dropdown.slice(0, 3).map((dropdownItem, idx) => (
                    <Link
                      key={idx}
                      to={`/${dropdownItem.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block px-6 py-2 text-sm text-gray-600 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {typeof dropdownItem === 'string' ? dropdownItem : dropdownItem.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

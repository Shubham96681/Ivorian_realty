import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  HomeIcon, 
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  StarIcon,
  ChevronDownIcon,
  PlayIcon,
  ArrowRightIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const featuredProperties = [
    {
      id: 1,
      title: "Luxury 3BHK Apartment",
      location: "DLF Phase 2, Gurgaon",
      price: "₹1.2 Cr",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      type: "Apartment",
      bedrooms: 3,
      bathrooms: 2,
      area: "1200 sq ft"
    },
    {
      id: 2,
      title: "Modern Villa",
      location: "Sector 57, Gurgaon",
      price: "₹2.5 Cr",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
      type: "Villa",
      bedrooms: 4,
      bathrooms: 3,
      area: "2500 sq ft"
    },
    {
      id: 3,
      title: "Commercial Office Space",
      location: "Cyber City, Gurgaon",
      price: "₹50 Lakh",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400",
      type: "Commercial",
      bedrooms: 0,
      bathrooms: 2,
      area: "800 sq ft"
    }
  ];

  const stats = [
    { label: "Properties Listed", value: "10,000+" },
    { label: "Happy Customers", value: "5,000+" },
    { label: "Cities Covered", value: "25+" },
    { label: "Years Experience", value: "15+" }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative text-white min-h-screen flex items-center overflow-hidden">
        {/* Moving Background Image */}
        <div 
          className="absolute inset-0 hero-bg-animation"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop&crop=center)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
          }}
        ></div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-blue-700/50 to-blue-800/80"></div>
        
        {/* Additional animated elements */}
        <div className="absolute inset-0">
          {/* Floating particles */}
          <div className="absolute top-20 left-10 w-3 h-3 bg-white bg-opacity-20 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-40 right-20 w-2 h-2 bg-white bg-opacity-30 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 left-20 w-4 h-4 bg-white bg-opacity-15 rounded-full animate-ping" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-20 right-10 w-2 h-2 bg-white bg-opacity-25 rounded-full animate-ping" style={{animationDelay: '6s'}}></div>
          
          {/* Subtle moving lines */}
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Connecting Buyers and Renters with Their Dream Home!
            </h1>
          </div>
          
          {/* Main Search Section */}
          <div className="bg-white rounded-lg p-6 shadow-xl">
            {/* Buy/Rent Tabs */}
            <div className="flex mb-6">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-l-lg font-medium">
                Buy
              </button>
              <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-r-lg font-medium hover:bg-gray-200">
                Rent
              </button>
            </div>

            {/* Search Form */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter city, neighborhood, or address"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Property Type</option>
                  <option>Single Family</option>
                  <option>Townhouse/Condo</option>
                  <option>Acreage</option>
                  <option>Mid/High-Rise</option>
                  <option>Lots</option>
                  <option>Multi-Family</option>
                </select>
              </div>
              <div>
                <Link
                  to="/search"
                  className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                  <span>Search</span>
                </Link>
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="price-min" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <div className="flex space-x-2">
                  <select id="price-min" className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
                    <option>Min</option>
                    <option>$100K</option>
                    <option>$200K</option>
                    <option>$300K</option>
                    <option>$500K</option>
                  </select>
                  <select id="price-max" className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
                    <option>Max</option>
                    <option>$500K</option>
                    <option>$1M</option>
                    <option>$2M</option>
                    <option>$5M</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="beds-min" className="block text-sm font-medium text-gray-700 mb-1">Beds</label>
                <div className="flex space-x-2">
                  <select id="beds-min" className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
                    <option>No Min</option>
                    <option>1+</option>
                    <option>2+</option>
                    <option>3+</option>
                    <option>4+</option>
                  </select>
                  <select id="beds-max" className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
                    <option>No Max</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="baths-min" className="block text-sm font-medium text-gray-700 mb-1">Baths</label>
                <div className="flex space-x-2">
                  <select id="baths-min" className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
                    <option>No Min</option>
                    <option>1+</option>
                    <option>2+</option>
                    <option>3+</option>
                  </select>
                  <select id="baths-max" className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
                    <option>No Max</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
              </div>
              <div className="flex items-end space-x-2">
                <button className="flex-1 bg-gray-100 text-gray-700 p-2 rounded hover:bg-gray-200">
                  More Filters
                </button>
                <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                  <MapPinIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Explore Real Estate Markets
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Commercial Properties</h3>
                <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-gray-600 mb-4">View commercial properties for sale or lease</p>
              <Link to="/commercial" className="text-blue-600 hover:text-blue-700 font-medium">
                View Commercial Properties →
              </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Global Properties</h3>
                <MapPinIcon className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-gray-600 mb-4">Find properties around the globe</p>
              <Link to="/global" className="text-blue-600 hover:text-blue-700 font-medium">
                View Global Properties →
              </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Agents & Brokers</h3>
                <StarIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <p className="text-gray-600 mb-4">Get help from thousands of available professionals</p>
              <Link to="/agents" className="text-blue-600 hover:text-blue-700 font-medium">
                View Agents & Brokers →
              </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Home Values</h3>
                <CurrencyDollarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-gray-600 mb-4">Figure out the home values around a neighborhood</p>
              <Link to="/home-values" className="text-blue-600 hover:text-blue-700 font-medium">
                View Home Values →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Find homes by cities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Houston</h3>
              <p className="text-gray-600 mb-2">17K+ homes for sale</p>
              <p className="text-lg font-semibold text-blue-600 mb-4">$489K average price</p>
              <Link to="/houston" className="text-blue-600 hover:text-blue-700 font-medium">
                Listings in Houston →
              </Link>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">San Antonio</h3>
              <p className="text-gray-600 mb-2">13K+ homes for sale</p>
              <p className="text-lg font-semibold text-blue-600 mb-4">$370K average price</p>
              <Link to="/san-antonio" className="text-blue-600 hover:text-blue-700 font-medium">
                Listings in San Antonio →
              </Link>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Austin</h3>
              <p className="text-gray-600 mb-2">7K+ homes for sale</p>
              <p className="text-lg font-semibold text-blue-600 mb-4">$902K average price</p>
              <Link to="/austin" className="text-blue-600 hover:text-blue-700 font-medium">
                Listings in Austin →
              </Link>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dallas</h3>
              <p className="text-gray-600 mb-2">6K+ homes for sale</p>
              <p className="text-lg font-semibold text-blue-600 mb-4">$803K average price</p>
              <Link to="/dallas" className="text-blue-600 hover:text-blue-700 font-medium">
                Listings in Dallas →
              </Link>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/cities" className="text-blue-600 hover:text-blue-700 font-medium">
              Search by cities →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-2 flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {property.location}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">{property.price}</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {property.type}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{property.bedrooms} Beds</span>
                    <span>{property.bathrooms} Baths</span>
                    <span>{property.area}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/search"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
            >
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Ivorian Realty?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Properties</h3>
              <p className="text-gray-600">All properties are verified by our team to ensure authenticity</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
              <p className="text-gray-600">Get expert advice from our experienced real estate professionals</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CurrencyDollarIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Deals</h3>
              <p className="text-gray-600">Find the best property deals with our competitive pricing</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

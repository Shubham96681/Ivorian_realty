import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  HomeIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
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
  GlobeAltIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  UserIcon,
  CalculatorIcon,
  DocumentTextIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon,
  BuildingOffice2Icon,
  ShoppingBagIcon,
  TruckIcon,
  HomeIcon as HouseIcon,
  UserGroupIcon as PeopleIcon,
  UserGroupIcon as HandshakeIcon,
  AcademicCapIcon as LightBulbIcon,
  ComputerDesktopIcon,
  FaceSmileIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid, StarIcon as StarSolid } from '@heroicons/react/24/solid';

const About = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showTeamSection, setShowTeamSection] = useState(false);

  const handleContactUs = () => {
    setShowContactForm(true);
    // Scroll to contact form
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleMeetTeam = () => {
    setShowTeamSection(true);
    // Scroll to team section
    setTimeout(() => {
      document.getElementById('team-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const stats = [
    { label: 'Properties Sold', value: '10,000+', icon: HomeIcon, color: 'blue', change: '+25%' },
    { label: 'Happy Customers', value: '5,000+', icon: UserGroupIcon, color: 'green', change: '+30%' },
    { label: 'Cities Covered', value: '50+', icon: MapPinIcon, color: 'purple', change: '+15%' },
    { label: 'Years Experience', value: '15+', icon: TrophyIcon, color: 'orange', change: '+5%' }
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
      description: "With over 15 years in real estate, Sarah founded Ivorian Realty to revolutionize property buying and selling.",
      experience: "15+ years",
      specialties: ["Strategic Planning", "Market Analysis", "Leadership"],
      email: "sarah@ivorianrealty.com",
      phone: "+1 (555) 123-4567"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
      description: "Michael leads our technology initiatives, ensuring our platform provides the best user experience.",
      experience: "12+ years",
      specialties: ["Technology", "Innovation", "Digital Solutions"],
      email: "michael@ivorianrealty.com",
      phone: "+1 (555) 234-5678"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Head of Sales",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
      description: "Emily oversees our sales operations and ensures every client receives exceptional service.",
      experience: "10+ years",
      specialties: ["Sales Strategy", "Client Relations", "Market Development"],
      email: "emily@ivorianrealty.com",
      phone: "+1 (555) 345-6789"
    },
    {
      id: 4,
      name: "David Thompson",
      position: "Head of Marketing",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
      description: "David drives our marketing efforts and brand development across all channels.",
      experience: "8+ years",
      specialties: ["Digital Marketing", "Brand Strategy", "Content Creation"],
      email: "david@ivorianrealty.com",
      phone: "+1 (555) 456-7890"
    }
  ];

  const values = [
    {
      icon: ShieldCheckIcon,
      title: "Integrity",
      description: "We conduct business with the highest ethical standards and transparency in all our dealings.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: UserGroupIcon,
      title: "Customer First",
      description: "Our clients&apos; success is our success. We prioritize their needs above all else.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: LightBulbIcon,
      title: "Innovation",
      description: "We continuously embrace new technologies and methods to improve our services.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: HandshakeIcon,
      title: "Partnership",
      description: "We build lasting relationships with clients, partners, and communities.",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const milestones = [
    {
      year: "2008",
      title: "Company Founded",
      description: "Ivorian Realty was established with a vision to transform real estate services.",
      icon: BuildingOfficeIcon
    },
    {
      year: "2012",
      title: "1000 Properties Sold",
      description: "Reached our first major milestone of 1000 successful property transactions.",
      icon: HomeIcon
    },
    {
      year: "2015",
      title: "Digital Platform Launch",
      description: "Launched our comprehensive online platform for property search and management.",
      icon: ComputerDesktopIcon
    },
    {
      year: "2018",
      title: "5000 Happy Customers",
      description: "Celebrated serving over 5000 satisfied customers across multiple cities.",
      icon: FaceSmileIcon
    },
    {
      year: "2020",
      title: "Award Recognition",
      description: "Received the &apos;Best Real Estate Platform&apos; award from Real Estate Today.",
      icon: TrophyIcon
    },
    {
      year: "2023",
      title: "10,000+ Properties",
      description: "Achieved the milestone of 10,000+ properties successfully sold and managed.",
      icon: SparklesIcon
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-purple-100">
              About Ivorian Realty
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Your trusted partner in real estate for over 15 years. We&apos;re committed to helping you find your dream property and make informed real estate decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleMeetTeam}
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Meet Our Team
              </button>
              <button
                onClick={handleContactUs}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200"
              >
                Contact Us
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
                  <p className="text-gray-600 mb-1">{stat.label}</p>
                  <p className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2008, Ivorian Realty began as a small team with a big vision: to make real estate transactions simpler, more transparent, and more successful for everyone involved.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Over the years, we&apos;ve grown from a local real estate agency to a comprehensive platform serving clients across multiple cities. Our success is built on trust, innovation, and an unwavering commitment to our clients&apos; success.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Today, we&apos;re proud to have helped over 5,000 families find their dream homes and facilitated over 10,000 successful property transactions. Our journey continues as we embrace new technologies and expand our services to better serve our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleMeetTeam}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  Meet Our Team
                </button>
                <button
                  onClick={handleContactUs}
                  className="bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
                >
                  Get in Touch
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <HomeIcon className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-600 mb-6">
                    To provide exceptional real estate services that help our clients achieve their property goals while building lasting relationships based on trust and integrity.
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-600">
                    To be the leading real estate platform that transforms how people buy, sell, and invest in properties through innovative technology and personalized service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <IconComponent className="h-8 w-8 text-black flex-shrink-0 relative z-20" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      {showTeamSection && (
        <div id="team-section" className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-lg text-gray-600">The experts behind Ivorian Realty&apos;s success</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face&auto=format&q=80';
                        }}
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mb-2">{member.position}</p>
                    <p className="text-sm text-gray-500 mb-4">{member.experience} experience</p>
                    <p className="text-gray-600 mb-4">{member.description}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {member.specialties.map((specialty, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 flex items-center justify-center">
                        <PhoneIcon className="h-4 w-4 mr-2" />
                        {member.phone}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center justify-center">
                        <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                        {member.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Milestones Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600">Key milestones in our company&apos;s growth</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => {
                const IconComponent = milestone.icon;
                return (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-white rounded-xl p-6 shadow-lg">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                            <p className="text-blue-600 font-semibold">{milestone.year}</p>
                          </div>
                        </div>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {milestone.year.slice(-2)}
                    </div>
                    <div className="w-1/2"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      {showContactForm && (
        <div id="contact-form" className="bg-blue-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                <p className="text-lg text-gray-600">We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.</p>
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
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter the subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your message"
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
                    Send Message
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
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Ivorian Realty</h2>
            <p className="text-xl text-purple-100">Your trusted partner in real estate</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <ShieldCheckIcon className="h-8 w-8 text-black flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Trusted & Reliable</h3>
              <p className="text-purple-100">15+ years of proven excellence in real estate</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <UserGroupIcon className="h-8 w-8 text-black flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Expert Team</h3>
              <p className="text-purple-100">Experienced professionals dedicated to your success</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <GlobeAltIcon className="h-8 w-8 text-black flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Wide Coverage</h3>
              <p className="text-purple-100">Serving clients across 50+ cities nationwide</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <TrophyIcon className="h-8 w-8 text-black flex-shrink-0 relative z-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Proven Results</h3>
              <p className="text-purple-100">10,000+ successful property transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Work with Us?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Let us help you find your dream property or sell your current home with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleContactUs}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Contact Us Today
            </button>
            <button
              onClick={handleMeetTeam}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200"
            >
              Meet Our Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

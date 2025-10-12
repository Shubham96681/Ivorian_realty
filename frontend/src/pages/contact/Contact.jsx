import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HomeIcon,
  StarIcon,
  UserGroupIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  TrophyIcon,
  BuildingOfficeIcon,
  BuildingOffice2Icon,
  TruckIcon,
  EnvelopeIcon,
  MapIcon,
  ClockIcon as TimeIcon
} from '@heroicons/react/24/outline';

const Contact = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    propertyType: '',
    budget: '',
    timeline: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', contactForm);
    
    // Show success message (you can replace this with a proper toast notification)
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
    document.body.appendChild(successMessage);
    
    // Remove the message after 5 seconds
    setTimeout(() => {
      document.body.removeChild(successMessage);
    }, 5000);
    
    setContactForm({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      propertyType: '',
      budget: '',
      timeline: ''
    });
    setShowContactForm(false);
  };

  const handleGetStarted = () => {
    setShowContactForm(true);
    // Scroll to contact form
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleScheduleCall = () => {
    setShowContactForm(true);
    // Scroll to contact form
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Mock data
  const contactMethods = [
    {
      id: 1,
      title: "Phone Support",
      description: "Speak directly with our real estate experts",
      icon: PhoneIcon,
      contact: "+1 (555) 123-4567",
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
      color: "blue"
    },
    {
      id: 2,
      title: "Email Support",
      description: "Get detailed responses to your questions",
      icon: EnvelopeIcon,
      contact: "support@ivorianrealty.com",
      hours: "24/7 response within 2 hours",
      color: "green"
    },
    {
      id: 3,
      title: "Live Chat",
      description: "Instant help with our online chat",
      icon: ChatBubbleLeftRightIcon,
      contact: "Available now",
      hours: "Mon-Fri: 9AM-6PM",
      color: "purple"
    },
    {
      id: 4,
      title: "Office Visit",
      description: "Visit us at our main office",
      icon: BuildingOfficeIcon,
      contact: "123 Real Estate Ave, Abidjan",
      hours: "Mon-Fri: 9AM-6PM",
      color: "orange"
    }
  ];

  const officeLocations = [
    {
      id: 1,
      name: "Main Office - Abidjan",
      address: "123 Real Estate Avenue, Plateau, Abidjan",
      phone: "+225 20 30 40 50",
      email: "abidjan@ivorianrealty.com",
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
      services: ["Property Sales", "Rental Management", "Investment Consulting"],
      icon: BuildingOfficeIcon
    },
    {
      id: 2,
      name: "Branch Office - Yamoussoukro",
      address: "456 Presidential Boulevard, Yamoussoukro",
      phone: "+225 30 40 50 60",
      email: "yamoussoukro@ivorianrealty.com",
      hours: "Mon-Fri: 9AM-5PM, Sat: 9AM-2PM",
      services: ["Property Sales", "Land Development", "Commercial Properties"],
      icon: BuildingOffice2Icon
    },
    {
      id: 3,
      name: "Branch Office - San-Pédro",
      address: "789 Port Street, San-Pédro",
      phone: "+225 34 56 78 90",
      email: "sanpedro@ivorianrealty.com",
      hours: "Mon-Fri: 8AM-5PM, Sat: 9AM-1PM",
      services: ["Commercial Properties", "Industrial Land", "Port Properties"],
      icon: TruckIcon
    }
  ];

  const faqItems = [
    {
      id: 1,
      question: "How quickly do you respond to inquiries?",
      answer: "We typically respond to all inquiries within 2 hours during business hours, and within 24 hours for after-hours inquiries."
    },
    {
      id: 2,
      question: "Do you offer virtual property tours?",
      answer: "Yes! We provide virtual tours, video calls, and detailed photo galleries for all our properties to help you make informed decisions."
    },
    {
      id: 3,
      question: "What areas do you serve?",
      answer: "We serve all major cities in Côte d&apos;Ivoire including Abidjan, Yamoussoukro, San-Pédro, Bouaké, and surrounding areas."
    },
    {
      id: 4,
      question: "Do you work with international clients?",
      answer: "Absolutely! We have experience working with international clients and can provide services in multiple languages including English and French."
    },
    {
      id: 5,
      question: "What are your commission rates?",
      answer: "Our commission rates are competitive and vary based on the type of property and transaction. Contact us for a personalized quote."
    },
    {
      id: 6,
      question: "Do you offer property management services?",
      answer: "Yes, we provide comprehensive property management services including tenant screening, rent collection, maintenance coordination, and financial reporting."
    }
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Customer Relations Manager",
      email: "sarah.johnson@ivorianrealty.com",
      phone: "+225 20 30 40 51",
      specialties: ["Customer Service", "Property Consultations", "Client Relations"],
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
    },
    {
      id: 2,
      name: "Michael Kouassi",
      title: "Sales Director",
      email: "michael.kouassi@ivorianrealty.com",
      phone: "+225 20 30 40 52",
      specialties: ["Property Sales", "Investment Consulting", "Market Analysis"],
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
    },
    {
      id: 3,
      name: "Aminata Traoré",
      title: "Rental Specialist",
      email: "aminata.traore@ivorianrealty.com",
      phone: "+225 20 30 40 53",
      specialties: ["Rental Properties", "Tenant Relations", "Property Management"],
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              We&apos;re here to help you find your perfect property. Contact our expert team for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGetStarted}
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Get Started Today
              </button>
              <button
                onClick={handleScheduleCall}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors duration-300"
              >
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <UserGroupIcon className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <HomeIcon className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1,200+</h3>
              <p className="text-gray-600">Properties Sold</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-purple-100 p-4 rounded-full">
                  <TrophyIcon className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 p-4 rounded-full">
                  <StarIcon className="h-8 w-8 text-orange-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4.9/5</h3>
              <p className="text-gray-600">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Reach Us</h2>
            <p className="text-lg text-gray-600">Choose the most convenient way to get in touch</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method) => {
              const IconComponent = method.icon;
              return (
                <div key={method.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className={`bg-${method.color}-100 p-3 rounded-lg mr-4`}>
                      <IconComponent className={`h-6 w-6 text-${method.color}-600`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{method.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-900">{method.contact}</p>
                    <p className="text-sm text-gray-500">{method.hours}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Office Locations</h2>
            <p className="text-lg text-gray-600">Visit us at any of our convenient locations</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {officeLocations.map((office) => {
              const IconComponent = office.icon;
              return (
                <div key={office.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{office.name}</h3>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <MapIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600">{office.address}</p>
                    </div>
                    <div className="flex items-center">
                      <PhoneIcon className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                      <p className="text-gray-600">{office.phone}</p>
                    </div>
                    <div className="flex items-center">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                      <p className="text-gray-600">{office.email}</p>
                    </div>
                    <div className="flex items-center">
                      <TimeIcon className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                      <p className="text-gray-600">{office.hours}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Services:</h4>
                    <div className="flex flex-wrap gap-2">
                      {office.services.map((service, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">Our dedicated professionals are here to help you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-center mb-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80';
                    }}
                  />
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-medium">{member.title}</p>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{member.email}</p>
                  </div>
                  <div className="flex items-center">
                    <PhoneIcon className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{member.phone}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.map((specialty, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Find answers to common questions</p>
          </div>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      {showContactForm && (
        <section id="contact-form" className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
                <p className="text-lg text-gray-600">Fill out the form below and we&apos;ll get back to you within 24 hours</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="property-inquiry">Property Inquiry</option>
                      <option value="property-valuation">Property Valuation</option>
                      <option value="rental-assistance">Rental Assistance</option>
                      <option value="investment-consultation">Investment Consultation</option>
                      <option value="general-question">General Question</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={contactForm.propertyType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select property type</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="condo">Condo</option>
                      <option value="commercial">Commercial</option>
                      <option value="land">Land</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={contactForm.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-50k">Under $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k-200k">$100,000 - $200,000</option>
                      <option value="200k-500k">$200,000 - $500,000</option>
                      <option value="500k-plus">$500,000+</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={contactForm.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select timeline</option>
                      <option value="immediately">Immediately</option>
                      <option value="1-3-months">1-3 months</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="6-12-months">6-12 months</option>
                      <option value="just-browsing">Just browsing</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your property needs, questions, or how we can help you..."
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Send Message
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Property Journey?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Contact us today and let our expert team help you find the perfect property or sell your current one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Get Started Today
            </button>
            <Link
              to="/search"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors duration-300 text-center"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

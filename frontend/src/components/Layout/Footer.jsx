import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HomeIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <HomeIcon className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">Ivorian Realty</span>
            </div>
            <p className="text-gray-300 mb-6">
              {t('home.footer.description')}
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-2">
                <PhoneIcon className="h-5 w-5 text-blue-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="h-5 w-5 text-blue-400" />
                <span>info@ivorianrealty.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPinIcon className="h-5 w-5 text-blue-400" />
                <span>Multiple Cities, India</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300" title="Follow us on Facebook">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300" title="Follow us on Twitter">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.704.869 3.207 2.188 4.09a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300" title="Follow us on Instagram">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 5.008 0 3.324.014 3.727.072 5.008.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 5.008.072 3.324 0 3.727-.014 5.008-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-5.008 0-3.324-.014-3.727-.072-5.008-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-5.008-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('home.footer.company')}</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white">{t('home.footer.aboutUs')}</Link></li>
              <li><Link to="/newsroom" className="text-gray-300 hover:text-white">{t('home.footer.newsroom')}</Link></li>
              <li><Link to="/help" className="text-gray-300 hover:text-white">{t('home.footer.helpCenter')}</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">{t('home.footer.contactUs')}</Link></li>
            </ul>
          </div>

          {/* Real Estate */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('home.footer.realEstate')}</h3>
            <ul className="space-y-2">
              <li><Link to="/texas-real-estate" className="text-gray-300 hover:text-white">{t('home.footer.realEstate')}</Link></li>
              <li><Link to="/counties" className="text-gray-300 hover:text-white">{t('home.footer.counties')}</Link></li>
              <li><Link to="/cities" className="text-gray-300 hover:text-white">{t('home.footer.cities')}</Link></li>
              <li><Link to="/neighborhoods" className="text-gray-300 hover:text-white">{t('home.footer.neighborhoods')}</Link></li>
              <li><Link to="/zip-codes" className="text-gray-300 hover:text-white">{t('home.footer.zipCodes')}</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('home.footer.resources')}</h3>
            <ul className="space-y-2">
              <li><Link to="/real-insight" className="text-gray-300 hover:text-white">{t('home.footer.realInsight')}</Link></li>
              <li><Link to="/ask-a-pro" className="text-gray-300 hover:text-white">{t('home.footer.askPro')}</Link></li>
              <li><Link to="/knowledge-base" className="text-gray-300 hover:text-white">{t('home.footer.knowledgeBase')}</Link></li>
              <li><Link to="/knowledge-videos" className="text-gray-300 hover:text-white">{t('home.footer.knowledgeVideos')}</Link></li>
              <li><Link to="/service-providers" className="text-gray-300 hover:text-white">{t('home.footer.serviceProviders')}</Link></li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('home.footer.product')}</h3>
            <ul className="space-y-2">
              <li><Link to="/mobile-app" className="text-gray-300 hover:text-white">{t('home.footer.mobileApp')}</Link></li>
              <li><Link to="/rental-search" className="text-gray-300 hover:text-white">{t('home.footer.rentals')}</Link></li>
              <li><Link to="/find-a-pro" className="text-gray-300 hover:text-white">{t('home.footer.findPro')}</Link></li>
              <li><Link to="/open-houses" className="text-gray-300 hover:text-white">{t('home.footer.openHouses')}</Link></li>
              <li><Link to="/mls-platinum" className="text-gray-300 hover:text-white">{t('home.footer.mlsPlatinum')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              {t('home.footer.copyright')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-300 hover:text-white text-sm">
                {t('home.footer.privacyPolicy')}
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-white text-sm">
                {t('home.footer.termsOfService')}
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white text-sm">
                {t('home.footer.contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

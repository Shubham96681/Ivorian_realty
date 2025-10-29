import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LanguageIcon, 
  ChevronDownIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: t('languages.english'), flag: '🇺🇸' },
    { code: 'fr', name: t('languages.french'), flag: '🇫🇷' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
    
    // Set document direction to LTR for all languages
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = languageCode;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      });
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        type="button"
      >
        <LanguageIcon className="h-4 w-4" />
        <span className="text-sm font-medium">{currentLanguage.flag}</span>
        <span className="hidden sm:inline text-sm">{currentLanguage.name}</span>
        <ChevronDownIcon className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close language menu"
          />
          
          {/* Dropdown */}
          <div 
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20"
            role="menu"
            aria-label="Language selection"
          >
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleLanguageChange(language.code);
                  }
                }}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                  i18n.language === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
                role="menuitem"
                aria-label={`Switch to ${language.name}`}
                aria-current={i18n.language === language.code ? 'true' : 'false'}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{language.flag}</span>
                  <span className="font-medium">{language.name}</span>
                </div>
                {i18n.language === language.code && (
                  <CheckIcon className="h-4 w-4 text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;

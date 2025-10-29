import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeroSection from '../components/Home/HeroSection';
import MarketOverview from '../components/Home/MarketOverview';
import CitiesSection from '../components/Home/CitiesSection';
import FeaturedProperties from '../components/Home/FeaturedProperties';
import StatsSection from '../components/Home/StatsSection';
import WhyChooseSection from '../components/Home/WhyChooseSection';

const Home = () => {
  const { i18n } = useTranslation();
  
  // Set document direction to LTR for all languages
  useEffect(() => {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="bg-white">
      <HeroSection />
      <MarketOverview />
      <CitiesSection />
      <FeaturedProperties />
      <StatsSection />
      <WhyChooseSection />
    </div>
  );
};

export default Home;

import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import MarketOverview from '../components/Home/MarketOverview';
import CitiesSection from '../components/Home/CitiesSection';
import FeaturedProperties from '../components/Home/FeaturedProperties';
import StatsSection from '../components/Home/StatsSection';
import WhyChooseSection from '../components/Home/WhyChooseSection';

const Home = () => {
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

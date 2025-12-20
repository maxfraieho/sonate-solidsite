import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { MissionSection } from '@/components/sections/MissionSection';

import { ActionsSection } from '@/components/sections/ActionsSection';
import { FounderSection } from '@/components/sections/FounderSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { SupportSection } from '@/components/sections/SupportSection';
import { Footer } from '@/components/sections/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MissionSection />
      <ActionsSection />
      <FounderSection />
      <PortfolioSection />
      <SupportSection />
      <Footer />
    </div>
  );
};

export default Index;

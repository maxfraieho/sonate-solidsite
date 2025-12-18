import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { ManifestoSection } from '@/components/sections/ManifestoSection';
import { QuoteSection } from '@/components/sections/QuoteSection';
import { MissionSection } from '@/components/sections/MissionSection';
import { ActionsSection } from '@/components/sections/ActionsSection';
import { FounderSection } from '@/components/sections/FounderSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { Footer } from '@/components/sections/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ManifestoSection />
      <QuoteSection />
      <MissionSection />
      <ActionsSection />
      <FounderSection />
      <PortfolioSection />
      <Footer />
    </div>
  );
};

export default Index;

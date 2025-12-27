import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { QuoteSection } from '@/components/sections/QuoteSection';
import { MissionSection } from '@/components/sections/MissionSection';
import { ApproachSection } from '@/components/sections/ApproachSection';
import { ActionsSection } from '@/components/sections/ActionsSection';
import { EnsembleSection } from '@/components/sections/EnsembleSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { SupportSection } from '@/components/sections/SupportSection';
import { Footer } from '@/components/sections/Footer';
import SEO from '@/components/SEO';

const Index = () => {
  return (
    <>
      <SEO path="/" />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <div className="section-stagger"><HeroSection /></div>
          <div className="section-stagger"><QuoteSection /></div>
          <div className="section-stagger"><MissionSection /></div>
          <div className="section-stagger"><ApproachSection /></div>
          <div className="section-stagger"><ActionsSection /></div>
          <div className="section-stagger"><EnsembleSection /></div>
          <div className="section-stagger"><PortfolioSection /></div>
          <div className="section-stagger"><SupportSection /></div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;

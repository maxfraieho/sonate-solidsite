import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { Building2, Users, School, Landmark, Handshake, MessageCircle, ArrowRight, Printer } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import SEO from '@/components/SEO';

const InstitutionalInterest = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  
  // Get language-aware support path with institutional context
  const getSupportPath = () => {
    const basePath = lang === 'de' ? '/support' : `/${lang}/support`;
    return `${basePath}?type=institutional`;
  };

  const handlePrint = () => {
    window.print();
  };

  const printLabels = {
    fr: 'Imprimer / Télécharger PDF',
    de: 'Drucken / PDF herunterladen',
    uk: 'Друкувати / Завантажити PDF',
  };

  const qrLabels = {
    fr: 'Version en ligne du document',
    de: 'Online-Version dieses Dokuments',
    uk: 'Онлайн-версія документа',
  };

  const qrUrl = 'https://violin.pp.ua/fr/interet-institutionnel';

  const targetAudience = [
    { icon: School, key: 'schools' },
    { icon: Landmark, key: 'municipalities' },
    { icon: Building2, key: 'cultural' },
    { icon: Users, key: 'associations' },
  ];

  const collaborationTypes = [
    'cultural',
    'pilot',
    'exchange',
    'venue',
    'exploratory',
  ];

  return (
    <>
      <SEO path="/interet-institutionnel" />
      
      {/* Print-specific styles */}
      <style>{`
        @media print {
          /* Hide non-essential elements */
          .no-print,
          header.fixed,
          nav,
          footer,
          button,
          .cta-glow,
          .print-button {
            display: none !important;
          }
          
          /* Reset background and colors for print */
          body,
          .min-h-screen,
          .bg-background,
          .bg-surface,
          .bg-surface-dark {
            background: white !important;
            color: black !important;
          }
          
          /* Ensure text is readable */
          .text-foreground,
          .text-subtext,
          .text-primary,
          p, h1, h2, h3, span, li {
            color: black !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          /* Style headers distinctly */
          h1 {
            color: #333 !important;
            font-size: 28pt !important;
            margin-bottom: 8pt !important;
          }
          
          h2 {
            color: #444 !important;
            font-size: 14pt !important;
            margin-top: 16pt !important;
            margin-bottom: 8pt !important;
            border-bottom: 1px solid #ccc;
            padding-bottom: 4pt;
          }
          
          /* Remove shadows and borders for cleaner print */
          .shadow-lg,
          .shadow-primary\\/50,
          .border,
          .border-border\\/30,
          .border-primary\\/20 {
            box-shadow: none !important;
            border: 1px solid #ddd !important;
          }
          
          /* Adjust spacing */
          .pt-24 {
            padding-top: 0 !important;
          }
          
          .mb-16, .mb-12 {
            margin-bottom: 16pt !important;
          }
          
          .p-8 {
            padding: 12pt !important;
          }
          
          /* Print header info */
          main::before {
            content: "Sonate Solidaire — violin.pp.ua";
            display: block;
            text-align: right;
            font-size: 9pt;
            color: #666;
            margin-bottom: 12pt;
            border-bottom: 1px solid #ccc;
            padding-bottom: 8pt;
          }
          
          /* Footer note styling */
          footer.text-center {
            margin-top: 24pt !important;
            padding-top: 12pt !important;
          }
          
          /* Page break settings */
          section {
            page-break-inside: avoid;
          }
          
          /* Hide decorative elements */
          .h-px,
          .w-3.h-3.rounded-full {
            display: none !important;
          }
          
          /* Icon containers - make subtle for print */
          .bg-primary\\/10 {
            background: #f5f5f5 !important;
          }
          
          .text-primary svg {
            color: #666 !important;
          }
        }
      `}</style>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Print button - visible on screen only */}
            <div className="print-button text-right mb-4 no-print">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 text-sm text-subtext hover:text-primary transition-colors"
                aria-label={printLabels[lang as keyof typeof printLabels] || printLabels.fr}
              >
                <Printer className="w-4 h-4" aria-hidden="true" />
                <span>{printLabels[lang as keyof typeof printLabels] || printLabels.fr}</span>
              </button>
            </div>
            
            {/* Header */}
            <header className="text-center mb-16">
              <div className="flex items-center justify-center mb-6 no-print">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" aria-hidden="true" />
                <div className="mx-4 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" aria-hidden="true" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" aria-hidden="true" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
                {t('institutional.title')}
              </h1>
              <p className="text-lg text-subtext max-w-2xl mx-auto">
                {t('institutional.subtitle')}
              </p>
            </header>

            {/* Section 1: Project Stage */}
            <section className="mb-12 bg-surface rounded-xl p-8 border border-border/30">
              <p className="text-foreground leading-relaxed">
                {t('institutional.projectStage.line1')}
              </p>
              <p className="text-subtext leading-relaxed mt-4">
                {t('institutional.projectStage.line2')}
              </p>
            </section>

            {/* Section 2: Target Audience */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                {t('institutional.targetAudience.title')}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {targetAudience.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={item.key}
                      className="flex items-center gap-4 p-4 bg-surface rounded-lg border border-border/30"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                      </div>
                      <span className="text-foreground">
                        {t(`institutional.targetAudience.${item.key}`)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 3: Proposed Collaborations */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                {t('institutional.proposed.title')}
              </h2>
              <p className="text-subtext mb-6">
                {t('institutional.proposed.intro')}
              </p>
              <ul className="space-y-3">
                {collaborationTypes.map((type) => (
                  <li key={type} className="flex items-start gap-3">
                    <Handshake className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-foreground">
                      {t(`institutional.proposed.${type}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 4: What is NOT requested */}
            <section className="mb-12 bg-surface-dark rounded-xl p-8 border border-primary/20">
              <h2 className="font-display text-xl font-bold text-primary mb-4">
                {t('institutional.notRequested.title')}
              </h2>
              <p className="text-foreground leading-relaxed">
                {t('institutional.notRequested.line1')}
              </p>
              <p className="text-subtext leading-relaxed mt-3">
                {t('institutional.notRequested.line2')}
              </p>
            </section>

            {/* Section 5: Call to Action */}
            <section className="text-center mb-12 no-print">
              <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto">
                {t('institutional.cta.text')}
              </p>
              <Button asChild size="lg" className="gap-2 cta-glow">
                <Link to={getSupportPath()}>
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  {t('institutional.cta.button')}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
            </section>
            
            {/* Print-only CTA text with QR code */}
            <section className="hidden print:block mb-12">
              <div className="flex items-start justify-between gap-8">
                <div className="flex-1">
                  <p className="text-foreground mb-4">
                    {t('institutional.cta.text')}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Contact:</strong> arsen.k111999@gmail.com | +41 78 326 11 12
                  </p>
                  <p className="text-sm">
                    <strong>Web:</strong> violin.pp.ua/contact
                  </p>
                </div>
                
                {/* QR Code - print only */}
                <div className="flex-shrink-0 text-center">
                  <div className="inline-block p-2 bg-white border border-gray-300">
                    <QRCodeSVG 
                      value={qrUrl}
                      size={80}
                      level="M"
                      includeMargin={false}
                      bgColor="#ffffff"
                      fgColor="#000000"
                    />
                  </div>
                  <p className="text-xs mt-1 text-gray-600 max-w-[100px]">
                    {qrLabels[lang as keyof typeof qrLabels] || qrLabels.fr}
                  </p>
                </div>
              </div>
            </section>

            {/* Footer Note */}
            <footer className="text-center border-t border-border/30 pt-8">
              <p className="text-sm text-subtext/70 italic max-w-xl mx-auto">
                {t('institutional.footerNote')}
              </p>
            </footer>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default InstitutionalInterest;

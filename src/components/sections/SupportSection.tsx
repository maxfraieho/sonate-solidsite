import { useTranslation } from 'react-i18next';
import { Heart, Mail, CreditCard, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const SupportSection = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'fr' | 'de' | 'uk';

  const texts = {
    title: { fr: 'Soutenir', de: 'Unterstützen', uk: 'Підтримати' },
    subtitle: { fr: 'Sonate Solidaire', de: 'Sonate Solidaire', uk: 'Sonate Solidaire' },
    description: {
      fr: 'Votre soutien finance nos actions humanitaires et culturelles',
      de: 'Ihre Unterstützung finanziert unsere humanitären und kulturellen Aktivitäten',
      uk: 'Ваша підтримка фінансує наші гуманітарні та культурні заходи'
    },
    donate: { fr: 'Faire un Don', de: 'Spenden', uk: 'Зробити пожертву' },
    contact: { fr: 'Nous Contacter', de: 'Kontakt', uk: 'Зв\'язатися' },
    supportTitle: { fr: 'Votre soutien est essentiel', de: 'Ihre Unterstützung ist wesentlich', uk: 'Ваша підтримка важлива' },
    bankTransfer: { fr: 'Virement Bancaire', de: 'Banküberweisung', uk: 'Банківський переказ' },
    ibanText: { fr: 'IBAN: CH** **** **** **** ****', de: 'IBAN: CH** **** **** **** ****', uk: 'IBAN: CH** **** **** **** ****' },
    contactForIban: { fr: 'Contactez-nous pour l\'IBAN complet', de: 'Kontaktieren Sie uns für die vollständige IBAN', uk: 'Зв\'яжіться з нами для повного IBAN' },
    twint: { fr: 'TWINT', de: 'TWINT', uk: 'TWINT' },
    phone: '+41 78 326 11 12'
  };

  return (
    <section id="soutenir" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            <span className="text-foreground">{texts.title[lang]}</span>{' '}
            <span className="text-primary">{texts.subtitle[lang]}</span>
          </h2>
          <p className="text-subtext text-lg max-w-2xl mx-auto">
            {texts.description[lang]}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link to="/donate">
            <Button className="bg-primary text-primary-foreground hover:bg-primary-hover gap-2 px-8 py-6 text-lg rounded-full">
              <Heart className="h-5 w-5" />
              {texts.donate[lang]}
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="border-border text-foreground hover:bg-surface gap-2 px-8 py-6 text-lg rounded-full">
              <Mail className="h-5 w-5" />
              {texts.contact[lang]}
            </Button>
          </Link>
        </div>

        {/* Support Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-surface border border-primary/30 rounded-2xl p-8">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-primary text-center mb-8">
              {texts.supportTitle[lang]}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Bank Transfer */}
              <div className="bg-background border border-primary/20 rounded-xl p-6 text-center">
                <CreditCard className="h-8 w-8 text-primary mx-auto mb-4" />
                <h4 className="font-bold text-foreground text-xl mb-3">{texts.bankTransfer[lang]}</h4>
                <p className="text-subtext mb-2">{texts.ibanText[lang]}</p>
                <p className="text-subtext text-sm">{texts.contactForIban[lang]}</p>
              </div>

              {/* TWINT */}
              <div className="bg-background border border-primary/20 rounded-xl p-6 text-center">
                <QrCode className="h-8 w-8 text-primary mx-auto mb-4" />
                <h4 className="font-bold text-foreground text-xl mb-3">{texts.twint[lang]}</h4>
                <p className="text-subtext mb-4">{texts.phone}</p>
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center">
                    <QrCode className="h-12 w-12 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

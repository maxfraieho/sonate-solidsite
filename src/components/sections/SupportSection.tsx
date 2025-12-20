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
    <section id="soutenir" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 border border-primary rounded-full" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-primary rounded-full" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            <div className="mx-4 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">{texts.title[lang]}</span>{' '}
            <span className="text-primary drop-shadow-[0_0_30px_rgba(234,179,8,0.3)]">{texts.subtitle[lang]}</span>
          </h2>
          <p className="text-subtext text-lg md:text-xl max-w-2xl mx-auto">
            {texts.description[lang]}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-20">
          <Link to="/donate">
            <Button className="bg-primary text-primary-foreground hover:bg-primary-hover gap-3 px-10 py-7 text-lg rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-1">
              <Heart className="h-6 w-6" />
              {texts.donate[lang]}
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="border-2 border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary gap-3 px-10 py-7 text-lg rounded-full transition-all duration-300 hover:-translate-y-1">
              <Mail className="h-6 w-6" />
              {texts.contact[lang]}
            </Button>
          </Link>
        </div>

        {/* Support Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-surface border border-primary/30 rounded-3xl p-10">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-primary text-center mb-10">
                {texts.supportTitle[lang]}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Bank Transfer */}
                <div className="group/card relative">
                  <div className="absolute -inset-1 bg-primary/10 rounded-2xl blur-md opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-background border border-primary/20 rounded-2xl p-8 text-center hover:border-primary/50 transition-colors duration-300">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <CreditCard className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-display font-bold text-foreground text-xl mb-4">{texts.bankTransfer[lang]}</h4>
                    <p className="text-primary font-mono mb-2">{texts.ibanText[lang]}</p>
                    <p className="text-subtext text-sm">{texts.contactForIban[lang]}</p>
                  </div>
                </div>

                {/* TWINT */}
                <div className="group/card relative">
                  <div className="absolute -inset-1 bg-primary/10 rounded-2xl blur-md opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-background border border-primary/20 rounded-2xl p-8 text-center hover:border-primary/50 transition-colors duration-300">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <QrCode className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-display font-bold text-foreground text-xl mb-4">{texts.twint[lang]}</h4>
                    <p className="text-primary font-semibold mb-4">{texts.phone}</p>
                    <div className="flex justify-center">
                      <div className="w-24 h-24 bg-primary/10 border-2 border-primary/30 rounded-xl flex items-center justify-center hover:border-primary/60 transition-colors duration-300">
                        <QrCode className="h-14 w-14 text-primary" />
                      </div>
                    </div>
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

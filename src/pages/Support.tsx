import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Heart, Users, Building2, Church, Check, MessageSquare, Calendar, Handshake, ChevronDown, ChevronUp, Shield } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import SEO from '@/components/SEO';

const SWISS_CANTONS = [
  'Argovie', 'Appenzell Rhodes-Extérieures', 'Appenzell Rhodes-Intérieures', 'Bâle-Campagne',
  'Bâle-Ville', 'Berne', 'Fribourg', 'Genève', 'Glaris', 'Grisons', 'Jura', 'Lucerne',
  'Neuchâtel', 'Nidwald', 'Obwald', 'Saint-Gall', 'Schaffhouse', 'Schwyz', 'Soleure',
  'Tessin', 'Thurgovie', 'Uri', 'Valais', 'Vaud', 'Zoug', 'Zurich'
];

const INTERESTS = ['donateLater', 'hostConcert', 'bookConcert', 'partner', 'volunteer', 'share'] as const;

type SupporterType = 'individual' | 'organization' | 'church';

interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  canton: string;
  country: string;
  role: string;
  message: string;
  organizationName: string;
  organizationType: string;
  interests: string[];
  publishName: boolean;
  publishQuote: boolean;
  contactConsent: boolean;
  honeypot: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  city: '',
  canton: '',
  country: 'Suisse',
  role: '',
  message: '',
  organizationName: '',
  organizationType: '',
  interests: [],
  publishName: false,
  publishQuote: false,
  contactConsent: false,
  honeypot: ''
};

const Support = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'fr' | 'de' | 'uk';
  
  const [supporterType, setSupporterType] = useState<SupporterType>('individual');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check
    if (formData.honeypot) {
      return;
    }

    if (!formData.contactConsent) {
      toast.error(t('support.form.common.contactConsent'));
      return;
    }

    // Validate org name for organization/church
    if ((supporterType === 'organization' || supporterType === 'church') && !formData.organizationName.trim()) {
      toast.error(supporterType === 'organization' 
        ? t('support.form.organization.orgName') 
        : t('support.form.church.orgName'));
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        type: 'support-testimonial',
        supporterType,
        contactName: formData.name.trim(),
        contactEmail: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        organizationName: formData.organizationName.trim() || undefined,
        organizationType: formData.organizationType || undefined,
        role: formData.role.trim() || undefined,
        city: formData.city.trim(),
        canton: formData.canton || undefined,
        country: formData.country.trim(),
        interests: formData.interests,
        message: formData.message.trim(),
        publishName: formData.publishName,
        publishQuote: formData.publishQuote,
        consent: formData.contactConsent,
        language: lang,
        pageUrl: window.location.href,
        timestamp: new Date().toISOString()
      };

      const response = await fetch('https://violin-telegram-webhook.maxfraieho.workers.dev/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success(t('support.form.successTitle'), {
          description: t('support.form.successBody')
        });
        setFormData(initialFormData);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Support form submission error:', error);
      toast.error(t('support.form.errorTitle'), {
        description: t('support.form.errorBody')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const orgTypes = supporterType === 'organization' 
    ? ['ngo', 'culture', 'municipality', 'foundation', 'business', 'school', 'other']
    : [];

  return (
    <>
      <SEO 
        path="/support"
        title={`${t('support.hero.title')} | Sonate Solidaire`}
        description={t('support.hero.subtitle')}
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="relative py-16 md:py-24 bg-gradient-to-b from-surface via-background to-background">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                {t('support.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-subtext max-w-3xl mx-auto mb-8">
                {t('support.hero.subtitle')}
              </p>
              
              <ul className="text-left max-w-2xl mx-auto space-y-3 mb-10">
                {[1, 2, 3].map(n => (
                  <li key={n} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-subtext">{t(`support.hero.bullets.${n}`)}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="outline" className="gap-2">
                  <a href="/#soutenir">
                    <ArrowLeft className="h-4 w-4" />
                    {t('support.hero.backBtn')}
                  </a>
                </Button>
                <Button asChild className="gap-2 cta-glow">
                  <Link to="/contact">
                    <Mail className="h-4 w-4" />
                    {t('support.hero.contactBtn')}
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Trust/Transparency Block */}
          <section className="py-8 bg-surface/50 border-y border-primary/10">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Shield className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-display font-bold text-foreground">{t('support.trust.title')}</h2>
              </div>
              <p className="text-subtext">{t('support.trust.body')}</p>
            </div>
          </section>

          {/* How You Can Help Cards */}
          <section className="py-16 bg-background">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-3 gap-8">
                {(['individual', 'organization', 'church'] as const).map((type) => {
                  const Icon = type === 'individual' ? Users : type === 'organization' ? Building2 : Church;
                  return (
                    <div 
                      key={type}
                      className="bg-surface border border-primary/20 rounded-2xl p-8 text-center hover:border-primary/40 transition-colors"
                    >
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-display font-bold text-foreground mb-3">
                        {t(`support.cards.${type}.title`)}
                      </h3>
                      <p className="text-subtext text-sm">
                        {t(`support.cards.${type}.body`)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Tabs + Form */}
          <section className="py-16 bg-surface/30">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <Tabs value={supporterType} onValueChange={(v) => setSupporterType(v as SupporterType)} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="individual" className="gap-2">
                    <Users className="h-4 w-4 hidden sm:block" />
                    {t('support.tabs.individual')}
                  </TabsTrigger>
                  <TabsTrigger value="organization" className="gap-2">
                    <Building2 className="h-4 w-4 hidden sm:block" />
                    {t('support.tabs.organization')}
                  </TabsTrigger>
                  <TabsTrigger value="church" className="gap-2">
                    <Church className="h-4 w-4 hidden sm:block" />
                    {t('support.tabs.church')}
                  </TabsTrigger>
                </TabsList>

                {(['individual', 'organization', 'church'] as const).map((type) => (
                  <TabsContent key={type} value={type}>
                    <div className="bg-surface border border-primary/20 rounded-2xl p-6 md:p-8">
                      <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                        {t(`support.form.${type}.title`)}
                      </h2>
                      
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Honeypot - hidden from users */}
                        <input 
                          type="text" 
                          name="website" 
                          value={formData.honeypot}
                          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                          className="hidden"
                          tabIndex={-1}
                          autoComplete="off"
                        />

                        {/* Organization Name (conditional) */}
                        {(type === 'organization' || type === 'church') && (
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="orgName" className="block text-sm text-subtext mb-2">
                                {t(`support.form.${type}.orgName`)} *
                              </label>
                              <Input
                                id="orgName"
                                value={formData.organizationName}
                                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                                required
                                className="bg-background border-primary/30"
                              />
                            </div>
                            <div>
                              <label htmlFor="orgType" className="block text-sm text-subtext mb-2">
                                {t(`support.form.${type}.orgType`)}
                              </label>
                              <select
                                id="orgType"
                                value={formData.organizationType}
                                onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })}
                                className="w-full px-4 py-2 bg-background border border-primary/30 rounded-lg text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                              >
                                <option value="">—</option>
                                {type === 'organization' && orgTypes.map(ot => (
                                  <option key={ot} value={ot}>{t(`support.form.organization.orgTypes.${ot}`)}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}

                        {/* Name & Email */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="block text-sm text-subtext mb-2">
                              {t('support.form.common.name')} *
                            </label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              required
                              className="bg-background border-primary/30"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm text-subtext mb-2">
                              {t('support.form.common.email')} *
                            </label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                              className="bg-background border-primary/30"
                            />
                          </div>
                        </div>

                        {/* Phone & Role */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="phone" className="block text-sm text-subtext mb-2">
                              {t('support.form.common.phone')}
                            </label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="bg-background border-primary/30"
                            />
                          </div>
                          <div>
                            <label htmlFor="role" className="block text-sm text-subtext mb-2">
                              {t('support.form.common.role')}
                            </label>
                            <Input
                              id="role"
                              value={formData.role}
                              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                              className="bg-background border-primary/30"
                            />
                          </div>
                        </div>

                        {/* City, Canton, Country */}
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label htmlFor="city" className="block text-sm text-subtext mb-2">
                              {t('support.form.common.city')} *
                            </label>
                            <Input
                              id="city"
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                              required
                              className="bg-background border-primary/30"
                            />
                          </div>
                          <div>
                            <label htmlFor="canton" className="block text-sm text-subtext mb-2">
                              {t('support.form.common.canton')}
                            </label>
                            <select
                              id="canton"
                              value={formData.canton}
                              onChange={(e) => setFormData({ ...formData, canton: e.target.value })}
                              className="w-full px-4 py-2 bg-background border border-primary/30 rounded-lg text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                              <option value="">—</option>
                              {SWISS_CANTONS.map(c => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="country" className="block text-sm text-subtext mb-2">
                              {t('support.form.common.country')}
                            </label>
                            <Input
                              id="country"
                              value={formData.country}
                              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                              className="bg-background border-primary/30"
                            />
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <label htmlFor="message" className="block text-sm text-subtext mb-2">
                            {t('support.form.common.message')} *
                          </label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                            rows={4}
                            className="bg-background border-primary/30 resize-none"
                          />
                        </div>

                        {/* Interests */}
                        <div>
                          <p className="text-sm text-subtext mb-3">{t('support.form.common.interests')}</p>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {INTERESTS.map(interest => (
                              <div key={interest} className="flex items-center gap-2">
                                <Checkbox
                                  id={interest}
                                  checked={formData.interests.includes(interest)}
                                  onCheckedChange={(checked) => handleInterestChange(interest, !!checked)}
                                />
                                <label htmlFor={interest} className="text-sm text-foreground cursor-pointer">
                                  {t(`support.form.common.interests.${interest}`)}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Publish permissions */}
                        <div className="space-y-3 border-t border-primary/10 pt-6">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              id="publishName"
                              checked={formData.publishName}
                              onCheckedChange={(checked) => setFormData({ ...formData, publishName: !!checked })}
                            />
                            <label htmlFor="publishName" className="text-sm text-subtext cursor-pointer">
                              {t('support.form.common.publishName')}
                            </label>
                          </div>
                          <div className="flex items-start gap-3">
                            <Checkbox
                              id="publishQuote"
                              checked={formData.publishQuote}
                              onCheckedChange={(checked) => setFormData({ ...formData, publishQuote: !!checked })}
                            />
                            <label htmlFor="publishQuote" className="text-sm text-subtext cursor-pointer">
                              {t('support.form.common.publishQuote')}
                            </label>
                          </div>
                        </div>

                        {/* Contact consent (required) */}
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id="contactConsent"
                            checked={formData.contactConsent}
                            onCheckedChange={(checked) => setFormData({ ...formData, contactConsent: !!checked })}
                            required
                          />
                          <label htmlFor="contactConsent" className="text-sm text-foreground cursor-pointer">
                            {t('support.form.common.contactConsent')} *
                          </label>
                        </div>

                        {/* Privacy note */}
                        <p className="text-xs text-subtext/70">
                          {t('support.form.common.privacyNote')}{' '}
                          <Link to="/privacy" className="underline hover:text-primary">
                            {lang === 'uk' ? 'Політика конфіденційності' : lang === 'de' ? 'Datenschutzrichtlinie' : 'Politique de confidentialité'}
                          </Link>
                        </p>

                        {/* Submit */}
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full bg-primary text-primary-foreground hover:bg-primary-hover py-4 text-lg cta-glow"
                        >
                          <Heart className="mr-2 h-5 w-5" />
                          {isSubmitting ? t('support.form.sending') : t('support.form.submit')}
                        </Button>
                      </form>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 bg-background">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-display font-bold text-foreground text-center mb-10">
                {t('support.faq.title')}
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map(n => (
                  <div 
                    key={n}
                    className="bg-surface border border-primary/20 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === n ? null : n)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <span className="font-medium text-foreground">{t(`support.faq.q${n}`)}</span>
                      {expandedFaq === n ? (
                        <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-subtext flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === n && (
                      <div className="px-5 pb-5 text-subtext">
                        {t(`support.faq.a${n}`)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="py-16 bg-surface/30 border-t border-primary/10">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                {t('support.next.title')}
              </h2>
              <p className="text-subtext">
                {t('support.next.body')}
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Support;

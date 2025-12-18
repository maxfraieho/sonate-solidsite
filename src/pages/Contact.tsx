import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Mail, Phone, Send, Youtube } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Contact = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'fr' | 'de' | 'uk';
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([46.4192, 6.2728], 15);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Custom marker
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: hsl(var(--primary)); width: 25px; height: 25px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
      iconSize: [25, 25],
      iconAnchor: [12, 24],
      popupAnchor: [0, -24]
    });

    const marker = L.marker([46.4192, 6.2728], { icon: customIcon }).addTo(map);
    
    marker.bindPopup(`
      <div style="text-align: center; font-family: Inter, sans-serif;">
        <strong style="color: hsl(var(--primary)); font-size: 16px;">Sonate Solidaire</strong><br>
        <span style="color: #666;">Avenue du Mont-Blanc 29</span><br>
        <span style="color: #666;">1196 Gland, Vaud</span><br>
        <span style="color: #666;">Suisse 🇨🇭</span>
      </div>
    `).openPopup();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const texts = {
    title: { fr: 'Contact', de: 'Kontakt', uk: 'Контакти' },
    subtitle: {
      fr: 'Nous sommes à votre écoute. Ensemble, construisons des projets porteurs de sens.',
      de: 'Wir hören Ihnen zu. Gemeinsam bauen wir sinnvolle Projekte auf.',
      uk: 'Ми вас слухаємо. Разом будуємо значущі проекти.'
    },
    info: { fr: 'Informations', de: 'Informationen', uk: 'Інформація' },
    address: { fr: 'Adresse', de: 'Adresse', uk: 'Адреса' },
    email: { fr: 'Email', de: 'E-Mail', uk: 'Електронна пошта' },
    phone: { fr: 'Téléphone / WhatsApp', de: 'Telefon / WhatsApp', uk: 'Телефон / WhatsApp' },
    social: { fr: 'Réseaux Sociaux', de: 'Soziale Netzwerke', uk: 'Соціальні мережі' },
    formTitle: { fr: 'Envoyez-nous un message', de: 'Senden Sie uns eine Nachricht', uk: 'Надішліть нам повідомлення' },
    name: { fr: 'Nom complet', de: 'Vollständiger Name', uk: 'Повне ім\'я' },
    emailLabel: { fr: 'Email', de: 'E-Mail', uk: 'Електронна пошта' },
    subject: { fr: 'Sujet', de: 'Betreff', uk: 'Тема' },
    message: { fr: 'Message', de: 'Nachricht', uk: 'Повідомлення' },
    consent: {
      fr: 'J\'accepte que mes données soient traitées pour répondre à ma demande.',
      de: 'Ich stimme zu, dass meine Daten zur Bearbeitung meiner Anfrage verarbeitet werden.',
      uk: 'Я погоджуюсь на обробку моїх даних для відповіді на мій запит.'
    },
    send: { fr: 'Envoyer le message', de: 'Nachricht senden', uk: 'Надіслати повідомлення' },
    subjects: {
      general: { fr: 'Question générale', de: 'Allgemeine Frage', uk: 'Загальне питання' },
      partnership: { fr: 'Proposition de partenariat', de: 'Partnerschaftsvorschlag', uk: 'Пропозиція партнерства' },
      volunteering: { fr: 'Bénévolat / Rejoindre l\'équipe', de: 'Freiwilligenarbeit / Team beitreten', uk: 'Волонтерство / Приєднатись до команди' },
      media: { fr: 'Presse / Média', de: 'Presse / Medien', uk: 'Преса / Медіа' },
      other: { fr: 'Autre', de: 'Andere', uk: 'Інше' }
    },
    responseTime: {
      fr: 'Nous répondons généralement sous 24-48 heures.',
      de: 'Wir antworten normalerweise innerhalb von 24-48 Stunden.',
      uk: 'Зазвичай ми відповідаємо протягом 24-48 годин.'
    },
    success: { fr: 'Message envoyé avec succès!', de: 'Nachricht erfolgreich gesendet!', uk: 'Повідомлення успішно надіслано!' }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      toast.error(lang === 'uk' ? 'Будь ласка, погодьтесь з обробкою даних' : 'Veuillez accepter le traitement des données');
      return;
    }
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success(texts.success[lang]);
    setFormData({ name: '', email: '', subject: 'general', message: '', consent: false });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="relative h-96 md:h-[50vh] flex items-center justify-center overflow-hidden pt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://violin.pp.ua/assets/img/contact-hero-desktop.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-4 text-foreground drop-shadow-2xl">
            {texts.title[lang]}
          </h1>
          <p className="text-lg md:text-xl text-subtext max-w-3xl mx-auto">
            {texts.subtitle[lang]}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-4xl font-display font-bold text-primary mb-8">{texts.info[lang]}</h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  <MapPin className="text-primary h-8 w-8 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{texts.address[lang]}</h3>
                    <p className="text-subtext leading-relaxed">
                      Sonate Solidaire<br />
                      Avenue du Mont-Blanc 29<br />
                      1196 Gland, Vaud<br />
                      Suisse
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="text-primary h-8 w-8 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{texts.email[lang]}</h3>
                    <a href="mailto:arsen.k111999@gmail.com" className="text-subtext hover:text-primary transition-colors">
                      arsen.k111999@gmail.com
                    </a>
                    <p className="text-sm text-subtext/70 mt-1">{texts.responseTime[lang]}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="text-primary h-8 w-8 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{texts.phone[lang]}</h3>
                    <a href="tel:+41783261112" className="text-subtext hover:text-primary transition-colors">
                      +41 78 326 11 12
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Send className="text-primary h-8 w-8 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{texts.social[lang]}</h3>
                    <div className="flex gap-4 mt-2">
                      <a 
                        href="https://t.me/yourtelegram" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-surface p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
                      >
                        <Send className="h-6 w-6" />
                      </a>
                      <a 
                        href="https://www.youtube.com/@ArsenKovalenkoViolin" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-surface p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
                      >
                        <Youtube className="h-6 w-6" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leaflet Map */}
              <div className="mt-12 rounded-2xl border border-primary/30 shadow-xl overflow-hidden">
                <div ref={mapRef} className="h-80 w-full" />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-surface border border-primary/30 rounded-2xl p-8">
                <h2 className="text-3xl font-display font-bold text-foreground mb-6">{texts.formTitle[lang]}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-subtext mb-2">{texts.name[lang]}</label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-background border-primary/30"
                      />
                    </div>
                    <div>
                      <label className="block text-subtext mb-2">{texts.emailLabel[lang]}</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-background border-primary/30"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-subtext mb-2">{texts.subject[lang]}</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      {Object.entries(texts.subjects).map(([key, value]) => (
                        <option key={key} value={key}>{value[lang]}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-subtext mb-2">{texts.message[lang]}</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="bg-background border-primary/30 resize-none"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      id="consent"
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="w-4 h-4 text-primary bg-background border-primary/30 rounded focus:ring-primary"
                    />
                    <label htmlFor="consent" className="ml-2 text-sm text-subtext">
                      {texts.consent[lang]}
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary-hover py-4 text-lg"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {isSubmitting ? '...' : texts.send[lang]}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;

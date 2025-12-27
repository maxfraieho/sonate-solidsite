import { useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, FileDown, Music, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { z } from 'zod';

// Zod validation schema for musician form
const musicianSchema = z.object({
  name: z.string().min(2, "Ім'я має містити мінімум 2 символи.").max(100),
  email: z.string().email("Невірна адреса електронної пошти.").max(255),
  instrument: z.string().min(2, "Вкажіть інструмент."),
  role: z.string().optional(),
  message: z.string().max(1000).optional(),
  consent: z.boolean().refine(val => val === true, "Необхідно підтвердити згоду."),
});

type MusicianFormData = z.infer<typeof musicianSchema>;

interface FormErrors {
  name?: string;
  email?: string;
  instrument?: string;
  consent?: string;
}

export const EnsembleSection = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'fr' | 'de' | 'uk';
  const [bioExpanded, setBioExpanded] = useState(false);
  const lastSubmitRef = useRef<number>(0);
  const [musicianForm, setMusicianForm] = useState({
    name: '',
    email: '',
    instrument: '',
    role: '',
    message: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const roleOptions = {
    fr: ['Musicien', 'Enseignant', "Chef d'orchestre", 'Autre'],
    de: ['Musiker', 'Lehrer', 'Dirigent', 'Andere'],
    uk: ['Музикант', 'Викладач', 'Диригент', 'Інше']
  };

  const validateField = (field: keyof MusicianFormData, value: string | boolean): string | undefined => {
    const testData = { ...musicianForm, [field]: value };
    const result = musicianSchema.safeParse(testData);
    if (!result.success) {
      const fieldError = result.error.errors.find(e => e.path[0] === field);
      return fieldError?.message;
    }
    return undefined;
  };

  const handleMusicianSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Debounce: prevent rapid submissions
    const now = Date.now();
    if (now - lastSubmitRef.current < 1000) {
      return;
    }
    lastSubmitRef.current = now;

    // Validate with Zod
    const result = musicianSchema.safeParse(musicianForm);
    if (!result.success) {
      const newErrors: FormErrors = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof FormErrors;
        newErrors[field] = err.message;
      });
      setErrors(newErrors);
      toast.error(result.error.errors[0].message);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://violin-telegram-webhook.maxfraieho.workers.dev/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'musician-join',
          contactName: result.data.name,
          contactEmail: result.data.email,
          instrument: result.data.instrument,
          role: result.data.role,
          message: result.data.message
        }),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => null);
        throw new Error(errorText || 'Failed to send');
      }

      // Verify response
      const data = await response.json().catch(() => null);
      if (!data) {
        throw new Error('Invalid server response');
      }

      toast.success(t('ensemble.form.success'));
      setMusicianForm({ name: '', email: '', instrument: '', role: '', message: '', consent: false });
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(t('ensemble.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  }, [musicianForm, t]);

  return (
    <section 
      className="py-20 bg-surface-dark relative shadow-[0_0_25px_hsl(var(--primary)/0.15)]" 
      id="ensemble"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
            {t('ensemble.title')}
          </h2>
          <p className="text-xl text-subtext max-w-3xl mx-auto italic">
            {t('ensemble.subtitle')}
          </p>
        </div>

        {/* Founder Profile Card with Accordion */}
        <div className="bg-surface rounded-2xl p-8 md:p-12 mb-8 border border-primary/10">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
            <img
              src="/images/founder.jpg"
              alt="Arsen Kovalenko"
              className="w-48 h-48 rounded-full object-cover border-4 border-primary shadow-lg shadow-primary/20"
              loading="lazy"
              decoding="async"
            />
            <div className="text-center md:text-left">
              <h3 className="font-display text-3xl font-bold mb-3 text-foreground">
                {t('founder.name')}
              </h3>
              <p className="text-xl text-primary mb-4">
                {t('ensemble.founder_role')}
              </p>
              <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start">
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-primary/20 text-primary">
                  {t('founder.ukraine_badge')}
                </span>
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-primary/20 text-primary">
                  {t('founder.switzerland_badge')}
                </span>
              </div>
            </div>
          </div>

          {/* Short Bio */}
          <div className="text-subtext leading-relaxed space-y-4">
            <p>{t('ensemble.founder_bio_short')}</p>
          </div>

          {/* Expanded Bio */}
          {bioExpanded && (
            <div className="text-subtext leading-relaxed space-y-4 mt-4 animate-fade-in">
              <p>{t('founder.fr_bio_preview')}</p>
              <p className="font-semibold text-primary">{t('founder.fr_bio_emphasis')}</p>
              <p>{t('founder.fr_style_desc')}</p>
            </div>
          )}

          {/* Toggle Button */}
          <button
            onClick={() => setBioExpanded(!bioExpanded)}
            className="mt-6 text-primary hover:text-primary-hover font-semibold inline-flex items-center gap-2 transition-colors"
            aria-expanded={bioExpanded}
            aria-controls="bio-expanded"
          >
            <span>{bioExpanded ? t('founder.bio_collapse') : t('founder.bio_expand')}</span>
            {bioExpanded ? <ChevronUp className="h-5 w-5" aria-hidden="true" /> : <ChevronDown className="h-5 w-5" aria-hidden="true" />}
          </button>

          {/* CV Download - Single Button with FileDown icon */}
          <div className="mt-8 pt-6 border-t border-primary/20">
            <a
              href="/cv/CV_Arsen_Kovalenko_FR.pdf"
              download="CV_Arsen_Kovalenko_FR.pdf"
              className="inline-flex items-center gap-3 bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1"
              aria-label={t('ensemble.cv_download')}
            >
              <FileDown className="h-5 w-5" aria-hidden="true" />
              <span>{t('ensemble.cv_download')}</span>
            </a>
          </div>
        </div>

        {/* Decorative Separator with Quote */}
        <div className="flex flex-col items-center justify-center my-10">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent mb-6" aria-hidden="true" />
          <p className="text-primary/80 italic text-lg font-display text-center max-w-xl">
            {t('ensemble.quote')}
          </p>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent mt-6" aria-hidden="true" />
        </div>

        {/* Invitation Block */}
        <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 animate-fade-in border border-primary/10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Music className="h-8 w-8 text-primary" aria-hidden="true" />
            <h3 className="font-display text-3xl font-bold text-foreground">
              {t('ensemble.invite_title')}
            </h3>
          </div>
          
          <p className="text-lg text-subtext text-center mb-10 max-w-2xl mx-auto">
            {t('ensemble.invite_text')}
          </p>

          {/* Join Form with enhanced styling */}
          <form 
            onSubmit={handleMusicianSubmit} 
            id="join-form"
            className="max-w-2xl mx-auto space-y-6 bg-background/50 rounded-xl p-6 md:p-8 border border-primary/20"
            aria-label={t('ensemble.form.aria_label')}
            noValidate
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="musician-name" className="block text-subtext mb-2 font-medium">
                  {t('ensemble.form.name')}
                </label>
                <Input
                  id="musician-name"
                  type="text"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "musician-name-error" : undefined}
                  value={musicianForm.name}
                  onChange={(e) => {
                    setMusicianForm({ ...musicianForm, name: e.target.value });
                    if (errors.name) {
                      setErrors({ ...errors, name: validateField('name', e.target.value) });
                    }
                  }}
                  onBlur={(e) => setErrors({ ...errors, name: validateField('name', e.target.value) })}
                  className="bg-background border-primary/30 focus:border-primary"
                  placeholder={t('ensemble.form.name_placeholder')}
                />
                {errors.name && (
                  <p id="musician-name-error" className="text-destructive text-sm mt-1" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="musician-email" className="block text-subtext mb-2 font-medium">
                  {t('ensemble.form.email')}
                </label>
                <Input
                  id="musician-email"
                  type="email"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "musician-email-error" : undefined}
                  value={musicianForm.email}
                  onChange={(e) => {
                    setMusicianForm({ ...musicianForm, email: e.target.value });
                    if (errors.email) {
                      setErrors({ ...errors, email: validateField('email', e.target.value) });
                    }
                  }}
                  onBlur={(e) => setErrors({ ...errors, email: validateField('email', e.target.value) })}
                  className="bg-background border-primary/30 focus:border-primary"
                  placeholder={t('ensemble.form.email_placeholder')}
                />
                {errors.email && (
                  <p id="musician-email-error" className="text-destructive text-sm mt-1" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="musician-instrument" className="block text-subtext mb-2 font-medium">
                  {t('ensemble.form.instrument')}
                </label>
                <Input
                  id="musician-instrument"
                  type="text"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.instrument}
                  aria-describedby={errors.instrument ? "musician-instrument-error" : undefined}
                  value={musicianForm.instrument}
                  onChange={(e) => {
                    setMusicianForm({ ...musicianForm, instrument: e.target.value });
                    if (errors.instrument) {
                      setErrors({ ...errors, instrument: validateField('instrument', e.target.value) });
                    }
                  }}
                  onBlur={(e) => setErrors({ ...errors, instrument: validateField('instrument', e.target.value) })}
                  className="bg-background border-primary/30 focus:border-primary"
                  placeholder={t('ensemble.form.instrument_placeholder')}
                />
                {errors.instrument && (
                  <p id="musician-instrument-error" className="text-destructive text-sm mt-1" role="alert">
                    {errors.instrument}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="musician-role" className="block text-subtext mb-2 font-medium">
                  {t('ensemble.form.role')}
                </label>
                <Select 
                  value={musicianForm.role} 
                  onValueChange={(value) => setMusicianForm({ ...musicianForm, role: value })}
                >
                  <SelectTrigger 
                    id="musician-role"
                    className="bg-background border-primary/30 focus:border-primary"
                    aria-label={t('ensemble.form.role')}
                  >
                    <SelectValue placeholder={t('ensemble.form.role_placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions[lang].map((role, index) => (
                      <SelectItem key={index} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label htmlFor="musician-message" className="block text-subtext mb-2 font-medium">
                {t('ensemble.form.message')}
              </label>
              <Textarea
                id="musician-message"
                rows={4}
                value={musicianForm.message}
                onChange={(e) => setMusicianForm({ ...musicianForm, message: e.target.value })}
                placeholder={t('ensemble.form.message_placeholder')}
                className="bg-background border-primary/30 focus:border-primary resize-none"
                aria-label={t('ensemble.form.message')}
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="ensemble-consent"
                  checked={musicianForm.consent}
                  onChange={(e) => {
                    setMusicianForm({ ...musicianForm, consent: e.target.checked });
                    if (errors.consent) {
                      setErrors({ ...errors, consent: e.target.checked ? undefined : t('ensemble.form.consent_error') });
                    }
                  }}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.consent}
                  aria-describedby="ensemble-consent-help"
                  className="mt-1 w-4 h-4 text-primary bg-background border-primary/30 rounded focus:ring-primary focus:ring-2"
                />
                <label htmlFor="ensemble-consent" className="text-sm text-subtext">
                  {t('ensemble.form.consent')}
                </label>
              </div>
              {errors.consent && (
                <p className="text-destructive text-sm mt-1 ml-7" role="alert">
                  {errors.consent}
                </p>
              )}
            </div>

            <div className="text-center pt-4">
              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting} 
                className="bg-primary text-primary-foreground hover:bg-primary-hover px-10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 cta-glow relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                {isSubmitting ? '...' : t('ensemble.form.submit')}
              </Button>
            </div>
          </form>

          {/* Post-form info paragraph */}
          <p className="text-center text-subtext/80 text-sm mt-8 max-w-xl mx-auto italic">
            {t('ensemble.form.post_submit_info')}
          </p>
        </div>

        {/* Transition to Music Section */}
        <div className="text-center mt-16 mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" aria-hidden="true" />
            <Headphones className="mx-4 h-8 w-8 text-primary" aria-hidden="true" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" aria-hidden="true" />
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-primary mb-3">
            {t('ensemble.music_transition_title')}
          </h3>
          <p className="text-subtext text-lg max-w-xl mx-auto">
            {t('ensemble.music_transition_desc')}
          </p>
        </div>
      </div>
    </section>
  );
};
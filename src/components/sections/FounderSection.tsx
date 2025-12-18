import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Badge, ChevronDown, ChevronUp, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const FounderSection = () => {
  const { t } = useTranslation();
  const [bioExpanded, setBioExpanded] = useState(false);
  const [activeBioLang, setActiveBioLang] = useState<'uk' | 'fr'>('uk');

  return (
    <section className="py-20 bg-background" id="fondateur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">
            {t('founder.title')}
          </h2>
        </div>

        <Tabs defaultValue="biography" className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-4 mb-12 bg-transparent">
            <TabsTrigger
              value="biography"
              className="px-6 py-3 rounded-full font-semibold transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-surface text-foreground hover:bg-primary hover:text-primary-foreground"
            >
              <User className="h-4 w-4 mr-2" />
              {t('founder.biography_tab')}
            </TabsTrigger>
            <TabsTrigger
              value="musician"
              className="px-6 py-3 rounded-full font-semibold transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-surface text-foreground hover:bg-primary hover:text-primary-foreground"
            >
              <Badge className="h-4 w-4 mr-2" />
              {t('founder.musician_tab')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="biography">
            <div className="bg-surface rounded-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                <img
                  src="https://violin.pp.ua/assets/img/chee-yun-s.jpg"
                  alt="Arsen Kovalenko"
                  className="w-48 h-48 rounded-full object-cover border-4 border-primary"
                />
                <div>
                  <h3 className="font-display text-3xl font-bold mb-3 text-foreground">
                    {t('founder.name')}
                  </h3>
                  <p className="text-xl text-primary mb-4">
                    {t('founder.role')}
                  </p>
                  <div className="flex flex-wrap gap-3 items-center">
                    <button
                      onClick={() => setActiveBioLang('uk')}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                        activeBioLang === 'uk'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-primary/20 text-primary hover:bg-primary/30'
                      }`}
                    >
                      {t('founder.ukraine_badge')}
                    </button>
                    <button
                      onClick={() => setActiveBioLang('fr')}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                        activeBioLang === 'fr'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-primary/20 text-primary hover:bg-primary/30'
                      }`}
                    >
                      {t('founder.switzerland_badge')}
                    </button>
                  </div>
                </div>
              </div>

              {/* Bio Content */}
              <div className="text-subtext leading-relaxed space-y-4">
                <p>{t('founder.fr_bio_preview')}</p>
                <p className="font-semibold text-primary">{t('founder.fr_bio_emphasis')}</p>
              </div>

              {/* Expanded Bio */}
              {bioExpanded && (
                <div className="text-subtext leading-relaxed space-y-4 mt-4 animate-fade-in-up">
                  <h5 className="text-xl font-display font-bold text-primary mb-4">
                    {t('founder.fr_education_title')}
                  </h5>
                  <p>{t('founder.fr_education_school1')}</p>
                  <p>{t('founder.fr_education_university')}</p>

                  <h5 className="text-xl font-display font-bold text-primary mb-4 mt-6">
                    {t('founder.fr_repertoire_title')}
                  </h5>
                  <ul className="space-y-2">
                    <li><strong className="text-foreground">{t('founder.fr_repertoire_classical')}</strong></li>
                    <li><strong className="text-foreground">{t('founder.fr_repertoire_contemporary')}</strong></li>
                    <li><strong className="text-foreground">{t('founder.fr_repertoire_folk')}</strong></li>
                    <li><strong className="text-foreground">{t('founder.fr_repertoire_pop')}</strong></li>
                  </ul>
                </div>
              )}

              {/* Toggle Button */}
              <button
                onClick={() => setBioExpanded(!bioExpanded)}
                className="mt-6 text-primary hover:text-primary-hover font-semibold inline-flex items-center gap-2 transition-colors"
              >
                <span>{bioExpanded ? t('founder.bio_collapse') : t('founder.bio_expand')}</span>
                {bioExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>

              {/* CV Downloads */}
              <div className="mt-12 bg-primary/5 rounded-xl p-8 border border-primary/20">
                <h3 className="text-2xl font-display font-bold text-center mb-2">
                  <span className="text-primary">{t('founder.cv_download_title')}</span>
                </h3>
                <p className="text-center text-subtext mb-6">{t('founder.cv_download_desc')}</p>

                <div className="flex gap-4 justify-center flex-wrap">
                  <a
                    href="https://violin.pp.ua/assets/cv/CV_Arsen_Kovalenko_FR.pdf"
                    download
                    className="inline-flex items-center gap-3 bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1"
                  >
                    <Download className="h-6 w-6" />
                    <div className="text-left">
                      <div className="font-bold">{t('founder.cv_french')}</div>
                      <div className="text-sm opacity-90">{t('founder.cv_french_subtitle')}</div>
                    </div>
                  </a>

                  <a
                    href="https://violin.pp.ua/assets/cv/CV_Arsen_Kovalenko_UA.pdf"
                    download
                    className="inline-flex items-center gap-3 bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1"
                  >
                    <Download className="h-6 w-6" />
                    <div className="text-left">
                      <div className="font-bold">{t('founder.cv_ukrainian')}</div>
                      <div className="text-sm opacity-90">{t('founder.cv_ukrainian_subtitle')}</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="musician">
            <div className="bg-surface rounded-2xl p-8 md:p-12">
              <h3 className="font-display text-3xl font-bold text-center mb-4 text-foreground">
                {t('musician_form.title')}
              </h3>
              <p className="text-subtext text-center mb-8 text-lg">
                {t('musician_form.description')}
              </p>

              <form className="max-w-3xl mx-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-subtext mb-2">{t('musician_form.full_name')}</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-subtext mb-2">{t('musician_form.email')}</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-subtext mb-2">{t('musician_form.instrument')}</label>
                    <select className="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                      <option value="">{t('musician_form.instrument_placeholder')}</option>
                      <option value="violin">{t('musician_form.violin')}</option>
                      <option value="viola">{t('musician_form.viola')}</option>
                      <option value="cello">{t('musician_form.cello')}</option>
                      <option value="bass">{t('musician_form.bass')}</option>
                      <option value="piano">{t('musician_form.piano')}</option>
                      <option value="flute">{t('musician_form.flute')}</option>
                      <option value="clarinet">{t('musician_form.clarinet')}</option>
                      <option value="other">{t('musician_form.other')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-subtext mb-2">{t('musician_form.level')}</label>
                    <select className="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                      <option value="beginner">{t('musician_form.beginner')}</option>
                      <option value="intermediate">{t('musician_form.intermediate')}</option>
                      <option value="advanced">{t('musician_form.advanced')}</option>
                      <option value="professional">{t('musician_form.professional')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-subtext mb-2">{t('musician_form.message')}</label>
                  <textarea
                    rows={4}
                    placeholder={t('musician_form.message_placeholder')}
                    className="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 text-primary bg-background border-primary/30 rounded focus:ring-primary focus:ring-2"
                  />
                  <label className="ml-2 text-sm text-subtext">
                    {t('musician_form.consent')}
                  </label>
                </div>

                <div className="text-center">
                  <Button type="submit" size="lg" className="bg-primary text-primary-foreground hover:bg-primary-hover">
                    {t('musician_form.submit')}
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

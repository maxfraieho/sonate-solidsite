import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import SEO from '@/components/SEO';

const Privacy = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'fr' | 'de' | 'uk';

  const content = {
    de: {
      title: 'Datenschutzerklärung',
      lastUpdated: 'Letzte Aktualisierung: 15. Januar 2025',
      sections: [
        {
          title: '1. Verantwortlicher',
          content: `Verantwortlich für die Datenverarbeitung auf dieser Website ist:

Arsen Kovalenko
Sonate Solidaire
Avenue du Mont-Blanc 29
1196 Gland, Vaud
Schweiz

E-Mail: arsen.k111999@gmail.com
Telefon: +41 78 326 11 12`
        },
        {
          title: '2. Erhobene Daten',
          content: `Wir erheben folgende Daten:

• Kontaktformular: Name, E-Mail-Adresse, Betreff, Nachricht
• Analysedaten (nur mit Zustimmung): IP-Adresse (anonymisiert), besuchte Seiten, Verweildauer, Browser-Typ, Gerätetyp
• Technische Daten: Server-Logs (IP-Adresse, Zeitpunkt des Zugriffs, angeforderte Seite)`
        },
        {
          title: '3. Zweck der Verarbeitung',
          content: `Wir verarbeiten Ihre Daten zu folgenden Zwecken:

• Beantwortung Ihrer Anfragen über das Kontaktformular
• Verbesserung unserer Website und ihrer Benutzerfreundlichkeit
• Statistische Analyse der Website-Nutzung (anonymisiert)
• Gewährleistung der technischen Sicherheit und Funktionalität`
        },
        {
          title: '4. Rechtsgrundlage',
          content: `Die Verarbeitung Ihrer personenbezogenen Daten erfolgt auf Grundlage:

• Art. 6 Abs. 1 lit. a DSGVO / Art. 31 nDSG: Einwilligung (für Analyse-Cookies)
• Art. 6 Abs. 1 lit. b DSGVO / Art. 31 nDSG: Vertragserfüllung (Beantwortung von Anfragen)
• Art. 6 Abs. 1 lit. f DSGVO / Art. 31 nDSG: Berechtigte Interessen (Website-Sicherheit, Statistik)`
        },
        {
          title: '5. Google Analytics',
          content: `Wir verwenden Google Analytics 4, einen Webanalysedienst der Google Ireland Limited.

• Messung-ID: G-LY0ZLRZZHL
• Aktivierung: Nur nach ausdrücklicher Zustimmung durch den Cookie-Banner
• IP-Anonymisierung: Aktiviert
• Google Signals: Deaktiviert
• Werbe-Personalisierung: Deaktiviert
• Datenaufbewahrung: 14 Monate

Google Analytics verwendet Cookies, um die Nutzung der Website zu analysieren. Die erzeugten Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.

Wenn Sie dem nicht zustimmen, werden keine Analyse-Cookies gesetzt und keine Daten an Google übermittelt.`
        },
        {
          title: '6. Cookies',
          content: `Unsere Website verwendet folgende Cookies:

Technisch notwendige Cookies:
• analytics_consent: Speichert Ihre Cookie-Einstellungen (1 Jahr)

Analyse-Cookies (nur mit Zustimmung):
• _ga: Google Analytics Hauptcookie (2 Jahre)
• _ga_*: Google Analytics Sitzungscookie (2 Jahre)

Sie können Ihre Cookie-Einstellungen jederzeit über den Cookie-Banner ändern oder Cookies in Ihren Browsereinstellungen löschen.`
        },
        {
          title: '7. Speicherdauer',
          content: `• Kontaktformular-Daten: Bis zur Erledigung Ihrer Anfrage, maximal 2 Jahre
• Analytics-Daten: 14 Monate
• Cookie-Einstellungen: 1 Jahr
• Server-Logs: 30 Tage`
        },
        {
          title: '8. Ihre Rechte',
          content: `Nach dem Schweizer Datenschutzgesetz (nDSG) und der DSGVO haben Sie folgende Rechte:

• Auskunftsrecht: Sie können Auskunft über Ihre gespeicherten Daten verlangen
• Berichtigungsrecht: Sie können die Berichtigung unrichtiger Daten verlangen
• Löschungsrecht: Sie können die Löschung Ihrer Daten verlangen
• Einschränkungsrecht: Sie können die Einschränkung der Verarbeitung verlangen
• Datenübertragbarkeit: Sie können Ihre Daten in einem strukturierten Format erhalten
• Widerspruchsrecht: Sie können der Verarbeitung widersprechen
• Widerrufsrecht: Sie können Ihre Einwilligung jederzeit widerrufen

Zur Ausübung Ihrer Rechte kontaktieren Sie uns bitte unter: arsen.k111999@gmail.com`
        },
        {
          title: '9. Internationale Datenübermittlung',
          content: `Wir nutzen folgende Dienste, die Daten in Drittländer übermitteln können:

• Cloudflare (USA): Hosting und Content Delivery Network
  - Rechtsgrundlage: EU-US Data Privacy Framework
  - Datenschutzrichtlinie: cloudflare.com/privacypolicy

• Google Analytics (USA): Webanalyse (nur mit Zustimmung)
  - Rechtsgrundlage: EU-US Data Privacy Framework
  - Datenschutzrichtlinie: policies.google.com/privacy

Für alle Übermittlungen in Drittländer stellen wir angemessene Garantien nach Art. 46 DSGVO / Art. 16 nDSG sicher.`
        },
        {
          title: '10. Datensicherheit',
          content: `Wir treffen angemessene technische und organisatorische Massnahmen zum Schutz Ihrer Daten:

• HTTPS-Verschlüsselung für alle Datenübertragungen
• Cloudflare DDoS-Schutz und Web Application Firewall
• Regelmässige Sicherheitsüberprüfungen
• Zugriffsbeschränkungen auf personenbezogene Daten
• Keine Speicherung sensibler Daten auf unseren Servern`
        },
        {
          title: '11. Aufsichtsbehörde',
          content: `Wenn Sie der Meinung sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen das Datenschutzrecht verstösst, können Sie sich an die zuständige Aufsichtsbehörde wenden:

Eidgenössischer Datenschutz- und Öffentlichkeitsbeauftragter (EDÖB)
Feldeggweg 1
3003 Bern
Schweiz
Website: www.edoeb.admin.ch

Für EU-Bürger: Sie können sich auch an die Datenschutzbehörde Ihres Wohnsitzlandes wenden.`
        },
        {
          title: '12. Kontakt',
          content: `Bei Fragen zum Datenschutz kontaktieren Sie uns bitte:

E-Mail: arsen.k111999@gmail.com
Telefon: +41 78 326 11 12
Adresse: Avenue du Mont-Blanc 29, 1196 Gland, Schweiz`
        }
      ]
    },
    fr: {
      title: 'Politique de confidentialité',
      lastUpdated: 'Dernière mise à jour : 15 janvier 2025',
      sections: [
        {
          title: '1. Responsable du traitement',
          content: `Le responsable du traitement des données sur ce site est :

Arsen Kovalenko
Sonate Solidaire
Avenue du Mont-Blanc 29
1196 Gland, Vaud
Suisse

E-mail : arsen.k111999@gmail.com
Téléphone : +41 78 326 11 12`
        },
        {
          title: '2. Données collectées',
          content: `Nous collectons les données suivantes :

• Formulaire de contact : nom, adresse e-mail, sujet, message
• Données analytiques (uniquement avec consentement) : adresse IP (anonymisée), pages visitées, durée de visite, type de navigateur, type d'appareil
• Données techniques : journaux serveur (adresse IP, heure d'accès, page demandée)`
        },
        {
          title: '3. Finalités du traitement',
          content: `Nous traitons vos données aux fins suivantes :

• Répondre à vos demandes via le formulaire de contact
• Améliorer notre site web et son ergonomie
• Analyse statistique de l'utilisation du site (anonymisée)
• Assurer la sécurité technique et le bon fonctionnement du site`
        },
        {
          title: '4. Base juridique',
          content: `Le traitement de vos données personnelles repose sur :

• Art. 6 par. 1 let. a RGPD / Art. 31 nLPD : Consentement (pour les cookies analytiques)
• Art. 6 par. 1 let. b RGPD / Art. 31 nLPD : Exécution d'un contrat (réponse aux demandes)
• Art. 6 par. 1 let. f RGPD / Art. 31 nLPD : Intérêts légitimes (sécurité du site, statistiques)`
        },
        {
          title: '5. Google Analytics',
          content: `Nous utilisons Google Analytics 4, un service d'analyse web de Google Ireland Limited.

• ID de mesure : G-LY0ZLRZZHL
• Activation : Uniquement après consentement explicite via la bannière cookies
• Anonymisation IP : Activée
• Google Signals : Désactivé
• Personnalisation publicitaire : Désactivée
• Conservation des données : 14 mois

Google Analytics utilise des cookies pour analyser l'utilisation du site. Les informations générées sont généralement transmises à un serveur Google aux États-Unis.

Si vous refusez, aucun cookie analytique n'est placé et aucune donnée n'est transmise à Google.`
        },
        {
          title: '6. Cookies',
          content: `Notre site utilise les cookies suivants :

Cookies techniquement nécessaires :
• analytics_consent : Enregistre vos préférences de cookies (1 an)

Cookies analytiques (uniquement avec consentement) :
• _ga : Cookie principal Google Analytics (2 ans)
• _ga_* : Cookie de session Google Analytics (2 ans)

Vous pouvez modifier vos préférences de cookies à tout moment via la bannière ou supprimer les cookies dans les paramètres de votre navigateur.`
        },
        {
          title: '7. Durée de conservation',
          content: `• Données du formulaire de contact : Jusqu'à la résolution de votre demande, maximum 2 ans
• Données Analytics : 14 mois
• Préférences cookies : 1 an
• Journaux serveur : 30 jours`
        },
        {
          title: '8. Vos droits',
          content: `Conformément à la loi suisse sur la protection des données (nLPD) et au RGPD, vous disposez des droits suivants :

• Droit d'accès : Vous pouvez demander des informations sur vos données stockées
• Droit de rectification : Vous pouvez demander la correction de données inexactes
• Droit à l'effacement : Vous pouvez demander la suppression de vos données
• Droit à la limitation : Vous pouvez demander la limitation du traitement
• Droit à la portabilité : Vous pouvez recevoir vos données dans un format structuré
• Droit d'opposition : Vous pouvez vous opposer au traitement
• Droit de retrait : Vous pouvez retirer votre consentement à tout moment

Pour exercer vos droits, contactez-nous à : arsen.k111999@gmail.com`
        },
        {
          title: '9. Transferts internationaux de données',
          content: `Nous utilisons les services suivants qui peuvent transférer des données vers des pays tiers :

• Cloudflare (USA) : Hébergement et réseau de diffusion de contenu
  - Base juridique : EU-US Data Privacy Framework
  - Politique de confidentialité : cloudflare.com/privacypolicy

• Google Analytics (USA) : Analyse web (uniquement avec consentement)
  - Base juridique : EU-US Data Privacy Framework
  - Politique de confidentialité : policies.google.com/privacy

Pour tous les transferts vers des pays tiers, nous assurons des garanties appropriées conformément à l'art. 46 RGPD / art. 16 nLPD.`
        },
        {
          title: '10. Sécurité des données',
          content: `Nous prenons des mesures techniques et organisationnelles appropriées pour protéger vos données :

• Chiffrement HTTPS pour toutes les transmissions de données
• Protection DDoS Cloudflare et pare-feu applicatif
• Contrôles de sécurité réguliers
• Restrictions d'accès aux données personnelles
• Aucun stockage de données sensibles sur nos serveurs`
        },
        {
          title: '11. Autorité de surveillance',
          content: `Si vous estimez que le traitement de vos données personnelles viole la législation sur la protection des données, vous pouvez contacter l'autorité de surveillance compétente :

Préposé fédéral à la protection des données et à la transparence (PFPDT)
Feldeggweg 1
3003 Berne
Suisse
Site web : www.edoeb.admin.ch

Pour les citoyens de l'UE : Vous pouvez également contacter l'autorité de protection des données de votre pays de résidence.`
        },
        {
          title: '12. Contact',
          content: `Pour toute question relative à la protection des données, contactez-nous :

E-mail : arsen.k111999@gmail.com
Téléphone : +41 78 326 11 12
Adresse : Avenue du Mont-Blanc 29, 1196 Gland, Suisse`
        }
      ]
    },
    uk: {
      title: 'Політика конфіденційності',
      lastUpdated: 'Останнє оновлення: 15 січня 2025',
      sections: [
        {
          title: '1. Відповідальна особа',
          content: `Відповідальним за обробку даних на цьому веб-сайті є:

Арсен Коваленко
Sonate Solidaire
Avenue du Mont-Blanc 29
1196 Gland, Vaud
Швейцарія

E-mail: arsen.k111999@gmail.com
Телефон: +41 78 326 11 12`
        },
        {
          title: '2. Зібрані дані',
          content: `Ми збираємо такі дані:

• Контактна форма: ім'я, адреса електронної пошти, тема, повідомлення
• Аналітичні дані (лише за згодою): IP-адреса (анонімізована), відвідані сторінки, тривалість візиту, тип браузера, тип пристрою
• Технічні дані: журнали сервера (IP-адреса, час доступу, запитувана сторінка)`
        },
        {
          title: '3. Мета обробки',
          content: `Ми обробляємо ваші дані з такими цілями:

• Відповідь на ваші запити через контактну форму
• Покращення нашого веб-сайту та його зручності використання
• Статистичний аналіз використання сайту (анонімізований)
• Забезпечення технічної безпеки та функціональності`
        },
        {
          title: '4. Правова основа',
          content: `Обробка ваших персональних даних здійснюється на основі:

• Ст. 6 п. 1 літ. a GDPR / Ст. 31 nDSG: Згода (для аналітичних cookies)
• Ст. 6 п. 1 літ. b GDPR / Ст. 31 nDSG: Виконання договору (відповідь на запити)
• Ст. 6 п. 1 літ. f GDPR / Ст. 31 nDSG: Законні інтереси (безпека сайту, статистика)`
        },
        {
          title: '5. Google Analytics',
          content: `Ми використовуємо Google Analytics 4, сервіс веб-аналітики від Google Ireland Limited.

• Ідентифікатор вимірювання: G-LY0ZLRZZHL
• Активація: Лише після явної згоди через банер cookies
• Анонімізація IP: Увімкнено
• Google Signals: Вимкнено
• Персоналізація реклами: Вимкнено
• Зберігання даних: 14 місяців

Google Analytics використовує cookies для аналізу використання сайту. Згенерована інформація зазвичай передається на сервер Google у США.

Якщо ви відмовляєтесь, аналітичні cookies не встановлюються і дані не передаються в Google.`
        },
        {
          title: '6. Cookies',
          content: `Наш сайт використовує такі cookies:

Технічно необхідні cookies:
• analytics_consent: Зберігає ваші налаштування cookies (1 рік)

Аналітичні cookies (лише за згодою):
• _ga: Основний cookie Google Analytics (2 роки)
• _ga_*: Сесійний cookie Google Analytics (2 роки)

Ви можете змінити налаштування cookies в будь-який час через банер або видалити cookies в налаштуваннях браузера.`
        },
        {
          title: '7. Термін зберігання',
          content: `• Дані контактної форми: До вирішення вашого запиту, максимум 2 роки
• Аналітичні дані: 14 місяців
• Налаштування cookies: 1 рік
• Журнали сервера: 30 днів`
        },
        {
          title: '8. Ваші права',
          content: `Згідно зі швейцарським законом про захист даних (nDSG) та GDPR, ви маєте такі права:

• Право на доступ: Ви можете запитати інформацію про ваші збережені дані
• Право на виправлення: Ви можете вимагати виправлення неточних даних
• Право на видалення: Ви можете вимагати видалення ваших даних
• Право на обмеження: Ви можете вимагати обмеження обробки
• Право на переносимість даних: Ви можете отримати свої дані в структурованому форматі
• Право на заперечення: Ви можете заперечити проти обробки
• Право на відкликання: Ви можете відкликати свою згоду в будь-який час

Для реалізації ваших прав зв'яжіться з нами: arsen.k111999@gmail.com`
        },
        {
          title: '9. Міжнародна передача даних',
          content: `Ми використовуємо такі сервіси, які можуть передавати дані до третіх країн:

• Cloudflare (США): Хостинг та мережа доставки контенту
  - Правова основа: EU-US Data Privacy Framework
  - Політика конфіденційності: cloudflare.com/privacypolicy

• Google Analytics (США): Веб-аналітика (лише за згодою)
  - Правова основа: EU-US Data Privacy Framework
  - Політика конфіденційності: policies.google.com/privacy

Для всіх передач до третіх країн ми забезпечуємо належні гарантії згідно зі ст. 46 GDPR / ст. 16 nDSG.`
        },
        {
          title: '10. Безпека даних',
          content: `Ми вживаємо відповідних технічних та організаційних заходів для захисту ваших даних:

• HTTPS-шифрування для всіх передач даних
• Захист від DDoS та веб-фаєрвол Cloudflare
• Регулярні перевірки безпеки
• Обмеження доступу до персональних даних
• Відсутність зберігання чутливих даних на наших серверах`
        },
        {
          title: '11. Наглядовий орган',
          content: `Якщо ви вважаєте, що обробка ваших персональних даних порушує законодавство про захист даних, ви можете звернутися до компетентного наглядового органу:

Федеральний уповноважений з питань захисту даних та інформації (EDÖB)
Feldeggweg 1
3003 Берн
Швейцарія
Веб-сайт: www.edoeb.admin.ch

Для громадян ЄС: Ви також можете звернутися до органу захисту даних вашої країни проживання.`
        },
        {
          title: '12. Контакти',
          content: `З питань захисту даних зв'яжіться з нами:

E-mail: arsen.k111999@gmail.com
Телефон: +41 78 326 11 12
Адреса: Avenue du Mont-Blanc 29, 1196 Gland, Швейцарія`
        }
      ]
    }
  };

  const t = content[lang] || content.de;

  return (
    <>
      <SEO 
        title={`${t.title} | Arsen Kovalenko – Switzerland`}
        description="Privacy Policy for violin.pp.ua. Information about data collection, cookies, Google Analytics, and your rights under Swiss nDSG and EU GDPR."
        path="/privacy"
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                {t.title}
              </h1>
              <p className="text-subtext">{t.lastUpdated}</p>
            </header>

            <div className="space-y-10">
              {t.sections.map((section, index) => (
                <section key={index} className="bg-surface border border-primary/20 rounded-xl p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-display font-bold text-primary mb-4">
                    {section.title}
                  </h2>
                  <div className="text-foreground leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Privacy;
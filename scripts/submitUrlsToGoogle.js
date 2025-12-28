/**
 * URL Ping Script for Google Indexing
 * Run with: node scripts/submitUrlsToGoogle.js
 * 
 * This pings Google to encourage crawling of the sitemap and key URLs.
 * Note: This supplements but doesn't replace Google Search Console.
 */

const urls = [
  "https://violin.pp.ua/",
  "https://violin.pp.ua/fr/",
  "https://violin.pp.ua/de/",
  "https://violin.pp.ua/uk/",
  "https://violin.pp.ua/integration",
  "https://violin.pp.ua/fr/integration",
  "https://violin.pp.ua/de/integration",
  "https://violin.pp.ua/uk/integration",
  "https://violin.pp.ua/support",
  "https://violin.pp.ua/contact",
  "https://violin.pp.ua/privacy"
];

const sitemapUrl = "https://violin.pp.ua/sitemap.xml";

async function pingGoogle() {
  console.log("📡 Pinging Google for sitemap and URLs...\n");

  // Ping sitemap
  try {
    const response = await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
    console.log(`✅ Sitemap ping: ${response.status} - ${sitemapUrl}`);
  } catch (error) {
    console.error(`❌ Sitemap ping failed:`, error.message);
  }

  // Ping individual URLs (informational - Google doesn't guarantee crawling)
  console.log("\n📄 Notifying Google about key pages:");
  
  for (const url of urls) {
    try {
      // Using Google's ping endpoint for sitemap notification
      const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(url)}`;
      const response = await fetch(pingUrl);
      console.log(`  → ${url}: ${response.status === 200 ? '✅' : '⚠️'} (${response.status})`);
    } catch (error) {
      console.error(`  → ${url}: ❌ Error - ${error.message}`);
    }
  }

  console.log("\n✨ Done! Remember to also:");
  console.log("   1. Submit URLs directly in Google Search Console");
  console.log("   2. Request indexing for priority pages");
  console.log("   3. Monitor crawl stats in GSC");
}

pingGoogle();

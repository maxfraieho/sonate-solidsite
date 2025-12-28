// Automatic sitemap ping to Google after build
fetch('https://www.google.com/ping?sitemap=https://violin.pp.ua/sitemap.xml')
  .then(res => console.log("✅ Sitemap pinged to Google:", res.status))
  .catch(err => console.error("❌ Ping failed:", err));

// Also ping Bing
fetch('https://www.bing.com/ping?sitemap=https://violin.pp.ua/sitemap.xml')
  .then(res => console.log("✅ Sitemap pinged to Bing:", res.status))
  .catch(err => console.error("❌ Bing ping failed:", err));

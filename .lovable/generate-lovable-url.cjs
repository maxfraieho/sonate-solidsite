#!/usr/bin/env node
/**
 * Generate Lovable Build URL from prompt file
 *
 * Uses Lovable API "Build with URL" feature to create shareable URL
 * that auto-submits prompt when opened.
 *
 * Usage: node generate-lovable-url.cjs <prompt-file>
 *
 * Docs: https://docs.lovable.dev/integrations/build-with-url
 */

const fs = require('fs');
const path = require('path');

function main() {
  const promptFile = process.argv[2];

  if (!promptFile) {
    console.error('Usage: node generate-lovable-url.cjs <prompt-file>');
    console.error('Example: node generate-lovable-url.cjs .lovable/prompts/pending/2025-12-25-test.md');
    process.exit(1);
  }

  // Read prompt content
  const promptPath = path.resolve(promptFile);
  if (!fs.existsSync(promptPath)) {
    console.error(`❌ Error: Prompt file not found: ${promptPath}`);
    process.exit(1);
  }

  const promptContent = fs.readFileSync(promptPath, 'utf-8').trim();

  if (promptContent.length === 0) {
    console.error('❌ Error: Prompt file is empty');
    process.exit(1);
  }

  if (promptContent.length > 50000) {
    console.warn(`⚠️  Warning: Prompt is ${promptContent.length} characters (max 50,000)`);
    console.warn('   Very long URLs might fail due to browser constraints');
  }

  // URL encode the prompt
  const encodedPrompt = encodeURIComponent(promptContent);

  // Generate Lovable URL
  const lovableUrl = `https://lovable.dev/?autosubmit=true#prompt=${encodedPrompt}`;

  // Output results
  console.log('📄 Prompt file:', path.basename(promptFile));
  console.log('📏 Prompt length:', promptContent.length, 'characters');
  console.log('🔗 Lovable URL generated:');
  console.log('');
  console.log(lovableUrl);
  console.log('');
  console.log('✅ Next steps:');
  console.log('1. Copy the URL above');
  console.log('2. Open in browser where you are logged into Lovable');
  console.log('3. Lovable will auto-submit and start building');
  console.log('');
  console.log('💡 Tip: Use https://lovable.dev/links for URL validation');
}

main();

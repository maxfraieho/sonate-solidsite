#!/usr/bin/env node
/**
 * Prepare Lovable chat message from prompt file
 *
 * For EXISTING projects, opens project URL and copies prompt to clipboard
 * for manual paste into Lovable chat interface.
 *
 * Usage: node chat-lovable.cjs <prompt-file>
 *
 * Workflow:
 * 1. Reads prompt from .lovable/prompts/pending/
 * 2. Copies prompt to clipboard (if xclip available)
 * 3. Opens Lovable project URL in browser
 * 4. Q pastes prompt (Ctrl+V) into chat input
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Project configuration
const PROJECT_URL = 'https://lovable.dev/projects/d6dcf711-7dfc-4807-8fbe-9a985d54c8d9';

function main() {
  const promptFile = process.argv[2];

  if (!promptFile) {
    console.error('Usage: node chat-lovable.cjs <prompt-file>');
    console.error('Example: node chat-lovable.cjs .lovable/prompts/pending/2025-12-25-test.md');
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

  console.log('📄 Prompt file:', path.basename(promptFile));
  console.log('📏 Prompt length:', promptContent.length, 'characters');
  console.log('');

  // Try to copy to clipboard (Linux)
  let clipboardSuccess = false;
  try {
    execSync('which xclip', { stdio: 'ignore' });
    execSync('xclip -version', { stdio: 'ignore' });

    // Copy to both primary and clipboard selections
    const proc = execSync('xclip -selection clipboard', {
      input: promptContent,
      stdio: ['pipe', 'pipe', 'pipe']
    });

    clipboardSuccess = true;
    console.log('✅ Prompt copied to clipboard!');
  } catch (e) {
    console.log('⚠️  xclip not available - copy manually below');
  }

  console.log('');
  console.log('🔗 Lovable Project URL:');
  console.log(PROJECT_URL);
  console.log('');

  // Try to open browser (Linux)
  try {
    const browserCommands = ['xdg-open', 'google-chrome', 'firefox', 'chromium'];
    let opened = false;

    for (const cmd of browserCommands) {
      try {
        execSync(`which ${cmd}`, { stdio: 'ignore' });
        execSync(`${cmd} "${PROJECT_URL}" 2>/dev/null &`, { stdio: 'ignore' });
        console.log(`✅ Opened in browser (${cmd})`);
        opened = true;
        break;
      } catch (e) {
        // Try next browser
      }
    }

    if (!opened) {
      console.log('ℹ️  Could not auto-open browser - open URL manually');
    }
  } catch (e) {
    console.log('ℹ️  Browser auto-open failed - open URL manually');
  }

  console.log('');
  console.log('📋 Next steps:');
  console.log('1. Browser should open to Lovable project page');
  if (clipboardSuccess) {
    console.log('2. Find chat input at bottom of page');
    console.log('3. Paste prompt (Ctrl+V or Cmd+V)');
    console.log('4. Press Enter to submit');
  } else {
    console.log('2. Copy the prompt below');
    console.log('3. Paste into Lovable chat input');
    console.log('4. Press Enter to submit');
    console.log('');
    console.log('─'.repeat(80));
    console.log(promptContent);
    console.log('─'.repeat(80));
  }

  console.log('');
  console.log('⏳ After Lovable finishes:');
  console.log('   1. Review changes in Lovable UI');
  console.log('   2. Click "Sync to GitHub" button');
  console.log('   3. Wait for push to complete');
  console.log('   4. Run: git pull');
  console.log('   5. Claude will review the changes');
  console.log('');
  console.log('💡 Lovable chat supports:');
  console.log('   - Multi-line prompts (Shift+Enter for new line)');
  console.log('   - Markdown formatting');
  console.log('   - File references (will auto-detect from prompt)');
}

main();

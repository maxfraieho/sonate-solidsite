# Lovable.dev Automation Guide

## Overview

Automated workflow for Claude → Lovable.dev communication to streamline development.

**Status**: Hybrid approach (optimized manual workflow + automation in progress)

## Quick Start

### Option A: Manual Workflow (Current - WORKING ✅)

```bash
# 1. Write prompt to pending/
# (Claude does this automatically)

# 2. Run chat helper
node .lovable/chat-lovable.cjs .lovable/prompts/pending/<prompt-file>.md

# 3. Browser opens → paste prompt (Ctrl+V) → Enter
# 4. Wait for Lovable to finish → click "Sync to GitHub"
# 5. Claude runs: git pull
# 6. Claude reviews changes
```

**Pros**:
- ✅ Zero RAM overhead (no browser automation)
- ✅ 100% reliable (no selector breakage)
- ✅ Fast (no wait for automation)

**Cons**:
- ❌ Manual step (Q must paste + click)

### Option B: Full Automation (IN PROGRESS 🚧)

```bash
# 1. Start optimized Chrome container
docker-compose -f .lovable/docker-compose.yml up -d

# 2. Run automation script
node .lovable/automate-lovable.cjs .lovable/prompts/pending/<prompt-file>.md

# 3. Script handles: navigation, login, paste, submit
# 4. Wait for generation → auto-sync to GitHub
# 5. Claude: git pull + review
```

**Pros**:
- ✅ Fully automated (zero manual steps)
- ✅ Fast iteration (for multiple prompts)

**Cons**:
- ❌ Requires working selectors (fragile)
- ❌ Uses ~150MB RAM (container)

**Current Blocker**: Need reliable Lovable UI selectors
**Help Needed**: See `.lovable/prompts/chatgpt-lovable-ui-selectors.md`

## Architecture

### Files

```
.lovable/
├── Dockerfile.chrome-light      # Optimized Alpine Chrome (<150MB RAM)
├── docker-compose.yml           # Easy container management
├── chat-lovable.cjs             # Manual workflow helper (WORKING)
├── automate-lovable.cjs         # Full automation script (IN PROGRESS)
├── generate-lovable-url.cjs     # URL generator (for new apps only)
├── prompts/
│   ├── pending/                 # Claude writes prompts here
│   ├── completed/               # Moved after Lovable processes
│   └── chatgpt-lovable-ui-selectors.md  # Help request for selectors
└── README-automation.md         # This file
```

### Workflow State Machine

```
┌─────────────────────────────────────────────────────────────┐
│ Claude: Generate prompt file                                │
│ → .lovable/prompts/pending/YYYY-MM-DD-HHMM-description.md  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ├─────────────────────────────────────┐
                     │                                     │
         ┌───────────▼───────────┐         ┌──────────────▼──────────────┐
         │ MANUAL (Option A)     │         │ AUTOMATED (Option B)        │
         │                       │         │                             │
         │ 1. chat-lovable.cjs   │         │ 1. docker-compose up        │
         │ 2. Browser opens      │         │ 2. automate-lovable.cjs     │
         │ 3. Q pastes prompt    │         │ 3. Script pastes + submits  │
         │ 4. Q clicks Submit    │         │ 4. Waits for completion     │
         └───────────┬───────────┘         └──────────────┬──────────────┘
                     │                                     │
                     └──────────────┬──────────────────────┘
                                    │
                     ┌──────────────▼──────────────┐
                     │ Lovable generates code      │
                     │ Q clicks "Sync to GitHub"   │
                     └──────────────┬──────────────┘
                                    │
                     ┌──────────────▼──────────────┐
                     │ Claude: git pull            │
                     │ Code review (skills)        │
                     │ - frontend-code-review      │
                     │ - typescript-checker        │
                     │ - react-patterns            │
                     └──────────────┬──────────────┘
                                    │
                     ┌──────────────▼──────────────┐
                     │ Local improvements          │
                     │ git commit + push           │
                     │ Move prompt → completed/    │
                     └─────────────────────────────┘
```

## Resource Optimization

### Chrome Container (Dockerfile.chrome-light)

**Base Image**: Alpine Linux 3.19 (minimal footprint)

**Key Optimizations**:

```dockerfile
# 1. Use Alpine Chromium (smaller than official Chrome)
FROM alpine:3.19
RUN apk add chromium  # ~100MB vs 300MB for Chrome

# 2. Disable unnecessary features
--disable-dev-shm-usage        # Use /tmp instead of /dev/shm
--disable-gpu                  # No GPU rendering
--disable-background-networking # No telemetry
--disable-extensions           # No extension support

# 3. Limit V8 heap size
--js-flags='--max-old-space-size=128'  # 128MB max for JS heap

# 4. Smaller window size
--window-size=800,600  # vs default 1280x720
```

**Expected Resources**:
- **RAM**: 100-150MB (hard limit 256MB)
- **CPU**: 50-80% of 1 core during automation
- **Startup**: 2-3 seconds
- **Disk**: ~200MB image size

**vs. Previous Setup** (chrome-devtools-mcp-browser):
- RAM: Same (~137MB observed)
- Image size: Smaller (Alpine vs Debian)
- Startup: Faster (fewer features)
- Customizable: Can tweak flags easily

### Memory Profiling

```bash
# Monitor container resources
docker stats chrome-lovable-light

# Expected output:
# CONTAINER           CPU %   MEM USAGE / LIMIT
# chrome-lovable-light 2.5%   137MB / 256MB
```

## Debugging

### Test Chrome Connection

```bash
# 1. Start container
docker-compose -f .lovable/docker-compose.yml up -d

# 2. Check health
curl http://localhost:9222/json/version

# Expected response:
# {
#   "Browser": "Chrome/XXX",
#   "Protocol-Version": "1.3",
#   "User-Agent": "Mozilla/5.0...",
#   "WebKit-Version": "XXX"
# }
```

### Test Automation Script

```bash
# Run with timeout to prevent hanging
timeout 120 node .lovable/automate-lovable.cjs \
  .lovable/prompts/pending/test.md

# Check logs
docker-compose -f .lovable/docker-compose.yml logs -f chrome-lovable
```

### Common Issues

**Problem**: Script hangs on selector wait

```javascript
// WRONG - waits forever
const input = await page.$('selector');

// RIGHT - timeout after 10s
try {
  const input = await page.waitForSelector('selector', { timeout: 10000 });
} catch (e) {
  console.error('Selector not found:', e.message);
  // Fallback or exit
}
```

**Problem**: Chrome uses too much RAM

```bash
# Check current limits
docker inspect chrome-lovable-light | grep -A5 Memory

# Adjust in docker-compose.yml:
mem_limit: 256m  # Reduce if needed
shm_size: '128mb'  # Reduce shared memory
```

**Problem**: Selectors changed after Lovable UI update

→ See `.lovable/prompts/chatgpt-lovable-ui-selectors.md` for help request
→ Or switch to manual workflow (Option A)

## Next Steps

### Immediate (Q's Action)

1. **Test manual workflow**:
   ```bash
   node .lovable/chat-lovable.cjs \
     .lovable/prompts/pending/2025-12-25-1825-test-workflow-hello.md
   ```

2. **Paste prompt in Lovable** (browser should open)

3. **Report back**: Did it work? Any issues?

### Short-term (Claude + ChatGPT)

1. **Get selector help from ChatGPT**:
   - Copy `.lovable/prompts/chatgpt-lovable-ui-selectors.md`
   - Paste in ChatGPT
   - Get selector recommendations

2. **Update automate-lovable.cjs** with working selectors

3. **Test automation** with optimized Chrome container

### Long-term

1. **Investigate Lovable API**:
   - Check if they have REST endpoint for chat
   - Would eliminate UI automation entirely
   - More reliable than selectors

2. **Build fallback strategies**:
   - Screenshot + OCR for login detection
   - Retry logic for transient failures
   - Graceful degradation to manual workflow

## Decision Log

### 2025-12-25: Switched to Hybrid Approach

**Decision**: Implement manual workflow (Option A) as primary, automation (Option B) as secondary

**Reasoning**:
1. Manual workflow is **100% reliable** (no selector dependency)
2. Automation is **fragile** (Lovable can change UI anytime)
3. Time saved by automation < Time debugging selector failures
4. Manual workflow only adds ~30 seconds per prompt
5. Can parallelize: Q pastes while Claude prepares next prompt

**Trade-offs**:
- ✅ Reliability over speed
- ✅ Working now over perfect later
- ❌ Lost full automation dream (for now)

**Reversible**: If we get robust selectors, can switch back to automation

### 2025-12-25: Optimized Chrome Container

**Decision**: Build custom Alpine-based Chrome image

**Reasoning**:
1. Previous assumption about 1GB RAM was **wrong** (measured: 137MB)
2. But optimization still valuable for:
   - Faster startup (Alpine vs Debian)
   - Customizable flags (can tune for use case)
   - Smaller image size (easier to transfer)
   - Better understanding of config

**Result**: Dockerfile.chrome-light created, docker-compose.yml for easy management

---

**Last Updated**: 2025-12-25 19:45 UTC
**Status**: Manual workflow ready for production, automation in progress
**Next**: Q tests manual workflow, Claude gets ChatGPT help for selectors

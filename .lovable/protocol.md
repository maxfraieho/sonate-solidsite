# Claude ↔ Lovable Communication Protocol

## Overview

File-based asynchronous communication system between Claude (local architect) and Lovable.dev (remote developer).

**Project**: violin.pp.ua
**Lovable URL**: https://lovable.dev/projects/d6dcf711-7dfc-4807-8fbe-9a985d54c8d9
**Credits Remaining**: ~95
**Login**: petrohrlavko@gmail.com

---

## Architecture

```
.lovable/
├── prompts/           # Claude → Lovable workflow
│   ├── pending/       # New prompts from Claude (ready to send)
│   ├── sent/          # Prompts submitted to Lovable via browser
│   └── archive/       # Completed prompts (for reference)
├── changes/           # Lovable → Claude workflow
│   ├── incoming/      # New code from Lovable (git pull)
│   ├── reviewed/      # Claude's code reviews
│   └── applied/       # Changes merged to main codebase
└── protocol.md        # This file
```

---

## Workflow: Claude → Lovable

### Step 1: Claude Creates Prompt

Claude writes structured prompt to:
```
.lovable/prompts/pending/YYYY-MM-DD-HHMM-feature-name.md
```

**Filename Format**: `2025-12-25-1815-add-dark-mode-toggle.md`

### Step 2: Claude Commits & Pushes

```bash
git add .lovable/prompts/pending/
git commit -m "feat(lovable): Add prompt for dark mode toggle"
git push origin main
```

### Step 3: Q Sends Prompt to Lovable

1. Open browser → https://lovable.dev/projects/d6dcf711-7dfc-4807-8fbe-9a985d54c8d9
2. Navigate to prompt input area
3. Copy content from GitHub: `.lovable/prompts/pending/[filename].md`
4. Paste into Lovable
5. Submit

### Step 4: Q Moves File

```bash
git mv .lovable/prompts/pending/[filename].md .lovable/prompts/sent/
git commit -m "chore(lovable): Prompt sent - [feature name]"
git push
```

---

## Workflow: Lovable → Claude

### Step 1: Lovable Generates Code

Lovable creates/modifies files in project.

### Step 2: Q Pushes from Lovable

In Lovable IDE:
- Commit changes
- Push to GitHub (Lovable has git integration)

### Step 3: Claude Pulls & Reviews

```bash
git pull origin main
```

Claude automatically:
1. Detects new commits from Lovable
2. Reviews changes (TypeScript types, security, patterns)
3. Writes review to `.lovable/changes/incoming/review-[commit-hash].md`

### Step 4: Claude Acts on Review

**If changes OK**:
```bash
# Claude applies any refinements
git add .
git commit -m "refactor: Apply Claude improvements to Lovable code"
git push

# Move review to applied
mv .lovable/changes/incoming/review-*.md .lovable/changes/applied/
```

**If changes need fixes**:
- Claude writes new prompt to `.lovable/prompts/pending/` describing fixes
- Return to "Claude → Lovable" workflow

---

## Prompt Template Structure

All prompts follow this format:

```markdown
# [Feature Name]

## Context
- Current state of codebase
- Why this feature is needed
- Related components/files

## Task
Clear, detailed description of what to build/change.

## Technical Requirements
- TypeScript strict mode (no 'any')
- Supabase integration if needed
- Tailwind CSS styling
- shadcn/ui components
- Responsive design (mobile + desktop)
- Dark mode support

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Tests pass
- [ ] No TypeScript errors

## Files to Modify
- src/components/Example.tsx
- src/pages/PageName.tsx

## Additional Notes
- Performance considerations
- Accessibility requirements
- SEO implications
```

---

## Automation Notes

### Browser Automation (Experimental)

Claude can attempt to automate Lovable.dev interactions using Chrome DevTools MCP:
- **Port**: localhost:9222
- **Container**: chrome-mcp-cpu-fallback
- **Capabilities**: Navigate, click, fill forms, read DOM

**Limitations**:
- Lovable may have CAPTCHA/2FA
- Login flow might require manual intervention
- Rate limiting concerns

### Fallback: Manual Browser Use

If automation fails, Q handles browser interactions manually.

---

## Role Definitions

### Claude (Local Architect)

**Responsibilities**:
1. Design features and architecture
2. Write detailed prompts for Lovable
3. Review Lovable's code for:
   - TypeScript strict compliance
   - Security vulnerabilities
   - Performance issues
   - Accessibility gaps
   - Code quality
4. Apply refinements locally
5. Manage git workflow
6. Document decisions

**Does NOT**:
- Generate complex React components (Lovable does this)
- Create UI layouts from scratch (Lovable specializes in this)

### Lovable (Remote Developer)

**Responsibilities**:
1. Generate React components
2. Create UI/UX implementations
3. Supabase schema + RLS policies
4. Tailwind styling
5. shadcn/ui integration
6. Responsive layouts

**Does NOT**:
- Make architectural decisions
- Define business logic
- Choose technology stack

---

## Token Economics

### Claude Token Usage

**Per Prompt Creation**: ~5-10K tokens
- Reading context files
- Writing structured prompt
- Committing to git

**Per Code Review**: ~15-25K tokens
- Reading changed files
- TypeScript analysis
- Writing review document
- Applying refinements

### Credit Conservation (Lovable)

**95 credits remaining** - use wisely:
- **Simple tasks** (1-2 files): ~5-10 credits
- **Medium features** (3-5 files): ~15-25 credits
- **Complex features** (6+ files): ~30-50 credits

**Strategy**: Batch related changes into single prompts when possible.

---

## Example: Full Cycle

### 1. Claude Creates Prompt

File: `.lovable/prompts/pending/2025-12-25-1820-add-contact-form-validation.md`

```markdown
# Add Contact Form Validation

## Context
Current contact form in src/components/ContactForm.tsx accepts any input without validation.
Users can submit empty forms, invalid emails, causing Supabase errors.

## Task
Add client-side validation to contact form with toast notifications.

## Technical Requirements
- Use react-hook-form for validation
- Zod schema for type-safe validation
- Toast notifications (sonner or react-hot-toast)
- Email regex validation
- Phone number format validation (optional field)
- Debounce submit button (prevent double-submit)

## Acceptance Criteria
- [ ] Email field validates format
- [ ] Required fields show error messages
- [ ] Submit button disabled while submitting
- [ ] Success toast on valid submission
- [ ] Error toast on validation failure
- [ ] No TypeScript errors
- [ ] Accessibility: error messages announced to screen readers

## Files to Modify
- src/components/ContactForm.tsx
- package.json (add react-hook-form, zod if not present)

## Additional Notes
- Keep existing Tailwind styling
- Maintain dark mode support
- Ensure mobile-friendly error displays
```

### 2. Q Sends to Lovable

Copies content → Lovable IDE → Submits

### 3. Lovable Generates Code

Creates:
- Updated `src/components/ContactForm.tsx` (with validation)
- Updated `package.json` (dependencies)

### 4. Q Pushes to GitHub

Lovable git push → origin/main

### 5. Claude Pulls & Reviews

```bash
git pull
```

File: `.lovable/changes/incoming/review-a7b3c9d.md`

```markdown
# Code Review: Contact Form Validation (a7b3c9d)

## Summary
Lovable successfully implemented form validation with react-hook-form + Zod.

## Issues Found

### CRITICAL
- [ ] Line 45: Using 'any' type for form data - violate strict TypeScript
  ```typescript
  // BAD
  const handleSubmit = (data: any) => {...}

  // FIX
  type ContactFormData = z.infer<typeof contactSchema>
  const handleSubmit = (data: ContactFormData) => {...}
  ```

### MEDIUM
- [ ] Missing error boundary around form
- [ ] Toast notifications not using project's existing toast provider

## Recommendations
- Add FormErrorBoundary wrapper
- Use existing toast from src/lib/toast.ts

## Verdict
⚠️ NEEDS FIXES - Create follow-up prompt for type safety
```

### 6. Claude Creates Fix Prompt

File: `.lovable/prompts/pending/2025-12-25-1835-fix-contact-form-types.md`

(Returns to Step 1)

---

## Git Workflow

### Branching Strategy

**Simple**: Direct commits to `main` (small team, rapid iteration)

**Alternative**: Feature branches if needed
```bash
# Lovable works on: feature/lovable-contact-form
# Claude reviews on: review/contact-form
# Merge after approval
```

### Commit Message Convention

**From Claude**:
```
feat(lovable): Add prompt for [feature]
chore(lovable): Prompt sent - [feature]
refactor: Apply Claude improvements to [feature]
docs(lovable): Update protocol
```

**From Lovable** (via Q):
```
feat: Implement [feature] (via Lovable)
fix: [Bug description] (via Lovable)
```

---

## Troubleshooting

### Q1: Claude can't pull Lovable changes
**Solution**: Ensure Lovable pushed to correct branch (main)

### Q2: Lovable credits depleted
**Solution**:
1. Review prompts for efficiency
2. Consider breaking large features into manual Claude work + Lovable UI

### Q3: Automation fails
**Solution**: Fall back to manual browser workflow

### Q4: Merge conflicts
**Solution**:
- Claude resolves locally
- Pushes resolution
- Notifies Q

---

## Metrics & Monitoring

Track in `.lovable/metrics.md`:
- Prompts sent: count
- Credits used: ~estimate
- Review cycle time: hours
- Success rate: % accepted without fixes

---

## Version History

- **2025-12-25**: Initial protocol created
- **Next**: Add automation scripts if successful

---

**Status**: Active
**Last Updated**: 2025-12-25 18:20 UTC
**Maintained By**: Claude + Q

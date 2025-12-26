# Test Workflow - Hello Component

## Context

**Current State**:
- violin.pp.ua project with React + TypeScript + Tailwind CSS
- Testing Claude ↔ Lovable communication protocol
- First prompt to verify workflow functions correctly

**Purpose**:
This is a minimal test to validate the file-based communication workflow between Claude and Lovable.dev.

---

## Task

Create a simple "Hello" test component to verify Lovable can receive prompts and generate code.

**Primary Goal**: Verify Claude → Lovable → Claude workflow works end-to-end

**Detailed Requirements**:
1. Create a simple React component called `HelloTest`
2. Component should display "Hello from Lovable.dev!"
3. Include current timestamp to verify it's fresh code
4. Use Tailwind CSS for styling
5. Export component for use in other files

---

## Technical Requirements

### Required Technologies
- [x] React 18 functional component
- [x] TypeScript strict mode (no `any` types)
- [x] Tailwind CSS for styling
- [ ] shadcn/ui components (NOT NEEDED for this test)

### Code Quality
- [x] No ESLint errors
- [x] No TypeScript errors
- [x] Proper component props typing

### Design Requirements
- [x] Responsive (works on all screen sizes)
- [x] Dark mode support
- [x] Simple, clean design

---

## Acceptance Criteria

- [ ] Component file created: `src/components/HelloTest.tsx`
- [ ] Component renders "Hello from Lovable.dev!" text
- [ ] Shows current timestamp when rendered
- [ ] Uses Tailwind CSS classes for styling
- [ ] TypeScript compiles without errors
- [ ] No console errors when component used
- [ ] Component is exported and can be imported

---

## Files to Modify

### Create New
- `src/components/HelloTest.tsx`

### Modify Existing
- NONE (standalone test component)

---

## Implementation Details

### Component Structure
```tsx
// Expected structure (not full implementation)
interface HelloTestProps {
  message?: string;
}

export function HelloTest({ message = "Hello from Lovable.dev!" }: HelloTestProps) {
  const timestamp = new Date().toLocaleString();

  return (
    <div className="...">
      <h1>{message}</h1>
      <p>Generated at: {timestamp}</p>
    </div>
  );
}
```

### Styling Guidelines
- Use Tailwind utility classes
- Center content on page
- Add some padding and margin
- Use text colors that work in both light/dark mode
- Optional: Add a border or shadow for visual interest

---

## Edge Cases to Handle

1. **Empty State**: N/A (simple static component)
2. **Error State**: N/A (no data fetching)
3. **Loading State**: N/A (no async operations)
4. **Props**: Optional message prop with default value

---

## Performance Considerations

- [ ] Component is lightweight (< 50 lines)
- [ ] No heavy computations
- [ ] No side effects
- [ ] No external dependencies beyond React

---

## Security Considerations

- [ ] No user input (no XSS risk)
- [ ] No API calls (no injection risk)
- [ ] No localStorage/cookies
- [ ] No sensitive data

---

## Testing Checklist (Manual)

After implementation, Q should verify:

1. **Component Creation**:
   - [ ] File exists at `src/components/HelloTest.tsx`
   - [ ] Can be imported: `import { HelloTest } from '@/components/HelloTest'`

2. **Rendering**:
   - [ ] Component renders without errors
   - [ ] Shows "Hello from Lovable.dev!" text
   - [ ] Shows timestamp

3. **TypeScript**:
   - [ ] No TypeScript errors
   - [ ] Props properly typed

4. **Styling**:
   - [ ] Tailwind classes applied
   - [ ] Looks reasonable on mobile and desktop
   - [ ] Works in dark mode

---

## Additional Notes

**Design References**:
- Keep it simple - this is a workflow test, not a production feature
- Focus on: "Does the workflow work?" not "Is this beautiful?"

**Success Metric**:
If this component gets created by Lovable and Claude can pull it, review it, and run it without errors → **workflow validated!**

---

## Estimated Complexity

**Lovable Credits**: ~5-8 credits (simple, single-file component)

**Breakdown**:
- Simple component: ~5 credits
- TypeScript types: +1 credit
- Tailwind styling: +2 credits

**Total**: Should use < 10 credits (we have 95 remaining)

---

## Metadata

**Priority**: High (workflow validation)
**Type**: Test / Workflow Validation
**Created**: 2025-12-25 18:25 UTC
**Created By**: Claude
**Target**: Immediate (test workflow)

---

## Success Metrics

**Workflow Success** if:
1. Claude writes this prompt → `.lovable/prompts/pending/`
2. Q copies prompt → Lovable.dev → submits
3. Lovable generates `HelloTest.tsx`
4. Q pushes from Lovable → GitHub
5. Claude pulls → code exists
6. Claude reviews → no critical issues
7. Component can be imported and used

**If all 7 steps work → Protocol validated! 🎉**

---

**Status**: PENDING
**Last Updated**: 2025-12-25 18:25 UTC
**Next Step**: Q sends this prompt to Lovable.dev via browser

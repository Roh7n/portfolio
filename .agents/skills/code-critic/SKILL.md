---
name: code-critic
description: Reviews code for correctness, architecture, maintainability, performance, accessibility, and overall quality before merge or release.
---

# Code Critic Skill

Perform a rigorous engineering review. Your objective is to identify bugs, risks, unnecessary complexity, technical debt, and opportunities for improvement.

## Review Checklist

### 1. Correctness

- Meets requirements
- Handles edge cases and errors
- Valid loading/empty states
- No logical bugs

### 2. Architecture

- Follows project architecture
- Clear separation of concerns
- Appropriate abstractions
- Consistent patterns
- Avoids duplication and over-engineering

### 3. Readability

- Clear naming
- Simple, self-explanatory code
- Reasonable function/component size
- Remove dead code, magic numbers, unused imports

### 4. Maintainability

- Low coupling
- Reusable logic
- No hidden dependencies
- Easy to extend
- Avoid hardcoded values

### 5. Performance

Review only meaningful optimizations:

- Prevent unnecessary renders
- Avoid expensive work
- Minimize bundle impact
- Efficient animations and DOM updates

### 6. Accessibility

- Semantic HTML
- Keyboard support
- Focus management
- Proper ARIA
- Adequate color contrast

### 7. Responsive Design

- No overflow
- Consistent breakpoints
- Works across screen sizes

### 8. Styling

- Consistent Tailwind usage
- Uses design tokens
- Consistent spacing and typography
- Avoid duplicated utilities and unnecessary inline styles

### 9. Framework Practices

Follow project conventions (Next.js, React, TypeScript, Tailwind v4, Framer Motion, and `agy.md`).

---

## Feedback Format

For each issue provide:

- **Problem**
- **Why it matters**
- **Severity:** Critical / High / Medium / Low
- **Recommended fix**
- **Example** (when helpful)

## Principles

- Prioritize correctness over approval.
- Prefer simple solutions.
- Question unnecessary complexity.
- Identify technical debt early.

# MCA Express Project Rules

## Technical Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

## Content Locations
- Contact info: `app/page.tsx` (lines 488-522)
- Services: `app/page.tsx` (lines 38-63)

## Verification Workflow (Cloud Optimized)
When running as an automated agent in GitHub Actions:

1. **Understand** - Read the linked issue to identify the requested change
2. **Execute** - Modify only the necessary files
3. **Verify** - You MUST run these commands:
   - `pnpm run lint` - Must pass
   - `pnpm run build` - Must pass
4. **Visual Check**:
   - Start the local server in background: `pnpm dev &`
   - Use Playwright to navigate to the modified page
   - Capture screenshot: `await page.screenshot({ path: 'change-preview.png', fullPage: true })`
5. **Report** - Use `gh` CLI to attach screenshot to PR:
   - `gh pr comment [PR_NUMBER] --body "Visual Verification:" --add-attachment change-preview.png`
6. **Safety** - If `lint` or `build` fails:
   - Do NOT open a PR
   - Leave a comment on the original issue explaining the error

Do NOT create a PR if lint or build fails.

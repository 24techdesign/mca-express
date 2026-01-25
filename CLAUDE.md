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
3. **Verify** - You MUST run these commands (dependencies already installed):
   - `pnpm run lint` - Must pass
   - `pnpm run build` - Must pass (uses Next.js turbo mode for speed)
4. **Visual Check** - Take screenshot using Playwright:
   ```bash
   # Install Playwright (quick, only ~5s)
   pnpm add -D @playwright/test
   pnpx playwright install chromium --with-deps

   # Start dev server in background
   pnpm dev > /tmp/dev.log 2>&1 &
   DEV_PID=$!

   # Wait for server to be ready
   timeout 30 bash -c 'until curl -s http://localhost:3000 > /dev/null; do sleep 1; done'

   # Take screenshot
   pnpx playwright screenshot --full-page http://localhost:3000 change-preview.png

   # Kill dev server
   kill $DEV_PID
   ```
5. **Report** - You MUST attach the screenshot to the PR comment:
   ```bash
   PR_NUM=$(gh pr list --head $(git branch --show-current) --json number -q '.[0].number')
   gh pr comment $PR_NUM --body "## Visual Verification

   Screenshot showing the changes:" -F change-preview.png
   ```
6. **Safety** - If `lint` or `build` fails:
   - Do NOT open a PR
   - Leave a comment on the original issue explaining the error

Do NOT create a PR if lint or build fails.

## Performance Notes
- Dependencies are pre-installed by the workflow (skip `pnpm install`)
- Next.js uses turbo mode automatically for faster builds
- Always keep the build step - it catches errors before Netlify deployment

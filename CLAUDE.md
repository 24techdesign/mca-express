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
4. **Visual Check** - Use Playwright MCP to capture screenshots:
   - Start dev server in background: `pnpm dev > /dev/null 2>&1 &`
   - Wait for server: `sleep 10` or check http://localhost:3000
   - Use Playwright MCP `browser_navigate` to go to http://localhost:3000
   - Use Playwright MCP `browser_take_screenshot` with `filename: "change-preview.png"` and `fullPage: true`
   - Stop dev server: `pkill -f "next dev"` (to avoid hanging processes)
5. **Report** - You MUST attach the screenshot to the PR:
   - Get PR number: `gh pr list --head $(git branch --show-current) --json number -q '.[0].number'`
   - Attach screenshot: `gh pr comment [PR_NUMBER] --body "## Visual Verification" -F change-preview.png`
   - Note: Use `-F` flag (not `--add-attachment`) to attach images
6. **Safety** - If `lint` or `build` fails:
   - Do NOT open a PR
   - Leave a comment on the original issue explaining the error

Do NOT create a PR if lint or build fails.

## Performance Notes
- Dependencies are pre-installed by the workflow (skip `pnpm install`)
- Next.js uses turbo mode automatically for faster builds
- Always keep the build step - it catches errors before Netlify deployment

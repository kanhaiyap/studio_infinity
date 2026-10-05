# Studio Infinity website (client name: Studio Infinity; logo wordmark reads "studio infinite")

## UI/UX: always use the ui-ux-pro-max skill
For any work that changes how the site looks, feels, moves or is interacted with, invoke the `ui-ux-pro-max` skill (installed in `.claude/skills/`) before designing or writing UI code, and follow its rule priorities and pre-delivery checklist.

Run its search script from the project root (the SKILL.md's `${CLAUDE_PLUGIN_ROOT}` path does not apply to this project-level install):

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system   # new page / overall direction
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain ux       # targeted concern
```

Companion skills from the same repo are also installed: `design`, `design-system`, `ui-styling`, `brand`, `banner-design`, `slides`.

## Design reference: rajkumararchitects.com/portfolio
Draw inspiration (not copies of branding, text or images) from https://rajkumararchitects.com/portfolio/:
- Minimal black-and-white palette, modern sans-serif type, generous whitespace; large project photography carries the page.
- Fixed header with logo plus simple nav (Home, About, Portfolio, Blog, Contact).
- Portfolio page: short hero tagline, then a card grid of projects (thumbnail + title) with category filters (All, Residential, Resort, Office, Hospital, Commercial).
- A "Do you have a project?" call-to-action before a footer with contact details and social links.
Combine this direction with the ui-ux-pro-max recommendations and checklist.

## Brand colours
Current palette ("crisp, high contrast", chosen by the user on 2026-09-30 when asking for more vibrancy without breaking the neutral rule): white #FFFFFF background, #F4F1EC light warm grey, near-black #111111 text, #4A4540 muted text (weight 400, never 300 for body copy), and Jost 600 for headline solid lines.

Approved exceptions: a muted bronze accent for small details only (#7F6550 on light backgrounds, #B89C7E on charcoal), and a charcoal (#1F1D1A) CTA band and footer. Nothing else dark or coloured.

Light neutral shades only (e.g. off-white, warm/cool greys, beige, stone, soft taupe) with a dark neutral for text. No bright or saturated colours, including for accents, buttons and hover states. When ui-ux-pro-max suggests a palette, adapt it to these neutrals while keeping text contrast at 4.5:1 or higher.

## Logo
The logo is `assets/brand/logo.jpg` (640×640 JPG, black wordmark on white). The wordmark reads "studio infinite", but the client name is **Studio Infinity**: use that in all text. The wordmark is in lowercase: "studio" in a thin geometric sans (Century Gothic–like) and "infinite" in a bold geometric sans with wide letter-spacing. Reuse that pairing for the site's type: a light geometric sans for body and secondary text, and bold, widely spaced lowercase for key headings. Suitable web fonts are Jost or Poppins, or Century Gothic if it's licensed.
A transparent SVG/PNG version is still needed for the header and dark backgrounds. Until then, recreate the wordmark in HTML text or SVG instead of placing the JPG on a non-white background.

## Stack and structure
- Astro 7 static site, Node 22.12+ (`.nvmrc` = 24; the system default Node is 20, so run `nvm use` or prefix PATH with `~/.nvm/versions/node/v24.12.0/bin`). Hosted on GitHub Pages through `.github/workflows/deploy.yml`, which passes `SITE_URL` and `BASE_PATH` to `astro.config.mjs`.
- Every internal link must go through `url()` from `src/lib/url.ts` so it works under a GitHub Pages sub-path.
- Page scope is fixed: 8 main pages, 4 city pages and 3 Mumbai sub-pages. Don't add pages, sections or features unless the user asks.
- About, service and city pages are Markdown files in `src/content/pages/`, rendered by `src/pages/[...slug].astro`. Projects are in `src/content/projects/`. `draft: true` entries are hidden in production, but their images still get emitted. `sample-*.md` (Unsplash stock previews) are excluded from production builds entirely through the glob pattern in `content.config.ts`, so the "projects collection is empty" build warning is expected until real projects exist.
- Design tokens live in `src/styles/global.css`. The font is static Jost at weights 300/400/500 (`@fontsource/jost`), standing in for the logo's Century Gothic–style lettering. Jost's glyphs have overlapping contours, so `Headline.astro` draws the outline as a double-width stroke under a background-coloured fill (`paint-order: stroke fill`). Set `--headline-fill` to the section background when an outlined heading sits on a non-default background. The ui-ux-pro-max design system suggested Archivo/Space Grotesk and a slate + orange palette; both were overridden to match the brand rules above.
- SEO lives in `src/layouts/Base.astro`: title, description, canonical, Open Graph, ProfessionalService, BreadcrumbList and Service JSON-LD. The sitemap and robots.txt are generated automatically.
- Design direction ("premium", approved 2026-09-30 after studying top studio sites; see memory `design-direction-premium`):
  - Full-screen hero slider (`HeroSlider.astro`) with a white `Headline` over the photo. The home page uses `<Base overlayHeader>`, so the header floats transparent until you scroll past the hero.
  - A `.statement` sentence with an inline link, instead of buttons.
  - `LinkCards.astro` renders a large numbered typographic list with hairlines (services, locations, related pages).
  - An editorial `ProjectGrid` in mixed sizes (`data-slot` 1–4, recalculated after filtering). Captions are the title plus CATEGORY · CITY; no badges on photos.
  - `.button` is an uppercase text link with a drawn arrow, not a filled block.
  - Headings are Jost 300 in sentence case (`Headline.astro`, with words rising in on load or reveal). There's no outlined or serif text.
- Kept: the charcoal CTA band and footer (`.theme-dark`), the bronze accent, the PhotoSwipe lightbox, the full-screen `<dialog>` menu, scroll reveal (`[data-reveal]`), the photo wipe and parallax (`[data-parallax]`), magnetic buttons (`[data-magnetic]`) and page transitions. All motion respects `prefers-reduced-motion`.
- Removed on request: the scroll-down cue; the hero progress line, counter, dashes and caption panel; the outlined headings; the dot-grid texture (the full-bleed hero made it redundant).
- Don't run `npm run build` while the dev server is running. The build rewrites the shared content cache without the `sample-*` projects, and the dev page then crashes with "LocalImageUsedWrongly". If it happens, run `npx astro dev stop`, delete `.astro/data-store.json`, `node_modules/.astro` and `node_modules/.vite`, then run `npm run dev`.
- After changing `src/content.config.ts`, restart the dev server (`npx astro dev stop`, then `npm run dev`). A running server keeps the old schema and fails with errors like "gallery is not iterable".

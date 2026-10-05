# Studio Infinity website

Built with [Astro](https://astro.build) 7. It needs Node 22.12+ (run `nvm use` in this folder to switch to the Node version in `.nvmrc`).

```bash
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # production build into dist/
```

## Editing content

| What | Where |
|---|---|
| Email, phone, WhatsApp, address, social links | `src/site.ts` |
| Home, Services, Projects, Contact page text | top of `src/pages/index.astro`, `services.astro`, `projects.astro`, `contact.astro` |
| About, service and city pages | `src/content/pages/*.md` (the file path is the page URL) |
| Projects | `src/content/projects/*.md` (one file per project) |

For every page, keep `metaTitle` to about 50–60 characters and `description` to about 140–160. These are what Google shows in search results.

### Adding a project
1. Put the photos in `src/content/projects/images/` (JPG or PNG, ideally at least 2000px wide; Astro converts them to WebP and resizes them).
2. Copy one of the sample files. Fill in `title`, `category` (`residential`, `commercial` or `interior`), `city`, `cover`, `coverAlt` (a description of the photo) and any extra `gallery` photos. Then delete the `draft: true` line.
3. Set `featured: true` to include the project in the home page slider (first 5) and the "Selected work" grid (first 4). `order` sets the sequence.

Projects appear on the Projects page (with category filters). They also appear on the service and city pages that match their `category` and `city`. Clicking a project photo opens its cover and gallery as a full-screen slideshow. The four `sample-*.md` projects use free Unsplash stock photos for preview only. They show only in `npm run dev` and are left out of production builds completely, photos included. Delete them and their photos once real projects are in. For your own unfinished projects, use `draft: true`: the project won't appear on the site, but note that its photos are still copied into the build.

If you change `src/content.config.ts`, restart `npm run dev`.

## Deploying (GitHub Pages)
1. Push this folder to a GitHub repository on the `main` branch.
2. In the repository, go to **Settings → Pages → Source** and choose **GitHub Actions**.
3. Every push to `main` builds and publishes the site. `.github/workflows/deploy.yml` sets the correct URL automatically.

To use a custom domain later, add it under **Settings → Pages**. The site then lives at the domain root and the links adjust automatically.

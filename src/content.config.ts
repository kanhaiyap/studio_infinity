import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const category = z.enum(['residential', 'interior', 'commercial', 'hospitality', 'institutional', 'exhibition']);

// About, service and city pages. The file path is the page URL,
// e.g. pages/architect-in-jaipur/villa-architect.md -> /architect-in-jaipur/villa-architect/
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(), // H1 on the page
      metaTitle: z.string(), // Google result title, ~50-60 characters
      description: z.string(), // Google result snippet, ~140-160 characters
      kind: z.enum(['about', 'service', 'city', 'city-service']),
      summary: z.string().optional(), // short text used on cards linking to this page
      category: category.optional(), // service pages: which projects to show
      city: z.string().optional(), // city pages: which projects to show
      coordinates: z.tuple([z.number(), z.number()]).optional(), // city pages: [latitude, longitude], shown in the hero
      order: z.number().default(0),
      heroImage: image().optional(),
      heroAlt: z.string().optional(),
    }),
});

// sample-*.md are preview-only (stock photos). Leaving them out of production builds keeps their
// photos out of the published site too; `draft: true` alone would still copy the images.
// SHOW_SAMPLES=true (set in the GitHub Pages workflow) keeps them in a production build for client previews.
const hideSamples = process.env.NODE_ENV === 'production' && process.env.SHOW_SAMPLES !== 'true';

const projects = defineCollection({
  loader: glob({ pattern: hideSamples ? ['*.md', '!sample-*.md'] : '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category,
      city: z.string(),
      year: z.number().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      gallery: z.array(z.object({ src: image(), alt: z.string() })).default([]), // extra photos for the lightbox
      featured: z.boolean().default(false), // show on the home page
      order: z.number().default(0),
      draft: z.boolean().default(false), // drafts show while developing but are never published
    }),
});

// Blog posts. The file name is the URL: blog/architect-fees-jaipur.md -> /blog/architect-fees-jaipur/
const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(), // H1 on the page
    metaTitle: z.string(), // Google result title, ~50-60 characters
    description: z.string(), // Google result snippet, ~140-160 characters
    summary: z.string(), // one line on the blog list
    date: z.coerce.date(), // published, e.g. 2026-10-14
    lang: z.enum(['en', 'hi']).default('en'), // 'hi' for posts written in Hindi
    draft: z.boolean().default(false),
  }),
});

export const collections = { pages, projects, blog };

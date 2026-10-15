import { getCollection, type CollectionEntry } from 'astro:content';

export type Page = CollectionEntry<'pages'>;
export type Project = CollectionEntry<'projects'>;
export type Post = CollectionEntry<'blog'>;

// SHOW_SAMPLES=true publishes drafts (the sample projects) for previews; see content.config.ts.
const showDrafts = import.meta.env.DEV || process.env.SHOW_SAMPLES === 'true';

const byOrder = (a: { data: { order: number } }, b: { data: { order: number } }) => a.data.order - b.data.order;

export async function getPages(kind?: Page['data']['kind']) {
  const pages = await getCollection('pages', (p) => !kind || p.data.kind === kind);
  return pages.sort(byOrder);
}

export async function getProjects(filter: { category?: string; city?: string; featured?: boolean } = {}) {
  const projects = await getCollection('projects', ({ data }) => {
    if (data.draft && !showDrafts) return false;
    if (filter.category && data.category !== filter.category) return false;
    if (filter.city && data.city.toLowerCase() !== filter.city.toLowerCase()) return false;
    if (filter.featured && !data.featured) return false;
    return true;
  });
  return projects.sort(byOrder);
}

// First project photo matching a filter (used as the hero photo of city and service pages).
export async function getCoverPhoto(filter: { category?: string; city?: string }) {
  const project = (await getProjects(filter)).find((p) => p.data.cover);
  return project && { src: project.data.cover!, alt: project.data.coverAlt ?? '' };
}

// Blog posts, newest first. Drafts show while developing only.
export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

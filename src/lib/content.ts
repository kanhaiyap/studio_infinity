import { getCollection, type CollectionEntry } from 'astro:content';

export type Page = CollectionEntry<'pages'>;
export type Project = CollectionEntry<'projects'>;

const byOrder = (a: { data: { order: number } }, b: { data: { order: number } }) => a.data.order - b.data.order;

export async function getPages(kind?: Page['data']['kind']) {
  const pages = await getCollection('pages', (p) => !kind || p.data.kind === kind);
  return pages.sort(byOrder);
}

export async function getProjects(filter: { category?: string; city?: string; featured?: boolean } = {}) {
  const projects = await getCollection('projects', ({ data }) => {
    if (data.draft && import.meta.env.PROD) return false;
    if (filter.category && data.category !== filter.category) return false;
    if (filter.city && data.city.toLowerCase() !== filter.city.toLowerCase()) return false;
    if (filter.featured && !data.featured) return false;
    return true;
  });
  return projects.sort(byOrder);
}

// Prefixes internal links with the deploy base path (needed on GitHub Pages project sites).
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + (path.startsWith('/') ? path : `/${path}`);
}

export function absoluteUrl(path: string, site: URL | undefined): string {
  return new URL(url(path), site).href;
}

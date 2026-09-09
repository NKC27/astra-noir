import { SITE } from '../lib/site';
import { getFragrances, getJournal } from '../lib/data';

export default async function sitemap() {
  const [fragrances, posts] = await Promise.all([getFragrances(), getJournal()]);
  const stat = ['', '/collections', '/story', '/journal', '/support', '/faq', '/privacy', '/terms'];
  return [
    ...stat.map((p) => ({ url: `${SITE.url}${p}`, changeFrequency: 'monthly', priority: p === '' ? 1 : 0.7 })),
    ...fragrances.map((f) => ({ url: `${SITE.url}/collections/${f.slug}`, priority: 0.8 })),
    ...posts.map((p) => ({ url: `${SITE.url}/journal/${p.slug}`, lastModified: p.date, priority: 0.6 })),
  ];
}

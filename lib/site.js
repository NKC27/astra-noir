export const SITE = {
  name: 'Astra Noir',
  // Set NEXT_PUBLIC_SITE_URL on the host. Absolute URLs are required for
  // Open Graph, canonicals, sitemap and JSON-LD to resolve correctly.
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://astra-noir.vercel.app',
  tagline: 'Luxury fragrances for a higher consciousness',
  description:
    'Astra Noir is a collection of extraordinary fragrances inspired by the cosmos and engineered for the modern explorer.',
  locale: 'en_GB',
};

export const NAV = [
  ['Home', '/'],
  ['Collections', '/collections'],
  ['Our Story', '/story'],
  ['Journal', '/journal'],
  ['Support', '/support'],
];

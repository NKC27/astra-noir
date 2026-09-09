import Link from 'next/link';
import { notFound } from 'next/navigation';
import Shot from '../../../components/Shot';
import AddToBag from '../../../components/AddToBag';
import Share from '../../../components/Share';
import { getFragrance, getFragrances } from '../../../lib/data';
import { SITE } from '../../../lib/site';

/* Statically rendered at build time, one HTML file per fragrance. */
export async function generateStaticParams() {
  const all = await getFragrances();
  return all.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const f = await getFragrance(slug);
  if (!f) return {};
  const title = f.name;
  const description = `${f.strapline} ${f.intro}`.slice(0, 155);
  return {
    title,
    description,
    alternates: { canonical: `/collections/${f.slug}` },
    openGraph: { title, description, url: `/collections/${f.slug}`, type: 'website' },
  };
}

export default async function FragrancePage({ params }) {
  const { slug } = await params;
  const f = await getFragrance(slug);
  if (!f) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: f.name,
    description: f.intro,
    brand: { '@type': 'Brand', name: SITE.name },
    offers: {
      '@type': 'Offer',
      price: f.price.replace('£', ''),
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      url: `${SITE.url}/collections/${f.slug}`,
    },
  };

  return (
    <div className="page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">HOME</Link><span aria-hidden="true">/</span>
        <Link href="/collections">COLLECTIONS</Link><span aria-hidden="true">/</span>{f.name}
      </nav>

      <div className="pdp">
        <Shot slot={f.slot} alt={f.alt} priority sizes="(max-width: 860px) 92vw, 46vw" />
        <div>
          <h1>{f.name}</h1>
          <p className="lede">{f.strapline}</p>
          <p className="price">{f.price} · {f.size}</p>
          <p>{f.intro}</p>

          <div className="notes">
            {f.notes.map(([tier, list]) => (
              <div key={tier}>
                <h4>{tier}</h4>
                <p>{list}</p>
              </div>
            ))}
          </div>

          <AddToBag slug={f.slug} label="ADD TO BAG" className="outline-button" />
          <p className="prose-meta">
            Astra Noir is a fictional brand. Nothing on this site can be purchased.
          </p>
          <Share url={`${SITE.url}/collections/${f.slug}`} title={`${f.name} — ${SITE.name}`} />
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}

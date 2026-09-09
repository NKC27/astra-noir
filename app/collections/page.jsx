import Link from 'next/link';
import Shot from '../../components/Shot';
import { getFragrances } from '../../lib/data';

export const metadata = {
  title: 'Collections',
  description:
    'A growing collection of fragrances built around the smell of deep space.',
  alternates: { canonical: '/collections' },
};

export default async function Collections() {
  const fragrances = await getFragrances();
  return (
    <div className="page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">HOME</Link>
        <span aria-hidden="true">/</span>COLLECTIONS
      </nav>
      <h1>THE COLLECTION</h1>
      <p className="lede">
        A growing constellation of fragrances, each built around the same brief:
        make something that smells like the moment before a launch. Every scent
        is available as a 100ml Eau de Parfum.
      </p>
      <div className="card-grid">
        {fragrances.map((f) => (
          <article key={f.slug}>
            <Link href={`/collections/${f.slug}`}>
              <Shot
                slot={f.slot}
                alt={f.alt}
                aspectRatio="3 / 4"
                sizes="(max-width: 700px) 90vw, 30vw"
              />
              <h3>{f.name}</h3>
            </Link>
            <p>
              {f.family} · {f.strapline}
            </p>
            <p className="prose-meta">
              {f.price} · {f.size}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

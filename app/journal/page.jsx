import Link from 'next/link';
import Shot from '../../components/Shot';
import { getJournal } from '../../lib/data';

export const metadata = {
  title: 'Journal',
  description: 'Notes on perfumery, the smell of space, and how the Astra Noir collection was made.',
  alternates: { canonical: '/journal' },
};

export default async function Journal() {
  const posts = await getJournal();
  return (
    <div className="page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">HOME</Link><span aria-hidden="true">/</span>JOURNAL
      </nav>
      <h1>THE JOURNAL</h1>
      <p className="lede">Notes from the lab, the studio and the edge of the atmosphere.</p>
      <div className="card-grid">
        {posts.map((p) => (
          <article key={p.slug}>
            <Link href={`/journal/${p.slug}`}>
              <Shot slot={p.slot} alt={p.alt} sizes="(max-width: 700px) 90vw, 30vw" />
              <h3>{p.title}</h3>
            </Link>
            <p>{p.excerpt}</p>
            <p className="prose-meta">
              <time dateTime={p.date}>
                {new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

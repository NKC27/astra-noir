import Link from 'next/link';
import { notFound } from 'next/navigation';
import Shot from '../../../components/Shot';
import Share from '../../../components/Share';
import { getJournal, getPost } from '../../../lib/data';
import { SITE } from '../../../lib/site';

export async function generateStaticParams() {
  const posts = await getJournal();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt.slice(0, 155),
    alternates: { canonical: `/journal/${p.slug}` },
    openGraph: { type: 'article', title: p.title, description: p.excerpt.slice(0, 155), publishedTime: p.date },
  };
}

export default async function Post({ params }) {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    datePublished: p.date,
    description: p.excerpt,
    author: { '@type': 'Organization', name: SITE.name },
  };

  return (
    <article className="page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">HOME</Link><span aria-hidden="true">/</span>
        <Link href="/journal">JOURNAL</Link><span aria-hidden="true">/</span>{p.label}
      </nav>
      <h1>{p.title}</h1>
      <p className="prose-meta">
        <time dateTime={p.date}>
          {new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </time>
      </p>
      <Shot slot={p.slot} alt={p.alt} priority sizes="(max-width: 900px) 92vw, 1100px" style={{ margin: '38px 0' }} />
      <p className="lede">{p.excerpt}</p>
      <p>
        The full article is intentionally short here. This route exists to demonstrate a
        statically generated, server-rendered content page with per-post metadata, Article
        structured data, a canonical URL and a sharing surface, rather than to publish
        copy for a brand that does not exist.
      </p>
      <Share url={`${SITE.url}/journal/${p.slug}`} title={p.title} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}

import Link from 'next/link';
import { getFaq } from '../../lib/data';

export const metadata = {
  title: 'Frequently Asked Questions',
  description: 'Delivery, returns, storage, ingredients, and what this site actually is.',
  alternates: { canonical: '/faq' },
};

export default async function Faq() {
  const faq = await getFaq();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <div className="page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">HOME</Link><span aria-hidden="true">/</span>FAQ
      </nav>
      <h1>QUESTIONS</h1>
      <p className="lede">If the answer is not here, <Link href="/support">get in touch</Link>.</p>

      {/* <details>/<summary> gives keyboard operation, screen reader state and
          in-page find for free. A custom accordion would need all three built. */}
      <div className="faq">
        {faq.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}

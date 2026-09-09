import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions',
  description: 'Terms of use for the Astra Noir portfolio site.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: false },
};

export default function Terms() {
  return (
    <div className="page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">HOME</Link><span aria-hidden="true">/</span>TERMS &amp; CONDITIONS
      </nav>
      <h1>TERMS &amp; CONDITIONS</h1>
      <p className="prose-meta">Last updated 7 September 2026</p>

      <h2>1. WHAT THIS SITE IS</h2>
      <p>
        Astra Noir is a fictional brand created for a web development portfolio. It is not a
        trading company. No goods or services are offered, no contract of sale can be formed,
        and no order placed through this site will ever be fulfilled. Prices shown are
        illustrative and have no commercial meaning.
      </p>

      <h2>2. NO SALES, NO PAYMENTS</h2>
      <p>
        The bag and add-to-bag controls are interface demonstrations. There is no checkout and
        no payment provider is connected. Do not attempt to submit payment details anywhere on
        this site; there is nowhere for them to go.
      </p>

      <h2>3. ACCEPTABLE USE</h2>
      <p>You agree not to use this site to:</p>
      <ul>
        <li>attempt to gain unauthorised access to the site or its hosting;</li>
        <li>introduce malicious code, or place it under automated load designed to disrupt it;</li>
        <li>scrape or reproduce the site in a way that misrepresents it as a genuine retailer.</li>
      </ul>

      <h2>4. INTELLECTUAL PROPERTY</h2>
      <p>
        The code, layout, styling and written copy are the work of the site&apos;s author. The
        photographic plates are AI-generated imagery produced for this project. The name
        &quot;Astra Noir&quot; is invented for the purpose of this exercise; if it collides with a real
        registered mark, no association or endorsement is claimed or implied, and I will
        rename the project on request.
      </p>

      <h2>5. ACCURACY</h2>
      <p>
        The product descriptions, fragrance notes, journal articles and company history are
        fiction, written to populate the design. Nothing on this site should be relied on as
        factual information about any real product.
      </p>

      <h2>6. LIABILITY</h2>
      <p>
        The site is provided as-is and without warranty. To the extent permitted by law, no
        liability is accepted for any loss arising from use of it. Nothing here limits liability
        for death or personal injury caused by negligence, or for fraud.
      </p>

      <h2>7. EXTERNAL LINKS</h2>
      <p>
        Links to third-party platforms are provided for demonstration. Their content and
        practices are outside my control.
      </p>

      <h2>8. GOVERNING LAW</h2>
      <p>
        These terms are governed by the law of England and Wales, and the courts of England and
        Wales have exclusive jurisdiction.
      </p>

      <p className="prose-meta">
        See also the <Link href="/privacy">privacy policy</Link>. These terms are written to
        describe the site accurately. They are not legal advice.
      </p>
    </div>
  );
}

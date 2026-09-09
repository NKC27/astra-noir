import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy',
  description: 'What this site collects, what it does not, and who to contact about it.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: false },
};

export default function Privacy() {
  return (
    <div className="page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">HOME</Link><span aria-hidden="true">/</span>PRIVACY POLICY
      </nav>
      <h1>PRIVACY POLICY</h1>
      <p className="prose-meta">Last updated 7 September 2026</p>
      <p className="lede">
        Astra Noir is a fictional brand. This site is a portfolio project operated by an
        individual developer. This policy describes what the site actually does, not what a
        perfume house would do.
      </p>

      <h2>WHO IS RESPONSIBLE</h2>
      <p>
        This site is operated by Nicholas Clarke, an individual based in the United Kingdom,
        acting as the data controller for the limited processing described below. You can
        reach me through the <Link href="/support">support page</Link>.
      </p>

      <h2>WHAT IS COLLECTED</h2>
      <h3>Analytics</h3>
      <p>
        This site uses privacy-preserving, cookieless analytics. No cookie is set, no
        identifier is stored on your device, and no cross-site profile is built. What is
        recorded is aggregate and not linked to you: page path, referrer, approximate country
        derived from IP at request time and then discarded, and coarse device type. Because
        nothing is stored on your device and no personal data is retained, this processing
        does not require consent under the Privacy and Electronic Communications Regulations,
        which is the reason you are not looking at a cookie banner.
      </p>
      <h3>Newsletter form</h3>
      <p>
        The newsletter field on the home page is a front-end demonstration. It validates in
        your browser and shows a success state. It does not transmit your address anywhere,
        no server receives it, and nothing is stored. If this site is ever connected to a real
        mailing list, this section will be rewritten before that happens.
      </p>
      <h3>Bag and basket</h3>
      <p>
        The bag counter lives in memory for the length of your visit and is gone when you close
        the tab. There is no checkout, no payment processing, and no card data of any kind is
        collected or handled.
      </p>

      <h2>WHAT IS NOT COLLECTED</h2>
      <ul>
        <li>No advertising or tracking cookies.</li>
        <li>No third-party social or marketing pixels.</li>
        <li>No fingerprinting, session recording or heatmapping.</li>
        <li>No account creation, and no passwords.</li>
        <li>No payment or financial information.</li>
      </ul>

      <h2>HOSTING AND LOGS</h2>
      <p>
        The site is served by a third-party hosting provider which, like any web server, keeps
        short-lived operational request logs containing IP address and user agent for security
        and abuse prevention. These are held by the host under its own terms and are not
        accessed or exported by me for any other purpose.
      </p>

      <h2>OUTBOUND LINKS</h2>
      <p>
        The social icons in the footer and the sharing controls link out to external platforms.
        Once you follow one of those links you are on that platform and its privacy policy
        applies, not this one. Nothing is shared with them unless you click.
      </p>

      <h2>YOUR RIGHTS</h2>
      <p>
        Under UK GDPR you have rights of access, rectification, erasure, restriction, objection
        and portability over personal data held about you. In practice this site holds no
        personal data that could identify you, so there is very little to exercise them against.
        If you believe otherwise, contact me and I will respond within one month. You may also
        complain to the Information Commissioner&apos;s Office at ico.org.uk.
      </p>

      <h2>CHANGES</h2>
      <p>
        If the site&apos;s behaviour changes, this page changes with it and the date at the top
        is updated.
      </p>

      <p className="prose-meta">
        This policy is written to describe the site accurately. It is not legal advice, and it
        has not been reviewed by a solicitor.
      </p>
    </div>
  );
}

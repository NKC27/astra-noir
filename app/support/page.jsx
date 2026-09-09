import Link from 'next/link';

export const metadata = {
  title: 'Support',
  description: 'How to get in touch about the Astra Noir project.',
  alternates: { canonical: '/support' },
};

export default function Support() {
  return (
    <div className="page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">HOME</Link><span aria-hidden="true">/</span>SUPPORT
      </nav>
      <h1>SUPPORT</h1>
      <p className="lede">
        Astra Noir is a fictional brand, so there are no orders to chase and no returns to
        process. What follows is what a real support page would carry.
      </p>
      <h2>ORDERS AND DELIVERY</h2>
      <p>See the <Link href="/faq">FAQ</Link> for delivery windows, returns and storage.</p>
      <h2>ABOUT THIS PROJECT</h2>
      <p>
        This site was built by Nicholas Clarke as a front-end engineering portfolio piece.
        If you are here to talk about the build rather than the perfume, that is the more
        interesting conversation. Details of the stack and the performance work are in the
        repository README.
      </p>
      <h2>PRIVACY</h2>
      <p>
        What this site does and does not collect is set out in full on the{' '}
        <Link href="/privacy">privacy policy</Link>.
      </p>
    </div>
  );
}

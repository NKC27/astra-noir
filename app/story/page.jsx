import Link from 'next/link';
import Shot from '../../components/Shot';

export const metadata = {
  title: 'Our Story',
  description: 'How Astra Noir came to exist, who makes it, and what this site actually is.',
  alternates: { canonical: '/story' },
};

export default function Story() {
  return (
    <div className="page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">HOME</Link><span aria-hidden="true">/</span>OUR STORY
      </nav>
      <h1>THE UNIVERSE INSPIRES US</h1>
      <p className="lede">
        Astra Noir was born from a simple belief, that true luxury is more than what you
        wear, it is how it makes you feel.
      </p>
      <Shot
        slot="story-panel"
        priority
        sizes="(max-width: 900px) 92vw, 1100px"
        alt="A wide lunar vista beneath a planet lit along one edge by a rising sun."
        style={{ margin: '40px 0 10px' }}
      />
      <h2>ORIGINS</h2>
      <p>
        The house began with a question that has no good answer: what does the outside of the
        atmosphere actually smell like? Crew returning from extravehicular activity describe
        something metallic and burnt clinging to their suits once the airlock repressurises.
        Seared steak. Hot brake pads. Spent ordnance. It is not the vacuum they are smelling,
        it is oxidation, atomic oxygen recombining on every surface they brought back inside.
      </p>
      <h2>THE MAKING</h2>
      <p>
        Three fragrances took four years, and most of that was spent failing. Metallic accords
        read as cheap far more easily than they read as cold. The breakthrough was to stop
        chasing the metal and build the temperature instead, which is why all three open dry
        and close warm.
      </p>
      <h2>WHAT THIS SITE IS</h2>
      <p>
        In the interest of not being one more piece of fiction pretending otherwise: Astra Noir
        is not a real company. It is a front-end engineering portfolio project. The brand,
        the copy and the photography are invented, and nothing here is for sale.
      </p>
      <p>
        The site itself is real work. It is a Next.js App Router build, statically rendered,
        with a build-time image pipeline, self-hosted fonts, per-route metadata and structured
        data, and an accessibility pass. Details are in the{' '}
        <Link href="/faq">FAQ</Link> and the repository README.
      </p>
    </div>
  );
}

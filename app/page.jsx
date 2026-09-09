import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import Shot from '../components/Shot';
import AddToBag from '../components/AddToBag';
import Newsletter from '../components/Newsletter';
import { getFragrances, getJournal } from '../lib/data';
import { SITE } from '../lib/site';

export const metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: '/' },
};

const VALUES = [
  ['◈', 'PREMIUM INGREDIENTS', 'Only the finest, ethically sourced materials.'],
  [
    '◇',
    'EXQUISITE CRAFTSMANSHIP',
    'Artisanal blends, perfected by skilled perfumers.',
  ],
  ['◎', 'SUSTAINABLE LUXURY', 'A cleaner planet for a brighter future.'],
  ['□', 'GLOBAL SHIPPING', 'Worldwide delivery, with care.'],
];

export default async function Home() {
  const [fragrances, journal] = await Promise.all([
    getFragrances(),
    getJournal(),
  ]);

  return (
    <>
      <section className="hero">
        <Shot
          slot="hero"
          priority
          sizes="100vw"
          className="hero-shot"
          wrapperClassName="hero-slot"
          alt="A tall black Astra Noir bottle standing on lunar rock, backlit by a sun rising over a planet's edge."
        />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-copy">
          <p className="kicker">BEYOND THE ORDINARY</p>
          <h1>ASTRA NOIR</h1>
          <p className="hero-sub">
            LUXURY FRAGRANCES FOR
            <br />A HIGHER CONSCIOUSNESS
          </p>
          <p>
            Crafted for those who seek more. Astra Noir is a collection of
            extraordinary fragrances, inspired by the cosmos, engineered for the
            modern explorer.
          </p>
          <Link className="outline-button" href="/collections">
            EXPLORE THE COLLECTION
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <p className="scroll-note" aria-hidden="true">
          SCROLL
          <br />
          TO EXPLORE
          <span />
        </p>
      </section>

      <section
        className="collection"
        id="collection"
        aria-labelledby="collection-heading"
      >
        <div className="collection-intro">
          <p className="kicker">THE COLLECTION</p>
          <h2 id="collection-heading">
            FRAGRANCES
            <br />
            INSPIRED BY THE
            <br />
            UNIVERSE
          </h2>
          <p>
            Each scent is a journey. A story written in the stars, designed to
            awaken your senses and elevate your presence.
          </p>
          <Link className="under-link" href="/collections">
            VIEW ALL FRAGRANCES
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="fragrance-grid">
          {fragrances.slice(0, 3).map((f) => (
            <article className={`fragrance-card ${f.cardClass}`} key={f.slug}>
              <Shot
                slot={f.slot}
                alt={f.alt}
                sizes="(max-width: 900px) 80vw, 28vw"
              />
              <div className="card-copy">
                <h3>
                  <Link href={`/collections/${f.slug}`}>{f.name}</Link>
                </h3>
                <p>{f.strapline}</p>
                <AddToBag slug={f.slug} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="story" id="story" aria-labelledby="story-heading">
        <div className="story-art">
          <Shot
            slot="story-panel"
            sizes="(max-width: 900px) 100vw, 46vw"
            alt="A wide lunar vista beneath a planet lit along one edge by a rising sun."
          />
          <span className="art-caption" aria-hidden="true">
            ASTRA NOIR
          </span>
        </div>
        <div className="story-copy">
          <p className="kicker">OUR STORY</p>
          <h2 id="story-heading">
            THE UNIVERSE
            <br />
            INSPIRES US
          </h2>
          <p>
            Astra Noir was born from a simple belief, that true luxury is more
            than what you wear, it is how it makes you feel. Our fragrances are
            crafted for dreamers, visionaries and those who dare to go further.
          </p>
          <Link className="outline-button" href="/story">
            DISCOVER OUR STORY
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="values">
          {VALUES.map(([icon, title, copy]) => (
            <li className="value" key={title}>
              <i aria-hidden="true">{icon}</i>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="journal" id="journal" aria-label="From the journal">
        {journal.map((post) => (
          <article className={`article ${post.type}`} key={post.slug}>
            <Shot
              slot={post.slot}
              alt={post.alt}
              sizes="(max-width: 900px) 50vw, 25vw"
            />
            <div className="article-overlay">
              {post.play && (
                <i className="play" aria-hidden="true">
                  <Play />
                </i>
              )}
              <p>{post.label}</p>
              <h3>{post.title}</h3>
              <Link href={`/journal/${post.slug}`}>
                {post.action}
                <ArrowRight aria-hidden="true" />
                <span className="visually-hidden">
                  {' '}
                  about {post.title.toLowerCase()}
                </span>
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section
        className="newsletter"
        id="newsletter"
        aria-labelledby="newsletter-heading"
      >
        <Shot slot="newsletter-band" alt="" sizes="100vw" />
        <div className="newsletter-copy">
          <p className="kicker">STAY IN ORBIT</p>
          <h2 id="newsletter-heading">JOIN OUR UNIVERSE</h2>
          <p>
            Be the first to discover new releases, exclusive offers, and
            celestial stories.
          </p>
        </div>
        <Newsletter />
      </section>
    </>
  );
}

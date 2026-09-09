/**
 * Content layer. Deliberately a typed module rather than a database: three
 * products do not justify a round trip, and every page below is statically
 * rendered at build time. Swapping this for Drizzle/Neon means changing the
 * function bodies only, since every consumer already awaits them.
 */

const CORE_FRAGRANCES = [
  {
    slug: 'nova-noir',
    name: 'NOVA NOIR',
    strapline: 'Bold. Magnetic. Unforgettable.',
    price: '£165',
    size: '100ml Eau de Parfum',
    slot: 'card-nova',
    cardClass: 'nova',
    alt: 'The Nova Noir bottle lit from behind by a golden solar flare, its black glass throwing a warm rim of light.',
    intro:
      'An opening of bergamot and pink pepper collapses into a core of smoked oud. Nova Noir is the loudest thing we make, and it does not apologise for it.',
    notes: [
      ['TOP', 'Bergamot, pink pepper, saffron'],
      ['HEART', 'Smoked oud, orris, leather'],
      ['BASE', 'Ambergris, tonka, vetiver'],
    ],
  },
  {
    slug: 'black-nebula',
    name: 'BLACK NEBULA',
    strapline: 'Deep. Mysterious. Addictive.',
    price: '£175',
    size: '100ml Eau de Parfum',
    slot: 'card-nebula',
    cardClass: 'nebula',
    alt: 'The Black Nebula bottle set against a cold blue cloud of interstellar dust.',
    intro:
      'Cold, resinous and slow to reveal itself. Black Nebula sits close to the skin for an hour before it opens out, which is the entire point of it.',
    notes: [
      ['TOP', 'Cardamom, violet leaf, juniper'],
      ['HEART', 'Incense, iris, black plum'],
      ['BASE', 'Labdanum, cashmeran, cedar'],
    ],
  },
  {
    slug: 'dark-matter',
    name: 'DARK MATTER',
    strapline: 'Raw. Powerful. Infinite.',
    price: '£190',
    size: '100ml Eau de Parfum',
    slot: 'card-matter',
    cardClass: 'matter',
    alt: 'The Dark Matter bottle standing on raw volcanic rock under a starfield.',
    intro:
      'Mineral, dry and almost austere. Built around a vetiver that has been left to sit until it turns to ash.',
    notes: [
      ['TOP', 'Grapefruit peel, elemi, pepper'],
      ['HEART', 'Vetiver, patchouli, guaiac'],
      ['BASE', 'Oakmoss, musk, burnt birch'],
    ],
  },
];

const PDF_FRAGRANCES = [
  ['Event Horizon', 'LUXURY'],
  ['Eclipse', 'LUXURY'],
  ['Zenith', 'LUXURY'],
  ['Orion', 'LUXURY'],
  ['Polaris', 'LUXURY'],
  ['Astral', 'LUXURY'],
  ['Stellar', 'LUXURY'],
  ['Titan', 'POWERFUL'],
  ['Supernova', 'POWERFUL'],
  ['Singularity', 'POWERFUL'],
  ['Gravity', 'POWERFUL'],
  ['Warp', 'POWERFUL'],
  ['Helios', 'POWERFUL'],
  ['Vortex', 'POWERFUL'],
  ['Quantum', 'POWERFUL'],
  ['Void', 'DARK'],
  ['Dark Side', 'DARK'],
  ['Black Hole', 'DARK'],
  ['Shadow Nebula', 'DARK'],
  ['Midnight Orbit', 'DARK'],
  ['Phantom', 'DARK'],
  ['Moonfall', 'DARK'],
  ['Black Star', 'DARK'],
  ['ORBIT', 'MODERN'],
  ['NOVA', 'MODERN'],
  ['COSMOS', 'MODERN'],
  ['NEBULA', 'MODERN'],
  ['AETHER', 'MODERN'],
  ['HORIZON', 'MODERN'],
  ['Cosmic Dust', 'NICHE'],
  ['Interstellar', 'NICHE'],
  ['Red Shift', 'NICHE'],
  ['Hypernova', 'NICHE'],
  ['Gravity Well', 'NICHE'],
  ['Eternal Orbit', 'NICHE'],
];

const FAMILY_DETAILS = {
  LUXURY: {
    strapline: 'Refined. Radiant. Limitless.',
    intro:
      'A polished composition with a luminous opening and a deep, elegant dry-down. It is composed for long evenings and quiet entrances.',
    notes: [
      ['TOP', 'Bergamot, saffron, pink pepper'],
      ['HEART', 'Iris, incense, jasmine'],
      ['BASE', 'Oud, amber, cedarwood'],
    ],
    price: 180,
  },
  POWERFUL: {
    strapline: 'Charged. Decisive. Unmistakable.',
    intro:
      'A concentrated, high-impact fragrance built to hold its shape from first spray through the final trace on skin.',
    notes: [
      ['TOP', 'Grapefruit, black pepper, elemi'],
      ['HEART', 'Leather, vetiver, cypress'],
      ['BASE', 'Patchouli, musk, dark woods'],
    ],
    price: 195,
  },
  DARK: {
    strapline: 'Obscure. Magnetic. Close to the skin.',
    intro:
      'A shadowed blend of resin, smoke and mineral woods. It takes its time, then stays long after the room has changed.',
    notes: [
      ['TOP', 'Juniper, violet leaf, clove'],
      ['HEART', 'Incense, black plum, orris'],
      ['BASE', 'Labdanum, birch, cashmeran'],
    ],
    price: 175,
  },
  MODERN: {
    strapline: 'Clean. Vivid. Forward-looking.',
    intro:
      'A precise, contemporary scent with a bright lift and an architectural finish. Minimal in shape, expansive in effect.',
    notes: [
      ['TOP', 'Mandarin, aldehydes, cardamom'],
      ['HEART', 'Iris, tea, mineral accord'],
      ['BASE', 'Ambroxan, cedar, white musk'],
    ],
    price: 165,
  },
  NICHE: {
    strapline: 'Strange. Considered. Singular.',
    intro:
      'An atmospheric study of unusual materials, made for the wearer who prefers discovery to familiarity.',
    notes: [
      ['TOP', 'Cassis, cold air accord, pepper'],
      ['HEART', 'Mate, angelica, incense'],
      ['BASE', 'Moss, vetiver, mineral musk'],
    ],
    price: 185,
  },
};

const FAMILY_SLOTS = ['card-nova', 'card-nebula', 'card-matter'];
const FAMILY_CLASSES = ['nova', 'nebula', 'matter'];

const FRAGRANCES = [
  ...CORE_FRAGRANCES.map((fragrance) => ({ ...fragrance, family: 'CORE' })),
  ...PDF_FRAGRANCES.map(([name, family], index) => {
    const details = FAMILY_DETAILS[family];
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    return {
      slug,
      name: name.toUpperCase(),
      family,
      strapline: details.strapline,
      price: `£${details.price + (index % 3) * 5}`,
      size: '100ml Eau de Parfum',
      slot: FAMILY_SLOTS[index % FAMILY_SLOTS.length],
      cardClass: FAMILY_CLASSES[index % FAMILY_CLASSES.length],
      alt: `The ${name} fragrance bottle photographed in Astra Noir's dark cosmic style.`,
      intro: `${name} is ${details.intro}`,
      notes: details.notes,
    };
  }),
];

const JOURNAL = [
  {
    slug: 'exploring-the-scent-of-space',
    label: 'THE JOURNAL',
    title: 'EXPLORING THE SCENT OF SPACE',
    action: 'READ MORE',
    slot: 'journal-one',
    type: 'journal-one',
    alt: 'The curve of a planet lit along one edge, seen from low orbit.',
    excerpt:
      'Astronauts returning from EVA describe a persistent smell in the airlock: scorched metal, welding fumes, spent gunpowder. We spent eighteen months trying to bottle it.',
    date: '2026-02-14',
  },
  {
    slug: 'a-new-chapter-awaits',
    label: 'THE COLLECTION',
    title: 'A NEW CHAPTER AWAITS',
    action: 'EXPLORE',
    slot: 'journal-two',
    type: 'journal-two',
    alt: 'A lone figure silhouetted on a ridge beneath an enormous rising moon.',
    excerpt:
      'Three fragrances took four years. The fourth is in maceration now, and it is the first thing we have made that none of us can agree on.',
    date: '2026-04-02',
  },
  {
    slug: 'the-art-of-perfumery',
    label: 'BEHIND THE SCENT',
    title: 'THE ART OF PERFUMERY',
    action: 'READ MORE',
    slot: 'journal-three',
    type: 'journal-three',
    alt: 'A dense swirl of golden interstellar gas resembling smoke in water.',
    excerpt:
      'A perfumer works the way a colourist does: not with a palette of finished ideas, but with several hundred raw materials, most of which smell unpleasant alone.',
    date: '2026-05-20',
  },
  {
    slug: 'the-journey-begins',
    label: 'WATCH THE FILM',
    title: 'THE JOURNEY BEGINS',
    action: 'PLAY',
    slot: 'journal-four',
    type: 'journal-four',
    play: true,
    alt: 'A dark starfield fading toward the edge of a planet.',
    excerpt:
      'Shot over four nights in Iceland and one afternoon in a studio in Bermondsey. The film is ninety seconds long and took nine months.',
    date: '2026-06-11',
  },
];

const FAQ = [
  [
    'How long does delivery take?',
    'UK orders are dispatched within one working day and arrive in two to three. European orders take three to five working days, and the rest of the world five to nine. Every order is tracked and requires a signature.',
  ],
  [
    'Do you ship internationally?',
    'Yes, to most countries. Fragrance contains alcohol and is classed as a limited quantity dangerous good, so it travels by road and sea rather than air freight to some destinations. That is why a small number of countries show a longer window at checkout.',
  ],
  [
    'Can I return a fragrance I have opened?',
    'Unopened bottles can be returned within thirty days for a full refund. Once the seal is broken we can only accept a return if the product is faulty, because opened fragrance cannot be resold. Discovery sets exist precisely so you can try before committing.',
  ],
  [
    'How should I store my fragrance?',
    'Away from light and away from heat. A bathroom shelf is the worst place in most homes: the temperature swing degrades the top notes first, which is why an old bottle often smells flat on application but correct an hour later.',
  ],
  [
    'Are your fragrances vegan and cruelty free?',
    'All three are vegan and none are tested on animals at any stage. Our ambergris accord is synthetic, as is the musk.',
  ],
  [
    'Is Astra Noir a real brand?',
    'No. Astra Noir is a fictional brand built as a front-end engineering portfolio piece. Nothing here is for sale, no payment is taken, and no order will ever ship. The site exists to demonstrate performance, accessibility and server-rendering work against a demanding visual brief.',
  ],
];

export async function getFragrances() {
  return FRAGRANCES;
}
export async function getFragrance(slug) {
  return FRAGRANCES.find((f) => f.slug === slug) ?? null;
}
export async function getJournal() {
  return JOURNAL;
}
export async function getPost(slug) {
  return JOURNAL.find((p) => p.slug === slug) ?? null;
}
export async function getFaq() {
  return FAQ;
}

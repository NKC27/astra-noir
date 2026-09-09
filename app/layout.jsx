import { DM_Sans, Montserrat } from 'next/font/google';
import { SITE } from '../lib/site';
import { BagProvider } from '../components/BagProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

/* Self-hosted at build time by next/font. The original loaded these via an
   @import inside the stylesheet, which chains three round trips before any
   text can paint: CSS -> Google's CSS -> the font files themselves. */
const body = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});
const display = Montserrat({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#050507',
  colorScheme: 'dark',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB" className={`${body.variable} ${display.variable}`}>
      <body>
        <a className="skip-link" href="#main">SKIP TO CONTENT</a>
        <BagProvider>
          <div className="site" id="top">
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </div>
        </BagProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: SITE.name,
              url: SITE.url,
              description: SITE.description,
            }),
          }}
        />
      </body>
    </html>
  );
}

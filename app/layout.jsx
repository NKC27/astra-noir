import localFont from 'next/font/local';
import { SITE } from '../lib/site';
import { BagProvider } from '../components/BagProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

/* Self-hosted from files committed in app/fonts (latin subset, variable
   weight axis, SIL Open Font License). These used to come from
   next/font/google, which downloads the fonts during every build; when
   Google's response was unexpected the build failed at random. Local files
   keep the build offline and deterministic. */
const body = localFont({
  src: './fonts/dm-sans-latin-var.woff2',
  weight: '300 600',
  style: 'normal',
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});
const display = localFont({
  src: './fonts/montserrat-latin-var.woff2',
  weight: '200 600',
  style: 'normal',
  variable: '--font-display',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
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

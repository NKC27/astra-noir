import Link from 'next/link';
import { NAV, SITE } from '../lib/site';

const SOCIAL = [
  ['Instagram', 'https://instagram.com', '◎'],
  ['TikTok', 'https://tiktok.com', '◌'],
  ['X', 'https://x.com', '𝕏'],
  ['YouTube', 'https://youtube.com', '◍'],
];

export default function Footer() {
  return (
    <footer>
      <div>
        <Link className="logo" href="/">ASTRA NOIR</Link>
        <p>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms &amp; Conditions</Link>
          <Link href="/faq">FAQ</Link>
        </p>
      </div>
      <nav aria-label="Footer">
        {NAV.map(([label, href]) => (
          <Link key={href} href={href}>{label}</Link>
        ))}
      </nav>
      <div className="social">
        {SOCIAL.map(([name, href, glyph]) => (
          <a key={name} href={href} rel="noopener noreferrer nofollow" target="_blank" aria-label={`${SITE.name} on ${name}`}>
            <span aria-hidden="true">{glyph}</span>
          </a>
        ))}
        <small>© {new Date().getFullYear()} Astra Noir. Fictional brand, built as a portfolio project.</small>
      </div>
    </footer>
  );
}

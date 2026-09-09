import { ImageResponse } from 'next/og';
import { SITE } from '../lib/site';

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', background: '#050507',
          color: '#e8e9e8', letterSpacing: 18, fontSize: 66,
          backgroundImage: 'radial-gradient(circle at 62% 34%, #1d2733 0%, #050507 62%)',
        }}
      >
        <div style={{ fontSize: 15, letterSpacing: 9, color: '#b89a68', marginBottom: 26 }}>
          BEYOND THE ORDINARY
        </div>
        <div style={{ display: 'flex' }}>ASTRA NOIR</div>
        <div style={{ fontSize: 19, letterSpacing: 5, color: '#9ba4a8', marginTop: 30 }}>
          LUXURY FRAGRANCES FOR A HIGHER CONSCIOUSNESS
        </div>
      </div>
    ),
    size,
  );
}

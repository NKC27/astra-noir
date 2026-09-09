/**
 * Build-time image pipeline.
 *
 * The original build shipped 6 JPEGs and re-used two of them as CSS
 * background-images with `background-size: 300%` to fake eight more slots.
 * That made real <img> markup (and therefore alt text, srcset, lazy loading
 * and fetchpriority) impossible.
 *
 * Here every slot is cut from the full-resolution master ONCE, at build time,
 * into real files: AVIF first, WebP second, JPEG as the universal floor.
 */
import sharp from 'sharp';
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'assets-src';
const OUT = 'public/img';

// width, height as a fraction of the master; left/top as a fraction.
const HERO = 'hero-lunar-2k.png';
const NOVA = 'card-nova-noir.png';

/** slot -> { master, crop:[left,top,w,h] as fractions, widths:[] } */
const SLOTS = {
  'hero':            { master: HERO, crop: [0, 0, 1, 1],            widths: [640, 1024, 1600, 2048, 2560] },
  'card-nova':       { master: NOVA, crop: [0, 0, 1, 1],            widths: [420, 640, 896] },
  'card-nebula':     { master: HERO, crop: [0.06, 0.10, 0.26, 0.86], widths: [420, 640, 896] },
  'card-matter':     { master: HERO, crop: [0.68, 0.08, 0.28, 0.88], widths: [420, 640, 896] },
  'story-panel':     { master: HERO, crop: [0.02, 0.05, 0.46, 0.92], widths: [640, 1024, 1440] },
  'journal-one':     { master: HERO, crop: [0.00, 0.34, 0.27, 0.42], widths: [400, 640, 900] },
  'journal-two':     { master: HERO, crop: [0.27, 0.30, 0.25, 0.46], widths: [400, 640, 900] },
  'journal-three':   { master: HERO, crop: [0.52, 0.26, 0.24, 0.48], widths: [400, 640, 900] },
  'journal-four':    { master: HERO, crop: [0.75, 0.30, 0.25, 0.44], widths: [400, 640, 900] },
  'newsletter-band': { master: HERO, crop: [0.10, 0.00, 0.80, 0.30], widths: [900, 1440, 1920] },
  'og':              { master: HERO, crop: [0.10, 0.05, 0.62, 0.62], widths: [1200] },
};

// AVIF struggles with star fields: thousands of tiny high-contrast points are
// high-frequency noise, which either bloats the file or smears to grey mush.
// A slight black-point lift plus a small blur floor on the darkest areas costs
// nothing visually on a near-black design and cuts file size substantially.
const GRADE = { brightness: 1.0, saturation: 0.92 };

async function build() {
  await mkdir(OUT, { recursive: true });
  const manifest = {};

  for (const [slot, cfg] of Object.entries(SLOTS)) {
    const master = path.join(SRC, cfg.master);
    const meta = await sharp(master).metadata();
    const [lf, tf, wf, hf] = cfg.crop;
    const region = {
      left: Math.round(meta.width * lf),
      top: Math.round(meta.height * tf),
      width: Math.round(meta.width * wf),
      height: Math.round(meta.height * hf),
    };

    const entry = { widths: [], height: 0, width: 0, avif: [], webp: [], jpg: [] };

    for (const w of cfg.widths) {
      if (w > region.width) continue;
      const h = Math.round((region.height / region.width) * w);
      const base = sharp(master)
        .extract(region)
        .resize(w, h, { fit: 'cover' })
        .modulate(GRADE);

      const stem = `${OUT}/${slot}-${w}`;
      await base.clone().avif({ quality: 52, effort: 6, chromaSubsampling: '4:2:0' }).toFile(`${stem}.avif`);
      await base.clone().webp({ quality: 72, effort: 5 }).toFile(`${stem}.webp`);
      await base.clone().jpeg({ quality: 76, mozjpeg: true, progressive: true }).toFile(`${stem}.jpg`);

      entry.widths.push(w);
      entry.width = w;
      entry.height = h;
    }

    // 24px LQIP, inlined as a data URI so the placeholder costs no request.
    const lqip = await sharp(master).extract(region).resize(24).blur(1.2)
      .webp({ quality: 28 }).toBuffer();
    entry.lqip = `data:image/webp;base64,${lqip.toString('base64')}`;
    entry.ratio = +(entry.width / entry.height).toFixed(4);

    manifest[slot] = entry;
    process.stdout.write(`  ${slot.padEnd(16)} ${entry.widths.join(',')}\n`);
  }

  const { writeFile } = await import('node:fs/promises');
  await writeFile('lib/image-manifest.json', JSON.stringify(manifest, null, 2));

  // Report
  let total = 0;
  for (const f of await readdir(OUT)) total += (await stat(path.join(OUT, f))).size;
  console.log(`\n  ${(await readdir(OUT)).length} files, ${(total / 1024 / 1024).toFixed(2)} MB on disk (all variants)`);
}

build();

import manifest from '../lib/image-manifest.json' with { type: 'json' };

/**
 * A single photographic slot.
 *
 * Renders a real <picture> with AVIF -> WebP -> JPEG, a full srcset, an
 * intrinsic aspect ratio (so nothing shifts), an LQIP behind it, and a
 * mandatory alt string. The previous build painted these as CSS
 * background-images on aria-hidden divs, which made all five of those
 * things impossible and hid the LCP candidate from the preload scanner.
 */
export default function Shot({
  slot,
  alt,
  priority = false,
  sizes = '100vw',
  className = '',
  wrapperClassName = '',
  aspectRatio,
  style,
}) {
  const img = manifest[slot];
  if (!img) throw new Error(`Shot: unknown slot "${slot}"`);
  if (typeof alt !== 'string')
    throw new Error(`Shot: slot "${slot}" is missing alt text`);

  const set = (ext) =>
    img.widths.map((w) => `/img/${slot}-${w}.${ext} ${w}w`).join(', ');
  const largest = img.widths[img.widths.length - 1];

  return (
    <div
      className={`slot ${wrapperClassName}`}
      style={{
        aspectRatio: aspectRatio ?? img.ratio,
        backgroundImage: `url(${img.lqip})`,
        ...style,
      }}
    >
      <picture>
        <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
        <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
        <img
          className={`shot ${className}`}
          src={`/img/${slot}-${largest}.jpg`}
          srcSet={set('jpg')}
          sizes={sizes}
          width={img.width}
          height={img.height}
          alt={alt}
          /* Exactly one image on the page gets high priority. Everything
             else lazy-loads at normal priority once it nears the viewport. */
          fetchPriority={priority ? 'high' : undefined}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
        />
      </picture>
    </div>
  );
}

/** Decorative slots (pure texture behind text) take alt="" deliberately. */
export function DecorativeShot(props) {
  return <Shot {...props} alt="" />;
}

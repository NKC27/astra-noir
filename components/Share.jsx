'use client';

import { useState } from 'react';
import { Check, Share2 } from 'lucide-react';

/**
 * Uses the Web Share API where the browser supports it (essentially all
 * mobile), and falls back to explicit network links plus copy-to-clipboard
 * on desktop, rather than shipping four tracking-heavy vendor widgets.
 */
export default function Share({ url, title }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;

  const native = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        /* user dismissed */
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="share">
      <span>SHARE</span>
      <a
        href={`https://x.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        X
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        FACEBOOK
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        LINKEDIN
      </a>
      <a href={`mailto:?subject=${enc(title)}&body=${enc(url)}`}>EMAIL</a>
      <button type="button" onClick={native}>
        {copied ? (
          <Check aria-hidden="true" size={13} />
        ) : (
          <Share2 aria-hidden="true" size={13} />
        )}
        {copied ? 'COPIED' : 'SHARE'}
      </button>
    </div>
  );
}

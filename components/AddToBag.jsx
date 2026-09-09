'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useBag } from './BagProvider';

export default function AddToBag({ slug, label = 'SHOP NOW', className }) {
  const { add } = useBag();
  const [done, setDone] = useState(false);

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        add(slug);
        setDone(true);
        setTimeout(() => setDone(false), 1800);
      }}
    >
      {done ? 'ADDED' : label}
      {done ? <Check aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
      <span className="visually-hidden" role="status">
        {done ? 'Added to bag' : ''}
      </span>
    </button>
  );
}

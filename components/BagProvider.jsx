'use client';

import { createContext, useContext, useMemo, useState } from 'react';

const BagContext = createContext(null);

export function BagProvider({ children }) {
  const [items, setItems] = useState([]);
  const value = useMemo(
    () => ({
      items,
      count: items.length,
      add: (slug) => setItems((prev) => [...prev, slug]),
      clear: () => setItems([]),
    }),
    [items],
  );
  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error('useBag must be used inside <BagProvider>');
  return ctx;
}

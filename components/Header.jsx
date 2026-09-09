'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { NAV } from '../lib/site';
import { useBag } from './BagProvider';

export default function Header() {
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();
  const { count } = useBag();

  return (
    <>
      <header>
        <Link className="logo" href="/">ASTRA NOIR</Link>
        <nav aria-label="Primary">
          {NAV.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-tools">
          <Link href="/collections" aria-label="Search the collection"><Search aria-hidden="true" /></Link>
          <Link href="/support" aria-label="Account and support"><UserRound aria-hidden="true" /></Link>
          <Link href="/collections" aria-label={`Bag, ${count} ${count === 1 ? 'item' : 'items'}`}>
            <ShoppingBag aria-hidden="true" />
            <i aria-hidden="true">{count}</i>
          </Link>
          <button
            className="mobile-toggle"
            onClick={() => setMenu((v) => !v)}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            aria-label={menu ? 'Close navigation' : 'Open navigation'}
          >
            {menu ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      {menu && (
        <div className="mobile-menu" id="mobile-menu">
          {NAV.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setMenu(false)}>
              {label}
              <ArrowRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

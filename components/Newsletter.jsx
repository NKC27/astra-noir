'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  if (sent) return <p className="thanks" role="status">Welcome to the universe.</p>;

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      aria-labelledby="newsletter-heading"
    >
      <label className="visually-hidden" htmlFor="newsletter-email">Your email address</label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address*"
      />
      <button type="submit">SUBSCRIBE</button>
    </form>
  );
}

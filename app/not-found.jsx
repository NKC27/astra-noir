import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <div className="page">
      <h1>LOST IN ORBIT</h1>
      <p className="lede">
        That page does not exist. It may have moved, or it may never have been there.
      </p>
      <p style={{ marginTop: 30 }}>
        <Link className="outline-button" href="/">
          RETURN HOME
          <ArrowRight aria-hidden="true" />
        </Link>
      </p>
    </div>
  );
}

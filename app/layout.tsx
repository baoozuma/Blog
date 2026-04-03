import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pure Mathematics",
  description: "Notes on measure theory, functional analysis, and geometry.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          borderBottom: '1px solid #2a2a2d',
          background: 'rgba(14,14,15,0.9)',
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{
            maxWidth: 720, margin: '0 auto', padding: '0 1.5rem',
            height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" rx="8" fill="#1a1608"/>
    <rect width="36" height="36" rx="8" stroke="#c9a96e" strokeWidth="1" strokeOpacity="0.4"/>
    <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle"
      fontFamily="EB Garamond, Georgia, serif"
      fontSize="22" fontWeight="500" fill="#c9a96e">∂</text>
  </svg>
</a>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <a href="/blog" style={{ color: '#9b9895', textDecoration: 'none', fontSize: '0.95rem', fontFamily: "'JetBrains Mono', monospace" }}>blog</a>
              <a href="/about" style={{ color: '#9b9895', textDecoration: 'none', fontSize: '0.95rem', fontFamily: "'JetBrains Mono', monospace" }}>about</a>
            </div>
          </div>
        </nav>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '5rem 1.5rem 4rem' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
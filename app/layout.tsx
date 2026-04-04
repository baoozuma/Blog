import type { Metadata } from "next";
import "./globals.css";
import Splash from './components/Splash'


export const metadata: Metadata = {
  title: "Pure Mathematics",
  description: "Notes on measure theory, functional analysis, and geometry.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <div className="nav-inner">
            <a href="/" className="nav-logo">
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="50%" stopColor="#e8e5f2" />
                  <stop offset="100%" stopColor="#ffa600" />
                </linearGradient>
              </defs>
              <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle"
                fontFamily="EB Garamond, Georgia, serif"
                fontSize="38" fontWeight="600" fill="url(#goldGrad)">∂</text>
            </svg>
                        </a>
            <div className="nav-links">
              <a href="/blog">blog</a>
              <a href="/about">about</a>
            </div>
          </div>
        </nav>
        <div className="page-content">
          {children}
        </div>
      <Splash />
      </body>
      

    </html>
  );
}
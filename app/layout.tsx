import type { Metadata } from "next";
import "./globals.css";

import FeedbackPanel from './components/FeedbackPanel'
export const metadata: Metadata = {
  title: "Alëksis Arendt",
  description: "Notes on measure theory, functional analysis, and geometry.",
  icons: {
    icon: '/favicon.svg?v=2',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preload fonts */}
<link rel="preload" href="/fonts/Satoshi/Satoshi-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
<link rel="preload" href="/fonts/Satoshi/Satoshi-Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
<link rel="preload" href="/fonts/Satoshi/Satoshi-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {[
        // tags
        '/tags/analysis-icon.jpg',
        '/tags/analysis.jpg',
        '/tags/diffgeo-icon.jpg',
        '/tags/diffgeo.jpg',
        '/tags/functional-icon.jpg',
        '/tags/functional.jpg',
        '/tags/GMT.jpg',
        '/tags/measure-icon.jpg',
        '/tags/measure.jpg',
        '/tags/metric-icon.jpg',
        '/tags/metric.jpg',
        '/tags/olympiad.jpg',
        '/tags/pde.jpg',
        '/tags/physics-icon.jpg',
        '/tags/physics.jpg',
        // subareas
        '/subareas/elliptic.jpg',
        '/subareas/fractal-icon.jpg',
        '/subareas/fractal.jpg',
        '/subareas/minimal-icon.jpg',
        '/subareas/minimal.jpg',
        '/subareas/ricci-icon.jpg',
        '/subareas/ricci.jpg',
        '/subareas/variation-icon.jpg',
        '/subareas/variation.jpg',
      ].map(src => (
        <link key={src} rel="preload" as="image" href={src} />
      ))}
      </head>
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
              <a href="/research">research</a>
            </div>
          </div>
        </nav>
        <div className="page-content">
          {children}
        </div>
      <div className="no-print">
        <FeedbackPanel />
      </div>
      </body>
      
    </html>
  );
}
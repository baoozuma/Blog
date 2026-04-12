import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next'
import FeedbackPanel from './components/FeedbackPanel'
import ThemeToggle from './components/ThemeToggle'
import NavLogo from './components/NavLogo'
import { Analytics } from "@vercel/analytics/next"
export const metadata: Metadata = {
  title: "Alëksis Arendt",
  description: "Notes on measure theory, functional analysis, and geometry.",
  icons: {
    icon: '/favicon.svg?v=2',
  },
}

const themeScript = `
  (function() {
    var theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  })();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="alternate" type="application/rss+xml" title="Alëksis Arendt" href="https://aleksis.dev/feed.xml" />
        <link rel="preload" href="/fonts/Satoshi/Satoshi-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Satoshi/Satoshi-Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Satoshi/Satoshi-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <nav>
          <div className="nav-inner">
            <NavLogo />
            <div className="nav-links">
              <a href="/blog">blog</a>
              <a href="/about">about</a>
              <a href="/research">research</a>
              <ThemeToggle />
            </div>
          </div>
        </nav>
        <div className="page-content">
          {children}
        </div>
        <div className="no-print">
          <FeedbackPanel />
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
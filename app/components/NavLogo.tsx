'use client'

import { useEffect, useState } from 'react'

export default function NavLogo() {
  const [light, setLight] = useState(false)

  useEffect(() => {
    function check() {
      setLight(document.documentElement.getAttribute('data-theme') === 'light')
    }
    check()
    // Watch for theme changes
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  return (
    <a href="/" className="nav-logo">
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            {light ? (
              <>
                <stop offset="0%" stopColor="#0055aa" />
                <stop offset="50%" stopColor="#334466" />
                <stop offset="100%" stopColor="#aa7700" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#e8e5f2" />
                <stop offset="100%" stopColor="#ffa600" />
              </>
            )}
          </linearGradient>
        </defs>
        <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle"
          fontFamily="EB Garamond, Georgia, serif"
          fontSize="38" fontWeight="600" fill="url(#goldGrad)">∂</text>
      </svg>
    </a>
  )
}
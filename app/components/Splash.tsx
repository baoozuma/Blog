'use client'

import { useEffect } from 'react'

export default function Splash() {
  useEffect(() => {
    const seen = sessionStorage.getItem('splash-seen')
    if (seen) return
    sessionStorage.setItem('splash-seen', '1')
    setTimeout(() => {
      document.querySelector('.splash')?.classList.add('splash-hidden')
    }, 2200)
  }, [])

  return (
    <div className="splash">
      <span className="splash-text">Hi, my name is Aleksis</span>
      <span className="splash-text-2">hope you're doing well.</span>
    </div>
  )
}
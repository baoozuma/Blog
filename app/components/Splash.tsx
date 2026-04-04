'use client'

import { useEffect, useState } from 'react'

export default function Splash() {
  const [visible, setVisible] = useState<boolean | null>(null)

  useEffect(() => {
    const seen = sessionStorage.getItem('splash-seen')
    if (seen) {
      setVisible(false)
      return
    }
    setVisible(true)
    sessionStorage.setItem('splash-seen', '1')
    setTimeout(() => setVisible(false), 2200)
  }, [])

  if (!visible) return null

  return (
    <div className="splash">
      <span className="splash-text">Hi, my name is Aleksis</span>
      <span className="splash-text-2">hope you're doing well.</span>
    </div>
  )
}
'use client'
import { useEffect, useState } from 'react'

const sections = ['interests', 'currently studying', 'recent posts']

export default function SideTracker() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight)
      setProgress(Math.min(pct * 100, 100))
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="side-tracker" aria-hidden="true">
      {/* Vertical progress line */}
      <div className="tracker-line">
        <div className="tracker-fill" style={{ height: `${progress}%` }} />
      </div>
    </div>
  )
}
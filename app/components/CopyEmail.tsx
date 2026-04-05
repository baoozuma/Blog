'use client'

import { useState } from 'react'

export default function CopyEmail() {
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    navigator.clipboard.writeText('aleksisdg@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button onClick={handleClick} className="social-link" style={{ border: 'none', cursor: 'pointer' }}>
      <span>✉</span>
      <span>{copied ? 'copied!' : 'Email'}</span>
    </button>
  )
}
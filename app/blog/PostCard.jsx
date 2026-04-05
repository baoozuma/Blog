'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function PostCard({ post }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{
        border: `1px solid ${hovered ? '#c9a96e' : '#2a2a2d'}`,
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#141415',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'border-color 0.2s, transform 0.2s',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {post.thumbnail ? (
          <div style={{ position: 'relative', width: '100%', height: 180 }}>
           <Image src={post.thumbnail} alt={post.title} fill sizes="(max-width: 640px) 100vw, 320px" style={{ objectFit: 'cover' }} />
          </div>
        ) : (
          <div style={{
            width: '100%', height: 180,
            background: 'linear-gradient(135deg, #141415 0%, #1e1a0e 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '4rem', color: 'rgba(201,169,110,0.15)',
            fontFamily: 'EB Garamond, serif',
          }}>
            ∂
          </div>
        )}

        <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h2 style={{
            fontSize: '1.1rem', fontWeight: 500,
            color: hovered ? '#c9a96e' : '#e8e6e1',
            lineHeight: 1.4, letterSpacing: '-0.01em',
            transition: 'color 0.2s',
          }}>
            {post.title}
          </h2>
          <p style={{ color: '#6b6966', fontSize: '0.875rem', fontStyle: 'italic', flex: 1, lineHeight: 1.5 }}>
            {post.description}
          </p>
          <span style={{ color: '#6b6966', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", marginTop: '0.5rem' }}>
            {post.date}
          </span>
        </div>
      </div>
    </Link>
  )
}
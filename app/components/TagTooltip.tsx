'use client'

import { useState } from 'react'
import Image from 'next/image'

const tagData: Record<string, { desc: string; img: string }> = {
  'Geometric Measure Theory': {
    desc: 'Covering lemmas, rectifiable sets, currents, varifolds, minimal surfaces, fractal geometry.',
    img: '/tags/measure.jpg',
  },
  'Functional Analysis': {
    desc: 'Hilbert and Sobolev spaces, duality, Hahn-Banach, spectral theory.',
    img: '/tags/functional.jpg',
  },
  'Mathematical Physics': {
    desc: 'Classical mechanics, electrodynamics, relativity — via the language of differential geometry and functional analysis.',
    img: '/tags/physics.jpg', 
  },
  'Analysis of PDEs': {
    desc: 'Elliptic, parabolic, hyperbolic equations — existence, regularity, Sobolev spaces, variational methods, boundary conditions.',
    img: '/tags/pde.jpg',
  },
  'Differential Geometry': {
    desc: 'Manifolds, connections, curvature, Riemannian geometry, differential forms.',
    img: '/tags/diffgeo.jpg',
  },
  'Metric Geometry': {
    desc: 'Metric spaces, geodesics, curvature bounds, Gromov-Hausdorff convergence, Alexandrov spaces.',
    img: '/tags/metric.jpg',
  },
}

export default function TagTooltip({ tag }: { tag: string }) {
  const [hovered, setHovered] = useState(false)
  const data = tagData[tag]

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span
        className="tag"
        style={{ cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {tag}
      </span>

      {/* Tooltip — luôn render, dùng opacity + transform để animate */}
      {data && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(100% + 8px)',
          left: '50%',
          transform: hovered ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(6px)',
          width: 220,
          background: '#1a1a1b',
          border: '1px solid #2a2a2d',
          borderRadius: '8px',
          overflow: 'hidden',
          zIndex: 100,
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          opacity: hovered ? 1 : 0,
          pointerEvents: hovered ? 'auto' : 'none',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}>
          <div style={{
            width: '100%',
            height: 100,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <Image
              src={data.img}
              alt={tag}
              fill
              sizes="220px"
              loading="lazy"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div style={{ padding: '0.75rem 1rem' }}>
            <div style={{
              fontSize: '0.7rem',
              fontFamily: 'JetBrains Mono, monospace',
              color: '#c9a96e',
              marginBottom: '0.4rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>
              {tag}
            </div>
            <p style={{
              fontSize: '0.78rem',
              color: '#dcd7d2',
              lineHeight: 1.5,
              margin: 0,
            }}>
              {data.desc}
            </p>
          </div>

          <div style={{
            position: 'absolute',
            bottom: -5,
            left: '50%',
            transform: 'translateX(-50%) rotate(45deg)',
            width: 10,
            height: 10,
            background: '#1a1a1b',
            border: '1px solid #2a2a2d',
            borderTop: 'none',
            borderLeft: 'none',
          }} />
        </div>
      )}
    </div>
  )
}
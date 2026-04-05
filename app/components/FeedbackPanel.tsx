'use client'

import { useState } from 'react'

export default function FeedbackPanel() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!msg.trim()) return
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xlgoovrp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name || 'Anonymous', message: msg }),
      })
      if (res.ok) { setStatus('sent'); setMsg(''); setName('') }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <>
      {/* Trigger button — fixed bottom center */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.4rem 1rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: '999px',
          color: 'var(--text-dim)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          letterSpacing: '0.04em',
          cursor: 'pointer',
          transition: 'border-color 0.2s, color 0.2s',
          backdropFilter: 'blur(8px)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--accent)'
          e.currentTarget.style.color = 'var(--accent)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border-light)'
          e.currentTarget.style.color = 'var(--text-dim)'
        }}
      >
        <span>✉</span>
        <span>feedback</span>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10,10,15,0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 98,
            animation: 'fadeUp 0.2s ease forwards',
          }}
        />
      )}

      {/* Panel */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: open ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(100%)',
        width: '100%',
        maxWidth: 'var(--content-width)',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderBottom: 'none',
        borderRadius: '12px 12px 0 0',
        padding: '2rem var(--content-padding) 2.5rem',
        zIndex: 99,
        transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
      }}>

        {/* Handle */}
        <div style={{
          width: 36,
          height: 4,
          background: 'var(--border-light)',
          borderRadius: '999px',
          margin: '0 auto 1.75rem',
          cursor: 'pointer',
        }} onClick={() => setOpen(false)} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            leave a note
          </p>
          <button
            onClick={() => setOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-dim)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            esc ×
          </button>
        </div>

        {status === 'sent' ? (
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1rem',
            color: 'var(--accent)',
            fontStyle: 'italic',
            textAlign: 'center',
            padding: '2rem 0',
          }}>
            received. thank you.
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="your name (optional)"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border-light)',
                borderRadius: '6px',
                padding: '0.5rem 0.85rem',
                color: 'var(--text)',
                fontFamily: 'var(--font-serif)',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'border-color 0.2s',
                width: '220px',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-light)'}
            />

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <textarea
                value={msg}
                onChange={e => setMsg(e.target.value)}
                placeholder="questions, corrections, thoughts..."
                rows={3}
                style={{
                  flex: 1,
                  background: 'var(--bg)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '6px',
                  padding: '0.6rem 0.85rem',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  resize: 'none',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-light)'}
              />
              <button
                type="submit"
                disabled={status === 'sending' || !msg.trim()}
                style={{
                  padding: '0.6rem 1rem',
                  background: status === 'sending' ? 'transparent' : 'var(--accent)',
                  border: '1px solid var(--accent)',
                  borderRadius: '6px',
                  color: status === 'sending' ? 'var(--accent)' : '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  opacity: !msg.trim() ? 0.4 : 1,
                }}
              >
                {status === 'sending' ? 'sending...' : 'send →'}
              </button>
            </div>

            {status === 'error' && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#f87171' }}>
                something went wrong. try again.
              </p>
            )}
          </form>
        )}
      </div>
    </>
  )
}
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

type Comment = {
  id: string
  name: string
  message: string
  timestamp: string
  replyTo: string | null
  isAdmin?: boolean
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

function CommentItem({
  comment,
  replies,
  onReply,
}: {
  comment: Comment
  replies: Comment[]
  onReply: (id: string, name: string) => void
}) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{
        padding: '0.85rem 1rem',
        border: '1px solid var(--border)',
        borderLeft: comment.isAdmin ? '2px solid var(--gold)' : '1px solid var(--border)',
        borderRadius: '6px',
        background: 'var(--bg-card)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {comment.isAdmin && (
              <div style={{ width: 20, height: 20, borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                <Image src="/avatar.jpg" alt="Aleksis" fill style={{ objectFit: 'cover' }} />
              </div>
            )}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 500 }}>
              {comment.name}
            </span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)' }}>
            {formatDate(comment.timestamp)}
          </span>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.65, margin: '0 0 0.5rem' }}>
          {comment.message}
        </p>
        <button
          onClick={() => onReply(comment.id, comment.name)}
          style={{
            background: 'none', border: 'none', padding: 0,
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            color: 'var(--text-dim)', cursor: 'pointer', transition: 'color 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
        >
          reply →
        </button>
      </div>

      {replies.length > 0 && (
        <div style={{ marginLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {replies.map(reply => (
            <div key={reply.id} style={{
              padding: '0.75rem 1rem',
              border: '1px solid var(--border)',
              borderLeft: reply.isAdmin ? '2px solid var(--gold)' : '1px solid var(--border)',
              borderRadius: '0 6px 6px 0',
              background: 'var(--bg-card)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {reply.isAdmin && (
                    <div style={{ width: 18, height: 18, borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                      <Image src="/avatar.jpg" alt="Aleksis" fill style={{ objectFit: 'cover' }} />
                    </div>
                  )}
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: reply.isAdmin ? 'var(--gold)' : 'var(--text)' }}>
                    {reply.name}
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-dim)' }}>
                  {formatDate(reply.timestamp)}
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text)', lineHeight: 1.6, margin: 0 }}>
                {reply.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Comments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/comments?slug=${slug}`)
      .then(r => r.json())
      .then(d => { setComments(d.comments ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, name, message, replyTo: replyTo?.id ?? null }),
      })
      const data = await res.json()
      if (res.ok) {
        setComments(prev => [data.comment, ...prev])
        setMessage('')
        setName('')
        setReplyTo(null)
        setStatus('idle')
      } else setStatus('error')
    } catch { setStatus('error') }
  }

  const topLevel = comments.filter(c => !c.replyTo)
  const replies = comments.filter(c => c.replyTo)

  return (
    <div className="no-print" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
        color: 'var(--gold)', letterSpacing: '0.1em',
        textTransform: 'uppercase', marginBottom: '1.5rem',
      }}>
        {comments.length > 0 ? `${comments.length} comment${comments.length > 1 ? 's' : ''}` : 'comments'}
      </p>

      <form onSubmit={submit} style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {replyTo && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
            <span>replying to <span style={{ color: 'var(--gold)' }}>{replyTo.name}</span></span>
            <button type="button" onClick={() => setReplyTo(null)} style={{
              background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            }}>×</button>
          </div>
        )}
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="your name (optional)"
          style={{
            width: '200px', background: 'var(--bg-card)',
            border: '1px solid var(--border)', borderRadius: '4px',
            padding: '0.45rem 0.75rem', color: 'var(--text)',
            fontFamily: 'var(--font-serif)', fontSize: '0.875rem', outline: 'none',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--gold)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
        <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="leave a comment..."
            rows={3}
            style={{
              flex: 1, background: 'var(--bg-card)',
              border: '1px solid var(--border)', borderRadius: '4px',
              padding: '0.5rem 0.75rem', color: 'var(--text)',
              fontFamily: 'var(--font-serif)', fontSize: '0.875rem',
              lineHeight: 1.6, resize: 'none', outline: 'none',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--gold)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          <button type="submit" disabled={status === 'sending' || !message.trim()} style={{
            padding: '0.5rem 0.9rem',
            background: status === 'sending' ? 'transparent' : 'var(--gold)',
            border: '1px solid var(--gold)', borderRadius: '4px',
            color: status === 'sending' ? 'var(--gold)' : 'var(--bg)',
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
            cursor: status === 'sending' ? 'not-allowed' : 'pointer',
            whiteSpace: 'nowrap', opacity: !message.trim() ? 0.4 : 1,
          }}>
            {status === 'sending' ? '...' : 'post →'}
          </button>
        </div>
        {status === 'error' && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#f87171', margin: 0 }}>
            something went wrong.
          </p>
        )}
      </form>

      {loading
        ? <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-dim)' }}>loading...</p>
        : topLevel.length === 0
          ? <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>no comments yet. be the first.</p>
          : topLevel.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              replies={replies.filter(r => r.replyTo === comment.id)}
              onReply={(id, name) => setReplyTo({ id, name })}
            />
          ))
      }
    </div>
  )
}
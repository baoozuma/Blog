'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

type FeedbackEntry = {
  name: string
  message: string
  timestamp: string
  page: string
}

type Comment = {
  id: string
  name: string
  message: string
  timestamp: string
  replyTo: string | null
  isAdmin?: boolean
}
type AnalyticsEntry = {
  slug: string
  referrer: string
  country: string
  timestamp: number
}
 
type Analytics = Record<string, { views: number; events: AnalyticsEntry[] }>
type CommentsBySlug = Record<string, Comment[]>

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function formatPage(url: string) {
  try { return new URL(url).pathname } catch { return url }
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [tab, setTab] = useState<'feedback' | 'comments' | 'analytics'>('comments')
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([])
  const [comments, setComments] = useState<CommentsBySlug>({})
  const [slugs, setSlugs] = useState<string[]>([])
  const [activeSlug, setActiveSlug] = useState('')

  const [replyTo, setReplyTo] = useState<{ id: string; name: string; slug: string } | null>(null)
  const [replyMsg, setReplyMsg] = useState('')
  const [replying, setReplying] = useState(false)
  const [analytics, setAnalytics] = useState<Analytics>({})
  // Fetch slugs từ posts API
  useEffect(() => {
    fetch('/api/slugs')
      .then(r => r.json())
      .then(d => {
        const list: string[] = d.slugs ?? []
        setSlugs(list)
        if (list.length > 0) setActiveSlug(list[0])
      })
      .catch(() => {})
  }, [])

async function login() {
  if (loading) return
  setLoading(true)
  setError('')
  try {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'admin-login', password }),
    })
    if (!res.ok) { setError('Wrong password.'); return }
    const data = await res.json()
    setFeedback(data.entries ?? [])

    const all: CommentsBySlug = {}
    await Promise.all(slugs.map(async slug => {
      const r = await fetch(`/api/comments?slug=${slug}`)
      const d = await r.json()
      all[slug] = d.comments ?? []
    }))
    setComments(all)

    // analytics — phải nằm trong try
    const analyticsData: Analytics = {}
    await Promise.all(slugs.map(async slug => {
      const r = await fetch(`/api/views?slug=${slug}`)
      const d = await r.json()
      const eventsRaw = await fetch(`/api/analytics?password=${encodeURIComponent(password)}&slug=${slug}`)
      const eventsData = await eventsRaw.json()
      analyticsData[slug] = { views: d.views, events: eventsData.events ?? [] }
    }))
    setAnalytics(analyticsData)

    setAuthed(true)
  } catch {
    setError('Failed to connect.')
  } finally {
    setLoading(false)
  }
}

  async function deleteComment(slug: string, id: string) {
    if (!confirm('Delete this comment?')) return
    const res = await fetch(`/api/comments?password=${encodeURIComponent(password)}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, id }),
    })
    if (res.ok) {
      setComments(prev => ({
        ...prev,
        [slug]: prev[slug].filter(c => c.id !== id),
      }))
    }
  }

  async function submitReply() {
    if (!replyTo || !replyMsg.trim()) return
    setReplying(true)
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: replyTo.slug,
        name: 'Alëksis',
        message: replyMsg.trim(),
        replyTo: replyTo.id,
        isAdmin: true,
      }),
    })
    const data = await res.json()
    if (res.ok) {
      setComments(prev => ({
        ...prev,
        [replyTo.slug]: [data.comment, ...prev[replyTo.slug]],
      }))
      setReplyTo(null)
      setReplyMsg('')
    }
    setReplying(false)
  }

  const mono = { fontFamily: 'var(--font-mono)' }
  const label = { ...mono, fontSize: '0.68rem', color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase' as const }

  if (!authed) return (
    <div style={{ maxWidth: 480, margin: '4rem auto', padding: '0 1.5rem' }}>
      <p style={{ ...label, marginBottom: '1.5rem' }}>admin</p>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => { setPassword(e.target.value); setError('') }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              document.getElementById('login-btn')?.click()
            }
          }}
          style={{
            background: 'var(--bg-card)', border: `1px solid ${error ? '#f87171' : 'var(--border)'}`,
            borderRadius: '4px', padding: '0.5rem 0.85rem',
            color: 'var(--text)', ...mono, fontSize: '0.85rem', outline: 'none',
          }}
        />
        <button
          id="login-btn"
          onClick={login}
          style={{
            padding: '0.5rem 1rem', background: 'var(--gold)', border: 'none',
            borderRadius: '4px', color: 'var(--bg)', ...mono, fontSize: '0.78rem',
            cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? '...' : 'enter →'}
        </button>
      </div>
      {error && (
        <p style={{ ...mono, fontSize: '0.72rem', color: '#f87171', marginTop: '0.5rem' }}>
          {error}
        </p>
      )}
    </div>
  )

  const slugComments = comments[activeSlug] ?? []
  const topLevel = slugComments.filter(c => !c.replyTo)
  const replies = slugComments.filter(c => c.replyTo)

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <p style={{ ...label }}>admin dashboard</p>
        <button onClick={() => { setAuthed(false); setPassword(''); setError('') }} style={{
          background: 'none', border: 'none', ...mono, fontSize: '0.68rem',
          color: 'var(--text-dim)', cursor: 'pointer',
        }}>lock ×</button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
        {(['comments', 'feedback', 'analytics'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            ...mono, fontSize: '0.75rem',
            color: tab === t ? 'var(--gold)' : 'var(--text-dim)',
            borderBottom: tab === t ? '1px solid var(--gold)' : 'none',
            paddingBottom: '0.25rem',
          }}>{t}</button>
        ))}
      </div>

      {tab === 'feedback' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {feedback.length === 0
            ? <p style={{ ...mono, fontSize: '0.82rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>no feedback yet.</p>
            : feedback.map((entry, i) => (
              <div key={i} style={{ padding: '1rem 1.25rem', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-card)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--gold)' }}>{entry.name}</span>
                  <span style={{ ...mono, fontSize: '0.62rem', color: 'var(--text-dim)' }}>{formatDate(entry.timestamp)}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.65, margin: '0 0 0.4rem' }}>{entry.message}</p>
                {entry.page && <span style={{ ...mono, fontSize: '0.62rem', color: 'var(--text-dim)' }}>{formatPage(entry.page)}</span>}
              </div>
            ))
          }
        </div>
      )}

      {tab === 'comments' && (
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div style={{ width: 180, flexShrink: 0 }}>
            <p style={{ ...label, marginBottom: '0.75rem' }}>posts</p>
            {slugs.map(slug => (
              <button key={slug} onClick={() => setActiveSlug(slug)} style={{
                display: 'block', width: '100%', textAlign: 'left',
                background: activeSlug === slug ? 'rgba(0,221,255,0.06)' : 'none',
                border: 'none', borderRadius: '4px',
                padding: '0.4rem 0.6rem', marginBottom: '0.2rem',
                ...mono, fontSize: '0.7rem',
                color: activeSlug === slug ? 'var(--gold)' : 'var(--text-dim)',
                cursor: 'pointer',
              }}>
                {slug}
                {(comments[slug]?.length ?? 0) > 0 && (
                  <span style={{ marginLeft: '0.4rem', color: 'var(--text-dim)', opacity: 0.6 }}>
                    ({comments[slug].length})
                  </span>
                )}
              </button>
            ))}
          </div>

          <div style={{ flex: 1 }}>
            {topLevel.length === 0
              ? <p style={{ ...mono, fontSize: '0.82rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>no comments.</p>
              : topLevel.map(comment => (
                <div key={comment.id} style={{ marginBottom: '1.25rem' }}>
                  <div style={{
                    padding: '0.85rem 1rem', border: '1px solid var(--border)',
                    borderLeft: comment.isAdmin ? '2px solid var(--gold)' : '1px solid var(--border)',
                    borderRadius: '6px', background: 'var(--bg-card)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {comment.isAdmin && (
                          <div style={{ width: 20, height: 20, borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                            <Image src="/avatar.jpg" alt="Aleksis" fill style={{ objectFit: 'cover' }} />
                          </div>
                        )}
                        <span style={{ ...mono, fontSize: '0.75rem', color: comment.isAdmin ? 'var(--gold)' : 'var(--text)', fontWeight: 500 }}>
                          {comment.name}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <span style={{ ...mono, fontSize: '0.62rem', color: 'var(--text-dim)' }}>{formatDate(comment.timestamp)}</span>
                        <button onClick={() => deleteComment(activeSlug, comment.id)} style={{
                          background: 'none', border: 'none', ...mono, fontSize: '0.62rem', color: '#f87171', cursor: 'pointer',
                        }}>delete</button>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text)', lineHeight: 1.65, margin: '0 0 0.4rem' }}>{comment.message}</p>
                    <button onClick={() => setReplyTo({ id: comment.id, name: comment.name, slug: activeSlug })}
                      style={{ background: 'none', border: 'none', ...mono, fontSize: '0.65rem', color: 'var(--text-dim)', cursor: 'pointer' }}>
                      reply →
                    </button>
                  </div>

                  {replies.filter(r => r.replyTo === comment.id).map(reply => (
                    <div key={reply.id} style={{
                      marginLeft: '1.25rem', marginTop: '0.4rem', padding: '0.75rem 1rem',
                      border: '1px solid var(--border)',
                      borderLeft: reply.isAdmin ? '2px solid var(--gold)' : '1px solid var(--border)',
                      borderRadius: '0 6px 6px 0', background: 'var(--bg-card)',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {reply.isAdmin && (
                            <div style={{ width: 18, height: 18, borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                              <Image src="/avatar.jpg" alt="Aleksis" fill style={{ objectFit: 'cover' }} />
                            </div>
                          )}
                          <span style={{ ...mono, fontSize: '0.72rem', color: reply.isAdmin ? 'var(--gold)' : 'var(--text)' }}>{reply.name}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                          <span style={{ ...mono, fontSize: '0.62rem', color: 'var(--text-dim)' }}>{formatDate(reply.timestamp)}</span>
                          <button onClick={() => deleteComment(activeSlug, reply.id)} style={{
                            background: 'none', border: 'none', ...mono, fontSize: '0.62rem', color: '#f87171', cursor: 'pointer',
                          }}>delete</button>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.6, margin: 0 }}>{reply.message}</p>
                    </div>
                  ))}

                  {replyTo?.id === comment.id && (
                    <div style={{ marginLeft: '1.25rem', marginTop: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0, marginTop: '0.4rem' }}>
                        <Image src="/avatar.jpg" alt="Aleksis" fill style={{ objectFit: 'cover' }} />
                      </div>
                      <textarea
                        value={replyMsg}
                        onChange={e => setReplyMsg(e.target.value)}
                        placeholder={`Reply to ${comment.name}...`}
                        rows={2}
                        style={{
                          flex: 1, background: 'var(--bg-card)', border: '1px solid var(--gold)',
                          borderRadius: '4px', padding: '0.45rem 0.7rem', color: 'var(--text)',
                          fontFamily: 'var(--font-serif)', fontSize: '0.875rem', lineHeight: 1.6, resize: 'none', outline: 'none',
                        }}
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                        <button onClick={submitReply} disabled={replying || !replyMsg.trim()} style={{
                          padding: '0.4rem 0.8rem', background: 'var(--gold)', border: 'none',
                          borderRadius: '4px', color: 'var(--bg)', ...mono, fontSize: '0.7rem',
                          cursor: 'pointer', opacity: !replyMsg.trim() ? 0.4 : 1,
                        }}>{replying ? '...' : 'post →'}</button>
                        <button onClick={() => { setReplyTo(null); setReplyMsg('') }} style={{
                          padding: '0.4rem 0.8rem', background: 'none', border: '1px solid var(--border)',
                          borderRadius: '4px', ...mono, fontSize: '0.7rem', color: 'var(--text-dim)', cursor: 'pointer',
                        }}>cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            }
          </div>
        </div>
      )}
      {tab === 'analytics' && (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    {slugs.map(slug => {
      const data = analytics[slug]
      if (!data) return null
      const countries = data.events.reduce((acc: Record<string, number>, e) => {
        if (e.country) acc[e.country] = (acc[e.country] ?? 0) + 1
        return acc
      }, {})
      const referrers = data.events.reduce((acc: Record<string, number>, e) => {
        const ref = e.referrer ? new URL(e.referrer).hostname : 'direct'
        acc[ref] = (acc[ref] ?? 0) + 1
        return acc
      }, {})
 
      return (
        <div key={slug} style={{ padding: '1rem 1.25rem', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-card)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--gold)' }}>{slug}</span>
            <span style={{ ...mono, fontSize: '0.75rem', color: 'var(--text-dim)' }}>{data.views} views</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {Object.keys(countries).length > 0 && (
              <div>
                <p style={{ ...mono, fontSize: '0.62rem', color: 'var(--text-dim)', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>countries</p>
                {Object.entries(countries).sort((a,b) => b[1]-a[1]).slice(0,5).map(([c, n]) => (
                  <div key={c} style={{ ...mono, fontSize: '0.7rem', color: 'var(--text)', marginBottom: '0.2rem' }}>
                    {c} <span style={{ color: 'var(--text-dim)' }}>({n})</span>
                  </div>
                ))}
              </div>
            )}
            {Object.keys(referrers).length > 0 && (
              <div>
                <p style={{ ...mono, fontSize: '0.62rem', color: 'var(--text-dim)', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>referrers</p>
                {Object.entries(referrers).sort((a,b) => b[1]-a[1]).slice(0,5).map(([r, n]) => (
                  <div key={r} style={{ ...mono, fontSize: '0.7rem', color: 'var(--text)', marginBottom: '0.2rem' }}>
                    {r} <span style={{ color: 'var(--text-dim)' }}>({n})</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )
    })}
  </div>
)}
    </div>
  )
}
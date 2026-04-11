'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import './Search.module.css'
type Post = {
  slug: string
  title: string
  description: string
  date: string
}

export default function Search({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  const fuse = useMemo(() => new Fuse(posts, {
    keys: ['title', 'description'],
    threshold: 0.35,
  }), [posts])

  const results = query.trim()
    ? fuse.search(query).map(r => r.item)
    : []

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="search-wrap" ref={wrapRef}>
      <input
        className="search-input"
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        autoComplete="off"
        spellCheck={false}
      />

      {open && query.trim() && (
        <div className="search-results">
          {results.length === 0 ? (
            <p className="search-empty">No results for "{query}"</p>
          ) : (
            results.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="search-result"
                onClick={() => { setOpen(false); setQuery('') }}
              >
                <span className="search-result-title">{post.title}</span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  )
}
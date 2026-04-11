'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from './post-card.module.css'
type Post = {
  slug: string
  title: string
  description: string
  date: string
  thumbnail?: string
  readingTime?: string
}
export default function PostCard({ post, views }: { post: Post; views: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>

      {post.thumbnail ? (
        <div className={styles.thumb}>
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, 320px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      ) : (
        <div className={styles.placeholder}>∂</div>
      )}

      <div className={styles.body}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.desc}>{post.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <span className={styles.meta}>{post.date}</span>
          {views > 0 && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
              color: 'var(--text-dim)', opacity: 0.45,
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              {views}
            </span>
          )}
        </div>
      </div>

    </Link>
  )
}
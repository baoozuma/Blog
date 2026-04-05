'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from './post-card.module.css'

export default function PostCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      
      {/* Thumbnail */}
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
        <div className={styles.placeholder}>
          ∂
        </div>
      )}

      {/* Content */}
      <div className={styles.body}>
        <h2 className={styles.title}>{post.title}</h2>

        <p className={styles.desc}>
          {post.description}
        </p>

        <span className={styles.meta}>
          {post.date}
        </span>
      </div>

    </Link>
  )
}
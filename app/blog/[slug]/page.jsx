import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '../../../lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  return { title: post.title, description: post.description }
}

const options = {
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  return (
    <div>
      <Link href="/blog" style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        color: '#6b6966', textDecoration: 'none', fontSize: '0.85rem',
        fontFamily: "'JetBrains Mono', monospace", marginBottom: '2.5rem',
      }}>
        ← all posts
      </Link>

      <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #2a2a2d' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.25, marginBottom: '1rem' }}>
          {post.title}
        </h1>
        <div style={{ color: '#6b6966', fontSize: '0.8rem', fontFamily: "'JetBrains Mono', monospace", marginBottom: '0.75rem' }}>
          {post.date}
        </div>
        {post.description && (
          <p style={{ color: '#9b9895', fontStyle: 'italic', fontSize: '1.05rem' }}>{post.description}</p>
        )}
      </div>

      <article className="prose max-w-none">
        <MDXRemote source={post.content} options={options} />
      </article>
    </div>
  )
}
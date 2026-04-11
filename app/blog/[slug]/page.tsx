import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '../../../lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import ExportPDF from '../../components/ExportPDF'
import Comments from '../../components/Comments'
import ViewCounter from '../../components/ViewCounter'
import { Theorem, Lemma, Corollary, Definition, Proof, Remark } from '../../components/MathBlocks'

const SITE_URL = 'https://aleksis.dev'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  const ogImage = post.thumbnail
    ? `${SITE_URL}${post.thumbnail}`
    : `${SITE_URL}/og-default.jpg`

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${slug}`,
      siteName: 'Alëksis Arendt',
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  }
}

const components = { Theorem, Lemma, Corollary, Definition, Proof, Remark }

const options = {
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  return (
    <div>
      <Link href="/blog" className="back-link no-print" style={{
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

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: '#6b6966', fontSize: '0.8rem', fontFamily: "'JetBrains Mono', monospace", marginBottom: '0.75rem' }}>
          <span>{post.date}</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{post.readingTime}</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <ViewCounter slug={slug} />
        </div>

        {post.description && (
          <p style={{ color: '#9b9895', fontStyle: 'italic', fontSize: '1.05rem' }}>{post.description}</p>
        )}
      </div>

      <article className="prose max-w-none">
        <MDXRemote source={post.content} options={options} components={components} />
      </article>

      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: '0.75rem',
      }}>
        <div style={{ color: 'var(--text-dim)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
          {post.date}
        </div>
        {/*<ExportPDF title={post.title} />*/}
      </div>

      <Comments slug={slug} />
    </div>
  )
}
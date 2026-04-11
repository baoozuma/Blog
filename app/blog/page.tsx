import { getAllPosts } from '../../lib/posts'
import PostCard from './PostCard'
import Search from '../components/Search'

export const revalidate = 3600

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 600, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>Blog</h1>
        <p style={{ color: '#6b6966', fontStyle: 'italic', fontSize: '1rem' }}>
          Notes on measure theory, functional analysis, and geometry.
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <Search posts={posts} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1rem',
      }}>
        {posts.map(post => (
          <PostCard key={post.slug} post={post} views={0} />
        ))}
      </div>
    </div>
  )
}
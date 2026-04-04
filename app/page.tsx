import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '../lib/posts'
import { FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import TagTooltip from './components/TagTooltip'
export default function HomePage() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <div className="home">

      {/* Hero */}
      <div className="hero">
        <div className="hero-text">
          <p className="hero-label">Pure Mathematics - HCMUS</p>

          <h1 className="hero-title">Aleksis Arendt</h1>

          <p className="hero-desc">
              i don't mytholize math, it's just a job.
          </p>

          <div className="tags">
            {['Geometric Measure Theory', 'Functional Analysis', 'Mathematical Physics', 'Analysis of PDEs','Differential Geometry', 'Metric Geometry'].map(tag => (
              <TagTooltip key={tag} tag={tag} />
            ))}
          </div>

          <div className="cta-row">
            <Link href="/blog" className="btn-primary">read blog →</Link>
            <Link href="/about" className="btn-secondary">about me</Link>
          </div>

          <div className="social-row">
            {[
              { label: 'GitHub', href: 'https://github.com/baoozuma', icon: <FaGithub /> },
              { label: 'Facebook', href: 'https://www.facebook.com/aleksis.arendt', icon: <FaFacebook /> },
              { label: 'Instagram', href: 'https://www.instagram.com/aleksis.arendt/', icon: <FaInstagram /> },
              { label: 'Email', href: 'mailto:aleksisdg@gmail.com', icon: <HiOutlineMail /> },
            ].map(({ label, href, icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-link">
                <span>{icon}</span>
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="hero-avatar">
          <div className="avatar-img">
            <Image src="/avatar.jpg" alt="Aleksis" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="avatar-deco" />
        </div>
      </div>
<p style={{
  marginTop: '-3rem',
  marginBottom: '4rem',
  color: 'var(--text-muted)',
  fontSize: '1rem',
  lineHeight: 1.8,
  borderLeft: '2px solid var(--accent)',
  paddingLeft: '1rem'
}}>
  I study pure mathematics at HCMUS, working toward a master's in Germany or Switzerland.
  My long-term interest is geometric analysis — minimal surfaces, GMT, and mathematical physics.
  Outside of math: J-Rock, Nietzsche, and story-driven games.
</p>
     {/* Interests */}
      <div className="section">
        <p className="section-label">interests</p>
        <div className="interests-grid">
          {[
            {
              icon: '∫',
              label: 'Mathematics',
              detail: 'Geometric analysis, GMT, minimal surfaces, Mathematical Physics',
              accent: '#7c6af5',
              sub: 'Pure & Applied',
            },
            {
              icon: '♪',
              label: 'Music',
              detail: 'Ling Tosite Sigure, 7UPPERCUTS, Hitohira, ACDC',
              accent: '#4ecdc4',
              sub: 'J-Rock & Metal',
            },
            {
              icon: '§',
              label: 'Philosophy',
              detail: 'Nietzsche, Marx, Kant, Arendt',
              accent: '#e8a44a',
              sub: 'Existentialism & Political Theory',
            },
            {
              icon: '⟁',
              label: 'Games',
              detail: 'Nier: Automata, Metal Gear Solid V, Red Dead Redemption 2',
              accent: '#f87171',
              sub: 'Story-driven',
            },
          ].map(({ icon, label, detail, accent, sub }) => (
            <div key={label} className="interest-card-v2" style={{ '--card-accent': accent } as React.CSSProperties}>
              <div className="interest-card-top">
                <span className="interest-icon-v2">{icon}</span>
                <div>
                  <div className="interest-label-v2">{label}</div>
                  <div className="interest-sub">{sub}</div>
                </div>
              </div>
              <div className="interest-divider" />
              <p className="interest-detail-v2">{detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Currently studying */}
      <div className="section">
        <p className="section-label">currently studying</p>
        <div className="study-list">
          {[
            { topic: 'Measure Theory', text: 'Folland · Evans-Gariepy', status: 'active' },
            { topic: 'Functional Analysis', text: 'Brezis', status: 'active' },
            { topic: 'ODE Theory', text: 'Peano · Picard-Lindelöf · Lax-Milgram', status: 'active' },
            { topic: 'Differential Geometry', text: 'Resuming in summer', status: 'upcoming' },
            { topic: 'GMT', text: 'Evans-Gariepy · Leon Simon', status: 'upcoming' },
          ].map(({ topic, text, status }, i) => (
            <div key={topic} className={`study-row ${i === 0 ? 'first' : ''}`}>
              <span className="study-topic">{topic}</span>
              <span className="study-text">{text}</span>
              <span className={`study-badge ${status}`}>{status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent posts */}
      <div className="section">
        <div className="section-header">
          <p className="section-label" style={{ marginBottom: 0 }}>recent posts</p>
          <Link href="/blog" className="section-more">all posts →</Link>
        </div>
        <div className="post-list">
          {posts.map((post, i) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="post-row">
              <div>
                <h2 className="post-row-title">{post.title}</h2>
                <p className="post-row-desc">{post.description}</p>
              </div>
              <span className="post-row-date">{post.date}</span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
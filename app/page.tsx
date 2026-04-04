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
          <p className="hero-label">undergraduate mathematics · hcmus</p>

          <h1 className="hero-title">Aleksis Arendt</h1>

          <p className="hero-desc">
            Working through measure theory, functional analysis,
            and geometric analysis.
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
              { label: 'Facebook', href: 'https://facebook.com/baoozuma', icon: <FaFacebook /> },
              { label: 'Instagram', href: 'https://instagram.com/baoozuma', icon: <FaInstagram /> },
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

      {/* Interests */}
      <div className="section">
        <p className="section-label">interests</p>
        <div className="interests-grid">
          {[
            { icon: '∫', label: 'Mathematics', detail: 'Geometric analysis, GMT, minimal surfaces, gauge theory' },
            { icon: '♪', label: 'Music', detail: 'Ling Tosite Sigure, 7UPPERCUTS, Hitohira, ACDC' },
            { icon: '§', label: 'Philosophy', detail: 'Nietzsche, Marx, Kant, Arendt — existentialism & political theory' },
            { icon: '⟁', label: 'Games', detail: 'Nier: Automata, Metal Gear Solid V, Red Dead Redemption 2' },
          ].map(({ icon, label, detail }) => (
            <div key={label} className="interest-card">
              <div className="interest-icon">{icon}</div>
              <div className="interest-label">{label}</div>
              <div className="interest-detail">{detail}</div>
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
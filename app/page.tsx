import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '../lib/posts'
import { FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import TagTooltip from './components/TagTooltip'
import CopyEmail from './components/CopyEmail'
export default function HomePage() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <div className="home">
      {/* Status pill */}
      <div className="status-pill-wrap">
        <span className="status-pill">
          <span className="status-dot" />
          Available for research collaboration
        </span>
      </div>
      {/* Hero */}
      <div className="hero">
  <div className="hero-text">
    <p className="hero-label">Pure Mathematics · HCMUS</p>
    <h1 className="hero-title">Aleksis Arendt</h1>

    <p className="hero-desc">
      I treat mathematics as work, discipline, and a way of thinking.
    </p>

    <div className="tags">
      {['Metric Geometry', 'Geometric Measure Theory', 'Differential Geometry', 'Mathematical Physics'].map(tag => (
        <TagTooltip key={tag} tag={tag} />
      ))}
    </div>

    <div className="cta-row">
      <Link href="/blog" className="btn-primary">Selected writings</Link>
      <Link href="/about" className="btn-secondary">Profile</Link>
    </div>

    <div className="social-line">
      <a href="https://github.com/baoozuma" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
      <a href="https://www.facebook.com/aleksis.arendt" target="_blank" rel="noopener noreferrer" className="social-link">Facebook</a>
      <a href="https://www.instagram.com/aleksis.arendt/" target="_blank" rel="noopener noreferrer"className="social-link">Instagram</a>
      <CopyEmail />
    </div>
  </div>

  <div className="hero-avatar">
    <div className="avatar-img">
      <Image src="/avatar.jpg" alt="Aleksis" fill  style={{ objectFit: 'cover' }} />
    </div>
  </div>

</div>
  <div className="intro-wide">
    <p className="section-label">Introduction</p>
  <p>
    I am an undergraduate student in pure mathematics at HCMUS. 
    My current direction focuses on analysis and geometry, with long-term plans 
    for graduate study in Europe, particularly in programs such as Bonn, LMU Munich, ETH Zürich, or EPFL.
  </p>
  
  <p>
    Before university, I studied in a mathematics specialized program and 
    participated in national-level competitions and training programs, 
    including intensive camps organized by VIASM in Da Lat and Hanoi.
  </p>
</div>  
        <div className="section">
          <p className="section-label">interests</p>

          <div className="interest-list">
            {[
              {
                label: 'Coding',
                sub: 'Technical practice',
                detail: 'ReactJS, TypeScript, C++, LaTeX, MATLAB, Maple, website systems, PDF workflows.',
              },
              {
                label: 'Music',
                sub: 'Listening & aesthetic interest',
                detail: 'Math rock, post-hardcore, Midwest emo, shoegaze, J-Rock, 2000s alternative scenes.',
              },
              {
                label: 'Philosophy',
                sub: 'Primary thinkers',
                detail: 'Nietzsche, Marx, Kant, Arendt, Kierkegaard, existential and political thought.',
              },
              {
                label: 'Games',
                sub: 'Narrative media',
                detail: 'Nier, Metal Gear Solid V, Red Dead Redemption 2, story-driven and atmospheric works.',
              },
            ].map(({ label, sub, detail }) => (
              <div key={label} className="interest-row">
                <div className="interest-meta">
                  <h3 className="interest-title">{label}</h3>
                  <p className="interest-sub">{sub}</p>
                </div>
                <p className="interest-detail">{detail}</p>
              </div>
            ))}
          </div>
        </div>

      {/* Currently studying */}
      <div className="section">
  <p className="section-label">currently studying</p>

  <div className="study-list-academic">
    {[
      {
        topic: 'Measure Theory',
        text: 'Folland; Evans–Gariepy',
        note: 'current focus',
      },
      {
        topic: 'Functional Analysis',
        text: 'Brezis',
        note: 'current focus',
      },
      {
        topic: 'ODE Theory',
        text: 'Peano, Picard–Lindelöf, Lax–Milgram',
        note: 'current focus',
      },
      {
        topic: 'Differential Geometry',
        text: 'planned for summer',
        note: 'upcoming',
      },
      {
        topic: 'Geometric Measure Theory',
        text: 'Evans–Gariepy; Leon Simon',
        note: 'upcoming',
      },
    ].map(({ topic, text, note }, i) => (
      <div key={topic} className={`study-row-academic ${i === 0 ? 'first' : ''}`}>
        <div className="study-left">
          <h3 className="study-topic-academic">{topic}</h3>
          <p className="study-note-academic">{note}</p>
        </div>
        <p className="study-text-academic">{text}</p>
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
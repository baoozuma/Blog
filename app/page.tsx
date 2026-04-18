import Link from 'next/link'
import Image from 'next/image'
import { getRecentPosts } from '../lib/posts'
import TagTooltip from './components/TagTooltip'
import CopyEmail from './components/CopyEmail'

// ── Static data ──
const TAGS = [
  'Metric Geometry',
  'Geometric Measure Theory',
  'Differential Geometry',
  'Mathematical Physics',
] as const

const SOCIAL = [
  { href: 'https://github.com/baoozuma', label: 'GitHub' },
  { href: 'https://www.facebook.com/aleksis.arendt', label: 'Facebook' },
  { href: 'https://www.instagram.com/aleksis.arendt/', label: 'Instagram' },
] as const

const INTERESTS = [
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
] as const

const STUDY = [
  { topic: 'Measure Theory',         text: 'Folland; Evans–Gariepy',                    note: 'current focus' },
  { topic: 'Functional Analysis',    text: 'Brezis',                                    note: 'current focus' },
  { topic: 'ODE Theory',             text: 'Peano, Picard–Lindelöf, Lax–Milgram',       note: 'current focus' },
  { topic: 'Differential Geometry',  text: 'planned for summer',                         note: 'upcoming'      },
  { topic: 'Geometric Measure Theory', text: 'Evans–Gariepy; Leon Simon',               note: 'upcoming'      },
] as const

// ── Component ──
export default function HomePage() {
  const posts = getRecentPosts(3)

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
          <h1 className="hero-title">Alëksis Arendt</h1>
          <p className="hero-desc">I don't mytholize math, it's just a job.</p>

          <div className="tags">
            {TAGS.map(tag => <TagTooltip key={tag} tag={tag} />)}
          </div>

          <div className="cta-row">
            <Link href="/blog" className="btn-primary">Selected writings</Link>
            <Link href="/about" className="btn-secondary">Profile</Link>
          </div>

          <div className="social-line">
            {SOCIAL.map(({ href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-link">
                {label}
              </a>
            ))}
            <CopyEmail />
          </div>
        </div>

        <div className="hero-avatar">
          <div className="avatar-img">
            <Image src="/avatar.jpg" alt="Aleksis" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </div>

      {/* Introduction */}
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

      {/* Interests */}
      <div className="section">
        <p className="section-label">interests</p>
        <div className="interest-list">
          {INTERESTS.map(({ label, sub, detail }) => (
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
          {STUDY.map(({ topic, text, note }) => (
            <div key={topic} className="study-row-academic">
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
          {posts.map(post => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="post-row">
              <div>
                <p className="post-row-title">{post.title}</p>
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
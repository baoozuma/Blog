import Link from 'next/link'
import Image from 'next/image'
import { getRecentPosts } from '../lib/posts'
import CopyEmail from './components/CopyEmail'

const SOCIAL = [
  { href: 'https://github.com/baoozuma', label: 'GitHub' },
  { href: 'https://www.facebook.com/aleksis.arendt', label: 'Facebook' },
  { href: 'https://www.instagram.com/aleksis.arendt/', label: 'Instagram' },
] as const

export default function HomePage() {
  const posts = getRecentPosts(3)

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-text">
          <p className="hero-label">Pure Mathematics · Analysis · Geometry</p>
          <h1 className="hero-title">
            Alëksis Arendt
            <span className="name-alt">（ファム・バオ）</span>
          </h1>
          <p className="hero-desc">
            I don't mythologize math, it's just a job.
          </p>

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
            <Image src="/avatar.png" alt="Aleksis" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </div>

      <div className="section">
        <p className="section-label">profile · 紹介</p>
        <div className="text-block">
          <p>
            I write under the name Alëksis Arendt. This site is where I keep mathematical notes,
            selected writings, and small academic projects that I want to organize more carefully.
            Vietnamese is my native language, while English is the language I use most for textbooks,
            proofs, and longer mathematical writing.
          </p>

          <p>
            I am also learning German with graduate study in Europe in mind, and Japanese remains
            a separate cultural interest. Most of my serious writing is LaTeX-first. Code, web tools,
            and small systems are mostly there to support notes, organization, and presentation.
          </p>
        </div>
      </div>

      <div className="section">
        <p className="section-label">interests · 関心</p>
        <div className="text-block">
          <p>
            My mathematical interests are mostly around analysis and geometry: harmonic analysis,
            geometric measure theory, PDE, discrete geometry, and the combinatorial methods that
            appear inside analytic problems. I like questions where estimates, dimension, incidence,
            and scale decomposition all start to interact.
          </p>

          <p>
            Outside mathematics, I read philosophy and listen to a lot of guitar-driven music.
            Nietzsche, Marx, Kant, Arendt, and Kierkegaard are some recurring names in my reading.
            Musically, I tend to stay around J-Rock, math rock, post-hardcore, shoegaze, Midwest emo,
            and darker alternative sounds.
          </p>
        </div>
      </div>

      <div className="section">
        <p className="section-label">currently studying · 学習中</p>
        <div className="text-block">
          <p>
            Right now I am working through measure theory, Fourier analysis, functional analysis,
            PDE, geometric measure theory, and some supporting combinatorics. The main analytic
            references around my desk are Evans–Gariepy, Cohn, Bogachev, Stein–Shakarchi, and Brezis.
          </p>

          <p>
            Alongside that, I am slowly building a discrete-geometric toolkit: incidence methods,
            polynomial methods, extremal arguments, and finite-scale reasoning. The point is to
            understand how continuous problems in analysis and GMT often turn into structured
            counting, covering, and decomposition problems.
          </p>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <p className="section-label" style={{ marginBottom: 0 }}>recent posts · 最近の記録</p>
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
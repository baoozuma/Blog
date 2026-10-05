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
          {/* <p className="hero-label">Pure Mathematics · Analysis · Geometry</p> */}
          <h1 className="hero-title">
            Alëksis Arendt
            <span className="name-alt">（Vyškovská）</span>
          </h1>
          {/* <p className="hero-desc">
            I don't mythologize math, it's just a job.
          </p> */}

          {/* <div className="cta-row">
            <Link href="/blog" className="btn-primary">Selected writings</Link>
            <Link href="/about" className="btn-secondary">Profile</Link>
          </div> */}

          {/* <div className="social-line">
            {SOCIAL.map(({ href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-link">
                {label}
              </a>
            ))}
            <CopyEmail />
          </div>
        */}
    </div> 
        {/* <div className="hero-avatar">
          <div className="avatar-img">
            <Image src="/avatar.png" alt="Aleksis" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
      */}
    </div> 
      <div className="section">
        <p className="section-label">zavedení</p>
        <div className="text-block">

    <p>
      Hi! My full name is Pham Ngoc Gia Bao, though I usually go by Alëksis. I like the way mathematics is actually solved, rather than just studied. This perspective is what draws me toward Graph Theory, Extremal Combinatorics, and Geometric Measure Theory.
    </p>
    <p>
      I have a background in mathematical olympiads, and I still enjoy the strange elegance of olympiad combinatorics. One project I am slowly building is a collection of combinatorial problems viewed through Linear Algebra, Probability, and Graph Theory.
    </p>
    <p> 
      Additionally, my favorite mathematicians are June Huh and of course, Paul Erdős. I enjoy listening to shoegaze and experimental rock, with bands representative of these genres such as Whirr and Ling Tosite Sigure. I am learning Czech and really want to go to Prague and stay there for a long time.
    </p>
      <p>
        Currently, I am an undergraduate at{" "}
        <a
          href="https://en.hcmus.edu.vn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          HCMUS
        </a>
        . My email is{" "}
        <a href="mailto:phambao0205@gmail.com">
          phambao0205@gmail.com
        </a>
        .
      </p>
        </div>
      </div>

      {/* <div className="section">
        <p className="section-label">interests · 関心</p>
        <div className="text-block">
          <p>
            Outside of mathematics, I would like to attend a rock show and participate in a mosh pit. I usually listen to Post Hardcore, Midwest Emo, and Math Rock, where 7UPPERCUTS, Đá Số Tới, Ling Tosite Sigure, Hitohira (ひとひら), and ACDC are my favorites. Say some Pop and R&B, I'm the only fan with Vu Thanh Van.
          </p>
        </div>
      </div> */}


      <div className="section">
        <div className="section-header">
          <p className="section-label" style={{ marginBottom: 0 }}>nedávné příspěvky</p>
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

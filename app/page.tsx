import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '../lib/posts'
import { FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'  
export default function HomePage() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <div>
      {/* Hero section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '3rem',
        alignItems: 'start',
        marginBottom: '5rem',
        paddingBottom: '4rem',
        borderBottom: '1px solid #2a2a2d',
      }}>
        <div>
          <p style={{
            color: '#c9a96e',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.8rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}>
            undergraduate mathematics · hcmus
          </p>

          <h1 style={{
            fontSize: '3.25rem',
            fontWeight: 600,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            marginBottom: '1.5rem',
          }}>
            Aleksis Arendt
          </h1>

          <p style={{
            color: '#9b9895',
            fontSize: '1.1rem',
            lineHeight: 1.75,
            fontStyle: 'italic',
            maxWidth: 420,
            marginBottom: '2rem',
          }}>
            Working through measure theory, functional analysis,
            and geometric analysis. 
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {['Measure Theory', 'Functional Analysis', 'GMT', 'Differential Geometry', 'ODE Theory'].map(tag => (
              <span key={tag} style={{
                padding: '0.3rem 0.75rem',
                border: '1px solid #2a2a2d',
                borderRadius: '999px',
                fontSize: '0.78rem',
                color: '#9b9895',
                fontFamily: "'JetBrains Mono', monospace",
                background: '#141415',
              }}>{tag}</span>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link href="/blog" className="cta primary" style={{
              padding: '0.5rem 1.25rem',
              background: '#c9a96e',
              color: '#0e0e0f',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 500,
              
            }}>
              read blog →
            </Link>

            <Link href="/about"className="cta secondary" style={{
              padding: '0.5rem 1.25rem',
              border: '1px solid #2a2a2d',
              color: '#9b9895',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontFamily: "'JetBrains Mono', monospace",
              
            }}>
              about me
            </Link>
          </div>
          {/* Social links */}
<div style={{
  display: 'flex',
  gap: '0.75rem',
  flexWrap: 'wrap',
   marginTop: '1.5rem'
}}>
  {[
     { label: 'GitHub', href: 'https://github.com/baoozuma', icon: <FaGithub /> },
  { label: 'Facebook', href: 'https://facebook.com/baoozuma', icon: <FaFacebook /> },
  { label: 'Instagram', href: 'https://instagram.com/baoozuma', icon: <FaInstagram /> },
  { label: 'Email', href: 'mailto:aleksisdg@gmail.com', icon: <HiOutlineMail /> },
  ].map(({ label, href, icon }) => (
    <a
      key={label}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="social-link"
    >
      <span>{icon}</span>
      <span>{label}</span>
    </a>
  ))}
</div>
        </div>

        {/* Avatar */}
        <div style={{ position: 'relative' }}>
          <div style={{
            width: 160,
            height: 160,
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid #2a2a2d',
            position: 'relative',
          }}>
            <Image src="/avatar.jpg" alt="Aleksis" fill style={{ objectFit: 'cover' }} />
          </div>
          {/* Decorative corner */}
          <div style={{
            position: 'absolute',
            top: -6,
            right: -6,
            width: 160,
            height: 160,
            borderRadius: '12px',
            border: '1px solid rgba(201,169,110,0.3)',
            pointerEvents: 'none',
          }} />
        </div>
        
      </div>
          
      {/* Interests */}
      <div style={{ marginBottom: '5rem' }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.78rem',
          color: '#c9a96e',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}>
          interests
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          {[
            { icon: '∫', label: 'Mathematics', detail: 'Geometric analysis, GMT, minimal surfaces, gauge theory' },
            { icon: '♪', label: 'Music', detail: ' Ling Tosite Sigure, 7UPPERCUTS , Hitohira (ひとひら), ACDC' },
            { icon: '§', label: 'Philosophy', detail: 'Nietzsche, Marx, Kant, Arendt — existentialism & political theory' },
            { icon: '⟁', label: 'Games', detail: 'Nier: Automata · Metal Gear Solid V · Red Dead Redemption 2' },
          ].map(({ icon, label, detail }) => (
            <div key={label} style={{
              padding: '1.25rem',
              border: '1px solid #2a2a2d',
              borderRadius: '8px',
              background: '#141415',
            }}>
              <div style={{
                fontSize: '1.75rem',
                color: '#c9a96e',
                marginBottom: '0.75rem',
                fontFamily: 'EB Garamond, serif',
              }}>{icon}</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 500, marginBottom: '0.4rem', color: '#e8e6e1' }}>{label}</div>
              <div style={{ fontSize: '0.82rem', color: '#6b6966', lineHeight: 1.5, fontStyle: 'italic' }}>{detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Currently studying */}
      <div style={{ marginBottom: '5rem' }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.78rem',
          color: '#c9a96e',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}>
          currently studying
        </p>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[
            { topic: 'Measure Theory', text: 'Folland · Evans-Gariepy', status: 'active' },
            { topic: 'Functional Analysis', text: 'Brezis', status: 'active' },
            { topic: 'ODE Theory', text: 'Peano · Picard-Lindelöf · Lax-Milgram', status: 'active' },
            { topic: 'Differential Geometry', text: 'Resuming in summer', status: 'upcoming' },
            { topic: 'GMT', text: 'Evans-Gariepy · Leon Simon', status: 'upcoming' },
          ].map(({ topic, text, status }, i) => (
            <div key={topic} style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr auto',
              gap: '1rem',
              alignItems: 'center',
              padding: '0.875rem 0',
              borderBottom: '1px solid #2a2a2d',
              borderTop: i === 0 ? '1px solid #2a2a2d' : 'none',
            }}>
              <span style={{ color: '#e8e6e1', fontSize: '0.95rem' }}>{topic}</span>
              <span style={{ color: '#6b6966', fontSize: '0.875rem', fontStyle: 'italic' }}>{text}</span>
              <span style={{
                fontSize: '0.7rem',
                fontFamily: "'JetBrains Mono', monospace",
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                background: status === 'active' ? 'rgba(201,169,110,0.1)' : 'rgba(255,255,255,0.04)',
                color: status === 'active' ? '#c9a96e' : '#6b6966',
                border: `1px solid ${status === 'active' ? 'rgba(201,169,110,0.3)' : '#2a2a2d'}`,
              }}>
                {status === 'active' ? 'active' : 'upcoming'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent posts */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.78rem',
            color: '#c9a96e',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            recent posts
          </p>
          <Link href="/blog" style={{
            color: '#6b6966',
            fontSize: '0.8rem',
            textDecoration: 'none',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            all posts →
          </Link>
        </div>

        <div>
          {posts.map((post, i) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                padding: '1.25rem 0',
                borderTop: i === 0 ? '1px solid #2a2a2d' : 'none',
                borderBottom: '1px solid #2a2a2d',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '1.5rem',
                alignItems: 'start',
              }}>
                <div>
                  <h2 style={{ fontSize: '1.05rem', fontWeight: 500, marginBottom: '0.3rem', color: '#e8e6e1' }}>
                    {post.title}
                  </h2>
                  <p style={{ color: '#6b6966', fontSize: '0.875rem', fontStyle: 'italic' }}>
                    {post.description}
                  </p>
                </div>
                <span style={{ color: '#6b6966', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap' }}>
                  {post.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
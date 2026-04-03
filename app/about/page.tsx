export default function AboutPage() {
  return (
    <div>
      <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #2a2a2d' }}>
        <p style={{ color: '#c9a96e', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', marginBottom: '1rem' }}>
          about
        </p>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
          Aleksis Arendt
        </h1>
        <p style={{ color: '#9b9895', fontStyle: 'italic', fontSize: '1.05rem' }}>
          Undergraduate mathematics, Ho Chi Minh City University of Science.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

        <section>
          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#c9a96e', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Research Interests
          </h2>
          <p style={{ color: '#9b9895', lineHeight: 1.8 }}>
            Geometric analysis, geometric measure theory, and calculus of variations.
            Currently working toward a solid foundation in real analysis and functional analysis
            before moving into PDE theory and GMT proper.
          </p>
          <p style={{ color: '#9b9895', lineHeight: 1.8, marginTop: '1rem' }}>
            Long-term interest in minimal surfaces, harmonic maps, mean curvature flow,
            and gauge theory — particularly Uhlenbeck-style Yang-Mills theory and
            principal fiber bundles with connections.
          </p>
        </section>

        <div style={{ borderTop: '1px solid #2a2a2d' }} />

        <section>
          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#c9a96e', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Current Focus
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              ['Measure Theory', 'Folland, Evans-Gariepy'],
              ['Functional Analysis', 'Brezis'],
              ['ODE Theory', 'Peano existence, Picard-Lindelöf, Lax-Milgram'],
              ['Differential Geometry', 'Starting again in summer'],
            ].map(([topic, detail]) => (
              <div key={topic} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '1rem', alignItems: 'baseline' }}>
                <span style={{ color: '#e8e6e1', fontSize: '1rem' }}>{topic}</span>
                <span style={{ color: '#6b6966', fontSize: '0.9rem', fontStyle: 'italic' }}>{detail}</span>
              </div>
            ))}
          </div>
        </section>

        <div style={{ borderTop: '1px solid #2a2a2d' }} />

        <section>
          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#c9a96e', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Academic Path
          </h2>
          <p style={{ color: '#9b9895', lineHeight: 1.8 }}>
            Targeting a master's program in Germany or Switzerland — Bonn, LMU Munich,
            or ETH Zürich — followed by a PhD in geometric analysis or GMT.
            The recommended path is a German master's first, then PhD application
            to ETH or EPFL with a strong thesis and supervisor letter.
          </p>
        </section>

        <div style={{ borderTop: '1px solid #2a2a2d' }} />

        <section>
          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#c9a96e', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            About This Blog
          </h2>
          <p style={{ color: '#9b9895', lineHeight: 1.8 }}>
            These are working notes — written to consolidate understanding, not to present
            polished results. Each post starts from a single problem or theorem,
            explores it until exhausted, then connects it to the broader picture.
          </p>
          <p style={{ color: '#9b9895', lineHeight: 1.8, marginTop: '1rem' }}>
            The writing process follows a simple rule borrowed from Halmos:
            don't just read — fight it. Every hypothesis questioned,
            every counterexample sought, every proof reproduced from scratch.
          </p>
        </section>

      </div>
    </div>
  )
}
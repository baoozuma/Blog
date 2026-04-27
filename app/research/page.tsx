'use client'

import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import styles from './research.module.css'

type Subarea = {
  name: string
  banner: string
  img: string
  desc: string
  refs: string[]
}
const researchData = [
  {
    tag: 'Geometric Measure Theory',
    banner: '/tags/measure.jpg',
    img: '/tags/measure-icon.jpg',
    short: 'Hausdorff measure, covering arguments, rectifiability, dimension, and geometric structure at small scales.',
    long: `This is one of the main directions I am building toward. I am interested in GMT not only as a theory of generalized surfaces, but as a way of turning geometric irregularity into precise measure-theoretic statements.

At the moment, my focus is on Hausdorff measure, dimension, rectifiability, covering theorems, density, and the basic language of Radon measures. I am especially interested in how these tools appear in problems about projections, Kakeya-type phenomena, Furstenberg sets, and fractal geometry.

What attracts me most is the mixture of analysis and geometry: one often has to understand a set through coverings, scales, density estimates, tangent objects, and dimension bounds rather than through smooth parametrizations alone.`,
    refs: [
      'Evans & Gariepy — Measure Theory and Fine Properties of Functions',
      'Mattila — Geometry of Sets and Measures in Euclidean Spaces',
      'Leon Simon — Lectures on Geometric Measure Theory',
      'Federer — Geometric Measure Theory',
    ],
    status: 'active',
    subareas: [
      {
        name: 'Fractal Geometry',
        banner: '/subareas/fractal.jpg',
        img: '/subareas/fractal-icon.jpg',
        desc: `Fractal geometry is the part of GMT that currently feels closest to my interests in dimension, projection, and Kakeya-type problems.

I am mainly interested in Hausdorff dimension, Frostman measures, projection theorems, Cantor-type constructions, Furstenberg sets, and examples where the geometry of a set is visible only after looking at many scales. The point is not just to compute dimensions, but to understand which geometric configurations force a set to be large.

This direction also connects naturally with harmonic analysis and additive or incidence combinatorics, especially when continuous geometric questions are discretized into estimates involving tubes, balls, directions, and coverings.`,
        refs: [
          'Falconer — Fractal Geometry',
          'Mattila — Geometry of Sets and Measures in Euclidean Spaces',
          'Wolff — Lectures on Harmonic Analysis',
        ],
      },
      {
        name: 'Minimal Surfaces',
        banner: '/subareas/minimal.jpg',
        img: '/subareas/minimal-icon.jpg',
        desc: `Minimal surfaces are not my immediate focus, but they are an important long-term reason for learning GMT.

I am interested in them mainly through the variational side: area minimization, weak notions of surface, compactness, regularity, and the way singularities force one to move beyond classical differential geometry. This is where currents and varifolds become natural rather than decorative.

For now, I treat this as a later direction, after building more measure theory, Sobolev space theory, and calculus of variations.`,
        refs: [
          'Leon Simon — Lectures on Geometric Measure Theory',
          'Colding & Minicozzi — A Course in Minimal Surfaces',
          'Giusti — Minimal Surfaces and Functions of Bounded Variation',
        ],
      },
    ] as Subarea[],
  },
  {
    tag: 'Harmonic Analysis',
    banner: '/tags/analysis.jpg',
    img: '/tags/analysis-icon.jpg',
    short: 'Fourier methods, oscillation, singular integrals, Kakeya-type estimates, and analytic structure across scales.',
    long: `Harmonic analysis is the analytic side of the direction I want to develop. I am currently approaching it through Fourier analysis, Hilbert space methods, oscillatory estimates, and the connection between frequency, geometry, and scale.

The parts that interest me most are not isolated computations of Fourier series, but the way Fourier-analytic ideas enter geometric questions: restriction, Kakeya, maximal estimates, projection phenomena, and the analysis of singular behavior.

This is also where combinatorics becomes relevant. Many modern arguments in harmonic analysis use decompositions into tubes, caps, scales, directions, or wave packets, and the resulting estimates often have a strong discrete-geometric component.`,
    refs: [
      'Stein & Shakarchi — Fourier Analysis',
      'Stein — Harmonic Analysis',
      'Wolff — Lectures on Harmonic Analysis',
      'Guth — Polynomial Methods in Combinatorics',
    ],
    status: 'active',
    subareas: [
      {
        name: 'Kakeya-type Problems',
        banner: '/subareas/fractal.jpg',
        img: '/subareas/fractal-icon.jpg',
        desc: `Kakeya-type problems are one of the main reasons I am interested in the meeting point of harmonic analysis, GMT, and combinatorics.

The basic theme is simple to state: how large must a set be if it contains line segments, tubes, or directions in a sufficiently rich family? But the methods quickly become deep, involving dimension estimates, tube configurations, incidence geometry, polynomial methods, and Fourier-analytic estimates.

For my current stage, I am treating Kakeya as a guiding problem rather than a narrow specialization: it tells me which pieces of analysis, GMT, and discrete geometry are worth learning seriously.`,
        refs: [
          'Wolff — Lectures on Harmonic Analysis',
          'Guth — Polynomial Methods in Combinatorics',
          'Mattila — Geometry of Sets and Measures in Euclidean Spaces',
        ],
      },
    ] as Subarea[],
  },
  {
    tag: 'Functional Analysis',
    banner: '/tags/functional.jpg',
    img: '/tags/functional-icon.jpg',
    short: 'Hilbert spaces, Banach spaces, duality, weak convergence, operators, and Sobolev-space foundations.',
    long: `I study functional analysis mainly as the structural language behind PDE, Fourier analysis, and modern analysis.

The immediate focus is on Hilbert spaces, projections, Riesz representation, bounded linear operators, Banach spaces, duality, weak convergence, and compactness principles. I am interested in how abstract results become usable tools in analysis rather than staying as isolated formalism.

This subject is also a bridge into Sobolev spaces and PDE. Concepts like weak convergence, reflexivity, compact embeddings, and dual spaces are necessary for understanding variational methods and weak solutions.`,
    refs: [
      'Brezis — Functional Analysis, Sobolev Spaces and Partial Differential Equations',
      'Conway — A Course in Functional Analysis',
      'Kreyszig — Introductory Functional Analysis with Applications',
    ],
    status: 'active',
    subareas: [] as Subarea[],
  },
  {
    tag: 'PDE and Variational Methods',
    banner: '/tags/physics.jpg',
    img: '/tags/physics-icon.jpg',
    short: 'Weak solutions, elliptic equations, Sobolev spaces, energy methods, and the calculus of variations.',
    long: `My interest in PDE is mostly through analysis and geometry rather than physical modeling alone.

I am currently most interested in elliptic PDE, weak solutions, Sobolev spaces, variational methods, and the direct method in the calculus of variations. These tools appear naturally in GMT, minimal surfaces, harmonic maps, and geometric variational problems.

The direction I want to build is not computation-heavy PDE at first, but the analytic framework: existence, compactness, regularity, energy estimates, and how PDE arguments interact with geometry.`,
    refs: [
      'Evans — Partial Differential Equations',
      'Brezis — Functional Analysis, Sobolev Spaces and Partial Differential Equations',
      'Dacorogna — Direct Methods in the Calculus of Variations',
    ],
    status: 'active',
    subareas: [
      {
        name: 'Elliptic PDEs',
        banner: '/subareas/elliptic.jpg',
        img: '/subareas/elliptic-icon.jpg',
        desc: `Elliptic PDEs are important to me because they provide a clean entry point into weak solutions, regularity, Sobolev spaces, and energy methods.

I am interested in the basic model problems first: Laplace and Poisson equations, weak formulations, Lax-Milgram, maximum principles, and elliptic regularity. These ideas later reappear in geometric analysis and variational problems.

The goal is to understand elliptic PDE as a structural tool in analysis, not merely as a list of equations to solve.`,
        refs: [
          'Evans — Partial Differential Equations',
          'Gilbarg & Trudinger — Elliptic Partial Differential Equations of Second Order',
        ],
      },
      {
        name: 'Calculus of Variations',
        banner: '/subareas/variation.jpg',
        img: '/subareas/variation-icon.jpg',
        desc: `The calculus of variations is one of the bridges between analysis, PDE, and geometry.

I am interested in energy functionals, minimizers, weak compactness, lower semicontinuity, Euler-Lagrange equations, and the direct method. These ideas are essential for understanding minimal surfaces, harmonic maps, and many geometric variational problems.

For now, I treat it as a foundation to build slowly alongside Sobolev spaces and elliptic PDE.`,
        refs: [
          'Dacorogna — Direct Methods in the Calculus of Variations',
          'Evans — Weak Convergence Methods for Nonlinear PDEs',
        ],
      },
    ] as Subarea[],
  },
  {
    tag: 'Discrete Geometry',
    banner: '/tags/metric.jpg',
    img: '/tags/metric-icon.jpg',
    short: 'Incidence geometry, finite configurations, polynomial methods, extremal arguments, and combinatorial structure.',
    long: `I study discrete geometry as a supporting language for GMT and harmonic analysis.

Many continuous problems become clearer after discretization: sets become collections of balls, directions become separated families, and geometric conditions become incidence or covering estimates. This is especially visible in Kakeya-type problems, Furstenberg sets, projection questions, and polynomial-method arguments.

The point is not to leave analysis for combinatorics, but to learn the finite-scale tools that modern analysis often requires: pigeonholing, incidence counting, extremal estimates, polynomial methods, and geometric decompositions.`,
    refs: [
      'Matoušek — Lectures on Discrete Geometry',
      'Guth — Polynomial Methods in Combinatorics',
      'Matoušek — Thirty-three Miniatures',
      'Pach & Sharir — Combinatorial Geometry and Its Algorithmic Applications',
    ],
    status: 'active',
    subareas: [] as Subarea[],
  },
]

function ResearchContent() {
  const searchParams = useSearchParams()
  const [active, setActive] = useState(researchData[0].tag)
  const [displayed, setDisplayed] = useState(researchData[0].tag)
  const [activeSub, setActiveSub] = useState<string | null>(null)
  const [displayedSub, setDisplayedSub] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const topic = searchParams.get('topic')
    if (topic && researchData.find((r) => r.tag === topic)) {
      setActive(topic)
      setActiveSub(null)
    }
  }, [searchParams])

  useEffect(() => {
    if (active === displayed && activeSub === displayedSub) return

    setIsTransitioning(true)
    const timeout = setTimeout(() => {
      setDisplayed(active)
      setDisplayedSub(activeSub)
      setIsTransitioning(false)
    }, 220)

    return () => clearTimeout(timeout)
  }, [active, activeSub])
  useEffect(() => {
      researchData.forEach(r => {
        const img1 = new window.Image()
        img1.src = r.banner
        const img2 = new window.Image()
        img2.src = r.img

        r.subareas.forEach(s => {
          const img3 = new window.Image()
          img3.src = s.banner
          const img4 = new window.Image()
          img4.src = s.img
        })
      })
    }, [])
  const current = researchData.find((r) => r.tag === displayed)!
  const currentSub: Subarea | null = displayedSub
    ? current.subareas.find(s => s.name === displayedSub) ?? null
    : null

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <p className={styles.sectionLabel}>research areas</p>

        <div className={styles.tagList}>
          {researchData.map((r) => {
            const isActive = active === r.tag
            return (
              <div key={r.tag}>
                <button
                  onClick={() => {
                    if (r.tag !== active) {
                      setActive(r.tag)
                      setActiveSub(null)
                    } else {
                      setActiveSub(null)
                    }
                  }}
                  className={`${styles.tagButton} ${isActive ? styles.tagButtonActive : ''}`}
                >
                  <span className={`${styles.dot} ${r.status === 'active' ? styles.dotActive : ''}`} />
                  {r.tag}
                </button>

                {isActive && r.subareas.length > 0 && (
                  <div className={styles.subareaList}>
                    {r.subareas.map(s => (
                      <button
                        key={s.name}
                        onClick={() => setActiveSub(activeSub === s.name ? null : s.name)}
                        className={`${styles.subareaButton} ${activeSub === s.name ? styles.subareaButtonActive : ''}`}
                      >
                        <span className={styles.subareaArrow}>
                          {activeSub === s.name ? '▾' : '▸'}
                        </span>
                        {s.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className={styles.legendBox}>
          <p className={styles.legendTitle}>STATUS</p>
          <div className={styles.legendRow}>
            <span className={`${styles.dot} ${styles.dotActive}`} />
            <span className={styles.legendText}>active</span>
          </div>
          <div className={styles.legendRow}>
            <span className={styles.dot} />
            <span className={styles.legendText}>upcoming</span>
          </div>
        </div>
      </aside>

      <main className={`${styles.main} ${isTransitioning ? styles.mainLeaving : styles.mainEntering}`}>

        {currentSub ? (
  <>
    {/* Chỉ dùng currentSub.banner — không có current.banner */}
    <div className={styles.banner}>
      <Image
        src={currentSub.banner}
        alt={currentSub.name}
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }}
        unoptimized
      />
      <div className={styles.bannerOverlay} />
    </div>

    <div className={styles.header}>
      <div className={styles.breadcrumb}>
        <button onClick={() => setActiveSub(null)} className={styles.breadcrumbBtn}>
          {current.tag}
        </button>
        <span className={styles.breadcrumbSep}>›</span>
        <span className={styles.breadcrumbCurrent}>{currentSub.name}</span>
      </div>

      {/* Chỉ dùng currentSub.img — không có current.img */}
      <div className={styles.headerTop} style={{ marginTop: '1rem' }}>
        <div className={styles.thumb}>
          <Image
            src={currentSub.img}
            alt={currentSub.name}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            unoptimized
          />
        </div>
        <div className={styles.titleWrap}>
          <h1 className={styles.title}>{currentSub.name}</h1>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.04em',
          }}>
            {current.tag}
          </span>
        </div>
      </div>

      <p className={styles.short} style={{ marginTop: '1rem' }}>
        {currentSub.desc.split('\n\n')[0]}
      </p>
    </div>

    <div className={styles.longText}>
      {currentSub.desc.split('\n\n').slice(1).map((para, i) => (
        <p key={i} className={styles.paragraph}>{para}</p>
      ))}
    </div>

    <div>
      <p className={styles.sectionLabel}>key references</p>
      <div className={styles.refList}>
        {currentSub.refs.map((ref, i) => (
          <div key={i} className={styles.refItem}>
            <span className={styles.refIndex}>[{i + 1}]</span>
            <span className={styles.refText}>{ref}</span>
          </div>
        ))}
      </div>
    </div>

    <div className={styles.related}>
      <button
        onClick={() => setActiveSub(null)}
        className={styles.relatedLink}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        ← back to {current.tag}
      </button>
    </div>
  </>
) : (
  /* area view giữ nguyên */
          <>
            <div className={styles.banner}>
              <Image
                src={current.banner}
                alt={current.tag}
                fill
                sizes="100vw"
                style={{ objectFit: 'cover' }}
                unoptimized
              />
              <div className={styles.bannerOverlay} />
            </div>

            <div className={styles.header}>
              <div className={styles.headerTop}>
                <div className={styles.thumb}>
                  <Image
                    src={current.img}
                    alt={current.tag}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    unoptimized
                  />
                </div>
                <div className={styles.titleWrap}>
                  <h1 className={styles.title}>{current.tag}</h1>
                  <span className={`${styles.status} ${current.status === 'active' ? styles.statusActive : ''}`}>
                    {current.status}
                  </span>
                </div>
              </div>
              <p className={styles.short}>{current.short}</p>
            </div>

            <div className={styles.longText}>
              {current.long.split('\n\n').map((para, i) => (
                <p key={i} className={styles.paragraph}>{para}</p>
              ))}
            </div>

            {current.subareas.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <p className={styles.sectionLabel}>subareas</p>
                <div className={styles.subareaGrid}>
                  {current.subareas.map(s => (
                    <button
                      key={s.name}
                      onClick={() => setActiveSub(s.name)}
                      className={styles.subareaCard}
                    >
                      <span className={styles.subareaCardName}>{s.name}</span>
                      <span className={styles.subareaCardArrow}>→</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className={styles.sectionLabel}>key references</p>
              <div className={styles.refList}>
                {current.refs.map((ref, i) => (
                  <div key={i} className={styles.refItem}>
                    <span className={styles.refIndex}>[{i + 1}]</span>
                    <span className={styles.refText}>{ref}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.related}>
              <p className={styles.sectionLabel}>related posts</p>
              <Link href="/blog" className={styles.relatedLink}>
                browse all posts →
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default function ResearchPage() {
  return (
    <Suspense>
      <ResearchContent />
    </Suspense>
  )
}
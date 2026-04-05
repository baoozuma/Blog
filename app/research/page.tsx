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
    short: 'Covering lemmas, rectifiable sets, currents, varifolds, minimal surfaces, fractal geometry.',
    long: `Geometric Measure Theory sits at the intersection of measure theory, differential geometry, and the calculus of variations. The central objects are rectifiable sets — sets that admit approximate tangent planes almost everywhere — and currents, which generalize oriented surfaces to allow singularities and multiplicities.

The field originated with Besicovitch's work on sets of finite perimeter and was developed into a complete theory by Federer and Fleming in the 1960s. Their compactness theorem for integral currents resolved Plateau's problem in all dimensions: every closed curve in ℝⁿ bounds a surface of minimal area.

Key tools include the Hausdorff measure, the area and coarea formulas, Rademacher's theorem on differentiability of Lipschitz maps, and the regularity theory for minimizers of geometric variational problems.`,
    refs: [
      'Evans & Gariepy — Measure Theory and Fine Properties of Functions',
      'Leon Simon — Lectures on Geometric Measure Theory',
      'Federer — Geometric Measure Theory',
    ],
    status: 'active',
    subareas: [
      {
        name: 'Minimal Surfaces',
        banner: '/subareas/minimal.jpg',
        img: '/subareas/minimal-icon.jpg',
        desc: `Minimal surfaces are surfaces that locally minimize area — their mean curvature vanishes identically. The classical examples are the catenoid, helicoid, and Enneper surface, but the theory extends far beyond explicit examples.

Plateau's problem asks: given a closed curve in space, does it bound a surface of minimal area? The answer is yes, proved by Douglas and Radó in the 1930s using conformal mappings. In higher dimensions, the existence theory requires GMT — smooth minimizers may not exist, and one must work with integral currents or varifolds.

The regularity theory asks: how smooth are minimal surfaces? In dimensions up to 7, area-minimizing hypersurfaces are smooth. In dimension 8, singularities can occur — the Simons cone is area-minimizing in ℝ⁸.`,
        refs: [
          'Colding & Minicozzi — A Course in Minimal Surfaces',
          'Osserman — A Survey of Minimal Surfaces',
        ],
      },
      {
        name: 'Fractal Geometry',
        banner: '/subareas/fractal.jpg',
        img: '/subareas/fractal-icon.jpg',
        desc: `Fractal geometry studies sets whose complexity persists at every scale — sets that are too irregular to be described by classical differential geometry. The central concept is the Hausdorff dimension, which assigns a non-integer dimension to sets like the Cantor set or the Koch snowflake.

In GMT, fractal sets arise naturally as boundaries of minimizers and as limit sets of geometric flows. The dimension theory of rectifiable sets — the distinction between rectifiable sets and purely unrectifiable sets — is one of the central structural results of the field.

Besicovitch's projection theorem: a purely unrectifiable set in ℝ² has zero projection onto almost every line. This connects fractal geometry to harmonic analysis and the Kakeya problem.`,
        refs: [
          'Falconer — Fractal Geometry',
          'Mattila — Geometry of Sets and Measures in Euclidean Spaces',
        ],
      },
    ] as Subarea[],
  },
  {
    tag: 'Functional Analysis',
    banner: '/tags/functional.jpg',
    img: '/tags/functional-icon.jpg',
    short: 'Hilbert and Sobolev spaces, duality, Hahn-Banach, spectral theory.',
    long: `Functional analysis studies infinite-dimensional vector spaces of functions and the linear operators acting on them. The foundational objects are Banach spaces — complete normed vector spaces — and Hilbert spaces, which carry an inner product structure generalizing Euclidean geometry to infinite dimensions.

The three pillars of the subject are the Hahn-Banach theorem, the open mapping theorem, and the uniform boundedness principle. Together they govern the geometry of infinite-dimensional spaces.

Sobolev spaces Wᵏ,ᵖ are the natural setting for PDE theory — they allow weak derivatives and encode both function values and their regularity in a single norm.`,
    refs: [
      'Brezis — Functional Analysis, Sobolev Spaces and Partial Differential Equations',
      'Conway — A Course in Functional Analysis',
      'Rudin — Functional Analysis',
    ],
    status: 'active',
    subareas: [] as Subarea[],
  },
  {
    tag: 'Mathematical Physics',
    banner: '/tags/physics.jpg',
    img: '/tags/physics-icon.jpg',
    short: 'Classical mechanics, electrodynamics, relativity — via geometry and analysis.',
    long: `Mathematical physics studies physical theories through rigorous mathematical frameworks.

Classical mechanics leads naturally to symplectic geometry and the calculus of variations. Electrodynamics becomes cleaner through differential forms. General relativity turns geometry itself into the language of physics.

The deepest connections often pass through gauge theory, variational structures, and geometric analysis.`,
    refs: [
      'Nakahara — Geometry, Topology and Physics',
      'Landau & Lifshitz — Course of Theoretical Physics',
      'Arnold — Mathematical Methods of Classical Mechanics',
    ],
    status: 'upcoming',
    subareas: [
      {
        name: 'Elliptic PDEs',
        banner: '/subareas/elliptic.jpg',
        img: '/subareas/elliptic-icon.jpg',
        desc: `Elliptic PDEs describe equilibrium states — systems where there is no preferred time direction and solutions are as regular as the data allows. The prototype is the Laplace equation Δu = 0, whose solutions (harmonic functions) are real analytic.

The variational approach to elliptic PDE — finding solutions as minimizers of energy functionals — unifies existence theory with regularity. The Lax-Milgram theorem provides existence in Hilbert spaces; Sobolev embedding controls pointwise behavior; the maximum principle controls the range of solutions.

Interior and boundary regularity are the central technical concerns: if f ∈ Lᵖ, how smooth is the solution u of −Δu = f? Calderón-Zygmund theory answers this via singular integral operators.`,
        refs: [
          'Evans — Partial Differential Equations, Ch. 6',
          'Gilbarg & Trudinger — Elliptic Partial Differential Equations of Second Order',
        ],
      },
      {
        name: 'Calculus of Variations',
        banner: '/subareas/variation.jpg',
        img: '/subareas/variation-icon.jpg',
        desc: `The calculus of variations asks: among all functions satisfying given constraints, which minimizes a given energy functional? The Euler-Lagrange equation is the necessary condition for a minimizer — it is the PDE that governs the problem.

Classical examples include geodesics (minimizing length), minimal surfaces (minimizing area), and harmonic maps (minimizing the Dirichlet energy). In each case, the variational structure dictates both the existence theory and the regularity of solutions.

The direct method — showing sequential compactness in an appropriate Sobolev space, then proving lower semicontinuity of the energy — is the standard existence argument. It requires the functional to be coercive and weakly lower semicontinuous.`,
        refs: [
          'Dacorogna — Direct Methods in the Calculus of Variations',
          'Evans — Weak Convergence Methods for Nonlinear PDEs',
        ],
      },
      {
        name: 'Ricci Flow',
        banner: '/subareas/ricci.jpg',
        img: '/subareas/ricci-icon.jpg',
        desc: `The Ricci flow, introduced by Hamilton in 1982, deforms a Riemannian metric in the direction of its Ricci curvature. This is a nonlinear heat equation on the space of metrics — it smooths out irregularities in the curvature, analogously to how the heat equation smooths out irregularities in a function.

Hamilton's program was to use Ricci flow to prove the Poincaré conjecture: every simply connected closed 3-manifold is homeomorphic to S³. The flow may develop singularities which must be understood and surgically removed.

Perelman completed this program in 2002-2003, introducing new monotonicity formulas and the notion of Ricci flow with surgery — one of the great achievements of 21st century mathematics.`,
        refs: [
          'Chow & Knopf — The Ricci Flow: An Introduction',
          'Morgan & Tian — Ricci Flow and the Poincaré Conjecture',
        ],
      },
    ] as Subarea[],
  },
  {
    tag: 'Differential Geometry',
    banner: '/tags/diffgeo.jpg',
    img: '/tags/diffgeo-icon.jpg',
    short: 'Manifolds, curvature, Riemannian metrics, differential forms, and the geometric language behind modern analysis and physics.',
    long: `Differential geometry studies smooth manifolds: spaces that locally resemble Euclidean space, but may carry rich global structure. Its basic objects are tangent vectors, differential forms, Riemannian metrics, and connections.

A Riemannian metric equips each tangent space with an inner product, making it possible to define lengths, angles, geodesics, and curvature. The curvature tensor measures how far a manifold is from being flat.

The subject connects naturally with analysis through the Laplace-Beltrami operator, Hodge theory, harmonic maps, and geometric flows. It also provides the natural language of general relativity, gauge theory, and much of modern mathematical physics.`,
    refs: [
      'do Carmo — Riemannian Geometry',
      'Lee — Introduction to Smooth Manifolds',
      'Spivak — A Comprehensive Introduction to Differential Geometry',
    ],
    status: 'upcoming',
    subareas: [] as Subarea[],
  },
  {
    tag: 'Metric Geometry',
    banner: '/tags/metric.jpg',
    img: '/tags/metric-icon.jpg',
    short: 'Metric spaces, geodesics, curvature bounds, and convergence of spaces beyond the smooth category.',
    long: `Metric geometry studies spaces equipped only with a distance function. Unlike differential geometry, it does not begin with coordinates, smoothness, or linear structure.

The central notions are geodesics, comparison geometry, and convergence of spaces. The Gromov-Hausdorff distance makes it possible to compare entire metric spaces as geometric objects.

Alexandrov spaces, CAT(k) spaces, and spaces with Ricci curvature bounds in a synthetic sense all belong to this broader framework, linking geometry to analysis, topology, and group theory.`,
    refs: [
      'Burago, Burago & Ivanov — A Course in Metric Geometry',
      'Bridson & Haefliger — Metric Spaces of Non-Positive Curvature',
      'Gromov — Metric Structures for Riemannian and Non-Riemannian Spaces',
    ],
    status: 'upcoming',
    subareas: [] as Subarea[],
  },
  {
    tag: 'Classical Analysis',
    banner: '/tags/analysis.jpg',
    img: '/tags/analysis-icon.jpg',
    short: 'Limits, continuity, differentiation, integration, and the rigorous foundations of modern analysis.',
    long: `Classical analysis begins with the study of limits, continuity, differentiation, and integration on the real line. Its real importance lies in the habits of thought it imposes: precision, estimation, and control of approximation.

The subject includes the structure of the real numbers, sequences and series, uniform convergence, power series, and the basic theory of functions of one and several variables.

Although often treated as introductory, classical analysis is not merely preliminary technique. It provides the conceptual discipline behind measure theory, functional analysis, differential equations, and geometry.`,
    refs: [
      'Rudin — Principles of Mathematical Analysis',
      'Stein & Shakarchi — Real Analysis',
      'Tao — Analysis I & II',
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
        priority
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
                priority
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
import styles from './about.module.css'

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p className={styles.label}>about</p>

        <h1 className={styles.title}>Aleksis Arendt</h1>

        <p className={styles.subtitle}>
          Undergraduate in pure mathematics, Ho Chi Minh City University of Science.
        </p>
      </div>

      <div className={styles.content}>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>research interests</p>

          <p className={styles.paragraph}>
            Harmonic analysis, geometric measure theory, and partial differential equations,
            with a growing interest in combinatorial methods inside geometric and analytic problems.
          </p>

          <p className={styles.paragraph}>
            I am especially drawn to questions where Fourier-analytic ideas, geometric structure,
            and discrete or combinatorial arguments meet — particularly in problems related to
            oscillation, dimension, incidence, and singular behavior.
          </p>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>current study</p>

          <div className={styles.studyList}>
            {[
              ['Measure Theory', 'Evans–Gariepy, Cohn'],
              ['Fourier Analysis', 'Stein–Shakarchi'],
              ['Functional Analysis', 'Brezis'],
              ['PDE Theory', 'Elliptic and variational foundations'],
              ['Geometric Measure Theory', 'Building steadily from analysis'],
            ].map(([topic, detail]) => (
              <div key={topic} className={styles.studyRow}>
                <span className={styles.studyTopic}>{topic}</span>
                <span className={styles.studyDetail}>{detail}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>academic path</p>

          <p className={styles.paragraph}>
            My present graduate trajectory is centered first on Pisa, followed by Copenhagen,
            Helsinki, and Vienna. The goal is to build a strong master’s foundation in analysis
            before moving toward more specialized research in harmonic analysis, GMT, and related PDE.
          </p>

          <p className={styles.paragraph}>
            Long-term, I want to work in areas where analytic techniques interact with geometry
            and combinatorial structure, while keeping enough breadth to move between pure analysis,
            geometric problems, and modern Fourier-analytic methods.
          </p>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>broader direction</p>

          <p className={styles.paragraph}>
            Beyond core analysis, I am interested in the interface between harmonic analysis,
            geometric phenomena, and combinatorial ideas — especially the kind of problems where
            local structure, scale, and decomposition matter as much as formal computation.
          </p>

          <p className={styles.paragraph}>
            This direction is still evolving, but the general aim is clear: rigorous analysis first,
            then deeper movement into modern problems where geometry, Fourier methods, and sharp estimates
            genuinely interact.
          </p>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>about this blog</p>

          <p className={styles.paragraph}>
            These notes are part of an ongoing attempt to study seriously and write clearly.
            Most entries begin with a theorem, an estimate, or a structural question, and then
            develop outward through proofs, counterexamples, and related ideas.
          </p>

          <p className={styles.paragraph}>
            The purpose is not to produce polished exposition too early, but to document real
            understanding in progress: reconstructing arguments, isolating key mechanisms,
            and tracing how different parts of analysis connect.
          </p>
        </section>

      </div>
    </div>
  )
}
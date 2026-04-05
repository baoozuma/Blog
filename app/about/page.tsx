import styles from './about.module.css'

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <p className={styles.label}>about</p>

        <h1 className={styles.title}>Aleksis Arendt</h1>

        <p className={styles.subtitle}>
          Undergraduate in pure mathematics, Ho Chi Minh City University of Science.
        </p>
      </div>

      {/* Content */}
      <div className={styles.content}>

        {/* Research */}
        <section className={styles.section}>
          <p className={styles.sectionLabel}>research interests</p>

          <p className={styles.paragraph}>
            Geometric analysis, geometric measure theory, and calculus of variations.
            Currently building a foundation in real analysis and functional analysis
            before moving into PDE theory and GMT proper.
          </p>

          <p className={styles.paragraph}>
            Long-term interests include minimal surfaces, harmonic maps, mean curvature flow,
            and gauge theory — particularly Yang-Mills theory and principal bundles.
          </p>
        </section>

        {/* Current Focus */}
        <section className={styles.section}>
          <p className={styles.sectionLabel}>current study</p>

          <div className={styles.studyList}>
            {[
              ['Measure Theory', 'Folland, Evans–Gariepy'],
              ['Functional Analysis', 'Brezis'],
              ['ODE Theory', 'Peano, Picard–Lindelöf'],
              ['Differential Geometry', 'Resuming in summer'],
            ].map(([topic, detail]) => (
              <div key={topic} className={styles.studyRow}>
                <span className={styles.studyTopic}>{topic}</span>
                <span className={styles.studyDetail}>{detail}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Path */}
        <section className={styles.section}>
          <p className={styles.sectionLabel}>academic path</p>

          <p className={styles.paragraph}>
            Planning for graduate study in Germany or Switzerland — Bonn, LMU Munich,
            or ETH Zürich — followed by a PhD in geometric analysis or GMT.
          </p>

          <p className={styles.paragraph}>
            The strategy is to complete a strong master’s program first, then apply
            for doctoral positions with a focused thesis and strong supervision.
          </p>
        </section>

        {/* Blog */}
        <section className={styles.section}>
          <p className={styles.sectionLabel}>about this blog</p>

          <p className={styles.paragraph}>
            These are working notes — written to consolidate understanding rather than
            present polished results. Each post starts from a single problem or theorem,
            explores it deeply, and connects it to a broader structure.
          </p>

          <p className={styles.paragraph}>
            The process follows a simple principle: do not just read — reconstruct.
            Every assumption questioned, every proof rebuilt from scratch.
          </p>
        </section>

      </div>
    </div>
  )
}
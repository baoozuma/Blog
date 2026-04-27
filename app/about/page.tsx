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
            My current interests lie in harmonic analysis, geometric measure theory, and related
            problems in PDE, with a growing focus on the role of combinatorial and discrete-geometric
            methods in analytic questions.
          </p>

          <p className={styles.paragraph}>
            I am especially drawn to problems where Fourier-analytic estimates, geometric structure,
            dimension theory, and incidence-type arguments interact. This includes themes around
            Kakeya-type problems, Furstenberg sets, projection phenomena, and finite-scale geometric
            decompositions.
          </p>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>current study</p>

          <div className={styles.studyList}>
            {[
              ['Measure Theory', 'Evans–Gariepy, Cohn, Bogachev'],
              ['Fourier Analysis', 'Stein–Shakarchi, harmonic analysis foundations'],
              ['Functional Analysis', 'Hilbert spaces, Banach spaces, Brezis'],
              ['PDE Theory', 'Elliptic, variational, and weak-solution foundations'],
              ['Geometric Measure Theory', 'Hausdorff measure, rectifiability, covering arguments'],
              ['Combinatorics', 'Discrete geometry, incidence methods, polynomial method'],
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
            My present graduate direction is centered on building a strong European master’s foundation
            in analysis, with possible destinations including Pisa, Copenhagen, Helsinki, Vienna, Bonn,
            LMU Munich, and Bern. The priority is not only institutional prestige, but the presence of
            strong analysis groups, active seminars, and a research environment connected to harmonic
            analysis, GMT, PDE, and geometric problems.
          </p>

          <p className={styles.paragraph}>
            Long-term, I want to move toward research in areas where analytic techniques interact
            seriously with geometry and combinatorial structure. The aim is to develop enough breadth
            to move between pure analysis, geometric measure theory, Fourier-analytic methods, and
            finite-scale combinatorial ideas.
          </p>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>broader direction</p>

          <p className={styles.paragraph}>
            Beyond core analysis, I am interested in the interface between continuous and discrete
            methods: how geometric problems can be reduced to finite-scale estimates, how incidence
            geometry appears inside analysis, and how combinatorial tools such as pigeonholing,
            covering, energy estimates, and polynomial methods enter modern analytic arguments.
          </p>

          <p className={styles.paragraph}>
            This direction is still evolving, but the general aim is clear: rigorous analysis first,
            then deeper movement into modern problems where geometry, Fourier methods, dimension,
            and sharp estimates genuinely interact.
          </p>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>about this blog</p>

          <p className={styles.paragraph}>
            These notes are part of an ongoing attempt to study seriously and write clearly. Most
            entries begin with a theorem, an estimate, or a structural question, and then develop
            outward through proofs, examples, counterexamples, and related ideas.
          </p>

          <p className={styles.paragraph}>
            The purpose is not to produce polished exposition too early, but to document real
            understanding in progress: reconstructing arguments, isolating key mechanisms, and
            tracing how different parts of analysis, geometry, and combinatorics connect.
          </p>
        </section>

      </div>
    </div>
  )
}
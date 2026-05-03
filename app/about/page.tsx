import styles from './about.module.css'

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p className={styles.label}>about · 紹介</p>

        <h1 className={styles.title}>Aleksis Arendt</h1>

        <p className={styles.subtitle}>
          Undergraduate in pure mathematics, Ho Chi Minh City University of Science.
        </p>
      </div>

      <div className={styles.content}>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>profile · 自己紹介</p>

          <p className={styles.paragraph}>
            I write under the name Aleksis Arendt. My Vietnamese name is Phạm Ngọc Gia Bảo,
            often shortened to Phạm Bảo. This site is where I keep mathematical notes,
            selected writing, and small academic projects that I want to organize with more care.
          </p>

          <p className={styles.paragraph}>
            Vietnamese is my native language, while English is the language I use most for textbooks,
            proofs, and longer mathematical writing. I am also learning German with graduate study
            in Europe in mind, and Japanese remains a separate cultural and aesthetic interest.
          </p>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>mathematics · 数学</p>

          <p className={styles.paragraph}>
            My interests are centered on analysis and geometry, especially harmonic analysis,
            geometric measure theory, PDE, and the combinatorial methods that appear inside
            analytic problems. I am drawn to questions where estimates, dimension, incidence,
            and scale decomposition interact.
          </p>

          <p className={styles.paragraph}>
            At the moment, I am working through measure theory, Fourier analysis, functional
            analysis, PDE, GMT, and some supporting combinatorics. I am especially interested in
            how continuous problems can sometimes be reduced to structured counting, covering,
            and finite-scale geometric arguments.
          </p>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>academic direction · 進路</p>

          <p className={styles.paragraph}>
            My present graduate direction is to build a strong master’s foundation in Europe,
            with possible destinations including Pisa, Copenhagen, Helsinki, Vienna, Bonn,
            LMU Munich, and Bern. The priority is not only institutional prestige, but the presence
            of active analysis groups, seminars, and a research environment connected to harmonic
            analysis, GMT, PDE, and geometric problems.
          </p>

          <p className={styles.paragraph}>
            Long-term, I want to move toward research where analytic techniques interact seriously
            with geometry and combinatorial structure. I would like to keep enough breadth to move
            between pure analysis, geometric measure theory, Fourier-analytic methods, and finite-scale
            combinatorial ideas.
          </p>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>outside mathematics · 数学以外</p>

          <p className={styles.paragraph}>
            Outside mathematics, I read philosophy and listen to a lot of guitar-driven music.
            Some recurring names in my reading are Nietzsche, Marx, Kant, Arendt, and Kierkegaard.
            Musically, I tend to stay around J-Rock, math rock, post-hardcore, shoegaze, Midwest emo,
            and darker alternative sounds.
          </p>

          <p className={styles.paragraph}>
            I also use code as part of my working infrastructure: React, TypeScript, C++, LaTeX,
            MATLAB, Maple, and small systems for notes, writing, and academic workflows. Most of
            my serious mathematical writing is still LaTeX-first and proof-centered.
          </p>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>about this blog · 記録</p>

          <p className={styles.paragraph}>
            These notes are not meant to look finished too early. Most entries begin from a theorem,
            an estimate, or a structural question, then develop outward through proofs, examples,
            counterexamples, and related ideas.
          </p>

          <p className={styles.paragraph}>
            The point is to document understanding in progress: reconstructing arguments, isolating
            key mechanisms, and tracing how different parts of analysis, geometry, and combinatorics
            connect.
          </p>
        </section>

      </div>
    </div>
  )
}
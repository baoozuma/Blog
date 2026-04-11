import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  label?: string
}

export function Theorem({ children, label }: Props) {
  return (
    <div className="math-block math-theorem">
      <span className="math-block-tag">
        Theorem{label ? ` (${label})` : ''}
      </span>
      <div className="math-block-body">{children}</div>
    </div>
  )
}

export function Lemma({ children, label }: Props) {
  return (
    <div className="math-block math-lemma">
      <span className="math-block-tag">
        Lemma{label ? ` (${label})` : ''}
      </span>
      <div className="math-block-body">{children}</div>
    </div>
  )
}

export function Corollary({ children, label }: Props) {
  return (
    <div className="math-block math-corollary">
      <span className="math-block-tag">
        Corollary{label ? ` (${label})` : ''}
      </span>
      <div className="math-block-body">{children}</div>
    </div>
  )
}

export function Definition({ children, label }: Props) {
  return (
    <div className="math-block math-definition">
      <span className="math-block-tag">
        Definition{label ? ` (${label})` : ''}
      </span>
      <div className="math-block-body">{children}</div>
    </div>
  )
}

export function Proof({ children }: { children: ReactNode }) {
  return (
    <div className="math-proof">
      <span className="math-proof-tag">Proof.</span>
      <div className="math-proof-body">{children}</div>
      <div style={{ textAlign: 'right', color: 'var(--text-dim)', fontSize: '0.85rem' }}>■</div>
    </div>
  )
}

export function Remark({ children }: { children: ReactNode }) {
  return (
    <div className="math-remark">
      <span className="math-block-tag" style={{ color: 'var(--text-dim)' }}>Remark.</span>
      <div className="math-block-body">{children}</div>
    </div>
  )
}
    'use client'

export default function ExportPDF({ title }: { title: string }) {
  const handlePrint = () => {
  document.title = title
  const theme = document.documentElement.getAttribute('data-theme') || 'dark'
  console.log('theme:', theme)
  document.documentElement.setAttribute('data-print-theme', theme)
  console.log('data-print-theme:', document.documentElement.getAttribute('data-print-theme'))
  window.print()
}
  return (
    <button
      onClick={handlePrint}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.3rem 0.85rem',
        border: '1px solid var(--border-light)',
        borderRadius: '999px',
        background: 'var(--bg-card)',
        color: 'var(--text-dim)',
        fontSize: '0.72rem',
        fontFamily: 'var(--font-mono)',
        cursor: 'pointer',
        transition: 'border-color 0.2s, color 0.2s',
        letterSpacing: '0.02em',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)'
        e.currentTarget.style.color = 'var(--accent)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-light)'
        e.currentTarget.style.color = 'var(--text-dim)'
      }}
    >
      <span>⬇</span>
      <span>export pdf</span>
    </button>
  )
}   
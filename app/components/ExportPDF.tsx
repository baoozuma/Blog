'use client'

export default function ExportPDF({ title }: { title: string }) {
  const handlePrint = () => {
    document.title = title

    const root = document.documentElement
    const computed = getComputedStyle(root)
    const theme = root.getAttribute('data-theme') || 'dark'
    const isDark = theme === 'dark'

    const bg = computed.getPropertyValue('--bg').trim()
    const text = computed.getPropertyValue('--text').trim()
    const gold = computed.getPropertyValue('--gold').trim()

    // Remove old override if exists
    document.getElementById('print-theme-override')?.remove()

    const style = document.createElement('style')
    style.id = 'print-theme-override'
    style.textContent = `
      @media print {
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        html, body {
          background: ${bg} !important;
          color: ${text} !important;
        }
        * {
          color: ${text} !important;
          -webkit-text-fill-color: ${text} !important;
        }
        h1 {
          background: ${isDark
            ? 'linear-gradient(135deg, #a5c7f0 0%, #e0e0e0 40%, #ffdd00 100%)'
            : 'linear-gradient(135deg, #0055aa 0%, #334466 40%, #aa7700 100%)'} !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
        }
        .katex, .katex * {
          color: ${text} !important;
          -webkit-text-fill-color: ${text} !important;
        }
        .math-block-tag { color: ${gold} !important; -webkit-text-fill-color: ${gold} !important; }
        .prose h2 { color: ${text} !important; border-left-color: ${gold} !important; }
        .prose strong { color: ${gold} !important; -webkit-text-fill-color: ${gold} !important; }
        .math-theorem { border-left-color: ${gold} !important; }
      }
    `
    document.head.appendChild(style)

    setTimeout(() => {
      window.print()
      setTimeout(() => {
        document.getElementById('print-theme-override')?.remove()
      }, 1000)
    }, 100)
  }

  return (
    <button
      onClick={handlePrint}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.3rem 0.85rem',
        border: '1px solid var(--border)',
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
        e.currentTarget.style.borderColor = 'var(--gold)'
        e.currentTarget.style.color = 'var(--gold)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.color = 'var(--text-dim)'
      }}
    >
      <span>⬇</span>
      <span>export pdf</span>
    </button>
  )
}
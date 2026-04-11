'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// ── Types ──
type FileItem = { name: string; path: string; sha: string }
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

// ── Simple MDX Preview ──
// We render a sandboxed iframe with the raw MDX as plain text + basic math display
function Preview({ content }: { content: string }) {
  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"/>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
  onload="renderMathInElement(document.body, {
    delimiters: [
      {left: '$$', right: '$$', display: true},
      {left: '$', right: '$', display: false}
    ]
  })"></script>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Segoe UI', sans-serif;
    font-size: 15px;
    line-height: 1.8;
    padding: 2rem;
    background: #0e0e0f;
    color: #e8e1e1;
    max-width: 720px;
    margin: 0 auto;
  }
  h1, h2, h3 { color: #fff; margin: 1.5rem 0 0.75rem; }
  h2 { border-left: 2px solid #00ddff; padding-left: 0.75rem; font-size: 1.1rem; }
  p { margin-bottom: 1rem; }
  strong { color: #00ddff; }
  em { color: #aaa; font-style: italic; }
  hr { border: none; border-top: 1px solid #2a2a2d; margin: 1.5rem 0; }
  pre { background: #141415; border: 1px solid #2a2a2d; border-radius: 4px; padding: 1rem; overflow-x: auto; }
  code { font-family: monospace; font-size: 0.875em; background: #141415; padding: 0.1em 0.35em; border-radius: 3px; color: #00ddff; }
  blockquote { border-left: 2px solid #00ddff; padding: 0.5rem 1rem; color: #aaa; font-style: italic; background: #141415; }
  .katex-display { margin: 1.5rem 0; overflow-x: auto; }
  /* frontmatter */
  .fm { background: #141415; border: 1px solid #2a2a2d; border-radius: 4px; padding: 0.75rem 1rem; margin-bottom: 1.5rem; font-family: monospace; font-size: 0.8rem; color: #aaa; }
  /* mdx components — simplified */
  .theorem, .lemma, .corollary, .definition { margin: 1.5rem 0; padding: 0.85rem 1rem; border-radius: 0 4px 4px 0; }
  .theorem { border-left: 2px solid #00ddff; background: rgba(0,221,255,0.04); }
  .lemma { border-left: 2px solid #a78bfa; background: rgba(167,139,250,0.04); }
  .corollary { border-left: 2px solid #34d399; background: rgba(52,211,153,0.04); }
  .definition { border-left: 2px solid #fb923c; background: rgba(251,146,60,0.04); }
  .proof { margin: 1rem 0; }
  .tag { font-family: monospace; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; margin-bottom: 0.4rem; display: block; }
  .theorem .tag { color: #00ddff; }
  .lemma .tag { color: #a78bfa; }
  .corollary .tag { color: #34d399; }
  .definition .tag { color: #fb923c; }
  .proof .tag { color: #aaa; font-style: italic; text-transform: none; letter-spacing: 0; font-size: 0.85rem; }
  li { margin-bottom: 0.35rem; padding-left: 1rem; }
  ul { list-style: disc; padding-left: 1rem; }
  ol { list-style: decimal; padding-left: 1rem; }
</style>
</head>
<body>
<script>
// Simple MDX renderer — handles frontmatter, JSX components, markdown
const raw = ${JSON.stringify(content)};

function render(src) {
  // Strip frontmatter
  let fm = '';
  let body = src;
  const fmMatch = src.match(/^---\\n([\\s\\S]*?)\\n---\\n/);
  if (fmMatch) {
    fm = '<div class="fm">' + fmMatch[1].replace(/</g,'&lt;') + '</div>';
    body = src.slice(fmMatch[0].length);
  }

  // MDX components
  body = body
    .replace(/<Theorem(?:\\s+label="([^"]*)")?>([\s\S]*?)<\\/Theorem>/g, (_, label, inner) =>
      '<div class="theorem"><span class="tag">Theorem' + (label ? ' (' + label + ')' : '') + '</span>' + inner + '</div>')
    .replace(/<Lemma(?:\\s+label="([^"]*)")?>([\s\S]*?)<\\/Lemma>/g, (_, label, inner) =>
      '<div class="lemma"><span class="tag">Lemma' + (label ? ' (' + label + ')' : '') + '</span>' + inner + '</div>')
    .replace(/<Corollary(?:\\s+label="([^"]*)")?>([\s\S]*?)<\\/Corollary>/g, (_, label, inner) =>
      '<div class="corollary"><span class="tag">Corollary' + (label ? ' (' + label + ')' : '') + '</span>' + inner + '</div>')
    .replace(/<Definition(?:\\s+label="([^"]*)")?>([\s\S]*?)<\\/Definition>/g, (_, label, inner) =>
      '<div class="definition"><span class="tag">Definition' + (label ? ' (' + label + ')' : '') + '</span>' + inner + '</div>')
    .replace(/<Proof>([\s\S]*?)<\\/Proof>/g, (_, inner) =>
      '<div class="proof"><span class="tag">Proof.</span>' + inner + '<span style="float:right;color:#aaa">■</span></div>')
    .replace(/<Remark>([\s\S]*?)<\\/Remark>/g, (_, inner) =>
      '<div class="proof"><span class="tag">Remark.</span>' + inner + '</div>')

  // Markdown
  body = body
    .replace(/^#{3} (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\\*\\*([^*]+)\\*\\*/g, '<strong>$1</strong>')
    .replace(/\\*([^*]+)\\*/g, '<em>$1</em>')
    .replace(/^---$/gm, '<hr/>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\\/li>\\n?)+/g, s => '<ul>' + s + '</ul>')
    .replace(/\\n\\n/g, '</p><p>')

  document.body.innerHTML = fm + '<p>' + body + '</p>';
}

render(raw);
</script>
</body>
</html>`

  return (
    <iframe
      srcDoc={html}
      style={{ width: '100%', height: '100%', border: 'none', background: '#0e0e0f' }}
      sandbox="allow-scripts"
    />
  )
}

// ── Main Editor ──
export default function EditorPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  const [files, setFiles] = useState<FileItem[]>([])
  const [activeFile, setActiveFile] = useState<FileItem | null>(null)
  const [content, setContent] = useState('')
  const [originalContent, setOriginalContent] = useState('')
  const [sha, setSha] = useState<string | undefined>()
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [isNew, setIsNew] = useState(false)
  const [newFileName, setNewFileName] = useState('')

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const mono = { fontFamily: 'var(--font-mono)' }

  async function login() {
    if (authLoading) return
    setAuthLoading(true)
    setAuthError('')
    try {
      const res = await fetch(`/api/github?password=${encodeURIComponent(password)}`)
      if (!res.ok) { setAuthError('Wrong password.'); return }
      const data = await res.json()
      setFiles(data.files ?? [])
      setAuthed(true)
    } catch { setAuthError('Failed to connect.') }
    finally { setAuthLoading(false) }
  }

  async function openFile(file: FileItem) {
    setActiveFile(file)
    setIsNew(false)
    setSaveStatus('idle')
    const res = await fetch(`/api/github?password=${encodeURIComponent(password)}&path=${file.path}`)
    const data = await res.json()
    setContent(data.content)
    setOriginalContent(data.content)
    setSha(data.sha)
  }

  async function save() {
    if (saveStatus === 'saving') return
    const path = isNew ? `posts/${newFileName}${newFileName.endsWith('.mdx') ? '' : '.mdx'}` : activeFile!.path
    setSaveStatus('saving')
    try {
      const res = await fetch(`/api/github?password=${encodeURIComponent(password)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, content, sha }),
      })
      const data = await res.json()
      if (!res.ok) { setSaveStatus('error'); return }
      setSha(data.sha)
      setOriginalContent(content)
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)

      // Refresh file list
      const listRes = await fetch(`/api/github?password=${encodeURIComponent(password)}`)
      const listData = await listRes.json()
      setFiles(listData.files ?? [])
      if (isNew) {
        setIsNew(false)
        const newFile = listData.files.find((f: FileItem) => f.path === path)
        if (newFile) setActiveFile(newFile)
      }
    } catch { setSaveStatus('error') }
  }

  function newFile() {
    setIsNew(true)
    setActiveFile(null)
    setSha(undefined)
    setNewFileName('')
    const template = `---\ntitle: \ndate: "${new Date().toISOString().slice(0,10)}"\ndescription: \nthumbnail: \n---\n\n## Introduction\n\n`
    setContent(template)
    setOriginalContent(template)
    setSaveStatus('idle')
  }

  // Tab key in textarea
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Tab') {
      e.preventDefault()
      const ta = textareaRef.current!
      const start = ta.selectionStart
      const end = ta.selectionEnd
      const next = content.substring(0, start) + '  ' + content.substring(end)
      setContent(next)
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start + 2 })
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault()
      save()
    }
  }

  const isDirty = content !== originalContent

  // ── Login ──
  if (!authed) return (
    <div style={{ maxWidth: 480, margin: '4rem auto', padding: '0 1.5rem' }}>
      <p style={{ ...mono, fontSize: '0.68rem', color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
        mdx editor
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => { setPassword(e.target.value); setAuthError('') }}
          onKeyDown={e => e.key === 'Enter' && document.getElementById('editor-login-btn')?.click()}
          style={{
            background: 'var(--bg-card)', border: `1px solid ${authError ? '#f87171' : 'var(--border)'}`,
            borderRadius: '4px', padding: '0.5rem 0.85rem',
            color: 'var(--text)', ...mono, fontSize: '0.85rem', outline: 'none',
          }}
        />
        <button
          id="editor-login-btn"
          onClick={login}
          style={{
            padding: '0.5rem 1rem', background: 'var(--gold)', border: 'none',
            borderRadius: '4px', color: 'var(--bg)', ...mono, fontSize: '0.78rem',
            cursor: 'pointer', opacity: authLoading ? 0.6 : 1,
          }}
        >
          {authLoading ? '...' : 'open →'}
        </button>
      </div>
      {authError && <p style={{ ...mono, fontSize: '0.72rem', color: '#f87171', marginTop: '0.5rem' }}>{authError}</p>}
    </div>
  )

  // ── Editor ──
  return (
    <div style={{ 
    display: 'flex', 
    height: 'calc(100vh - 56px)', 
    overflow: 'hidden', 
    position: 'fixed',
    top: '56px',
    left: 0,
    right: 0,
    bottom: 0,
    }}>

      {/* Sidebar */}
      <div style={{
        width: 200, flexShrink: 0, borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        background: 'var(--bg-card)',
      }}>
        <div style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ ...mono, fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>posts</span>
          <button onClick={newFile} style={{
            background: 'var(--gold)', border: 'none', borderRadius: '3px',
            color: 'var(--bg)', ...mono, fontSize: '0.65rem', padding: '0.2rem 0.5rem', cursor: 'pointer',
          }}>+ new</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.25rem' }}>
          {files.map(f => (
            <button key={f.path} onClick={() => openFile(f)} style={{
              display: 'block', width: '100%', textAlign: 'left',
              background: activeFile?.path === f.path ? 'rgba(0,221,255,0.08)' : 'transparent',
              border: 'none', borderRadius: '3px',
              padding: '0.4rem 0.6rem', marginBottom: '0.1rem',
              ...mono, fontSize: '0.68rem',
              color: activeFile?.path === f.path ? 'var(--gold)' : 'var(--text-dim)',
              cursor: 'pointer',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {/* Editor + Preview */}
      {(activeFile || isNew) ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Toolbar */}
          <div style={{
            height: 40, borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 1rem', gap: '1rem', background: 'var(--bg-card)', flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {isNew ? (
                <input
                  value={newFileName}
                  onChange={e => setNewFileName(e.target.value)}
                  placeholder="filename.mdx"
                  style={{
                    background: 'var(--bg)', border: '1px solid var(--border)',
                    borderRadius: '3px', padding: '0.25rem 0.5rem',
                    color: 'var(--text)', ...mono, fontSize: '0.75rem', outline: 'none',
                    width: 160,
                  }}
                />
              ) : (
                <span style={{ ...mono, fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  {activeFile?.name}
                  {isDirty && <span style={{ color: 'var(--gold)', marginLeft: '0.4rem' }}>●</span>}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ ...mono, fontSize: '0.65rem', color: 'var(--text-dim)', opacity: 0.5 }}>Ctrl+S to save</span>
              <button
                onClick={save}
                disabled={saveStatus === 'saving'}
                style={{
                  padding: '0.3rem 0.85rem',
                  background: saveStatus === 'saved' ? '#22c55e' : 'var(--gold)',
                  border: 'none', borderRadius: '3px',
                  color: 'var(--bg)', ...mono, fontSize: '0.72rem',
                  cursor: 'pointer', transition: 'background 0.2s',
                }}
              >
                {saveStatus === 'saving' ? '...' : saveStatus === 'saved' ? 'saved ✓' : saveStatus === 'error' ? 'error ✗' : 'save →'}
              </button>
            </div>
          </div>

          {/* Split panes */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>
            {/* Code */}
            <div style={{ borderRight: '1px solid var(--border)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <textarea
                ref={textareaRef}
                value={content}
                onChange={e => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                style={{
                  flex: 1, width: '100%', height: '100%',
                  background: 'var(--bg)', color: 'var(--text)',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.8rem', lineHeight: 1.7,
                  padding: '1rem', border: 'none', outline: 'none',
                  resize: 'none', tabSize: 2,
                }}
              />
            </div>

            {/* Preview */}
            <div style={{ overflow: 'hidden' }}>
              <Preview content={content} />
            </div>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ ...mono, fontSize: '0.82rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
            select a file or create new
          </p>
        </div>
      )}
    </div>
  )
}
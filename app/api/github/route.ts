    import { NextRequest, NextResponse } from 'next/server'

const GITHUB_API = 'https://api.github.com'
const OWNER = process.env.GITHUB_OWNER!
const REPO = process.env.GITHUB_REPO!
const TOKEN = process.env.GITHUB_TOKEN!

function headers() {
  return {
    Authorization: `Bearer ${TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
}

// GET — list files or get file content
export async function GET(req: NextRequest) {
  const password = req.nextUrl.searchParams.get('password')
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const path = req.nextUrl.searchParams.get('path')

  if (!path) {
    // List all MDX files in posts/
    const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/contents/posts`, {
      headers: headers(),
    })
    const data = await res.json()
    const files = data
      .filter((f: any) => f.name.endsWith('.mdx'))
      .map((f: any) => ({ name: f.name, path: f.path, sha: f.sha }))
    return NextResponse.json({ files })
  }

  // Get specific file
  const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${path}`, {
    headers: headers(),
  })
  const data = await res.json()
  const content = Buffer.from(data.content, 'base64').toString('utf-8')
  return NextResponse.json({ content, sha: data.sha, path: data.path })
}

// POST — create or update file
export async function POST(req: NextRequest) {
  const password = req.nextUrl.searchParams.get('password')
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { path, content, sha, message } = await req.json()
  if (!path || !content) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const body: any = {
    message: message || `${sha ? 'Update' : 'Create'} ${path}`,
    content: Buffer.from(content).toString('base64'),
  }
  if (sha) body.sha = sha // required for update

  const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: { ...headers(), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  if (!res.ok) return NextResponse.json({ error: data.message }, { status: res.status })
  return NextResponse.json({ ok: true, sha: data.content.sha })
}
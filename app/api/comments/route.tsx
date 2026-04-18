import { redis } from '@/lib/redis'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/ratelimit'


const resend = new Resend(process.env.RESEND_API_KEY)

async function sendNotification(comment: {
  name: string
  message: string
  slug: string
  replyTo: string | null
}) {
  const postUrl = `https://aleksis.dev/blog/${comment.slug}`
  const subject = comment.replyTo
    ? `💬 New reply on ${comment.slug}`
    : `💬 New comment on ${comment.slug}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: process.env.NOTIFY_EMAIL!,
    subject,
    html: `
      <div style="font-family: monospace; max-width: 600px; padding: 2rem; background: #0e0e0f; color: #e8e1e1;">
        <p style="color: #00ddff; font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 1rem;">
          ${comment.replyTo ? 'new reply' : 'new comment'} — ${comment.slug}
        </p>
        <p style="font-size: 0.9rem; margin-bottom: 0.5rem;">
          <strong style="color: #00ddff;">${comment.name}</strong>
        </p>
        <p style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem; color: #e8e1e1;">
          ${comment.message}
        </p>
        <a href="${postUrl}" style="color: #00ddff; font-size: 0.8rem;">view post →</a>
        &nbsp;&nbsp;
        <a href="https://aleksis.dev/admin" style="color: #a78bfa; font-size: 0.8rem;">open admin →</a>
      </div>
    `,
  })
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 })

  try {
    const raw = await redis.lrange(`comments:${slug}`, 0, -1)
    const comments = raw.map(item => typeof item === 'string' ? JSON.parse(item) : item)
    return NextResponse.json({ comments })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { slug, name, message, replyTo, isAdmin } = await req.json()
    if (!slug || !message?.trim()) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Rate limit — skip for admin
    if (!isAdmin) {
      const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
      const { success } = await rateLimit(ip, 'comment', 5, 3600)
      if (!success) {
        return NextResponse.json(
          { error: 'Too many comments. Please wait before trying again.' },
          { status: 429 }
        )
      }
    }

    const comment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: isAdmin ? 'Alëksis' : (name?.trim() || 'Anonymous'),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      replyTo: replyTo || null,
      isAdmin: !!isAdmin,
    }

    await redis.lpush(`comments:${slug}`, JSON.stringify(comment))

    if (!isAdmin) {
      sendNotification({ name: comment.name, message: comment.message, slug, replyTo }).catch(console.error)
    }

    return NextResponse.json({ ok: true, comment })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const password = req.nextUrl.searchParams.get('password')
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { slug, id } = await req.json()
    if (!slug || !id) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const raw = await redis.lrange(`comments:${slug}`, 0, -1)
    const comments = raw.map(item => typeof item === 'string' ? JSON.parse(item) : item)
    const filtered = comments.filter((c: any) => c.id !== id)

    await redis.del(`comments:${slug}`)
    if (filtered.length > 0) {
      await redis.rpush(`comments:${slug}`, ...filtered.map((c: any) => JSON.stringify(c)))
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
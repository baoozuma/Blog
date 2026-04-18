import { redis } from '@/lib/redis'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/ratelimit'

export const dynamic = 'force-dynamic'


const resend = new Resend(process.env.RESEND_API_KEY)

async function sendNotification(entry: {
  name: string
  message: string
  page: string
}) {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: process.env.NOTIFY_EMAIL!,
    subject: `✉ New feedback from ${entry.name}`,
    html: `
      <div style="font-family: monospace; max-width: 600px; padding: 2rem; background: #0e0e0f; color: #e8e1e1;">
        <p style="color: #00ddff; font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 1rem;">
          new feedback
        </p>
        <p style="font-size: 0.9rem; margin-bottom: 0.5rem;">
          <strong style="color: #00ddff;">${entry.name}</strong>
        </p>
        <p style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem; color: #e8e1e1;">
          ${entry.message}
        </p>
        ${entry.page ? `<p style="font-size: 0.75rem; color: #6b6966;">from: ${entry.page}</p>` : ''}
        <a href="https://aleksis.dev/admin" style="color: #a78bfa; font-size: 0.8rem;">open admin →</a>
      </div>
    `,
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (body?.action === 'admin-login') {
      const password = body.password?.trim()
      if (password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      const raw = await redis.lrange('feedback', 0, -1)
      const entries = raw.map(item =>
        typeof item === 'string' ? JSON.parse(item) : item
      )
      return NextResponse.json({ entries })
    }

    const { name, message } = body
    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    // Rate limit — 3 feedback per hour per IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
    const { success } = await rateLimit(ip, 'feedback', 3, 3600)
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait before trying again.' },
        { status: 429 }
      )
    }

    const entry = {
      name: name?.trim() || 'Anonymous',
      message: message.trim(),
      timestamp: new Date().toISOString(),
      page: req.headers.get('referer') || '',
    }

    await redis.lpush('feedback', JSON.stringify(entry))
    sendNotification(entry).catch(console.error)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
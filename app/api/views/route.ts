import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json()
    if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 })

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
    const referrer = req.headers.get('referer') || ''
    const country = req.headers.get('x-vercel-ip-country') || ''
    const now = Date.now()

    // Deduplicate: same IP within 1 hour doesn't count again
    const dedupKey = `view:dedup:${slug}:${ip}`
    const already = await redis.get(dedupKey)
    if (!already) {
      // Increment total
      const views = await redis.incr(`views:${slug}`)

      // Log event for analytics
      const event = { slug, referrer, country, timestamp: now }
      await redis.zadd(`analytics:${slug}`, { score: now, member: JSON.stringify(event) })

      // Expire dedup key after 1 hour
      await redis.set(dedupKey, '1', { ex: 3600 })

      return NextResponse.json({ views })
    }

    // Already counted — just return current count
    const views = await redis.get(`views:${slug}`) ?? 0
    return NextResponse.json({ views: Number(views) })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 })

  try {
    const views = await redis.get(`views:${slug}`) ?? 0
    return NextResponse.json({ views: Number(views) })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
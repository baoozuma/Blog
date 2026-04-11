import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

// Sliding window rate limiter
// limit: max requests, window: seconds
export async function rateLimit(
  ip: string,
  action: string,
  limit = 5,
  window = 3600 // 1 hour
): Promise<{ success: boolean; remaining: number }> {
  const key = `rl:${action}:${ip}`
  const now = Date.now()
  const windowMs = window * 1000

  // Remove entries outside window
  await redis.zremrangebyscore(key, 0, now - windowMs)

  // Count current requests
  const count = await redis.zcard(key)

  if (count >= limit) {
    return { success: false, remaining: 0 }
  }

  // Add current request
  await redis.zadd(key, { score: now, member: `${now}-${Math.random()}` })
  await redis.expire(key, window)

  return { success: true, remaining: limit - count - 1 }
}
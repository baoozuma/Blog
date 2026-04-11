import { getAllPosts } from '@/lib/posts'
import { NextResponse } from 'next/server'

export async function GET() {
  const posts = getAllPosts()
  const slugs = posts.map(p => p.slug)
  return NextResponse.json({ slugs })
}
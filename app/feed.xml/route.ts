import { getAllPosts } from '@/lib/posts'

const SITE_URL = 'https://aleksis.dev'
const SITE_TITLE = 'Alëksis Arendt'
const SITE_DESCRIPTION = 'Notes on measure theory, functional analysis, and geometry.'
const AUTHOR = 'Alëksis Arendt'

export async function GET() {
  const posts = getAllPosts()

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`
      const pubDate = new Date(post.date).toUTCString()

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.description ?? ''}]]></description>
      <pubDate>${pubDate}</pubDate>
      ${post.thumbnail ? `<enclosure url="${SITE_URL}${post.thumbnail}" type="image/jpeg" length="0" />` : ''}
    </item>`
    })
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

function readingTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory)

  const posts = fileNames
    .filter((fn: string) => fn.endsWith('.mdx'))
    .map((fileName: string) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        description: data.description as string,
        thumbnail: data.thumbnail as string | undefined,
        tags: (data.tags as string[]) ?? [],
        readingTime: readingTime(content),
      }
    })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    description: data.description as string,
    thumbnail: data.thumbnail as string | undefined,
    tags: (data.tags as string[]) ?? [],
    readingTime: readingTime(content),
    content,
  }
}

export function getRecentPosts(n = 3) {
  return getAllPosts().slice(0, n)
}

export function getPostsByTag(tag: string) {
  return getAllPosts().filter(p => p.tags.includes(tag))
}
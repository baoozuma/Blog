import { config, fields, collection } from '@keystatic/core'

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'baoozuma',
      name: 'math-blog',
    },
  },
  ui: {
    brand: { name: 'Pure Mathematics' },
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date' }),
        description: fields.text({ label: 'Description', multiline: true }),
        thumbnail: fields.image({
          label: 'Thumbnail',
          directory: 'public/thumbnails',
          publicPath: '/thumbnails',
        }),
        content: fields.mdx({ label: 'Content' }),
      },
    }),
  },
})
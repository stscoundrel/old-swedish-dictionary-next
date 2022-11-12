import { createSitemap } from 'lib/services/sitemap'

describe('Sitemap tests', () => {
  process.env.NEXT_PUBLIC_SITE_URL = 'https://old-swedish-dictionary.test'

  test('Sitemap content can be formatted to XML.', async () => {
    const result = await createSitemap()

    expect(result.includes('<?xml version="1.0" encoding="UTF-8"?>')).toBeTruthy()
    expect(result.includes('<url><loc>https://old-swedish-dictionary.test/word/aremark</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>')).toBeTruthy()
  })
})

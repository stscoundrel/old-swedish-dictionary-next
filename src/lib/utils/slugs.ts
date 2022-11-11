import slugify from 'slugify'

interface SlugMapping {
    letter: string,
    slug: string
}

const slugTable: SlugMapping[] = [
  {
    letter: 'ö',
    slug: 'oe',
  },
  {
    letter: 'þ',
    slug: 'th',
  },
  {
    letter: 'ä',
    slug: 'ae',
  },
]

export const slugifyLetter = (letter: string): string => {
  let slug = ''

  slugTable.forEach((entry) => {
    if (entry.letter === letter) {
      slug = entry.slug
    }
  })

  if (slug === '') {
    slug = slugify(letter)
  }

  return slug.toLowerCase()
}

export const slugifyWord = (word: string): string => slugify(word).toLowerCase()

export const decodeLetter = (slug: string): string => {
  let letter = ''

  slugTable.forEach((entry) => {
    if (entry.slug === slug) {
      letter = entry.letter
    }
  })

  if (letter === '') {
    letter = slug
  }

  return letter
}

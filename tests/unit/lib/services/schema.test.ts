import {
  getBreadcrumbsSchema, getDefaultSchema, getLetterSchema, getWordSchema,
} from 'lib/services/schema'

describe('Schema structure tests', () => {
  process.env.NEXT_PUBLIC_SITE_URL = 'https://old-swedish-dictionary.test'

  const words = [
    {
      headword: 'äremark',
      partOfSpeech: 'nn',
      grammaticalAspect: '',
      definitions: [
        'utmark, ödemark.  M. G. Schybergsson, Finlands historia 1 (1902), s. 199 f.; O. Ahlbäck i &quot;Saga och sed&quot; 1962, s. 22 f.',
      ],
      alternativeForms: [],
      slug: 'aremark',
    },
    {
      headword: 'äremark 2',
      partOfSpeech: 'nn',
      grammaticalAspect: '',
      definitions: [
        'utmark, ödemark.  M. G. Schybergsson, Finlands historia 1 (1902), s. 199 f.; O. Ahlbäck i &quot;Saga och sed&quot; 1962, s. 22 f.',
      ],
      alternativeForms: [],
      slug: 'aremark',
    },
  ]

  test('Handles "word" Schema', () => {
    const expected = JSON.stringify(
      {
        '@context': 'https://schema.org/',
        '@type': 'DefinedTerm',
        '@id': 'https://old-swedish-dictionary.test/word/aremark',
        name: 'Old Swedish Dictionary - Äremark',
        description: 'utmark, ödemark.  M. G. Schybergsson, Finlands historia 1 (1902), s. 199 f.; O. Ahlbäck i &quot;Saga och sed&quot; 1962, s. 22 f.',
        inDefinedTermSet: 'https://old-swedish-dictionary.test',
      },
    )

    const result = getWordSchema(words[0])

    expect(result).toEqual(expected)
  })

  test('Handles "letter" Schema', () => {
    const expected = JSON.stringify(
      {
        '@context': 'https://schema.org/',
        '@type': 'DefinedTermSet',
        '@id': 'https://old-swedish-dictionary.test/letter/ae',
        name: 'Old Swedish Dictionary - Letter Ä',
        description: 'Old Swedish words starting with letter Ä',
      },
    )

    const result = getLetterSchema(words)

    expect(result).toEqual(expected)
  })

  test('Handles "breadcrumbs" Schema', () => {
    const expected = JSON.stringify(
      {
        '@context': 'https://schema.org/',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'First breadcrumb',
            item: 'https://old-swedish-dictionary.test/first-link',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Second breadcrumb',
            item: 'https://old-swedish-dictionary.test/second-link',
          },
        ],
      },
    )

    const breadcrumbs = [
      {
        label: 'First breadcrumb',
        url: '/first-link',
      },
      {
        label: 'Second breadcrumb',
        url: '/second-link',
      },
    ]
    const result = getBreadcrumbsSchema(breadcrumbs)

    expect(result).toEqual(expected)
  })

  test('Handles "default" Schema', () => {
    const expected = JSON.stringify(
      {
        '@context': 'https://schema.org/',
        '@type': 'DefinedTermSet',
        '@id': 'https://old-swedish-dictionary.test',
        name: 'Old Swedish Dictionary',
        description: 'Old Swedish words with Swedish definitions',
      },
    )

    const result = getDefaultSchema()

    expect(result).toEqual(expected)
  })
})

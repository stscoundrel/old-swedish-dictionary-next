import { getWordLink, getLetterLink, getMainUrl } from 'lib/utils/links'

describe('Link utils', () => {
  process.env.NEXT_PUBLIC_SITE_URL = 'https://old-swedish-dictionary.test'

  const word = {
    headword: 'släkträknan',
    partOfSpeech: 'nn',
    grammaticalAspect: '',
    definitions: [
      'geneaogia idest generacio släkt ok släkträknan  GU C 20 s. 309 .',
    ],
    alternativeForms: [],
    slug: 'slaktraknan',
  }

  const letter = {
    letter: 'æ',
    slug: 'ae',
  }

  test('Formats word links', () => {
    const expected = 'https://old-swedish-dictionary.test/word/slaktraknan'

    const result = getWordLink(word)

    expect(result).toEqual(expected)
  })

  test('Formats letter links', () => {
    const expected = 'https://old-swedish-dictionary.test/letter/ae'

    const result = getLetterLink(letter)

    expect(result).toEqual(expected)
  })

  test('Gets frontpage link', () => {
    const expected = process.env.NEXT_PUBLIC_SITE_URL
    const result = getMainUrl()

    expect(result).toEqual(expected)
  })
})

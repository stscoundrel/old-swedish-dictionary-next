import { getDefaultSEO, getLetterSEO, getWordSEO } from 'lib/utils/seo'
import { DictionaryEntry } from 'lib/models/dictionary'

describe('SEO / meta tags tests', () => {
  const words: DictionaryEntry[] = [
    {
      headword: 'afköra',
      partOfSpeech: 'vb',
      grammaticalAspect: 'v.',
      definitions: [
        ' , vräka. hafwi wald han afköra  GS 43 (1416?). af ty ahren (för areno) han landboen afkörer ib.',
      ],
      alternativeForms: ['-bortdrifva'],
      slug: 'afkora',
    },
    {
      headword: 'afköra 2',
      partOfSpeech: 'vb',
      grammaticalAspect: 'v.',
      definitions: [
        ' , vräka. hafwi wald han afköra  GS 43 (1416?). af ty ahren (för areno) han landboen afkörer ib.',
      ],
      alternativeForms: ['-bortdrifva'],
      slug: 'afkora',
    }, {
      headword: 'afköra 3',
      partOfSpeech: 'vb',
      grammaticalAspect: 'v.',
      definitions: [
        ' , vräka. hafwi wald han afköra  GS 43 (1416?). af ty ahren (för areno) han landboen afkörer ib.',
      ],
      alternativeForms: ['-bortdrifva'],
      slug: 'afkora',
    }, {
      headword: 'afköra 4',
      partOfSpeech: 'vb',
      grammaticalAspect: 'v.',
      definitions: [
        ' , vräka. hafwi wald han afköra  GS 43 (1416?). af ty ahren (för areno) han landboen afkörer ib.',
      ],
      alternativeForms: ['-bortdrifva'],
      slug: 'afkora',
    }, {
      headword: 'afköra 5',
      partOfSpeech: 'vb',
      grammaticalAspect: 'v.',
      definitions: [
        ' , vräka. hafwi wald han afköra  GS 43 (1416?). af ty ahren (för areno) han landboen afkörer ib.',
      ],
      alternativeForms: ['-bortdrifva'],
      slug: 'afkora',
    }, {
      headword: 'afköra 6',
      partOfSpeech: 'vb',
      grammaticalAspect: 'v.',
      definitions: [
        ' , vräka. hafwi wald han afköra  GS 43 (1416?). af ty ahren (för areno) han landboen afkörer ib.',
      ],
      alternativeForms: ['-bortdrifva'],
      slug: 'afkora',
    },
  ]

  test('Handles "word" seo fields', () => {
    const expected = {
      title: 'Old Swedish Dictionary - Afköra',
      description: 'Meaning of Old Swedish word "afköra" in Swedish',
    }

    const result = getWordSEO(words[0])

    expect(result).toEqual(expected)
  })

  test('Handles "letter" seo fields', () => {
    const expected = {
      title: 'Old Swedish words starting with letter A',
      description: 'Meanings of Old Swedish words starting with "A", such as afköra, afköra 2, afköra 3 and afköra 4',
    }
    const letter = {
      letter: 'a',
      slug: 'a',
    }
    const result = getLetterSEO(letter, words)

    expect(result).toEqual(expected)
  })

  test('Handles default response', () => {
    const expected = {
      title: 'Old Swedish Dictionary - K.F. Söderwall',
      description: 'Medieval Swedish Dictionary - 40 000+ words and definitions',
    }

    const result = getDefaultSEO()

    expect(result).toEqual(expected)
  })
})

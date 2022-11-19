import { getDictionary } from 'old-swedish-dictionary'
import {
  getAllWords, getByLetter, getWord, getAlphabet,
} from 'lib/services/dictionary'

describe('Dictionary tests', () => {
  const dictionary = getAllWords()
  const originalDictionary = getDictionary()
  test('Dictionary is not identical with original source.', () => {
    expect(originalDictionary).not.toMatchObject(dictionary)
  })

  test('Enrichened dictionary has equal amount of entries as the original one', () => {
    expect(originalDictionary.length).toBe(getAllWords().length)
  })

  test('Dictionary has added url slugs to source', () => {
    dictionary.forEach((entry) => {
      expect(Object.keys(entry)).toEqual(['headword', 'partOfSpeech', 'grammaticalAspect', 'information', 'definitions', 'alternativeForms', 'slug'])
    })
  })

  test('Dictionary slugs are unique', () => {
    const slugs = new Set()

    dictionary.forEach((entry) => {
      slugs.add(entry.slug)
    })

    expect(slugs.size).toEqual(dictionary.length)
  })

  test('Dictionary gets words by letter', () => {
    const aWords = getByLetter('A')
    const bWords = getByLetter('b')
    const þWords = getByLetter('þ')

    expect(aWords.length).toBe(1773)
    expect(bWords.length).toBe(3016)
    expect(þWords.length).toBe(357)

    aWords.forEach((entry) => {
      expect(entry.headword.charAt(0).toLowerCase()).toBe('a')
    })

    bWords.forEach((entry) => {
      expect(entry.headword.charAt(0).toLowerCase()).toBe('b')
    })

    þWords.forEach((entry) => {
      expect(entry.headword.charAt(0).toLowerCase()).toBe('þ')
    })
  })

  test('Dictionary gets individual words by slug', () => {
    const entry1 = getWord('afkora')
    const entry2 = getWord('slaktraknan')
    const entry3 = getWord('aremark')

    const expected1 = {
      headword: 'afköra',
      partOfSpeech: ['vb'],
      grammaticalAspect: 'v.',
      information: '',
      definitions: [
        ' , vräka. hafwi wald han afköra  GS 43 (1416?). af ty ahren (för areno) han landboen afkörer ib.',
      ],
      alternativeForms: ['-bortdrifva'],
      slug: 'afkora',
    }

    const expected2 = {
      headword: 'släkträknan',
      partOfSpeech: ['nn'],
      grammaticalAspect: '',
      information: '',
      definitions: [
        'geneaogia idest generacio släkt ok släkträknan  GU C 20 s. 309 .',
      ],
      alternativeForms: [],
      slug: 'slaktraknan',
    }

    const expected3 = {
      headword: 'äremark',
      partOfSpeech: ['nn'],
      grammaticalAspect: '',
      information: '',
      definitions: [
        'utmark, ödemark.  M. G. Schybergsson, Finlands historia 1 (1902), s. 199 f.; O. Ahlbäck i "Saga och sed" 1962, s. 22 f.',
      ],
      alternativeForms: [],
      slug: 'aremark',
    }

    expect(entry1).toEqual(expected1)
    expect(entry2).toEqual(expected2)
    expect(entry3).toEqual(expected3)
  })

  test('Dictionary gets alphabet constants with slugs', () => {
    const alphabet = getAlphabet()

    const expectedKeys = ['letter', 'slug']

    alphabet.forEach((entry) => {
      expect(Object.keys(entry)).toEqual(expectedKeys)
    })
  })
})

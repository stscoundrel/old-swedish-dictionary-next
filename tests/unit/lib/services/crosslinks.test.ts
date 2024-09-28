import {
  DictionaryEntry,
} from 'lib/models/dictionary'
import {
  getCrossLinks,
} from 'lib/services/crosslinks'

// Entry which does not produce crosslink matches.
const entry1: DictionaryEntry = {
  headword: 'äremark',
  partOfSpeech: ['nn'],
  grammaticalAspect: '',
  information: '',
  definitions: [
    'utmark, ödemark.  M. G. Schybergsson, Finlands historia 1 (1902), s. 199 f.; O. Ahlbäck i &quot;Saga och sed&quot; 1962, s. 22 f.',
  ],
  alternativeForms: [],
  slug: 'aremark',
}

// Dummy entry which produces crosslinks
const entry2: DictionaryEntry = {
  headword: '',
  partOfSpeech: [''],
  grammaticalAspect: '',
  definitions: [],
  alternativeForms: [],
  information: '',
  slug: 'fadhir',

}

describe('Crosslinks service tests', () => {
  test('Returns empty list when no crosslinks results', () => {
    const result = getCrossLinks(entry1)
    expect(result.length).toEqual(0)
  })

  test('Returns crosslinks when slugs match', () => {
    const expected = [
      {
        url: 'https://cleasby-vigfusson-dictionary.vercel.app/word/fadir',
        source: 'old-norse',
      },
      {
        url: 'https://old-icelandic.vercel.app/word/fadir',
        source: 'old-icelandic',
      },
      {
        url: 'https://old-norwegian-dictionary.vercel.app/word/fadir',
        source: 'old-norwegian',
      },
      {
        url: 'https://old-danish-dictionary.vercel.app/word/fader',
        source: 'old-danish',
      },
    ]

    const result = getCrossLinks(entry2)
    expect(result).toEqual(expected)
  })
})

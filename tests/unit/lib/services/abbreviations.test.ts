import {
  getAbbreviations,
  addAbbreviationsToContent,
} from 'lib/services/abbreviations'

describe('Abbreviations tests', () => {
  const entry = {
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

  test('Abbreviations have expected content', () => {
    const result = getAbbreviations(entry)

    const expected = [
      {
        abbreviation: 'GU',
        explanation: 'Glossarii Latino-Svethici specimen vetustum. E cod. mscr. Bibliothecæ Reg. Acad. Upsal. Diss. Ups. præs. J. H. Schröder. 1845.',
      },
      {
        abbreviation: 'GU C 20',
        explanation: 'Latinskt-Svenskt glossarium efter Cod. Ups. C 20. Utg. av E. Neuman. S 1--583. 1918--20, (hand 2) s. 1--169. 1938--42. SFSS.',
      },
    ]

    expect(result).toEqual(expected)
  })

  test('Adds abbr tags to content', () => {
    const abbreviations = getAbbreviations(entry)

    const result = addAbbreviationsToContent(entry.definitions[0], abbreviations)
    const expected = 'geneaogia idest generacio släkt ok släkträknan  <abbr title="Glossarii Latino-Svethici specimen vetustum. E cod. mscr. Bibliothecæ Reg. Acad. Upsal. Diss. Ups. præs. J. H. Schröder. 1845.">GU</abbr> C 20 s. 309 .'

    expect(result).toEqual(expected)
  })
})

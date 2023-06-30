import { getAllWords } from 'lib/services/dictionary'
import { searchDictionary } from 'lib/services/search'

describe('Search tests', () => {
  const dictionary = getAllWords()

  test('Finds results from descriptions', () => {
    const result = searchDictionary('afköra', dictionary)

    const expected = {
      headword: 'afköra',
      slug: 'afkora',
      foundIn: [', vräka. hafwi wald han <mark>afköra</mark>  GS 43 (1416?). af ty ahren (för areno) han landboen afkörer ib.'],
    }

    expect(result[0]).toEqual(expected)
  })

  test('Finds results from headword', () => {
    const result = searchDictionary('afköra', dictionary, ['headword'])

    const expected = {
      headword: 'afköra',
      slug: 'afkora',
      foundIn: ['In headword: <mark>afköra</mark>'],
    }

    expect(result[0]).toEqual(expected)
  })

  test('Finds results from slug', () => {
    // This query should only match slug due to thorn decoding.
    const result = searchDictionary('thiufstulin', dictionary)

    const expected = {
      headword: 'þiufstulin',
      slug: 'thiufstulin',
      foundIn: ['In headword: þiufstulin'],
    }

    expect(result[0]).toEqual(expected)
  })
})

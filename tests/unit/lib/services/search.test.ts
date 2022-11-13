import { getAllWords } from 'lib/services/dictionary'
import { searchDictionary } from 'lib/services/search'

describe('Search tests', () => {
  const dictionary = getAllWords()

  test('Finds results from descriptions', () => {
    const result = searchDictionary('afköra', dictionary)

    const expected = {
      headword: 'afköra',
      partOfSpeech: 'vb',
      grammaticalAspect: 'v.',
      definitions: [
        ' , vräka. hafwi wald han afköra  GS 43 (1416?). af ty ahren (för areno) han landboen afkörer ib.',
      ],
      alternativeForms: ['-bortdrifva'],
      slug: 'afkora',
      foundIn: [' , vräka. hafwi wald han <mark>afköra</mark>  GS 43 (1416?). af ty ahren (för areno) han landboen afkörer ib.'],
    }

    expect(result[0]).toEqual(expected)
  })

  test('Finds results from headword', () => {
    const result = searchDictionary('afköra', dictionary, ['headword'])

    const expected = {
      headword: 'afköra',
      partOfSpeech: 'vb',
      grammaticalAspect: 'v.',
      definitions: [
        ' , vräka. hafwi wald han afköra  GS 43 (1416?). af ty ahren (för areno) han landboen afkörer ib.',
      ],
      alternativeForms: ['-bortdrifva'],
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
      partOfSpeech: '',
      grammaticalAspect: '',
      definitions: [
        'stulen.  &quot; ther war i räthen en kätil grypa och i nysthe, ther för:ne sigeridh kändes widher, ath tz war henne thiwf stolith i fran &quot; JTb 36 ( 1463) .  ib 61 ( 1462) . thenne ii vitnadha ok swora mz gäwa kwnsson vm en silffskedh . . . som honom war tiwffsvlin ib 75 (1481).',
      ],
      alternativeForms: ['tiwff- . ', '-stolin )'],
      slug: 'thiufstulin',
      foundIn: ['In headword: þiufstulin'],
    }

    expect(result[0]).toEqual(expected)
  })
})

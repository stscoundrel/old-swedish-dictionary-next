import { createRenderer, renderToDOM } from '../../../tests/helpers/react'
import { DictionaryEntry } from 'lib/models/dictionary'
import {
  Crosslink,
  DictionarySource,
} from 'scandinavian-dictionary-crosslinker'
import WordDefinition from './index'

const entry: DictionaryEntry = {
  headword: 'afköra',
  partOfSpeech: ['vb'],
  grammaticalAspect: 'v.',
  definitions: [
    ' , vräka. hafwi wald han afköra  GS 43 (1416?). af ty ahren (för areno) han landboen afkörer ib.',
  ],
  information: '',
  alternativeForms: ['-bortdrifva'],
  slug: 'afkora',
}

// Optional fields artificially removed.
const minimalEntry: DictionaryEntry = {
  headword: 'afkora', // purposefully removing ö to produce no alternative spelling forms.
  definitions: [
    ' , vräka. hafwi wald han afköra  GS 43 (1416?). af ty ahren (för areno) han landboen afkörer ib.',
  ],
  partOfSpeech: [],
  grammaticalAspect: '',
  information: '',
  alternativeForms: [],
  slug: 'afkora',
}

const abbreviations = [
  {
    abbreviation: 'GS',
    explanation:
      'Några Gambla Stadgar [såsom bihang till Biärköa-Rätten utg. af J. Hadorph]. 1687.',
  },
]

const crosslinks: Crosslink[] = [
  {
    url: 'https://cleasby-vigfusson-dictionary.vercel.app/word/fadir',
    source: DictionarySource.OldNorse,
  },
  {
    url: 'https://old-icelandic.vercel.app/word/fadir',
    source: DictionarySource.OldIcelandic,
  },
  {
    url: 'https://old-norwegian-dictionary.vercel.app/word/fadir',
    source: DictionarySource.OldNorwegian,
  },
]

const runes = 'ᛆᚠᚴᚮᚱᛆ'

describe('WordDefinition component -> full entry', () => {
  test('Does not crash', () => {
    renderToDOM(
      <WordDefinition
        entry={entry}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
        similarEntries={[entry]}
        runes={runes}
      />,
    )
  })

  test('Matches snapshot', () => {
    const tree = createRenderer(
      <WordDefinition
        entry={entry}
        similarEntries={[entry]}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
        runes={runes}
      />,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Has correct title', () => {
    const tree = createRenderer(
      <WordDefinition
        entry={entry}
        similarEntries={[entry]}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
        runes={runes}
      />,
    )
    const { root } = tree

    expect(root.findByType('h1').children).toEqual(['Afköra'])
  })
})

describe('WordDefinition component -> minimal entry', () => {
  test('Does not crash', () => {
    renderToDOM(
      <WordDefinition
        entry={minimalEntry}
        similarEntries={[]}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
        runes={runes}
      />,
    )
  })

  test('Matches snapshot', () => {
    const tree = createRenderer(
      <WordDefinition
        entry={minimalEntry}
        similarEntries={[]}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
        runes={runes}
      />,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Has correct title', () => {
    const tree = createRenderer(
      <WordDefinition
        entry={minimalEntry}
        similarEntries={[]}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
        runes={runes}
      />,
    )
    const { root } = tree

    expect(root.findByType('h1').children).toEqual(['Afkora'])
  })
})

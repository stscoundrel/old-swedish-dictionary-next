import { DictionaryEntry } from 'lib/models/dictionary'
import ReactDOM from 'react-dom/client'
import renderer from 'react-test-renderer'
import { Crosslink, DictionarySource } from 'scandinavian-dictionary-crosslinker'
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
    explanation: 'Några Gambla Stadgar [såsom bihang till Biärköa-Rätten utg. af J. Hadorph]. 1687.',
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

describe('WordDefinition component -> full entry', () => {
  test('Does not crash', () => {
    const div = document.createElement('div')
    const root = ReactDOM.createRoot(div)
    root.render(
      <WordDefinition
        entry={entry}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
        similarEntries={[entry]}
      />,
    )
  })

  test('Matches snapshot', () => {
    const tree = renderer.create(
      <WordDefinition
        entry={entry}
        similarEntries={[entry]}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
      />,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Has correct title', () => {
    const tree = renderer.create(
      <WordDefinition
        entry={entry}
        similarEntries={[entry]}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
      />,
    )
    const { root } = tree

    expect(root.findByType('h1').children).toEqual(['Afköra'])
  })
})

describe('WordDefinition component -> minimal entry', () => {
  test('Does not crash', () => {
    const div = document.createElement('div')
    const root = ReactDOM.createRoot(div)
    root.render(
      <WordDefinition
        entry={minimalEntry}
        similarEntries={[]}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
      />,
    )
  })

  test('Matches snapshot', () => {
    const tree = renderer.create(
      <WordDefinition
        entry={minimalEntry}
        similarEntries={[]}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
      />,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Has correct title', () => {
    const tree = renderer.create(
      <WordDefinition
        entry={minimalEntry}
        similarEntries={[]}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
      />,
    )
    const { root } = tree

    expect(root.findByType('h1').children).toEqual(['Afkora'])
  })
})

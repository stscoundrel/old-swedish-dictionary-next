import { DictionaryEntry } from 'lib/models/dictionary'
import ReactDOM from 'react-dom/client'
import renderer from 'react-test-renderer'
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
  headword: 'afköra',
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

describe('WordDefinition component -> full entry', () => {
  test('Does not crash', () => {
    const div = document.createElement('div')
    const root = ReactDOM.createRoot(div)
    root.render(<WordDefinition entry={entry} abbreviations={abbreviations} />)
  })

  test('Matches snapshot', () => {
    const tree = renderer.create(
      <WordDefinition entry={entry} abbreviations={abbreviations} />,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Has correct title', () => {
    const tree = renderer.create(<WordDefinition entry={entry} abbreviations={abbreviations} />)
    const { root } = tree

    expect(root.findByType('h1').children).toEqual(['Afköra'])
  })
})

describe('WordDefinition component -> minimal entry', () => {
  test('Does not crash', () => {
    const div = document.createElement('div')
    const root = ReactDOM.createRoot(div)
    root.render(<WordDefinition entry={minimalEntry} abbreviations={abbreviations} />)
  })

  test('Matches snapshot', () => {
    const tree = renderer.create(
      <WordDefinition entry={minimalEntry} abbreviations={abbreviations} />,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Has correct title', () => {
    const tree = renderer.create(
      <WordDefinition entry={minimalEntry} abbreviations={abbreviations} />,
    )
    const { root } = tree

    expect(root.findByType('h1').children).toEqual(['Afköra'])
  })
})

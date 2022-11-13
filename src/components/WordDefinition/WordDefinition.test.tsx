import ReactDOM from 'react-dom/client'
import renderer from 'react-test-renderer'
import WordDefinition from './index'

const entry = {
  headword: 'afköra',
  partOfSpeech: 'vb',
  grammaticalAspect: 'v.',
  definitions: [
    ' , vräka. hafwi wald han afköra  GS 43 (1416?). af ty ahren (för areno) han landboen afkörer ib.',
  ],
  alternativeForms: ['-bortdrifva'],
  slug: 'afkora',
}

// Optional fields artificially removed.
const minimalEntry = {
  headword: 'afköra',
  definitions: [
    ' , vräka. hafwi wald han afköra  GS 43 (1416?). af ty ahren (för areno) han landboen afkörer ib.',
  ],
  partOfSpeech: '',
  grammaticalAspect: '',
  alternativeForms: [],
  slug: 'afkora',
}

describe('WordDefinition component -> full entry', () => {
  test('Does not crash', () => {
    const div = document.createElement('div')
    const root = ReactDOM.createRoot(div)
    root.render(<WordDefinition entry={entry} />)
  })

  test('Matches snapshot', () => {
    const tree = renderer.create(
      <WordDefinition entry={entry} />,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Has correct title', () => {
    const tree = renderer.create(<WordDefinition entry={entry} />)
    const { root } = tree

    expect(root.findByType('h1').children).toEqual(['Afköra'])
  })
})

describe('WordDefinition component -> minimal entry', () => {
  test('Does not crash', () => {
    const div = document.createElement('div')
    const root = ReactDOM.createRoot(div)
    root.render(<WordDefinition entry={minimalEntry} />)
  })

  test('Matches snapshot', () => {
    const tree = renderer.create(
      <WordDefinition entry={minimalEntry} />,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Has correct title', () => {
    const tree = renderer.create(<WordDefinition entry={minimalEntry} />)
    const { root } = tree

    expect(root.findByType('h1').children).toEqual(['Afköra'])
  })
})

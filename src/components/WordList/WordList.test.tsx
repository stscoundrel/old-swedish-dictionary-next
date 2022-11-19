import ReactDOM from 'react-dom/client'
import renderer from 'react-test-renderer'
import WordList from './index'

const words = [
  {
    headword: 'afköra',
    partOfSpeech: ['vb'],
    grammaticalAspect: 'v.',
    definitions: [
      ' , vräka. hafwi wald han afköra  GS 43 (1416?). af ty ahren (för areno) han landboen afkörer ib.',
    ],
    alternativeForms: ['-bortdrifva'],
    slug: 'afkora',
  },
  {
    headword: 'afköra 2',
    partOfSpeech: ['vb'],
    grammaticalAspect: 'v.',
    definitions: [
      ' , vräka. hafwi wald han afköra  GS 43 (1416?). af ty ahren (för areno) han landboen afkörer ib.',
    ],
    alternativeForms: ['-bortdrifva'],
    slug: 'afkora-2',
  },
  {
    headword: 'afköra 3',
    partOfSpeech: ['vb'],
    grammaticalAspect: 'v.',
    definitions: [
      ' , vräka. hafwi wald han afköra  GS 43 (1416?). af ty ahren (för areno) han landboen afkörer ib.',
    ],
    alternativeForms: ['-bortdrifva'],
    slug: 'afkora-3',
  },
  {
    headword: 'afköra 4',
    partOfSpeech: ['vb'],
    grammaticalAspect: 'v.',
    definitions: [
      ' , vräka. hafwi wald han afköra  GS 43 (1416?). af ty ahren (för areno) han landboen afkörer ib.',
    ],
    alternativeForms: ['-bortdrifva'],
    slug: 'afkora-4',
  },
]

describe('WordList component', () => {
  test('Does not crash', () => {
    const div = document.createElement('div')
    const root = ReactDOM.createRoot(div)
    root.render(<WordList words={words} />)
  })

  test('Matches snapshot', () => {
    const tree = renderer.create(<WordList words={words} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Renders correct amount of words', () => {
    const tree = renderer.create(<WordList words={words} />)
    const { root } = tree

    expect(root.findAllByType('ul').length).toEqual(1)
    expect(root.findAllByType('li').length).toEqual(4)
  })
})

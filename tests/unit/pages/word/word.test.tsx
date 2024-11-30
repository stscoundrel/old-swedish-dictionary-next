import ReactDOM from 'react-dom/client'
import Word, { getStaticProps, getStaticPaths } from 'pages/word/[word]'
import renderer from 'react-test-renderer'
import { getAlphabet } from 'lib/services/dictionary'
import { Crosslink, DictionarySource } from 'scandinavian-dictionary-crosslinker'

const mockHandler = jest.fn()

/**
 * Mock router
 */
jest.mock('next/router', () => ({
  useRouter() {
    return {
      locale: undefined,
      defaultLocale: undefined,
      asPath: '/test',
      back: mockHandler,
    }
  },
}))

const entry = {
  headword: 'afköra',
  partOfSpeech: ['vb'],
  grammaticalAspect: 'v.',
  information: '',
  definitions: [
    ', vräka. hafwi wald han afköra  GS 43 (1416?). af ty ahren (för areno) han landboen afkörer ib.',
  ],
  alternativeForms: ['-bortdrifva'],
  slug: 'afkora',
}

const letter = {
  letter: 'a',
  slug: 'a',
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

describe('Word page: render & usage', () => {
  test('Does not crash', () => {
    const div = document.createElement('div')
    const root = ReactDOM.createRoot(div)
    root.render(
      <Word
        entry={entry}
        similarEntries={[]}
        letters={getAlphabet()}
        letter={letter}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
      />,
    )
  })

  test('Matches snapshot', () => {
    const tree = renderer.create(
      <Word
        entry={entry}
        similarEntries={[]}
        letters={getAlphabet()}
        letter={letter}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
      />,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Returns null if entry is unavailable', () => {
    const tree = renderer.create(
      <Word
        entry={null}
        similarEntries={[]}
        letters={getAlphabet()}
        letter={letter}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
      />,
    ).toJSON()
    expect(tree).toBeNull()
  })

  test('Back button works', async () => {
    const tree = renderer.create(
      <Word
      entry={entry}
      similarEntries={[]}
      letters={getAlphabet()}
      letter={letter}
      abbreviations={abbreviations}
      crosslinks={crosslinks}
    />,
    )

    // Click back btn.
    await renderer.act(async () => {
      expect(mockHandler).not.toHaveBeenCalled()
      await tree.root.findByProps({ text: 'Back' }).props.action()

      // Assert mockrouter received a push.
      expect(mockHandler).toHaveBeenCalled()
      expect(mockHandler.mock.calls.length).toBe(1);
    })
  })
})

describe('Word page: data fetching', () => {
  test('getStaticPaths works', async () => {
    const result = await getStaticPaths()

    expect(result.fallback).toBe('blocking')

    // Should've build initial pages.
    expect(result.paths.length).toBe(5964)
  })

  test('getStaticProps works', async () => {
    const expected = {
      props: {
        entry,
        similarEntries: [],
        letters: getAlphabet(),
        letter,
        abbreviations,
        crosslinks: [],
      },
    }

    const result = await getStaticProps({ params: { word: 'afkora' } })

    expect(result).toEqual(expected)
  })

  test('getStaticProps finds similar entries based on slug', async () => {
    const expected = [
      {
        headword: 'fosterfadhir',
        partOfSpeech: ['nn'],
        grammaticalAspect: '',
        information: '',
        definitions: [
          'L: fosterfader, försörjare. jhesus war thera fosteradher til thera lifs bärningh  MP 4: 29.',
        ],
        alternativeForms: ['fooster- GU C 20 s. 367) ,'],
        slug: 'fosterfadhir-2',
      },
    ]

    const result = await getStaticProps({ params: { word: 'fosterfadhir' } })
    expect(result.props.similarEntries).toEqual(expected)
  })

  test('getStaticProps returns 404 redirect for unkown words', async () => {
    const expected = {
      props: {},
      notFound: true,
    }

    const result = await getStaticProps({ params: { word: 'loremipsum' } })

    expect(result).toEqual(expected)
  })
})

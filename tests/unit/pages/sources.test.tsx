import { createRenderer, renderToDOM } from '../../helpers/react'
import Sources, { getStaticProps } from 'pages/source-list'
import { getAlphabet } from 'lib/services/dictionary'
import { getAllAbbreviations } from 'lib/services/abbreviations'

describe('Sources page', () => {
  test('Does not crash', () => {
    renderToDOM(
      <Sources letters={getAlphabet()} sources={getAllAbbreviations()} />,
    )
  })

  test('Matches snapshot', () => {
    const tree = createRenderer(
      <Sources letters={getAlphabet()} sources={getAllAbbreviations()} />,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Sources page: data fetching', () => {
  test('getStaticProps works', async () => {
    const expected = {
      props: {
        letters: getAlphabet(),
        sources: getAllAbbreviations(),
      },
    }

    const result = await getStaticProps()

    expect(result).toEqual(expected)
  })
})

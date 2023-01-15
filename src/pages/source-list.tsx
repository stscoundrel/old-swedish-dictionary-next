// Services.
import { getAlphabet, AlphabetLetter } from 'lib/services/dictionary'

// Components.
import Layout from 'components/Layout'
import ContentArea from 'components/ContentArea'
import { ContentType } from 'lib/models/content-types'
import { Abbreviation, getAllAbbreviations } from 'lib/services/abbreviations'
import Abbreviations from 'components/Abbreviations'

interface SourcePageProps{
  letters: AlphabetLetter[],
  sources: Abbreviation[]
}

export async function getStaticProps() {
  const letters = getAlphabet()
  const sources = getAllAbbreviations()

  return {
    props: {
      letters,
      sources,
    },
  }
}

export default function SourceList({ letters, sources }: SourcePageProps) {
  return (
    <Layout letters={letters} letter={null} type={ContentType.SourcesPage} word={null} words={[]}>
       <ContentArea>
        <h1 className="h2">Sources list</h1>
        <p>Works and authors cited in &quot;<em>Ordbok Öfver svenska medeltids-språket</em>&quot;,
        the dictionary of Medieval Swedish by K.F Söderwall.</p>

        <p>This list includes sources for both the original volumes
            and the later released supplement</p>

      </ContentArea>

      <Abbreviations abbreviations={sources} />
    </Layout>
  )
}

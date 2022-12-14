// Services.
import { getAlphabet, AlphabetLetter } from 'lib/services/dictionary'

// Components.
import Layout from 'components/Layout'
import ContentArea from 'components/ContentArea'
import { ContentType } from 'lib/models/content-types'
import Link from 'next/link'

interface IndexProps{
  letters: AlphabetLetter[]
}

export async function getStaticProps() {
  const letters = getAlphabet()

  return {
    props: {
      letters,
    },
  }
}

export default function Index({ letters }: IndexProps) {
  return (
    <Layout letters={letters} letter={null} type={ContentType.Page} word={null} words={[]}>
       <ContentArea>
        <h1 className="h2">Old Swedish Dictionary</h1>
        <p>Online version of the &quot;<em>Ordbok Öfver svenska medeltids-språket</em>&quot;,
        the dictionary of Medieval Swedish by K.F Söderwall.</p>

        <p>The dictionary contains over 40 000 translations
          from Old Swedish to Swedish. This is the largest dictionary of the language.</p>

        <Link href="/search" className="button">
          Search the dictionary
        </Link>
      </ContentArea>

      <ContentArea>
        <h2 className="h3">What is Old Swedish?</h2>
        <p>
          Old Swedish was a language spoken in Sweden (and Finland) from 1225 to 1526.
          It is the middle stage between Old East Norse (language of the Vikings)
          and modern Swedish.
        </p>
        <p>
          Early Old Swedish was markedly different from modern Sweden:
          it had a more complex case structure and also still had the original
          Germanic three-gender system. Nouns, adjectives, pronouns and certain numerals
          were inflected in four cases.
        </p>
      </ContentArea>

      <ContentArea>
        <h2 className="h3">Written language of the dictionary</h2>
        <p>The dictionary volumes were published in the turn of 19th and 20th centuries.
          This was transition period between Modern Swedish
          (<em>nysvensk = &quot;new Swedish&quot;</em>) and
          Contemporary Swedish (<em>nusvensk = &quot;now Swedish&quot;</em>).
        </p>

        <p>Therefore, the written language of the dictionary may seem old fashioned even outside
          the parts that are written in Old Swedish
          (<em>fornsvensk = &quot;ancient Swedish&quot;</em>).
        </p>
      </ContentArea>
    </Layout>
  )
}

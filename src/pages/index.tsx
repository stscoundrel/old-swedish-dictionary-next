// Services.
import { getAlphabet, AlphabetLetter } from 'lib/services/dictionary'

// Components.
import Layout from 'components/Layout'
import ContentArea from 'components/ContentArea'
import { ContentType } from 'lib/models/content-types'

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
        <p>There is no strength in numbers</p>
        <p>Have no such misconception</p>
        <p>But when you need me be assured I wont be far away</p>
      </ContentArea>
    </Layout>
  )
}

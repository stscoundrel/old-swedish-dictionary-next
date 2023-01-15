import { useRouter } from 'next/router'

// Services.
import { getWord, getAlphabet, AlphabetLetter } from 'lib/services/dictionary'

// Utils.
import { Redirect404ResponseSchema, redirect404 } from 'lib/utils/redirect-404'

// Components.
import Layout from 'components/Layout'
import WordDefinition from 'components/WordDefinition'
import Button from 'components/Button'
import { ContentType } from 'lib/models/content-types'
import { DictionaryEntry } from 'lib/models/dictionary'
import { decodeLetter } from 'lib/utils/slugs'
import { Abbreviation, getAbbreviations } from 'lib/services/abbreviations'

interface WordPageProps{
    entry: DictionaryEntry,
    letters: AlphabetLetter[],
    letter: AlphabetLetter,
    abbreviations: Abbreviation[]
}

interface WordPageParams{
    params: {
        word: string
    }
}

interface LetterPageStaticPathsResponseSchema{
    paths: string[]
    fallback: string | boolean
}

interface WordPageStaticPropsResponseSchema{
    props: WordPageProps
}

export async function getStaticPaths(): Promise<LetterPageStaticPathsResponseSchema> {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

/**
 * Get word by slug.
 */
export async function getStaticProps(
  { params }: WordPageParams,
): Promise<WordPageStaticPropsResponseSchema | Redirect404ResponseSchema> {
  const { word } = params
  const entry = getWord(word)

  if (!entry) {
    return redirect404()
  }

  const letters = getAlphabet()
  const letter = letters.filter(
    (alphabetLetter) => alphabetLetter.letter === decodeLetter(
      entry.headword.charAt(0).toLocaleLowerCase(),
    ),
  )[0]
  const abbreviations = getAbbreviations(entry)

  return {
    props: {
      entry,
      letter,
      letters,
      abbreviations,
    },
  }
}

export default function Word({
  entry, letters, letter, abbreviations,
}: WordPageProps) {
  const router = useRouter()

  if (!entry) {
    return null
  }

  return (
    <Layout
        type={ContentType.Word}
        word={entry}
        words={[]}
        letters={letters}
        letter={letter}
    >
      <WordDefinition entry={entry} abbreviations={abbreviations}/>
      <Button text="Back" action={() => router.back()} />
    </Layout>
  )
}

import { useRouter } from 'next/router'

// Services.
import {
  getWord, getAlphabet, AlphabetLetter, getSimilarWords,
} from 'lib/services/dictionary'

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
import { Crosslink } from 'scandinavian-dictionary-crosslinker'
import { getCrossLinks } from 'lib/services/crosslinks'

interface WordPageProps{
    entry: DictionaryEntry,
    similarEntries: DictionaryEntry[],
    letters: AlphabetLetter[],
    letter: AlphabetLetter,
    abbreviations: Abbreviation[],
    crosslinks: Crosslink[],
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

  const similarEntries = getSimilarWords(entry)
  const letters = getAlphabet()
  const letter = letters.filter(
    (alphabetLetter) => alphabetLetter.letter === decodeLetter(
      entry.headword.charAt(0).toLocaleLowerCase(),
    ),
  )[0]
  const abbreviations = getAbbreviations(entry)
  const crosslinks = getCrossLinks(entry)

  return {
    props: {
      entry,
      similarEntries,
      letter,
      letters,
      abbreviations,
      crosslinks,
    },
  }
}

export default function Word({
  entry, similarEntries = [], letters, letter, abbreviations, crosslinks,
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
      <WordDefinition
        entry={entry}
        similarEntries={similarEntries}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
      />
      <Button text="Back" action={() => router.back()} />
    </Layout>
  )
}

import { useRouter } from 'next/router'

// Services.
import {
  getWord, getAlphabet, type AlphabetLetter, getSimilarWords,
  getInitialWordsToBuild,
} from 'lib/services/dictionary'
import { medievalFuthork } from 'riimut'

// Utils.
import { type Redirect404ResponseSchema, redirect404 } from 'lib/utils/redirect-404'

// Components.
import Layout from 'components/Layout'
import WordDefinition from 'components/WordDefinition'
import Button from 'components/Button'
import { ContentType } from 'lib/models/content-types'
import type { DictionaryEntry } from 'lib/models/dictionary'
import { decodeLetter } from 'lib/utils/slugs'
import { type Abbreviation, getAbbreviations } from 'lib/services/abbreviations'
import type { Crosslink } from 'scandinavian-dictionary-crosslinker'
import { getCrossLinks } from 'lib/services/crosslinks'

interface WordPageProps{
    entry: DictionaryEntry,
    similarEntries: DictionaryEntry[],
    letters: AlphabetLetter[],
    letter: AlphabetLetter,
    abbreviations: Abbreviation[],
    crosslinks: Crosslink[],
    runes: string,
}

interface WordPageParams{
    params: {
        word: string
    }
}

interface WordPath{
  params: {
      word: string
  }
}

interface LetterPageStaticPathsResponseSchema{
    paths: WordPath[]
    fallback: string | boolean
}

interface WordPageStaticPropsResponseSchema{
    props: WordPageProps
}

/**
 * There are too many word paths for Vercel to build.
 * It hits 16 000 file limit.
 *
 * Build around 6000 pages initially and rest as they are accessed
 * or remotely revalidated via API.
 */
export async function getStaticPaths(): Promise<LetterPageStaticPathsResponseSchema> {
  const initialPages = getInitialWordsToBuild()

  return {
    paths: initialPages.map((slug) => ({
      params: { word: slug },
    })),
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
  const runes = medievalFuthork.lettersToRunes(entry.headword)

  return {
    props: {
      entry,
      similarEntries,
      letter,
      letters,
      abbreviations,
      crosslinks,
      runes,
    },
  }
}

export default function Word({
  entry, similarEntries = [], letters, letter, abbreviations, crosslinks, runes,
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
        runes={runes}
      />
      <Button text="Back" action={() => router.back()} />
    </Layout>
  )
}

import { getDictionary } from 'old-swedish-dictionary'
import { slugifyWord, slugifyLetter } from '../utils/slugs'
import { OriginalDictionaryEntry, DictionaryEntry } from '../models/dictionary'

let cachedDictionary: DictionaryEntry[] | null = null

export interface AlphabetLetter {
  letter: string,
  slug: string,
}

const addSlugs = (words: OriginalDictionaryEntry[]): DictionaryEntry[] => {
  const existingSlugs = {}

  const formattedWords = words.map((word) => {
    let slug = slugifyWord(word.headword).toLowerCase()

    if (existingSlugs[slug]) {
      // Double slug, make unique.
      existingSlugs[slug] += 1
      slug = `${slug}-${existingSlugs[slug]}`
    } else {
      existingSlugs[slug] = 1
    }

    return {
      ...word,
      slug,
    }
  })

  return formattedWords
}

export const getAllWords = (): DictionaryEntry[] => {
  if (cachedDictionary) return cachedDictionary

  const words = getDictionary()

  /**
   * Add URL safe slugs.
   */
  const formattedWords = addSlugs(words)

  cachedDictionary = formattedWords

  return formattedWords
}

export const getByLetter = (letter: string): DictionaryEntry[] => {
  const words = getAllWords()
  const byLetter = words.filter((entry) => (
    entry.headword.charAt(0).toLowerCase() === letter.toLowerCase()))

  return byLetter
}

export const getWord = (word: string): DictionaryEntry => (
  getAllWords().filter((entry) => entry.slug === word)[0]
)

export const getAlphabet = (): AlphabetLetter[] => {
  // Outputted from dictionary src with scripts/output-alphabet.js
  const letters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'y',
    'ä',
    'ö',
    'þ',
  ]

  const formattedLetters = letters.map((letter) => ({
    letter,
    slug: slugifyLetter(letter),
  }))

  return formattedLetters
}

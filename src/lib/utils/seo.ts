import { joinWithConj } from 'teljari'
import { capitalize } from 'lib/utils/strings'
import { DictionaryEntry } from 'lib/models/dictionary'
import { AlphabetLetter } from 'lib/services/dictionary'

interface SEO {
  title: string,
  description: string
}

export const getLetterSEO = (alphabetLetter: AlphabetLetter, content: DictionaryEntry[]): SEO => {
  const firstWords = content.slice(0, 4).map((entry) => entry.headword.toLowerCase())
  return {
    title: `Old Swedish words starting with letter ${alphabetLetter.letter.toUpperCase()}`,
    description: `Meanings of Old Swedish words starting with "${firstWords[0].charAt(0).toUpperCase()}", such as ${joinWithConj(firstWords)}`,
  }
}

export const getWordSEO = (word: DictionaryEntry): SEO => ({
  title: `Old Swedish Dictionary - ${capitalize(word.headword)}`,
  description: `Meaning of Old Swedish word "${word.headword.toLowerCase()}" in Swedish`,
})

export const getDefaultSEO = () : SEO => ({
  title: 'Old Swedish Dictionary - K.F. Söderwall',
  description: 'Medieval Swedish Dictionary - 40 000+ words and definitions',
})

import { DictionaryEntry } from 'lib/models/dictionary'
import { AlphabetLetter } from 'lib/services/dictionary'

export const getWordLink = (word: DictionaryEntry): string => `${process.env.NEXT_PUBLIC_SITE_URL}/word/${word.slug}`

export const getLetterLink = (letter: AlphabetLetter): string => `${process.env.NEXT_PUBLIC_SITE_URL}/letter/${letter.slug}`

export const getWordPath = (word: DictionaryEntry): string => `/word/${word.slug}`

export const getMainUrl = (): string => process.env.NEXT_PUBLIC_SITE_URL ?? ''

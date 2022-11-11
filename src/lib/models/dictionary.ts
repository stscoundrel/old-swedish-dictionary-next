import { DictionaryEntry as RawDictionaryEntry } from 'old-swedish-dictionary'

export type OriginalDictionaryEntry = RawDictionaryEntry

export interface DictionaryEntry extends RawDictionaryEntry {
    slug: string,
}

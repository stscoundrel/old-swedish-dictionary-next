import OSAbbreviations from 'old-swedish-dictionary-abbreviations'
import { abbreviate } from 'abbreviatrix'
import { DictionaryEntry } from 'old-swedish-dictionary'

export interface Abbreviation{
    abbreviation: string,
    explanation: string
}

export const getAbbreviations = ({ definitions }: DictionaryEntry): Abbreviation[] => {
  const combinedAbbreviations: Abbreviation[] = []
  const abbreviationSet = new Set()

  definitions.forEach((definition) => {
    const abbreviations = OSAbbreviations.findWorksAndAuthors(definition)
    abbreviations.forEach((explanation, abbreviation) => {
      if (!abbreviationSet.has(abbreviation)) {
        abbreviationSet.add(abbreviation)
        combinedAbbreviations.push({ abbreviation, explanation })
      }
    })
  })

  return combinedAbbreviations;
}

/**
 * Add abbr tags to content with explanations.
 */
export const addAbbreviationsToContent = (
  content: string,
  abbreviations: Abbreviation[],
): string => {
  let result = content

  abbreviations.forEach(({ abbreviation, explanation }) => {
    result = abbreviate(abbreviation, explanation, result)
  })

  return result
}

export const getAllAbbreviations = (): Abbreviation[] => {
  const abbrs = OSAbbreviations.getWorksAndAuthorsMapping()
  return Array
    .from(abbrs, ([abbreviation, explanation]) => ({ explanation, abbreviation }))
    .sort((a, b) => a.abbreviation.localeCompare(b.abbreviation))
}

import { getCrosslinks as getAllCrossLinks, Crosslink, getOldSwedishCrosslinks } from 'scandinavian-dictionary-crosslinker'
import { DictionaryEntry } from 'lib/models/dictionary'

export type { Crosslink } from 'scandinavian-dictionary-crosslinker'

let crossLinkCache: Record<string, Crosslink[]> | null = null

const populateCrossLinks = () => {
  if (!crossLinkCache) {
    crossLinkCache = getAllCrossLinks()
  }

  return crossLinkCache
}

export const getCrossLinks = (entry: DictionaryEntry): Crosslink[] => {
  const crosslinks = populateCrossLinks()
  if (Object.prototype.hasOwnProperty.call(crosslinks, entry.slug)) {
    return getOldSwedishCrosslinks(entry.slug)
  }

  return []
}

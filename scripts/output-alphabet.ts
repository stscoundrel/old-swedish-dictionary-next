import { getDictionary } from 'old-swedish-dictionary'

function main() {
  const dictionary = getDictionary()
  const firstLetters = new Set()

  dictionary.forEach((dictionaryEntry) => {
    firstLetters.add(dictionaryEntry.headword.charAt(0))
  })

  console.log(firstLetters)
}

main()

export {}
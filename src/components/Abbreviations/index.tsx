import { Abbreviation } from 'lib/services/abbreviations'
import Link from 'next/link'
import styles from './Abbreviations.module.scss'

interface AbbreviationProps{
  abbreviations: Abbreviation[]
}

export default function Abbreviations({ abbreviations }: AbbreviationProps) {
  const shouldShowAllAbbreviationsLink = (): boolean => {
    if (abbreviations.length > 200) {
      // Sources index, no need to link to the same page.
      return false
    }

    if (abbreviations.length > 0) {
      return true
    }

    return false
  }

  return (
    <div className={styles.abbreviations}>
      {abbreviations.length > 0
        && <div className={styles.column}>
          <h4>Works and authors cited:</h4>
          {abbreviations.map(({ abbreviation, explanation }) => (
            <dl className={styles.wrap} key={abbreviation}>
              <dt className={styles.abbreviation}>
                <strong>{abbreviation}</strong>
              </dt>
              <dd className={styles.explanation}>{explanation}</dd>
            </dl>
          ))}
        </div>
      }

      {shouldShowAllAbbreviationsLink()
      && <Link href="/source-list" className={styles.link} prefetch={false}>
       ➞ See all works cited in the dictionary
      </Link>
      }
    </div>
  )
}

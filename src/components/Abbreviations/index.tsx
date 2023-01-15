import { Abbreviation } from 'lib/services/abbreviations'
import Link from 'next/link'
import styles from './Abbreviations.module.scss'

interface AbbreviationProps{
  abbreviations: Abbreviation[]
}

export default function Abbreviations({ abbreviations }: AbbreviationProps) {
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

      <Link href="/source-list" className={styles.link}>
       ➞ See all works cited in the dictionary
      </Link>
    </div>
  )
}

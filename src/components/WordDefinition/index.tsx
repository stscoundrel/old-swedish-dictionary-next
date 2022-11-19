import { capitalize } from 'lib/utils/strings'
import { lettersToRunes } from 'futhork'
import { DictionaryEntry } from 'lib/models/dictionary'
import styles from './WordDefinition.module.scss'

interface WordDefinitionProps{
  entry: DictionaryEntry,
}

export default function WordDefinition({ entry }: WordDefinitionProps) {
  const {
    headword, partOfSpeech, grammaticalAspect, information, definitions, alternativeForms,
  } = entry

  return (
    <article className={styles.section}>
      <header>
        <h1 lang="non-swe">{capitalize(headword)}</h1>

        <small className={styles.subHeading}>
          Old Swedish Dictionary - {headword.toLowerCase()}
        </small>
        <p>Meaning of Old Swedish word <em>&quot;{headword}&quot;</em> in Swedish.</p>
        <p>As defined by K.F Söderwall&apos;s dictionary of Medieval Swedish:</p>
      </header>

      {definitions.length > 1 && <p><dfn className="capitalize">{headword}</dfn> Old Swedish word can mean:</p>}
      {definitions.map((definition, index) => (
        <dl className={styles.definitionList} key={`definition-${index}`}>
          <dt><strong>{headword}</strong></dt>
          <dd
            lang="swe"
          >{definition}</dd>
        </dl>
      ))}

      {partOfSpeech.length > 0 && <p><strong>Part of speech:</strong> <em>{partOfSpeech.join(', ')}</em></p>}
      {information
        && <p><strong>Additional information:</strong> <em>{information}</em></p>
      }
      {grammaticalAspect
        && <p><strong>Grammatical aspect:</strong> <em>{grammaticalAspect}</em></p>
      }

      {alternativeForms.length > 0
        && <>
        <strong>Alternative forms or notes:</strong>
        <ul className="list">
          {alternativeForms.map((alternativeForm, index) => <li key={`alternativeForm-${index}`}>{alternativeForm}</li>)}
        </ul>
        </>
      }

      <p>Possible runic inscription in <em>Medieval Futhork</em>:
        <span className={styles.rune}>{ lettersToRunes(headword) }</span><br />
      <small>Medieval Runes were used in Sweden from 12th to 17th centuries.</small>
      </p>

    </article>
  )
}

import { DictionaryEntry } from 'lib/models/dictionary'
import Link from 'next/link'
import styles from './WordLink.module.scss'

interface WordLinkProps{
  data: DictionaryEntry
}

export default function WordLink({ data: { slug, headword } }: WordLinkProps) {
  return (
   <Link key={`link${slug}`} href={`/word/${slug}`} className={styles.link}>
      {headword.toLowerCase()}
    </Link>
  )
}

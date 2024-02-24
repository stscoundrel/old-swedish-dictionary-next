import ExternalLink from 'components/ExternalLink'
import LetterLink from 'components/LetterLink'
import ContentArea from 'components/ContentArea'
import { AlphabetLetter } from 'lib/services/dictionary'
import styles from './Footer.module.scss'

interface FooterProps{
  letters: AlphabetLetter[]
}

export default function Footer({ letters }: FooterProps) {
  return (
    <footer className={styles.section}>
      <div className="container">

        <ContentArea>
          <h2>About</h2>
          <p>Based on &quot;Ordbok Öfver svenska medeltids-språket&quot; by K.F Söderwall.</p>
          <p>It is the largest Old Swedish dictionary.
            The original volumes were published in 1884 - 1918, with additional supplement
            added in 1953 - 1973.</p>
        </ContentArea>

        <ContentArea>
          <h3 className='h4'>Old Swedish language</h3>
          <p>
            Old Swedish developed from Old East Norse, the eastern dialect of Old Norse,
            at the end of the Viking Age.
          </p>
          <p>Early Old Swedish was spoken from about
            1225 until about 1375, and Late Old Swedish was spoken from about 1375 until about 1526.
          </p>

          <p>Also known as &quot;Medieval Swedish&quot;,
            or &quot;Fornsvenska&quot; in modern Swedish
          </p>
        </ContentArea>

        <ContentArea>
          <h4>Old Norse language</h4>
          <p>Old Norse was a North Germanic language that was spoken by inhabitants of
          Scandinavia and their overseas settlements from about the 7th to the 15th centuries.</p>

          <p>Also known as &quot;the viking language&quot;,
          &quot;Old Nordic&quot;, or
          &quot;Old Scandinavian&quot;</p>
        </ContentArea>

        <div className={styles.navs}>
          <nav className={styles.nav}>
            <h4 className={styles.navTitle}>Dictionary project</h4>
            <ul>
              <li>
                <ExternalLink
                  title="Source code"
                  href="https://github.com/stscoundrel/old-swedish-dictionary-next"
                />
              </li>
              <li>
                <ExternalLink
                  title="Data source"
                  href="https://github.com/stscoundrel/old-swedish-dictionary"
                />
              </li>
              <li>
                <ExternalLink
                  title="Data source builder"
                  href="https://github.com/stscoundrel/old-swedish-dictionary-builder"
                />
              </li>
            </ul>
          </nav>

          <nav className={styles.nav}>
            <h4 className={styles.navTitle}>Related dictionary projects</h4>
            <ul>
            <li>
                <ExternalLink
                  title="Otto Kalkar's Old Danish Dictionary"
                  href="https://old-danish-dictionary.vercel.app/"
                />
              </li>
              <li>
                <ExternalLink
                  title="Dictionary of the Old Norwegian Language"
                  href="https://old-norwegian-dictionary.vercel.app/"
                />
              </li>
              <li>
                <ExternalLink
                  title="Cleasby and Vigfusson Old Norse Dictionary"
                  href="https://cleasby-vigfusson-dictionary.vercel.app/"
                />
              </li>
              <li>
                <ExternalLink
                  title="A Concise Dictionary of Old Icelandic"
                  href="https://old-icelandic.vercel.app/"
                />
              </li>
            </ul>
          </nav>

          <nav className={styles.nav}>
            <h4 className={styles.navTitle}>Quick links</h4>
            <ul className={styles.navColumns}>
              {letters.map((entry) => (
                <li className={styles.navColumnItem} key={entry.slug}>
                  <LetterLink letter={entry} />
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <small className={styles.copyright}>{`Copyright © 2022 - ${new Date().getFullYear()}`}
          <br />
          <ExternalLink
            title="Sampo Silvennoinen / StScoundrel"
            href="https://github.com/stscoundrel"
          />
        </small>
      </div>
    </footer>
  )
}

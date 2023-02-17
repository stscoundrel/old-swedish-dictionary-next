import Link from 'next/link'

export default function SampleText() {
  return (
    <>
      <p className="h4">
        A sample of Old Swedish, early 13th century, from Westrogothic law:
      </p>
      <p>
        <em>
          <Link href="/word/drapare">Dræpær</Link> <Link href="/word/mather">maþar</Link><Link href="/word/svansker-2"> svænskan man</Link> eller <Link href="/word/smalandinge-2">smalenskæn</Link>, <Link href="/word/innan">innan</Link> konongsrikis <Link href="/word/man">man</Link>,
          eigh <Link href="/word/vastgotska">væstgøskan</Link>, bøte firi <Link href="/word/atta">atta</Link> <Link href="/word/ortogh-3">ørtogher</Link> ok þrettan markær
          ok ænga ætar <Link href="/word/bot">bot</Link>. <Link href="/word/drapare">Dræpar</Link> <Link href="/word/mather">maþær</Link> <Link href="/word/dansker-2">danskan
          man</Link> allæ <Link href="/word/norisker">noræn man</Link>,
          bøte niv markum. <Link href="/word/drapare">Dræpær</Link> <Link href="/word/mather">maþær</Link> <Link href="/word/utlandsker">vtlænskan man</Link>,
          eigh ma frid <Link href="/word/flyia">flyia</Link> or <Link href="/word/land">landi</Link> sinu oc j æth <Link href="/word/han-2">hans</Link>.
        </em>
      </p>
      <hr />

      <p>
        Translates to English as:
      </p>
      <p>
          <em>
          If someone slays a Swede or a Smålander, a man from the kingdom, but not a West Geat,
          he will pay eight örtugar and thirteen marks, but no wergild.
          If someone slays a Dane or a Norwegian, he will pay nine marks.
          If someone slays a foreigner, he shall not be banished and have to flee to his clan.
          </em>
      </p>
      <hr />
    </>
  )
}

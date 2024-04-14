import org.junit.jupiter.api.{Assertions, Test}
import utils.E2ETestCase

class WordPageTest extends E2ETestCase {
  private val wordPages: List[(String, String)] = List(
    "Annat thera" -> "annat-thera",
    "Ennät þing" -> "ennat-thing",
    "Irboteth" -> "irboteth-2",
    "Qvinzka" -> "qvinzka",
    "Villefarilse" -> "villefarilse",
    "Þiufstulin" -> "thiufstulin",
  )

  @Test
  def testWordPagesLoad(): Unit = {
    wordPages.foreach { case (title, slug) =>
      page.navigate(s"$appBaseUrl/word/$slug")
      page.waitForURL(s"$appBaseUrl/word/$slug")

      val expectedTitle = s"Old Swedish Dictionary - $title"
      val actualH1Text = page.textContent("h1")
      val actualTitle = page.title()

      Assertions.assertEquals(title, actualH1Text)
      Assertions.assertEquals(expectedTitle, actualTitle)
    }
  }
}
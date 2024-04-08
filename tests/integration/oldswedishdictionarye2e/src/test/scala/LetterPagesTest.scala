import com.microsoft.playwright.options.LoadState
import org.junit.jupiter.api.{Assertions, Test}
import utils.E2ETestCase

class LetterPagesTest extends E2ETestCase {
  private val slugToLetter: List[(String, String)] = List(
    "a" -> "A", "b" -> "B", "c" -> "C", "d" -> "D", "e" -> "E", "f" -> "F", "g" -> "G",
    "h" -> "H", "i" -> "I", "j" -> "J", "k" -> "K", "l" -> "L", "m" -> "M", "n" -> "N",
    "o" -> "O", "p" -> "P", "q" -> "Q", "r" -> "R", "s" -> "S", "t" -> "T", "u" -> "U",
    "v" -> "V", "y" -> "Y", "ae" -> "Ä", "oe" -> "Ö", "th" -> "Þ"
  )

  @Test
  def testAllLetterPages(): Unit = {
    for ((slug, letter) <- slugToLetter) {
      val expectedTitle = s"Old Swedish words starting with letter $letter"
      page.navigate(s"$appBaseUrl/letter/$slug")
      page.waitForLoadState(LoadState.NETWORKIDLE)
      Assertions.assertEquals(expectedTitle, page.title(), s"Page should have correct title for slug: $slug")
    }
  }
}
import org.junit.jupiter.api.Test
import utils.E2ETestCase

class BackButtonTest extends E2ETestCase {
  @Test
  def testBackButtonWorks(): Unit = {
    // First visit target page to ensure it's built for client navigation.
    page.navigate(s"$appBaseUrl/letter/a")
    page.navigate(s"$appBaseUrl/word/abbote")

    // Start main test.
    page.navigate(s"$appBaseUrl/letter/a")

    // Navigate to a headword page.
    page.click("text=abbote")
    page.waitForURL(s"$appBaseUrl/word/abbote")

    // Try to go back using "back" button.
    page.click("text=Back")
    page.waitForURL(s"$appBaseUrl/letter/a")
  }
}
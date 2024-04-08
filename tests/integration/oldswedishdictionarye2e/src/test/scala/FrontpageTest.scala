import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import utils.E2ETestCase

class FrontpageTest extends E2ETestCase {
  @Test
  def testFrontpageOpens(): Unit = {
    page.navigate(appBaseUrl)
  }

  @Test
  def testFrontpageHasExpectedTitle(): Unit = {
    page.navigate(appBaseUrl)
    val expectedTitle = "Old Swedish Dictionary - K.F. Söderwall"
    val actualTitle = page.title()
    assertEquals(expectedTitle, actualTitle)
  }
}
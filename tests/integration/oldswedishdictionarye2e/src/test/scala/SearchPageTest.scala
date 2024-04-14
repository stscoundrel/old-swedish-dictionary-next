import com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat
import org.junit.jupiter.api.{BeforeEach, Test}
import utils.{E2ETestCase, ViewPortUtils}

class SearchPageTest extends E2ETestCase {
  @BeforeEach
  def forceDesktopSize(): Unit = {
    ViewPortUtils.setDesktopSize(page)
  }

  @Test
  def testSearchBarWorks(): Unit = {
    page.navigate(appBaseUrl)

    // Type in search bar.
    page.getByTestId("searchbar-input").fill("abbote")
    page.getByTestId("searchbar-submit").click()
    page.waitForURL(s"$appBaseUrl/search?query=abbote")
  }

  @Test
  def testSearchPageKeepsSearchedKeywordInUrlUpdated(): Unit = {
    page.navigate(s"$appBaseUrl/search")

    // Type in search bar.
    page.getByTestId("searchbar-input").fill("skaplare")
    page.getByTestId("searchbar-submit").click()
    page.waitForURL(s"$appBaseUrl/search?query=skaplare")
  }

  @Test
  def testSearchPageKeepsCriteriaInUrl(): Unit = {
    page.navigate(s"$appBaseUrl/search")

    // Type in search bar & change condition
    page.getByTestId("searchform-input").fill("skaplare")
    page.check("input[name=headword]")
    page.getByTestId("searchform-submit").click()

    // Should've parsed both headword & criteria in the url.
    page.waitForURL(s"$appBaseUrl/search?query=skaplare&criteria=headword")
  }

  @Test
  def testSearchPageYieldsExpectedAmountOfResults(): Unit = {
    page.navigate(s"$appBaseUrl/search")

    // Search for "man" in headwords
    page.getByTestId("searchform-input").fill("man")
    page.check("input[name=headword]")
    page.getByTestId("searchform-submit").click()
    page.waitForURL(s"$appBaseUrl/search?query=man&criteria=headword")

    // Should find max allowed headwords.
    assertThat(page.locator("main > ul > li")).hasCount(100)

    // Search for "mann" in headwords
    page.getByTestId("searchform-input").fill("mann")
    page.getByTestId("searchform-submit").click()
    page.waitForURL(s"$appBaseUrl/search?query=mann&criteria=headword")

    // Should find 45 result.
    assertThat(page.locator("main > ul > li")).hasCount(45)
  }
}

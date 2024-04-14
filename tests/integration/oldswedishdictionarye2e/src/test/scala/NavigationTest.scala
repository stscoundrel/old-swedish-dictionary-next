import org.junit.jupiter.api.{Assertions, Test}
import utils.{E2ETestCase, ViewPortUtils}

class NavigationTest extends E2ETestCase {
  @Test
  def testDesktopNavigationWorks(): Unit = {
    ViewPortUtils.setDesktopSize(page)

    page.navigate(s"$appBaseUrl/")

    // Click on the link to the letter 'a'
    page.click("a[href='/letter/a']")
    page.waitForURL(s"$appBaseUrl/letter/a")

    // Click on the link to the letter 'b'
    page.click("a[href='/letter/b']")
    page.waitForURL(s"$appBaseUrl/letter/b")
  }

  @Test
  def testMobileNavigationWorks(): Unit = {
    ViewPortUtils.setMobileSize(page)

    page.navigate(s"$appBaseUrl/")

    // Open mobile menu
    page.click("div[aria-label='Open menu']")

    // Click on the link to the letter 'a' from the mobile menu
    page.click("a[href='/letter/a']:visible")
    page.waitForURL(s"$appBaseUrl/letter/a")

    // Open mobile menu again
    page.click("div[aria-label='Open menu']")

    // Click on the link to the letter 'ö' from the mobile menu
    page.click("a[href='/letter/oe']:visible")
    page.waitForURL(s"$appBaseUrl/letter/oe")
  }

  @Test
  def testMobileHomeIconWorks(): Unit = {
    ViewPortUtils.setMobileSize(page)

    page.navigate(s"$appBaseUrl/letter/a")
    page.waitForURL(s"$appBaseUrl/letter/a")

    // Click home button
    page.click("img[alt='To home']")

    // Assert page was changed to home
    page.waitForURL(s"$appBaseUrl/")
  }

  @Test
  def testBackToTopButtonWorks(): Unit = {
    page.navigate(appBaseUrl)

    // Scroll to bottom of page
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.waitForTimeout(1000)

    // Assert we're not at the top of the page
    val scrollY = page.evaluate("window.scrollY").asInstanceOf[Int]
    assert(scrollY != 0)

    // Click back to top
    page.click("div[aria-label='Back to top']")
    page.waitForTimeout(2000)

    // Should have scrolled back up
    val scrollYAfterClick = page.evaluate("window.scrollY").asInstanceOf[Int]
    Assertions.assertEquals(0, scrollYAfterClick)
  }
}
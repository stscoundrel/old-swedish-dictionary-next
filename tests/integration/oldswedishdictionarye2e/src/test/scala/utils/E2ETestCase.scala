package utils

import com.microsoft.playwright.{Browser, BrowserContext, Page, Playwright}
import org.junit.jupiter.api._

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
abstract class E2ETestCase {
  protected val appBaseUrl: String = "http://localhost:3000"
  protected var page: Page = _
  // Shared between all tests in the class.
  private var playwright: Playwright = _
  private var browser: Browser = _
  // New instance for each test method.
  private var context: BrowserContext = _

  @BeforeAll
  def launchBrowser(): Unit = {
    playwright = Playwright.create()
    browser = playwright.chromium().launch()
  }

  @AfterAll
  def closeBrowser(): Unit = {
    playwright.close()
  }

  @BeforeEach
  def createContextAndPage(): Unit = {
    context = browser.newContext()
    page = context.newPage()
  }

  @AfterEach
  def closeContext(): Unit = {
    context.close()
  }
}
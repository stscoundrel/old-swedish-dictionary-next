import com.microsoft.playwright.Page
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import utils.E2ETestCase

class PwaSupportTest extends E2ETestCase {
  @Test
  def testWorkerRegistersAndPrecachesManifest(): Unit = {
    page.navigate(appBaseUrl)
    assertEquals("/manifest.json", page.locator("link[rel=manifest]").getAttribute("href"))
    page.waitForFunction(
      "() => navigator.serviceWorker.controller !== null",
      null,
      new Page.WaitForFunctionOptions().setTimeout(15000)
    )
    assertEquals(s"$appBaseUrl/sw.js", page.evaluate("() => navigator.serviceWorker.controller.scriptURL"))
    val manifestCached = page.evaluate("""async () => {
      const registration = await navigator.serviceWorker.ready;
      const manifest = await caches.match('/manifest.json', {ignoreSearch: true});
      return registration.scope === location.origin + '/' && manifest?.ok === true;
    }""")
    assertEquals(java.lang.Boolean.TRUE, manifestCached)
  }
}

package utils

import com.microsoft.playwright.Page

object ViewPortUtils {
  def setDesktopSize(page: Page): Unit = {
    page.setViewportSize(1600, 1200)
  }

  def setMobileSize(page: Page): Unit = {
    page.setViewportSize(375, 660)
  }
}
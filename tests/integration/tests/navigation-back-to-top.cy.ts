it('Back to top button works', () => {
  cy.visit('/word/rosenrodher')

  // Scroll to bottom of page, assert we're there.
  cy.scrollTo('bottom')
    .window()
    .its('scrollY')
    .should('not.equal', 0)

  // Click back to top.
  cy.get('div[aria-label="Back to top"]').click({ force: true })

  // Should have scrolled back up.
  cy.window().its('scrollY').should('equal', 0)
})

export {};

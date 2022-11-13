it('Search bar works', () => {
  // Ensure screen is large enough for desktop menu.
  cy.viewport('macbook-15')

  cy.visit('/')

  // Type in search bar.
  cy.get('input[type="search"]').first().type('afköra')
  cy.get('button[type="submit"').click()

  // Assert we entered search page with correct param.
  cy.location('pathname').should('equal', '/search')
  cy.location('search').should('equal', '?query=afk%C3%B6ra')
})

it('Search page keeps searched keyword in url updated', () => {
  // Ensure screen is large enough for desktop menu.
  cy.viewport('macbook-15')

  cy.visit('/search')

  // Type in search bar.
  cy.get('input[type="search"]').last().type('utafköra')
  cy.get('button[type="submit"').last().click()

  // Assert query params were updated
  cy.location('pathname').should('equal', '/search')
  cy.location('search').should('contain', 'query=utafk%C3%B6ra')
})

it('Search page keeps criterias in url', () => {
  // Ensure screen is large enough for desktop menu.
  cy.viewport('macbook-15')

  cy.visit('/search')

  // Type in search bar.
  cy.get('input[type="search"]').last().type('afköra')

  // Change condition
  cy.get('input[name="headword"]').click()
  cy.get('button[type="submit"').last().click()

  // Assert query params were updated
  cy.location('pathname').should('equal', '/search')
  cy.location('search').should('contain', 'criteria=headword')
})

it('Search page yields expected amount of results', () => {
  // Ensure screen is large enough for desktop menu.
  cy.viewport('macbook-15')

  cy.visit('/search')

  // Search for "grund" in headwords
  cy.get('input[type="search"]').last().type('grund')
  cy.get('input[name="headword"]').click()
  cy.get('button[type="submit"').last().click()

  // Should find 43 headwords.
  cy.get('main > ul').last().find('> li').should('have.length', 43)

  // Search for "rätte" in headwords
  cy.get('input[type="search"]').last().clear().type('rätte')
  cy.get('button[type="submit"').last().click()

  // Should find 38 result.
  cy.get('main > ul').last().find('> li').should('have.length', 38)
})

export {};

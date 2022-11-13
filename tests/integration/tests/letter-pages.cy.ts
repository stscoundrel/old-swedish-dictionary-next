describe('By letter archives', () => {
  const letterSlugs = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'y',
    'ae',
    'oe',
    'th',
  ]

  letterSlugs.forEach((letterSlug) => {
    it(`Loads ${letterSlug}`, () => {
      cy.visit(`/letter/${letterSlug}`)
    })
  })
})

export {}

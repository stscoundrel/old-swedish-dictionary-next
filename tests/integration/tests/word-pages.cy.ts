describe('Word pages', () => {
  const wordPages = [
    ['Annat thera', 'annat-thera'],
    ['Ennät þing', 'ennat-thing'],
    ['Irboteth', 'irboteth-2'],
    ['Qvinzka', 'qvinzka'],
    ['Villefarilse', 'villefarilse'],
    ['Þiufstulin', 'thiufstulin'],
  ]

  wordPages.forEach(([title, slug]) => {
    it(`Loads ${title}`, () => {
      cy.visit(`/word/${slug}`)
    })
  })
})

export {};

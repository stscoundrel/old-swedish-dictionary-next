import React from 'react'
import renderer from 'react-test-renderer'
import Abbreviations from './index'

describe('Abbreviations component', () => {
  const abbreviations = [
    {
      abbreviation: 'GU',
      explanation: 'Glossarii Latino-Svethici specimen vetustum. E cod. mscr. Bibliothecæ Reg. Acad. Upsal. Diss. Ups. præs. J. H. Schröder. 1845.',
    },
    {
      abbreviation: 'GU C 20',
      explanation: 'Latinskt-Svenskt glossarium efter Cod. Ups. C 20. Utg. av E. Neuman. S 1--583. 1918--20, (hand 2) s. 1--169. 1938--42. SFSS.',
    },
  ]

  test('Matches the snapshot', () => {
    const tree = renderer.create(
      <Abbreviations abbreviations={abbreviations} />,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

import { slugifyLetter, decodeLetter, slugifyWord } from 'lib/utils/slugs'

describe('Slug utils', () => {
  test('Slugifys letters', () => {
    expect(slugifyLetter('ö')).toEqual('oe')
    expect(slugifyLetter('ä')).toEqual('ae')
    expect(slugifyLetter('þ')).toEqual('th')
  })

  test('Slugifys words', () => {
    expect(slugifyWord('äimänkäki')).toEqual('aimankaki')
  })

  test('Decodes letters', () => {
    expect(decodeLetter('oe')).toEqual('ö')
    expect(decodeLetter('ae')).toEqual('ä')
    expect(decodeLetter('th')).toEqual('þ')
    expect(decodeLetter('a')).toEqual('a')
  })
})

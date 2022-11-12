import { getBreadcrumbs } from 'lib/utils/breadcrumbs'

describe('Breadcrumb utils', () => {
  test('Formats breadcrumbs for frontpage', () => {
    const expected = [
      {
        label: 'Old Swedish Dictionary',
        url: '/',
      },
    ]

    const input = {
      letter: null,
      word: null,
    }

    const result = getBreadcrumbs(input)

    expect(result).toEqual(expected)
  })

  test('Formats breadcrumbs for a letter page', () => {
    const expected = [
      {
        label: 'Old Swedish Dictionary',
        url: '/',
      },
      {
        label: 'Letter Þ',
        url: '/letter/th',
      },
    ]

    const input = {
      letter: 'þ',
      word: null,
    }

    const result = getBreadcrumbs(input)

    expect(result).toEqual(expected)
  })

  test('Formats breadcrumbs for a word page', () => {
    const expected = [
      {
        label: 'Old Swedish Dictionary',
        url: '/',
      },
      {
        label: 'Letter Þ',
        url: '/letter/th',
      },
      {
        label: 'Þægr',
        url: '/word/thaegr',
      },
    ]

    const input = {
      letter: 'þ',
      word: 'þægr',
    }

    const result = getBreadcrumbs(input)

    expect(result).toEqual(expected)
  })
})

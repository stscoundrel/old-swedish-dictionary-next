import ReactDOM from 'react-dom/client'
import renderer from 'react-test-renderer'
import Head from './index'

describe('Head component', () => {
  test('Does not crash', () => {
    const div = document.createElement('div')
    const root = ReactDOM.createRoot(div)
    root.render(<Head />)
  })

  test('Matches snapshot', () => {
    const tree = renderer.create(<Head />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

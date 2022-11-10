import ReactDOM from 'react-dom/client'
import renderer from 'react-test-renderer'
import Footer from './index'

describe('Footer component', () => {
  test('Does not crash', () => {
    const div = document.createElement('div')
    const root = ReactDOM.createRoot(div)
    root.render(<Footer />)
  })

  test('Matches snapshot', () => {
    const tree = renderer.create(<Footer />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

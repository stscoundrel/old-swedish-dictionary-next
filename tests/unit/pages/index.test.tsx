import ReactDOM from 'react-dom/client'
import Index from 'pages/index'
import renderer from 'react-test-renderer'

describe('Index page', () => {
  test('Does not crash', () => {
    const div = document.createElement('div')
    const root = ReactDOM.createRoot(div)
    root.render(<Index />)
  })

  test('Matches snapshot', () => {
    const tree = renderer.create(<Index />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

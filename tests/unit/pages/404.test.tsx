import ReactDOM from 'react-dom/client'
import Page404 from 'pages/404'
import renderer from 'react-test-renderer'

describe('404 page page', () => {
  test('Does not crash', () => {
    const div = document.createElement('div')
    const root = ReactDOM.createRoot(div)
    root.render(<Page404/>)
  })

  test('Matches snapshot', () => {
    const tree = renderer.create(<Page404 />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

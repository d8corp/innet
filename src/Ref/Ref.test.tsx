import innet, {Ref} from '..'
import renderElement from '../utils/test/renderElement'

describe('ref', () => {
  test('simple', () => {
    const ref = new Ref()
    const element = renderElement(<div ref={ref} />)
    expect(ref.value).toBeInstanceOf(HTMLDivElement)
    expect(ref.value).toBe(element.querySelector('div'))
  })
  test('template ref', () => {
    const ref = new Ref()
    function Test (props) {
      return <div ref={props.ref} />
    }
    const element = renderElement(<Test ref={ref} />)
    expect(ref.value).toBeInstanceOf(HTMLDivElement)
    expect(ref.value).toBe(element.querySelector('div'))
  })
})

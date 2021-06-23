import {Context} from '.'
import getHTML from '../utils/test/getHTML'
import renderElement from '../utils/test/renderElement'
import {State} from 'watch-state'
import innet from '..'

describe('Context', () => {
  test('simple', () => {
    const color = new Context('red')
    function Theme (props, children) {
      return color.provide(props.color, children)
    }
    function Color () {
      return color.value
    }
    expect(getHTML(renderElement(<Color />))).toBe('red')
    expect(getHTML(renderElement(<Theme color='black'><Color /></Theme>))).toBe('black')
    expect(getHTML(renderElement(
      <Theme color='black'>
        <Color />
        &
        <Theme color='white'>
          <Color />
        </Theme>
      </Theme>
    ))).toBe('black&white')
  })
  test('with state', () => {
    const show = new State(false)
    const color = new Context('red')
    function Theme (props, children) {
      return color.provide(props.color, children)
    }
    function Color () {
      return () => show.value && color.value
    }

    const element1 = renderElement(<Color />)
    const element2 = renderElement(<Theme color='black'><Color /></Theme>)
    const element3 = renderElement(
      <Theme color='black'>
        <Color />
        &
        <Theme color='white'>
          <Color />
        </Theme>
      </Theme>
    )

    expect(getHTML(element1)).toBe('')
    expect(getHTML(element2)).toBe('')
    expect(getHTML(element3)).toBe('&')

    show.value = true

    expect(getHTML(element1)).toBe('red')
    expect(getHTML(element2)).toBe('black')
    expect(getHTML(element3)).toBe('black&white')
  })
})

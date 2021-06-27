import innet, {
  Ref,
  Component,
  after, append, before, remove
} from '.'
import {State} from 'watch-state'
import getHTML from './utils/test/getHTML'
import renderElement from './utils/test/renderElement'

describe('innet', () => {
  describe('native fragment', () => {
    test('simple', () => {
      const div = document.createElement('div')
      const div1 = document.createElement('div')
      div1.className = 'div1'
      div1.innerHTML = 'test'
      append(div, div1)

      expect(div.innerHTML).toBe('<div class="div1">test</div>')

      const div2 = document.createElement('div')
      div2.className = 'div2'

      before(div1, div2)

      expect(div.innerHTML).toBe('<div class="div2"></div><div class="div1">test</div>')


      after(div1, div2)

      expect(div.innerHTML).toBe('<div class="div1">test</div><div class="div2"></div>')
    })
    test('parent fragment', () => {
      const div = document.createElement('div')
      const fragment = document.createComment('')
      const div1 = document.createElement('div')
      div1.className = 'div1'

      append(div, fragment)

      expect(div.innerHTML).toBe('<!---->')

      append(fragment, div1)

      expect(div.innerHTML).toBe('<div class="div1"></div><!---->')

      expect(div1._parent).toBe(fragment)

      after(fragment, div1)

      expect(div1._parent).toBe(undefined)
      expect(div.innerHTML).toBe('<!----><div class="div1"></div>')

      before(fragment, div1)

      expect(div.innerHTML).toBe('<div class="div1"></div><!---->')

      remove(fragment)

      expect(div.innerHTML).toBe('<div class="div1"></div>')
    })
    test('move fragment', () => {
      const div = document.createElement('div')
      const div1 = document.createElement('div')
      const div2 = document.createElement('div')
      const fragment = document.createComment('')

      div1.className = 'div1'
      div2.className = 'div2'
      append(div, fragment)
      append(fragment, div1)

      expect(div.innerHTML).toBe('<div class="div1"></div><!---->')

      append(div, div2)
      expect(div.innerHTML).toBe('<div class="div1"></div><!----><div class="div2"></div>')

      after(div2, fragment)
      expect(div.innerHTML).toBe('<div class="div2"></div><div class="div1"></div><!---->')

      before(div2, fragment)
      expect(div.innerHTML).toBe('<div class="div1"></div><!----><div class="div2"></div>')
    })
    test('move around fragment', () => {
      const div = document.createElement('div')
      const div1 = document.createElement('div')
      const div2 = document.createElement('div')
      const fragment = document.createComment('')

      div1.className = 'div1'
      div2.className = 'div2'
      append(div, fragment)
      append(fragment, div1)

      expect(div.innerHTML).toBe('<div class="div1"></div><!---->')

      after(fragment, div2)

      expect(div.innerHTML).toBe('<div class="div1"></div><!----><div class="div2"></div>')

      before(fragment, div2)

      expect(div.innerHTML).toBe('<div class="div2"></div><div class="div1"></div><!---->')

      before(div2, div1)

      expect(div.innerHTML).toBe('<div class="div1"></div><div class="div2"></div><!---->')

      remove(fragment)

      expect(div.innerHTML).toBe('<div class="div1"></div><div class="div2"></div>')
    })
    test('a fragment in a fragment', () => {
      const div = document.createElement('div')
      const div1 = document.createElement('div')
      const div2 = document.createElement('div')
      const fragment1 = document.createComment('fragment1')
      const fragment2 = document.createComment('fragment2')

      div1.className = 'div1'
      div2.className = 'div2'

      append(div, fragment1)
      append(fragment1, div1)
      append(fragment1, fragment2)
      append(fragment2, div2)

      expect(div.innerHTML).toBe('<div class="div1"></div><div class="div2"></div><!--fragment2--><!--fragment1-->')
      expect(fragment2._parent).toBe(fragment1)
      expect(div1._parent).toBe(fragment1)
      expect(div2._parent).toBe(fragment2)

      before(fragment1, fragment2)

      expect(div2._parent).toBe(fragment2)
      expect(fragment2._parent).toBe(undefined)
      expect(div.innerHTML).toBe('<div class="div2"></div><!--fragment2--><div class="div1"></div><!--fragment1-->')

      remove(fragment1)
      expect(div.innerHTML).toBe('<div class="div2"></div><!--fragment2-->')
    })
  })
  describe('simple', () => {
    test('empty', () => {
      const div = <div />
      expect(div).toEqual({
        type: 'div'
      })
      const element = renderElement(div)
      expect(getHTML(element)).toBe('<div></div>')
    })
    test('props', () => {
      const input = <input value='test' />
      expect(input).toEqual({
        type: 'input',
        props: {value: 'test'}
      })
      const element = renderElement(input)
      expect(getHTML(element)).toBe('<input value="test">')
    })
    test('children element', () => {
      const div = (
        <div>
          <span />
        </div>
      )
      expect(div).toEqual({
        type: 'div',
        children: [{
          type: 'span'
        }]
      })
      const element = renderElement(div)
      expect(getHTML(element)).toBe('<div><span></span></div>')
    })
    test('children string and number', () => {
      const div = (
        <div>
          {1}
          3
        </div>
      )
      expect(div).toEqual({
        type: 'div',
        children: [1, '3']
      })
      const element = renderElement(div)
      expect(getHTML(element)).toBe('<div>13</div>')
    })
    test('children undefined', () => {
      const div = (
        <div>
          {undefined}
        </div>
      )
      expect(div).toEqual({
        type: 'div',
        children: [undefined]
      })
      const element = renderElement(div)
      expect(getHTML(element)).toBe('<div></div>')
    })
    test('children NaN', () => {
      const div = (
        <div>
          {NaN}
        </div>
      )
      expect(div).toEqual({
        type: 'div',
        children: [NaN]
      })
      const element = renderElement(div)
      expect(getHTML(element)).toBe('<div>NaN</div>')
    })
    test('children null', () => {
      const div = (
        <div>
          {null}
        </div>
      )
      expect(div).toEqual({
        type: 'div',
        children: [null]
      })
      const element = renderElement(div)
      expect(getHTML(element)).toBe('<div></div>')
    })
    test('children Symbol', () => {
      const symbol = Symbol('test')
      const div = (
        <div>
          {symbol}
        </div>
      )
      expect(div).toEqual({
        type: 'div',
        children: [symbol]
      })
      const element = renderElement(div)
      expect(getHTML(element)).toBe('<div></div>')
    })
    test('children boolean', () => {
      const div = (
        <div>
          {true}
          {false}
        </div>
      )
      expect(div).toEqual({
        type: 'div',
        children: [true, false]
      })
      const element = renderElement(div)
      expect(getHTML(element)).toBe('<div></div>')
    })
    // test('children array', () => {
    //   const div = (
    //     <div>
    //       {['test1', ', ', 'test2']}
    //     </div>
    //   )
    //   expect(div).toEqual({
    //     type: 'div',
    //     children: ['test1', ', ', 'test2']
    //   })
    //   const element = renderElement(div)
    //   expect(getHTML(element)).toBe('<div>test1, test2</div>')
    // })
    describe('function', () => {
      describe('stateless', () => {
        test('empty', () => {
          const testFunction = () => {}
          const div = (
            <div>
              {testFunction}
            </div>
          )
          expect(div).toEqual({
            type: 'div',
            children: [testFunction]
          })
          const element = renderElement(div)
          expect(getHTML(element)).toBe('<div></div>')
          expect(getHTML(element, true)).toBe('<div><!--testFunction--></div>')
        })
        test('string', () => {
          const func = () => 'test'
          const div = (
            <div>
              {func}
            </div>
          )
          expect(div).toEqual({
            type: 'div',
            children: [func]
          })
          const element = renderElement(div)
          expect(getHTML(element)).toBe('<div>test</div>')
        })
        test('number', () => {
          const func = () => 13
          const div = (
            <div>
              {func}
            </div>
          )
          expect(div).toEqual({
            type: 'div',
            children: [func]
          })
          const element = renderElement(div)
          expect(getHTML(element)).toBe('<div>13</div>')
        })
        test('NaN', () => {
          const func = () => NaN
          const div = (
            <div>
              {func}
            </div>
          )
          expect(div).toEqual({
            type: 'div',
            children: [func]
          })
          const element = renderElement(div)
          expect(getHTML(element)).toBe('<div>NaN</div>')
        })
        test('null', () => {
          const func = () => null
          const div = (
            <div>
              {func}
            </div>
          )
          expect(div).toEqual({
            type: 'div',
            children: [func]
          })
          const element = renderElement(div)
          expect(getHTML(element)).toBe('<div></div>')
        })
        test('Symbol', () => {
          const func = () => Symbol()
          const div = (
            <div>
              {func}
            </div>
          )
          expect(div).toEqual({
            type: 'div',
            children: [func]
          })
          const element = renderElement(div)
          expect(getHTML(element)).toBe('<div></div>')
        })
        test('boolean', () => {
          const func1 = () => true
          const func2 = () => false
          const div = (
            <div>
              {func1}
              {func2}
            </div>
          )
          expect(div).toEqual({
            type: 'div',
            children: [func1, func2]
          })
          const element = renderElement(div)
          expect(getHTML(element)).toBe('<div></div>')
        })
        test('function', () => {
          const div = (
            <div>
              {() => () => () => () => 'test'}
            </div>
          )
          const element = renderElement(div)
          expect(getHTML(element)).toBe('<div>test</div>')
        })
        describe('element', () => {
          test('empty', () => {
            const func = () => <div />
            const div = (
              <div>
                {func}
              </div>
            )
            expect(div).toEqual({
              type: 'div',
              children: [func]
            })
            const element = renderElement(div)
            expect(getHTML(element)).toBe('<div><div></div></div>')
          })
          test('props', () => {
            const func = () => <div id='test1' />
            const div = (
              <div>
                {func}
              </div>
            )
            expect(div).toEqual({
              type: 'div',
              children: [func]
            })
            const element = renderElement(div)
            expect(getHTML(element)).toBe('<div><div id="test1"></div></div>')
          })
          test('children', () => {
            const func = () => <div>test</div>
            const div = (
              <div>
                {func}
              </div>
            )
            expect(div).toEqual({
              type: 'div',
              children: [func]
            })
            const element = renderElement(div)
            expect(getHTML(element)).toBe('<div><div>test</div></div>')
          })
        })
        describe('array', () => {
          test('empty', () => {
            const func = () => []
            const div = (
              <div>
                {func}
              </div>
            )
            expect(div).toEqual({
              type: 'div',
              children: [func]
            })
            const element = renderElement(div)
            expect(getHTML(element)).toBe('<div></div>')
          })
          test('strings', () => {
            const func = () => ['test1', 'test2']
            const div = (
              <div>
                {func}
              </div>
            )
            expect(div).toEqual({
              type: 'div',
              children: [func]
            })
            const element = renderElement(div)
            expect(getHTML(element)).toBe('<div>test1test2</div>')
          })
        })
      })
      describe('stateful', () => {
        describe('children', () => {
          test('simple outside', () => {
            const show = new State(false)
            const element = renderElement(() => show.value && <div />)
            expect(getHTML(element)).toBe('')
            show.value = true
            expect(getHTML(element)).toBe('<div></div>')
          })
          test('simple inside', () => {
            const show = new State(false)
            const element = renderElement(<div>{() => show.value && 'show'}</div>)
            expect(getHTML(element)).toBe('<div></div>')
            show.value = true
            expect(getHTML(element)).toBe('<div>show</div>')
            show.value = false
            expect(getHTML(element)).toBe('<div></div>')
          })
          test('function', () => {
            const show = new State(false)
            const count = new State(0)
            const element = renderElement(<div>{() => show.value && (() => count.value)}</div>)
            expect(getHTML(element)).toBe('<div></div>')
            show.value = true
            expect(getHTML(element)).toBe('<div>0</div>')
            count.value++
            expect(getHTML(element)).toBe('<div>1</div>')
            count.value++
            expect(getHTML(element)).toBe('<div>2</div>')
            show.value = false
            expect(getHTML(element)).toBe('<div></div>')
          })
          test('array', () => {
            const show = new State(false)
            const element = renderElement(<div>{() => show.value && ['test1', 'test2']}</div>)
            expect(getHTML(element)).toBe('<div></div>')
            show.value = true
            expect(getHTML(element)).toBe('<div>test1test2</div>')
            show.value = false
            expect(getHTML(element)).toBe('<div></div>')
          })
          test('array of state', () => {
            let count = 0
            const show = new State(false)
            const count1 = new State(0)
            const count2 = new State(0)
            const element = renderElement(<div>{() => {
              count++
              return show.value && [() => count1.value, '|', () => count2.value]
            }}</div>)
            expect(count).toBe(1)
            expect(getHTML(element)).toBe('<div></div>')
            show.value = true
            expect(count).toBe(2)
            expect(getHTML(element)).toBe('<div>0|0</div>')
            count1.value = 1
            expect(count).toBe(2)
            expect(getHTML(element)).toBe('<div>1|0</div>')
            count2.value = 2
            expect(count).toBe(2)
            expect(getHTML(element)).toBe('<div>1|2</div>')
            show.value = false
            expect(count).toBe(3)
            expect(getHTML(element)).toBe('<div></div>')
          })
        })
        describe('props', () => {
          test('simple attribute', () => {
            const id = new State('test')
            const element = renderElement(<div id={() => id.value}/>)
            expect(getHTML(element)).toBe('<div id="test"></div>')
            id.value = 'test1'
            expect(getHTML(element)).toBe('<div id="test1"></div>')
          })
          test('couple elements', () => {
            const id = new State('test')
            const element = renderElement(<div class={() => `root_${id.value}`}><div class={() => id.value} /></div>)
            expect(getHTML(element)).toBe('<div class="root_test"><div class="test"></div></div>')
            id.value = 'test1'
            expect(getHTML(element)).toBe('<div class="root_test1"><div class="test1"></div></div>')
          })
          test('events', () => {
            const id = new State(0)
            const element = renderElement(<div class={() => `test_${id.value}`} onclick={() => id.value++} />)
            const div: HTMLDivElement = element.querySelector('.test_0')
            expect(getHTML(element)).toBe('<div class="test_0"></div>')
            div.click()
            expect(getHTML(element)).toBe('<div class="test_1"></div>')
            div.click()
            expect(getHTML(element)).toBe('<div class="test_2"></div>')
          })
        })
      })
    })
    describe('fragment', () => {
      test('empty', () => {
        const element = renderElement(<></>)
        expect(getHTML(element)).toBe('')
      })
      test('string', () => {
        expect(getHTML(renderElement(<>test</>))).toBe('test')
        expect(getHTML(renderElement(<>{'test'}</>))).toBe('test')
      })
      test('number', () => {
        const element = renderElement(<>{1}</>)
        expect(getHTML(element)).toBe('1')
      })
      test('element', () => {
        const element = renderElement(<><span /></>)
        expect(getHTML(element)).toBe('<span></span>')
      })
      test('function', () => {
        const name = new State('Mike')
        const element = renderElement(<>{() => name.value}</>)
        expect(getHTML(element)).toBe('Mike')
        name.value = 'Test'
        expect(getHTML(element)).toBe('Test')
      })
    })
  })
  describe('template', () => {
    test('empty', () => {
      function Test () {
        return undefined
      }
      const test = <Test />
      expect(test).toEqual({
        type: Test
      })
      const element = renderElement(test)
      expect(getHTML(element)).toBe('')
    })
    test('string', () => {
      function Test () {
        return 'test'
      }
      const element = renderElement(<Test />)
      expect(getHTML(element)).toBe('test')
    })
    test('number', () => {
      function Test () {
        return 420
      }
      const element = renderElement(<Test />)
      expect(getHTML(element)).toBe('420')
    })
    test('element', () => {
      function Test () {
        return <div />
      }
      const element = renderElement(<Test />)
      expect(getHTML(element)).toBe('<div></div>')
    })
    test('props', () => {
      function Test ({test = ''} = {}) {
        return <div class={test} />
      }
      expect(getHTML(renderElement(<Test />))).toBe('<div class=""></div>')
      expect(getHTML(renderElement(<Test test='passed' />))).toBe('<div class="passed"></div>')
    })
    test('condition props', () => {
      function Test ({show = false} = {}) {
        return show && <div />
      }
      expect(getHTML(renderElement(<Test />))).toBe('')
      expect(getHTML(renderElement(<Test show />))).toBe('<div></div>')
    })
    test('state inside', () => {
      function Test ({show = false} = {}) {
        const showState = new State(show)
        return () => showState.value && <button onclick={() => showState.value = false}>hide</button>
      }
      const element1 = renderElement(<Test />)
      const element2 = renderElement(<Test show />)

      expect(getHTML(element1)).toBe('')
      expect(getHTML(element2)).toBe('<button>hide</button>')

      element2.querySelector('button').click()

      expect(getHTML(element2)).toBe('')
    })
    test('state outside', () => {
      const showState = new State(false)
      function Test ({show}) {
        return () => show() && 'test'
      }
      const element1 = renderElement(<Test show={() => showState.value} />)
      const element2 = renderElement(<Test show={() => !showState.value} />)

      expect(getHTML(element1)).toBe('')
      expect(getHTML(element2)).toBe('test')

      showState.value = true

      expect(getHTML(element1)).toBe('test')
      expect(getHTML(element2)).toBe('')
    })
  })
  describe('Component', () => {
    test('empty', () => {
      class Test {
        render () {
          return undefined
        }
      }
      const element = renderElement(<Test />)
      expect(getHTML(element)).toBe('')
    })
    test('string', () => {
      class Test implements Component {
        render () {
          return 'test'
        }
      }
      const element = renderElement(<Test />)
      expect(getHTML(element)).toBe('test')
    })
    test('number', () => {
      class Test implements Component {
        render () {
          return 420
        }
      }
      const element = renderElement(<Test />)
      expect(getHTML(element)).toBe('420')
    })
    test('element', () => {
      class Test implements Component {
        render () {
          return <div />
        }
      }
      const element = renderElement(<Test />)
      expect(getHTML(element)).toBe('<div></div>')
    })
    test('props', () => {
      class Test implements Component {
        render ({test = ''} = {}) {
          return <div class={test} />
        }
      }
      expect(getHTML(renderElement(<Test />))).toBe('<div class=""></div>')
      expect(getHTML(renderElement(<Test test='passed' />))).toBe('<div class="passed"></div>')
    })
    test('condition props', () => {
      class Test implements Component {
        render ({show = false} = {}) {
          return show && <div />
        }
      }
      expect(getHTML(renderElement(<Test />))).toBe('')
      expect(getHTML(renderElement(<Test show />))).toBe('<div></div>')
    })
    test('state inside', () => {
      class Test implements Component {
        render ({show = false} = {}) {
          const showState = new State(show)
          return () => showState.value && <button onclick={() => showState.value = false}>hide</button>
        }
      }
      const element1 = renderElement(<Test />)
      const element2 = renderElement(<Test show />)

      expect(getHTML(element1)).toBe('')
      expect(getHTML(element2)).toBe('<button>hide</button>')

      element2.querySelector('button').click()

      expect(getHTML(element2)).toBe('')
    })
    test('state outside', () => {
      class Test implements Component {
        render ({show}) {
          return () => show() && 'test'
        }
      }
      const showState = new State(false)
      const element1 = renderElement(<Test show={() => showState.value} />)
      const element2 = renderElement(<Test show={() => !showState.value} />)

      expect(getHTML(element1)).toBe('')
      expect(getHTML(element2)).toBe('test')

      showState.value = true

      expect(getHTML(element1)).toBe('test')
      expect(getHTML(element2)).toBe('')
    })
  })
  describe('destructor', () => {
    test('component', () => {
      let count = 0
      const show = new State(false)
      class Test implements Component {
        destructor () {
          count++
        }
        render () {
          return 'foo'
        }
      }
      const element = renderElement(() => show.value && <Test />)
      expect(getHTML(element)).toBe('')
      expect(count).toBe(0)

      show.value = true
      expect(getHTML(element)).toBe('foo')
      expect(count).toBe(0)

      show.value = false
      expect(getHTML(element)).toBe('')
      expect(count).toBe(1)

      show.value = true
      expect(getHTML(element)).toBe('foo')
      expect(count).toBe(1)

      show.value = false
      expect(getHTML(element)).toBe('')
      expect(count).toBe(2)
    })
  })
  describe('mounted', () => {
    test('simple', () => {
      let count = 0
      const show = new State(false)
      class Test implements Component {
        mounted () {
          count++
        }
        render () {
          return 'foo'
        }
      }
      const element = renderElement(() => show.value && <Test />)
      expect(getHTML(element)).toBe('')
      expect(count).toBe(0)

      show.value = true
      expect(getHTML(element)).toBe('foo')
      expect(count).toBe(1)

      show.value = false
      expect(getHTML(element)).toBe('')
      expect(count).toBe(1)

      show.value = true
      expect(getHTML(element)).toBe('foo')
      expect(count).toBe(2)
    })
    test('ref', () => {
      const log = []
      const ref = new Ref()
      const show = new State(false)
      class Test implements Component {
        mounted () {
          log.push(ref.value)
        }
        render () {
          return <div ref={ref} />
        }
      }
      const element = renderElement(() => show.value && <Test />)
      expect(getHTML(element)).toBe('')
      expect(log.length).toBe(0)

      show.value = true
      expect(getHTML(element)).toBe('<div></div>')
      expect(log.length).toBe(1)
      expect(log[0]).toBe(element.querySelector('div'))

      show.value = false
      expect(getHTML(element)).toBe('')
      expect(log.length).toBe(1)

      show.value = true
      expect(getHTML(element)).toBe('<div></div>')
      expect(log.length).toBe(2)
      expect(log[1]).toBe(element.querySelector('div'))
    })
  })
  describe('security', () => {
    test('html injection', () => {
      const element = renderElement('<div>test</div>')
      expect(element.querySelector('div')).toBe(null)
    })
  })
  describe('readme', () => {
    test('Hello World!', () => {
      const div = document.createElement('div')

      innet('Hello World!', div)

      expect(div.innerHTML).toBe('Hello World!')
    })
    test('number', () => {
      const div = document.createElement('div')

      innet(1, div)

      expect(div.innerHTML).toBe('1')
    })
    test('undefined', () => {
      const div = document.createElement('div')

      innet(undefined, div)

      expect(div.innerHTML).toBe('')
    })
    test('div', () => {
      const div1 = document.createElement('div')
      const div2 = document.createElement('div')
      div2.innerHTML = 'Hello World!'
      innet(div2, div1)
      expect(div1.innerHTML).toBe('<div>Hello World!</div>')
    })
    test('elements', () => {
      const div1 = document.createElement('div')
      expect(innet({
        type: 'div',
        children: ['Hello World!']
      }, div1).innerHTML).toBe('<div>Hello World!</div>')
    })
    test('template', () => {
      const div = document.createElement('div')

      function HelloWorld () {
        return 'Hello World!'
      }

      innet({
        type: HelloWorld,
      }, div)

      expect(div.innerHTML).toBe('Hello World!')
    })
  })
  describe('types', () => {
    test('Component', () => {
      function Test1 ({asg}) {
        return asg
      }

      innet({
        type: Test1,
        props: {

        }
      })
    })
  })
})

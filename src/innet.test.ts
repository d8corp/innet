import innet, { createHandler, HandlerPlugin, NEXT, useApp, useHandler } from '.'

describe('innet', () => {
  test('empty plugins', () => {
    innet(123, createHandler([]))
  })
  test('simple plugin', () => {
    const log: any[] = []
    function sum (): HandlerPlugin {
      return () => {
        const app = useApp()
        if (Array.isArray(app)) {
          const [a, b] = app
          log.push(a + b)
        }
      }
    }
    innet([42, 13], createHandler([sum]))
    expect(log.length).toBe(1)
    expect(log[0]).toBe(55)
  })
  test('double plugin', () => {
    const log: any = []
    function sum (): HandlerPlugin {
      return () => {
        const app = useApp()
        if (Array.isArray(app)) {
          const [a, b] = app
          log.push(a + b)
        }
      }
    }

    function quad (): HandlerPlugin {
      return () => {
        const app = useApp()
        if (typeof app === 'number') {
          log.push(app * app)
        }
      }
    }

    innet([42, 13], createHandler([sum, sum, quad]))
    innet(2, createHandler([quad, quad, sum]))

    expect(log.length).toBe(2)
    expect(log[0]).toBe(55)
    expect(log[1]).toBe(4)
  })
  test('couple of plugins', () => {
    const log: any = []

    function sum (): HandlerPlugin {
      return () => {
        const target = useApp()
        if (!Array.isArray(target)) return NEXT
        log.push(target[0] + target[1])
      }
    }

    function quad (): HandlerPlugin {
      return () => {
        const target = useApp()
        if (typeof target !== 'number') return NEXT
        log.push(target * target)
      }
    }

    const handler = createHandler([sum, quad])
    innet([42, 13], handler)
    innet(8, handler)
    expect(log.length).toBe(2)
    expect(log[0]).toBe(55)
    expect(log[1]).toBe(64)
  })
  test('plugins order-less', () => {
    const log: any[] = []
    const ONCE_SUM = Symbol('ONCE_SUM')
    const ONCE_QUAD = Symbol('ONCE_QUAD')

    function logPlugin (): HandlerPlugin {
      return () => {
        const app = useApp()
        log.push(app)
      }
    }

    function sum (): HandlerPlugin {
      return () => {
        const app = useApp()
        const handler = useHandler()
        if (!Array.isArray(app) || handler[ONCE_SUM]) return NEXT

        const nextHandler = Object.create(handler)
        nextHandler[ONCE_SUM] = true
        innet(app[0] + app[1], nextHandler)
      }
    }

    function quad (): HandlerPlugin {
      return () => {
        const app = useApp()
        const handler = useHandler()
        if (typeof app !== 'number' || handler[ONCE_QUAD]) return NEXT

        const nextHandler = Object.create(handler)
        nextHandler[ONCE_QUAD] = true
        innet(app * app, nextHandler)
      }
    }

    innet([42, 13], createHandler([sum, quad, logPlugin]))
    innet([42, 13], createHandler([quad, sum, logPlugin]))
    innet(8, createHandler([quad, sum, logPlugin]))
    innet(8, createHandler([sum, quad, logPlugin]))

    expect(log[0]).toBe(3025)
    expect(log[1]).toBe(3025)
    expect(log[2]).toBe(64)
    expect(log[3]).toBe(64)
  })
})

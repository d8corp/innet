import innet, { createHandler, type HandlerPlugin, NEXT, useApp, useHandler } from '.'

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
  test('priority', () => {
    const log: any[] = []

    function pushLog (): HandlerPlugin {
      return () => {
        log.push(useApp())
      }
    }

    const pushLogHandler = createHandler([pushLog])

    function check (): HandlerPlugin {
      return () => {
        innet({ app: useApp(), priority: 0, index: 0, force: false }, pushLogHandler, 0)
        innet({ app: useApp(), priority: 0, index: 1, force: true }, pushLogHandler, 0, true)
        innet({ app: useApp(), priority: 1, index: 2, force: false }, pushLogHandler, 1)
        innet({ app: useApp(), priority: 1, index: 3, force: true }, pushLogHandler, 1, true)
        innet({ app: useApp(), priority: 1, index: 4, force: true }, pushLogHandler, 1, true)
        innet({ app: useApp(), priority: 1, index: 5, force: false }, pushLogHandler, 1)
        innet({ app: useApp(), priority: 0, index: 6, force: true }, pushLogHandler, 0, true)
        innet({ app: useApp(), priority: 0, index: 7, force: false }, pushLogHandler, 0)
      }
    }

    const handler = createHandler([check])

    innet(1, handler)
    innet(2, handler)

    expect(log).toEqual([
      { app: 1, force: true, index: 6, priority: 0 },
      { app: 1, force: true, index: 1, priority: 0 },
      { app: 1, force: false, index: 0, priority: 0 },
      { app: 1, force: false, index: 7, priority: 0 },
      { app: 1, force: true, index: 4, priority: 1 },
      { app: 1, force: true, index: 3, priority: 1 },
      { app: 1, force: false, index: 2, priority: 1 },
      { app: 1, force: false, index: 5, priority: 1 },
      { app: 2, force: true, index: 6, priority: 0 },
      { app: 2, force: true, index: 1, priority: 0 },
      { app: 2, force: false, index: 0, priority: 0 },
      { app: 2, force: false, index: 7, priority: 0 },
      { app: 2, force: true, index: 4, priority: 1 },
      { app: 2, force: true, index: 3, priority: 1 },
      { app: 2, force: false, index: 2, priority: 1 },
      { app: 2, force: false, index: 5, priority: 1 },
    ])
  })
})

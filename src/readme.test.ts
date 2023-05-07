import innet, { createHandler, type HandlerPlugin, NEXT, useApp, useHandler } from '.'

function async (): HandlerPlugin {
  return () => {
    const app = useApp()

    if (!(app instanceof Promise)) return NEXT

    const handler = useHandler()

    app.then(data => innet(data, handler))
  }
}

describe('readme', () => {
  it('should log twice', async () => {
    const log: unknown[] = []

    function logger (): HandlerPlugin {
      return () => {
        log.push(useApp())

        return NEXT
      }
    }

    const app = new Promise(resolve => resolve('test'))

    const handler = createHandler([
      logger,
      async,
    ])

    innet(app, handler)

    expect(log.length).toBe(1)
    expect(log[0]).toBe(app)

    await app

    expect(log.length).toBe(2)
    expect(log[1]).toBe('test')
  })
  it('should log once', async () => {
    const log: unknown[] = []

    function logger (): HandlerPlugin {
      return () => {
        log.push(useApp())

        return NEXT
      }
    }

    const app = new Promise(resolve => resolve('test'))

    const handler = createHandler([
      async,
      logger,
    ])

    innet(app, handler)

    expect(log.length).toBe(0)

    await app

    expect(log.length).toBe(1)
    expect(log[0]).toBe('test')
  })
})

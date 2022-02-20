import innet, { createHandler, PluginHandler } from './index'

describe('innet', () => {
  test('empty plugins', () => {
    expect(innet(123, createHandler([]))).toBe(123)
  })
  test('simple plugin', () => {
    function sum (): PluginHandler {
      return ([a, b]) => a + b
    }
    expect(innet([42, 13], createHandler([sum]))).toBe(55)
  })
  test('double plugin', () => {
    function sum (): PluginHandler {
      return ([a, b]) => a + b
    }
    function quad (): PluginHandler {
      return (t, next) => next(t * t)
    }
    expect(innet([42, 13], createHandler([sum, sum]))).toBe(55)
    expect(innet(2, createHandler([quad, quad]))).toBe(16)
  })
  test('couple of plugins', () => {
    function sum (): PluginHandler {
      return (target, next) => {
        if (Array.isArray(target)) {
          return target[0] + target[1]
        }
        return next()
      }
    }

    function quad () {
      return (target, next) => {
        if (typeof target === 'number') {
          return target * target
        }
        return next()
      }
    }

    const handler = createHandler([sum, quad])

    expect(innet([42, 13], handler)).toBe(55)
    expect(innet(8, handler)).toBe(64)
  })
  test('async plugins', async () => {
    function sum (): PluginHandler {
      return async (target, next) => {
        await new Promise(resolve => setTimeout(resolve, 100))
        if (Array.isArray(target)) {
          return target[0] + target[1]
        }
        return next()
      }
    }

    function quad (): PluginHandler {
      return async (target, next) => {
        if (typeof target === 'number') {
          return target * target
        }
        return next()
      }
    }

    const handler = createHandler([sum, quad])

    expect(await innet([42, 13], handler)).toBe(55)
    expect(await innet(8, handler)).toBe(64)
  })
  test('change target', () => {
    function sum (): PluginHandler {
      return (target, next) => {
        if (Array.isArray(target)) {
          return next(target[0] + target[1])
        }
        return next()
      }
    }

    function quad (): PluginHandler {
      return (target, next) => {
        if (typeof target === 'number') {
          return next(target * target)
        }
        return next()
      }
    }

    expect(innet([42, 13], createHandler([sum, quad]))).toBe(3025)
    expect(innet([42, 13], createHandler([quad, sum]))).toBe(55)
    expect(innet(8, createHandler([quad, sum]))).toBe(64)
    expect(innet(8, createHandler([sum, quad]))).toBe(64)
  })
  test('logger', async () => {
    const log = []

    function logger (): PluginHandler {
      log.push('initialisation')

      return (app, next) => {
        log.push(app)

        return next()
      }
    }

    function async (): PluginHandler {
      return (app, next, handler) =>
        app instanceof Promise
          ? app.then(data => innet(data, handler))
          : next()
    }

    const handler = createHandler([logger, async])

    expect(log.length).toBe(1)
    expect(log[0]).toBe('initialisation')

    const app = new Promise(resolve => resolve('test'))

    const result = innet(app, handler)

    expect(result).toBeInstanceOf(Promise)
    expect(log.length).toBe(2)
    expect(log[1]).toBe(app)

    await result

    expect(log.length).toBe(3)
    expect(log[2]).toBe('test')
  })
})

import innet, { type Task } from '.'

describe('innet', () => {
  test('simple running', () => {
    const log: any[] = []
    innet(() => log.push(42))
    expect(log.length).toBe(1)
    expect(log[0]).toBe(42)
  })
  test('order', () => {
    const log: any[] = []

    const logger = (value: any) => () => {
      log.push(value)
    }

    innet(() => {
      innet(logger('Mounted'), 2)
      innet(logger('Mounting'), 1)
      innet(logger('Rendering'), 0)
      innet(logger('WillMount'), 1, true)
    })

    expect(log).toEqual(['Rendering', 'WillMount', 'Mounting', 'Mounted'])
  })
  test('priority', () => {
    const log: any[] = []

    const logAction = (data: any) => () => {
      log.push(data)
    }

    const check = (app: any) => () => {
      innet(logAction({ app, priority: 0, force: false, index: 0 }), 0)
      innet(logAction({ app, priority: 0, force: true, index: 1 }), 0, true)
      innet(logAction({ app, priority: 1, force: false, index: 2 }), 1)
      innet(logAction({ app, priority: 1, force: true, index: 3 }), 1, true)
      innet(logAction({ app, priority: 1, force: true, index: 4 }), 1, true)
      innet(logAction({ app, priority: 1, force: false, index: 5 }), 1)
      innet(logAction({ app, priority: 0, force: true, index: 6 }), 0, true)
      innet(logAction({ app, priority: 0, force: false, index: 7 }), 0)
    }

    innet(check(1))
    innet(check(2))

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
  test('hooks', () => {
    const log: any[] = []
    let currentApp: any

    const useApp = () => currentApp

    const logApp = () => {
      log.push(useApp())
    }

    const withApp = (app: any, handler: Task) => () => {
      currentApp = app
      handler()
    }

    innet(() => {
      innet(withApp(1, logApp), 1)
      innet(withApp(2, logApp))
    })

    expect(log).toEqual([2, 1])
  })
})

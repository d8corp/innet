import { Deque } from './Deque'

describe('Deque', () => {
  it('should take another side', () => {
    const deque = new Deque()
    deque.unshift(1)
    deque.unshift(0)
    deque.push(2)
    deque.push(3)

    expect(deque.shift()).toEqual(0)
    expect(deque.shift()).toEqual(1)
    expect(deque.shift()).toEqual(2)
    expect(deque.shift()).toEqual(3)
  })
  it('should return isEmpty', () => {
    const deque = new Deque()

    expect(deque.isEmpty).toEqual(true)

    deque.unshift(1)

    expect(deque.isEmpty).toEqual(false)
    expect(deque.pop()).toEqual(1)
    expect(deque.isEmpty).toEqual(true)

    deque.push(1)
    deque.unshift(0)
    deque.push(2)

    expect(deque.isEmpty).toEqual(false)
    expect(deque.shift()).toEqual(0)
    expect(deque.isEmpty).toEqual(false)
    expect(deque.shift()).toEqual(1)
    expect(deque.isEmpty).toEqual(false)
    expect(deque.shift()).toEqual(2)
    expect(deque.isEmpty).toEqual(true)
    expect(deque.shift()).toEqual(undefined)
  })
})

interface DequeItem<T> {
  value: T
  next?: DequeItem<T>
  prev?: DequeItem<T>
}

export class Deque<T> {
  private start?: DequeItem<T>
  private end?: DequeItem<T>

  unshift (value: T) {
    if (!this.start) {
      this.start = this.end = { value }
      return
    }

    this.start = this.start.next = { value, prev: this.start }
  }

  push (value: T) {
    if (!this.end) {
      this.start = this.end = { value }
      return
    }

    this.end = this.end.prev = { value, next: this.end }
  }

  shift () {
    const value = this.start && this.start.value

    if (this.start === this.end) {
      this.start = this.end = undefined
    } else {
      ;(this.start = (this.start as DequeItem<T>).prev as DequeItem<T>).next = undefined
    }

    return value
  }

  pop () {
    const value = this.end && this.end.value

    if (this.start === this.end) {
      this.start = this.end = undefined
    } else {
      ;(this.end = (this.end as DequeItem<T>).next as DequeItem<T>).prev = undefined
    }

    return value
  }

  get isEmpty () {
    return !this.start
  }
}

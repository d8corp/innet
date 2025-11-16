'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class Deque {
    unshift(value) {
        if (!this.start) {
            this.start = this.end = { value };
            return;
        }
        this.start = this.start.next = { value, prev: this.start };
    }
    push(value) {
        if (!this.end) {
            this.start = this.end = { value };
            return;
        }
        this.end = this.end.prev = { value, next: this.end };
    }
    shift() {
        const value = this.start && this.start.value;
        if (this.start === this.end) {
            this.start = this.end = undefined;
        }
        else {
            ;
            (this.start = this.start.prev).next = undefined;
        }
        return value;
    }
    pop() {
        const value = this.end && this.end.value;
        if (this.start === this.end) {
            this.start = this.end = undefined;
        }
        else {
            ;
            (this.end = this.end.next).prev = undefined;
        }
        return value;
    }
    get isEmpty() {
        return !this.start;
    }
}

exports.Deque = Deque;

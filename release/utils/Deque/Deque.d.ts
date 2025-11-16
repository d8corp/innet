export declare class Deque<T> {
    private start?;
    private end?;
    unshift(value: T): void;
    push(value: T): void;
    shift(): T | undefined;
    pop(): T | undefined;
    get isEmpty(): boolean;
}

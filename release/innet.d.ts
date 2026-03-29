import { type Handler } from './types';
export declare function useHandler<H extends Handler>(): H;
export declare function useApp<A>(): A;
export declare function net<F extends (...a: any[]) => any>(hook: F, app: unknown, handler?: Handler): ReturnType<F>;
export declare function innet(app: unknown, handler?: Handler, priority?: number, force?: boolean): void;

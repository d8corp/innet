import { type Handler } from './types';
export declare function useHandler<H extends Handler>(): H;
export declare function useApp<A>(): A;
export default function innet(app: unknown, handler?: Handler, priority?: number, force?: boolean): void;

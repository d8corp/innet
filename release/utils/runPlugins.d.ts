import { type Handler } from '../types';
export declare function useHandler<H extends Handler>(): H;
export declare function useApp<A>(): A;
export declare function runPlugins(app: unknown, handler: Handler, plugins?: import("../types").HandlerPlugin[]): void;

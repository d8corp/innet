import { type Handler } from '../types';
export declare function useHandler(): Handler;
export declare function useApp(): unknown;
export declare function runPlugins(app: unknown, handler: Handler, plugins?: import("../types").HandlerPlugin[]): void;

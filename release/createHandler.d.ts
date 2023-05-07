import { type Handler, type Plugin } from './types';
export declare function createHandler<HI extends Handler, HO extends HI = HI>(plugins: Plugin[], extendHandler?: HI): HO;

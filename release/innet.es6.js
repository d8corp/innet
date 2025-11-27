import { queueNanotask } from 'queue-nano-task';
import { HOOK } from './constants.es6.js';

let currentHandler;
let currentApp;
function useHandler() {
    return currentHandler;
}
function useApp() {
    return currentApp;
}
function innet(app, handler = currentHandler, priority = 0, force) {
    const hook = handler[HOOK]();
    queueNanotask(() => {
        const prevApp = currentApp;
        const prevHandler = currentHandler;
        currentApp = app;
        currentHandler = handler;
        hook();
        currentApp = prevApp;
        currentHandler = prevHandler;
    }, priority, force);
}

export { innet as default, useApp, useHandler };

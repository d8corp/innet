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
function net(hook, app, handler = currentHandler) {
    const prevApp = currentApp;
    const prevHandler = currentHandler;
    currentApp = app;
    currentHandler = handler;
    const result = hook();
    currentApp = prevApp;
    currentHandler = prevHandler;
    return result;
}
function innet(app, handler = currentHandler, priority = 0, force) {
    const hook = handler[HOOK]();
    queueNanotask(net.bind(handler, hook, app, handler), priority, force);
}

export { innet, net, useApp, useHandler };

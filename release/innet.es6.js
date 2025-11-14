import './utils/index.es6.js';
import { runPlugins } from './utils/runPlugins/runPlugins.es6.js';

let appStack = [];
let handlerStack = [];
let appStackNext = [];
let handlerStackNext = [];
let running = false;
const priorityMap = [
    (app, handler) => {
        appStack.push(app);
        handlerStack.push(handler);
    },
    (app, handler) => {
        appStack.unshift(app);
        handlerStack.unshift(handler);
    },
    (app, handler) => {
        appStackNext.push(app);
        handlerStackNext.push(handler);
    },
    (app, handler) => {
        appStackNext.unshift(app);
        handlerStackNext.unshift(handler);
    },
];
function innet(app, handler, priority = 0) {
    priorityMap[priority](app, handler);
    if (running)
        return;
    running = true;
    while (appStack.length || appStackNext.length) {
        if (!appStack.length) {
            appStack = appStackNext;
            handlerStack = handlerStackNext;
            appStackNext = [];
            handlerStackNext = [];
        }
        runPlugins(appStack.pop(), handlerStack.pop());
    }
    running = false;
}

export { innet as default };

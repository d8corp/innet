import { queueNanotask } from 'queue-nano-task';
import './utils/index.es6.js';
import { runPlugins, useHandler } from './utils/runPlugins/runPlugins.es6.js';

function innet(app, handler = useHandler(), priority = 0, force) {
    queueNanotask(() => {
        runPlugins(app, handler);
    }, priority, force);
}

export { innet as default };

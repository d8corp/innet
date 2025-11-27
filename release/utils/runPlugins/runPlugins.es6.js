import { NEXT } from '../../constants.es6.js';

function runPlugins(plugins) {
    for (let i = plugins.length - 1; i > -1; i--) {
        if (plugins[i]() !== NEXT)
            return;
    }
}

export { runPlugins };

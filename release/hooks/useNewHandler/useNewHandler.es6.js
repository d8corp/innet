import '../../utils/index.es6.js';
import { useHandler } from '../../utils/runPlugins.es6.js';

function useNewHandler() {
    return Object.create(useHandler());
}

export { useNewHandler };

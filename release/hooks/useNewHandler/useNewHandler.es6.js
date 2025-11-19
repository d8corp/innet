import '../../utils/index.es6.js';
import { extendHandler } from '../../utils/extendHandler/extendHandler.es6.js';
import { useHandler } from '../../utils/runPlugins/runPlugins.es6.js';

function useNewHandler() {
    return extendHandler(useHandler());
}

export { useNewHandler };

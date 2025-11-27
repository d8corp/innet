import { useHandler } from '../../innet.es6.js';
import '../../utils/index.es6.js';
import { extendHandler } from '../../utils/extendHandler/extendHandler.es6.js';

function useNewHandler() {
    return extendHandler(useHandler());
}

export { useNewHandler };

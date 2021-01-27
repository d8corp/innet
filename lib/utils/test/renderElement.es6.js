import innet from '../../index.es6.js';
import 'watch-state';
import '../../scope/scope.es6.js';
import '../dom/dom.es6.js';
import '../../Ref/Ref.es6.js';
import '../../Context/Context.es6.js';

function renderElement(element, plugins) {
    const result = document.createDocumentFragment();
    innet(element, result, plugins);
    return result;
}

export default renderElement;
export { renderElement };

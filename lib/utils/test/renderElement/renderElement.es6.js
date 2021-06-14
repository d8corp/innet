import innet from '../../../index.es6.js';

function renderElement(element, plugins) {
    const result = document.createDocumentFragment();
    innet(element, result, plugins);
    return result;
}

export default renderElement;
export { renderElement };

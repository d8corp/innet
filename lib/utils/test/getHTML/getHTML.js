'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getHTML(element, showComments) {
    if (element instanceof DocumentFragment) {
        var result_1 = '';
        element.childNodes.forEach(function (node) {
            result_1 += getHTML(node, showComments);
        });
        return result_1;
    }
    if (element instanceof Text) {
        return element.nodeValue;
    }
    if (element instanceof HTMLElement) {
        var html = element.outerHTML;
        return showComments ? html : html.replace(/(?=<!--)([\s\S]*?)-->/g, '');
    }
    if (element instanceof Comment) {
        return showComments ? "<!--" + element.textContent + "-->" : '';
    }
    return element;
}

exports.default = getHTML;
exports.getHTML = getHTML;

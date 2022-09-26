export class Section {
    constructor (renderer, selector) {
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    addItem(itemHtml) {
        this._container.prepend(itemHtml);
    }
}
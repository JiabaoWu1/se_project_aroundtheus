export default class Section {
  constructor({ renderer, selector }) {
    this._renderer = renderer;
    this._element = document.querySelector(selector);
    this._items = items;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  appendItem(element) {
    this._container.append(element);
  }

  clear() {
    this._container.innerHTML = "";
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._element = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  appendItem(element) {
    this._element.append(element);
  }

  clear() {
    this._element.innerHTML = "";
  }

  addItem(element) {
    this._element.prepend(element);
  }
}

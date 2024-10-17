import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._form = this._popupElement.querySelector(".modal__form");
  }

  setSubmitFunction(submitFunction) {
    this._handleFormSubmit = submitFunction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
  }
}

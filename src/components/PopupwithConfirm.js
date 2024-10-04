import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  setSubmitFunction(submitFunction) {
    this._handleFormSubmit = submitFunction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitFunction();
    });
  }
}

// PopupWithConfirm.addEvenetListener("click", () => {
//   this._handleFormSubmit();
// });

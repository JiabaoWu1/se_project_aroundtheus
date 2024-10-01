export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  setSubmitFunction(submitFunction) {
    this._handleFormSubmit = submitFunction;
  }
}

trashConfirmPopup.addEvenetListener("click", () => {
  this._handleFormSubmit();
});

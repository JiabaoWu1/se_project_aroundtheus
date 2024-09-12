export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;
  }
  _showInputError(inputElement, errorMessage) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = errorMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _toggleButtonState(inputEls) {
    const foundInvalid = inputEls.some((inputEl) => !inputEl.validity.valid);
    if (foundInvalid) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _hasInvalidInput() {}

  _setEventListeners() {
    this.inputEls = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this.submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState(this.inputEls);

    this.inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(this.inputEls);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

// const editFormValidator = new FormValidator(settings, editForm);
// editFormValidator.enableValidation();

// const addFormValidator = new FormValidator(settings, addForm);
// addFormValidator.enableValidation(;)

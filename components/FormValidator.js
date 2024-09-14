export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formEl = formElement;
  }
  _showInputError(inputElement) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputElement.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageEl = this._formEl.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this.inputErrorClass);
    errorMessageEl.classList.remove(this.errorClass);
    errorMessageEl.textContent = "";
  }

  _hasInvalidInput() {
    return this._inputEls.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }

  _checkInputValidity(inputElment) {
    if (!inputElment.validity.valid) {
      return this._showInputError(inputElment);
    }
    this._hideInputError(inputElment);
  }

  _toggleButtonState(inputEls, submitButton) {
    const foundInvalid = false;

    if (this._hasInvalidInput(inputEls)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
      return;
    }
    submitButton.classList.remove(this._inactiveButtonClass);
    submitButton.disabled = false;
  }

  _setEventListeners() {
    this._inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
    this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(this._inputEls, this._submitButton);
      });
    });
  }

  resetValidation() {
    this._inputEls.forEach((inputEl) => {
      this._clearInputError(inputEl); // Clear each input field's error state
    });
    this._toggleButtonState();
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}

// _toggleButtonState(inputEls, submitButton) {
//   const foundInvalid = inputEls.some((inputEl) => !inputEl.validity.valid);
//   if (foundInvalid) {
//     this._submitButton.classList.add(this._inactiveButtonClass);
//     this._submitButton.disabled = true;
//   } else {
//     this._submitButton.classList.remove(this._inactiveButtonClass);
//     this._submitButton.disabled = false;
//   }
// }

// _setEventListeners() {
//   this.inputEls = Array.from(
//     this._formElement.querySelectorAll(this._inputSelector)
//   );
//   this.submitButton = this._formElement.querySelector(
//     this._submitButtonSelector
//   );

//   this._toggleButtonState(this.inputEls);

//   this.inputEls.forEach((inputEl) => {
//     inputEl.addEventListener("input", () => {
//       this._checkInputValidity(inputEl);
//       this._toggleButtonState(this.inputEls);
//     });
//   });
// }

// const editFormValidator = new FormValidator(settings, editForm);
// editFormValidator.enableValidation();

// const addFormValidator = new FormValidator(settings, addForm);
// addFormValidator.enableValidation(;)

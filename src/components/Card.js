export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick(this._data);
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick();
      });

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  toggleLike() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  // _handleDeleteCard() {
  //   this._cardElement.remove();
  //   this._cardElement = null;
  // }
  // _createCard(cardData) {
  //   const card = new Card(cardData, "#card-template", openPreviewModal);
  //   return card.getView();
  // }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  getView() {
    this._cardElement = this._getTemplate();

    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardNameElement = this._cardElement.querySelector(".card__title");

    this._cardNameElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}

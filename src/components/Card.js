export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick
  ) {
    this._isLiked = data.isLiked;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._data);
    });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
      });

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  toggleLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
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

  _updateLikesView() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }
  getView() {
    this._cardElement = this._getTemplate();

    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardNameElement = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardNameElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;

    this._setEventListeners();
    this._updateLikesView();
    return this._cardElement;
  }
}

import "./index.css";
/* ------------------------- Import all the classes ------------------------- */
import Api from "../components/Api.js";
import { initialCards, selectors } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupwithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { validationSettings } from "../utils/constants.js";

// /* -------------------------------------------------------------------------- */
// /*                                    API;                                    */
// /* -------------------------------------------------------------------------- */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/cards",
  headers: {
    authorization: "9bd6fe3e-e63d-4619-b9fe-4bda3d127f2c",
    "Content-Type": "application/json",
  },
});

let cardSection;

api
  .getUserInfo()
  .then((data) => {
    console.log(data);
    userInfo.setUserInfo(data);
    userInfo.setAvatar(data.modal);
  })
  .catch((err) => {
    console.log(err);
  });

const handleModalSubmit = ({ modal }) => {
  editModalPopup.setLoading(true);
  api
    .updateAvatar(modal)
    .then((data) => {
      userInfo.setAvatar(data.modal);
      editAvatarPopup.close();
      FormValidator["edit-avatar-form"].toggleButtonState();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editModalPopup.setLoading(false);
    });
};
// -------------- Set up all the Validators & Constants ------------------------- */

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardModalEl = document.querySelector("#add-card-modal");
const addCardFormElement = addCardModalEl.querySelector(".modal__form");
const cardAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);
/* --------------------- Create instances of the classes -------------------- */
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardELement = createCard(item);
      cardList.addItem(cardELement);
    },
  },
  ".cards__list"
);
cardList.renderItems();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

// const addCardModal = new PopupWithForm({
//   popupSelector: "#add-card-modal",
//   handleFormSubmit: handleAddCardFormSubmit,
// });
const addCardModal = new PopupWithForm(
  selectors.addCardModalSelector,
  handleAddCardFormSubmit
);

addCardModal.setEventListeners();

const editProfileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfileModal.setEventListeners();

/* ------------------------------ event handler ----------------------------- */
cardAddButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  addCardModal.open();
});

profileEditButton.addEventListener("click", () => {
  const formValues = userInfo.getUserInfo();
  profileTitleInput.value = formValues.name;
  profileDescriptionInput.value = formValues.about;
  editProfileModal.open();
});

const imagePopup = new PopupWithImage("#preview-modal");
imagePopup.setEventListeners();
const trashConfirmPopup = new PopupWithConfirm("#trashcan-modal");
// Enable form validation

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                 Functions;                                 */
/* -------------------------------------------------------------------------- */
function handleImageClick(data) {
  imagePopup.open(data);
}
function handleProfileEditSubmit(formValues) {
  userInfo.setUserInfo({
    name: formValues.title,
    about: formValues.card__description,
  });
  editProfileModal.close();
}
function handleAddCardFormSubmit(formValues) {
  const name = formValues.title;
  const link = formValues.url;

  const card = createCard({ name, link });
  cardList.addItem(card);
  addCardFormElement.reset();
  addCardModal.close();
}

function handleDelete(card) {
  trashConfirmPopup.setSubmitFunction(() => {
    api
      .deleteCard(card._id)
      .then(() => {
        card.removeCard();
        trashConfirmPopup.close();
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
      });
  });
  trashConfirmPopup.open();
}

function handleLikeIconClick(card) {
  console.log(card);
  const apiAction = card.isLiked
    ? api.deleteCard(card._id)
    : api.putCardLike(card._id);

  apiAction
    .then(() => {
      card.isLiked = !card.isLiked;
      card.updateHeartIcon(card.isLiked);
    })
    .catch((err) => {
      console.error(`Error ${card.isLiked ? "unliking" : "liking"} card:`, err);
    });
}

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    () => handleDelete(card),
    () => handleLikeIconClick(card)
  );
  return card.getView();
}

//render initialcards
api
  .getInitialCards()
  .then((cards) => {
    console.log(cards);
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
  });

// API Calls
api
  .getProfile()
  .then((currentUser) => {
    currentUserId = currentUser._id;
    userInfo.setUserInfo(
      currentUser.name,
      currentUser.about,
      currentUser.avatar
    );
  })
  .catch((err) => {
    console.error("Failed to load user information:", err);
  });

api
  .getCards()
  .then((cardsData) => {
    cardSection.renderItems(cardsData);
  })
  .catch((err) => {
    console.error("Error fetching initial cards", err);
  });

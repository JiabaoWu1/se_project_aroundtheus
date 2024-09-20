import "./index.css";
/* ------------------------- Import all the classes ------------------------- */
import { initialCards, selectors } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupwithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { validationSettings } from "../utils/constants.js";
/* ------------------------- Set up all the classes ------------------------- */

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

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getView();
}

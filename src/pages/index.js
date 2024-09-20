import "./index.css";
/* ------------------------- Import all the classes ------------------------- */
import { initialCards, selectors } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import profileEditModal from "../utils/constants.js";
import profileEditForm from "../utils/constants.js";
import addCardModalEl from "../utils/constants.js";
import addCardFormElement from "../utils/constants.js";
import cardAddButton from "../utils/constants.js";
import profileEditButton from "../utils/constants.js";
import profileTitleInput from "../utils/constants.js";
import profileDescriptionInput from "../utils/constants.js";

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
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardModal.setEventListeners();

const editProfileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfileModal.setEventListeners();
//----------------------------------------------------------------------------------------
//                                  Event Handlers
//----------------------------------------------------------------------------------------
cardAddButton.addEventListener("click", () => {
  // addFormValidator._toggleButtonState();
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
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                             Event Handlers                                 */
/* -------------------------------------------------------------------------- */
function handleImageClick(data) {
  imagePopup.open(data);
}

function handleProfileEditSubmit(formValues) {
  userInfo.setUserInfo({
    name: formValues.title,
    about: formValues.about,
  });
  editProfileModal.close();
}

function handleAddCardFormSubmit(formValues) {
  console.log(formValues);
  const name = formValues.title;
  const link = formValues.link;
  const card = createCard({ name, link });
  cardList.addItem(card);
  addCardModal.close();
  addCardFormElement.reset();
}

/* -------------------------------------------------------------------------- */
/*                                 Functions;                                 */
/* -------------------------------------------------------------------------- */
function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getView();
}

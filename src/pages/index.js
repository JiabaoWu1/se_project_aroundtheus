import "./index.css";
/* ------------------------- Import all the classes ------------------------- */
import Api from "../components/Api.js";
import { initialCards, selectors } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
// import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupwithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { validationSettings } from "../utils/constants.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
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

// /* -------------------------------------------------------------------------- */
// /*                                    API;                                    */
// /* -------------------------------------------------------------------------- */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9bd6fe3e-e63d-4619-b9fe-4bda3d127f2c",
    "Content-Type": "application/json",
  },
});

// let cardSection;

// api
//   .getUserInfo()
//   .then((data) => {
//     console.log(data);
//     userInfo.setUserInfo(data);
//     userInfo.setAvatar(data.modal);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const previewImagePopup = new PopupWithImage("#preview-modal");
previewImagePopup.setEventListeners();

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
api
  .getInitialCards()
  .then((cards) => {
    console.log(cards);
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
  });

cardList.renderItems();

const confirmDeleteModal = new PopupWithConfirm(
  "#trashcan-modal",
  handleDeleteClick
);
confirmDeleteModal.setEventListeners();

const editAvatarModal = new PopupWithForm(
  "#edit-avatar-modal",
  handleAvatarEditSubmit
);
editAvatarModal.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// const addCardModal = new PopupWithForm({
//   popupSelector: "#add-card-modal",
//   handleFormSubmit: handleAddCardFormSubmit,
// });
const addCardPopup = new PopupWithForm("#add-card-modal", (data) => {
  const cardData = {
    name: data.title,
    link: data.url,
  };

  addCardPopup.setLoading("Saving...");

  api
    .addCards(cardData)
    .then((res) => {
      const card = createCard(res);
      cardList.addItem(card);
      addCardFormElement.reset();
      addFormValidator.resetValidation();
      addCardPopup.close();
      addCardPopup.setLoading("Save");
    })
    .catch((err) => {
      console.error(`Error, could not add card: ${err}`);
    })
    .finally(() => {
      // addCardFormElement.reset();
      addCardPopup.setLoading("Save");
    });
});
addCardPopup.setEventListeners();

const editProfileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

editProfileModal.setEventListeners();
/* ------------------------------ event listeners ----------------------------- */
cardAddButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  addCardPopup.open();
});

profileEditButton.addEventListener("click", () => {
  const formValues = userInfo.getUserInfo();
  profileTitleInput.value = formValues.name;
  profileDescriptionInput.value = formValues.about;
  editProfileModal.open();
});

const imagePopup = new PopupWithImage("#preview-modal");
imagePopup.setEventListeners();

// add event listener to avatar
document.querySelector(".modal__avatar").addEventListener("click", () => {
  editAvatarModal.open();
});
// when it fires, open avatar image modal

/* ------------------------ Enable form validation ------------------------ */

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);

const editAvatarValidator = new FormValidator(
  validationSettings,
  document.querySelector("#edit-avatar-modal")
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
editAvatarValidator.enableValidation();
/* -------------------------------------------------------------------------- */
/*                                 Functions;                                 */
/* -------------------------------------------------------------------------- */
function handleCardPreview(cardData) {
  previewImagePopup.open(cardData);
}

function handleAvatarEditSubmit(input) {
  const link = input.avatar;
  editAvatarModal.setLoading("Saving...");
  api
    .editProfileImage(link)
    .then((userData) => {
      userInfo.setAvatarInfo(userData.avatar);
      // editAvatarModal.setLoading("Saving...");
      editAvatarModal.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editAvatarModal.setLoading("Save");
    });
}

function handleProfileEditSubmit(formValues) {
  userInfo.setUserInfo({
    name: formValues.title,
    about: formValues.card__description,
  });
  editProfileModal.close();
}
// function handleAddCardFormSubmit(formValues) {
//   const name = formValues.title;
//   const link = formValues.url;

//   const card = createCard({ name, link });
//   cardList.addItem(card);
//   addCardFormElement.reset();
//   addCardModal.close();
// }

function handleDeleteClick(card) {
  const cardId = card._id;
  if (!cardId) {
    console.error("card._id is undefined");
    return;
  }
  confirmDeleteModal.setSubmitFunction(() => {
    api
      .handleDeleteCard(cardId)
      .then((res) => {
        console.log(res);
        card.handleDeleteCard();
        confirmDeleteModal.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
  confirmDeleteModal.open();
}

function handleLikeClick(data) {
  if (!data.isLiked) {
    api
      .likeCard(data._id, { method: "PUT" })
      .then((res) => {
        console.log(res);
        data.isLiked = true;
        data.toggleLike();
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .dislikeCard(data._id, { method: "DELETE" })
      .then((res) => {
        console.log(res);
        data.isLiked = false;
        data.toggleLike();
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    handleCardPreview,
    handleLikeClick,
    handleDeleteClick
  );
  return cardElement.getView();
}

//render initialcards

// API Calls
api
  .getUserInfo()
  .then((currentUser) => {
    currentUser = currentUser._id;
    userInfo.setUserInfo({
      name: currentUser.name,
      about: currentUser.about,
    });
    userInfo.setAvatarInfo(currentUser.avatar);
  })
  .catch((err) => {
    console.error("Failed to load user information:", err);
  });

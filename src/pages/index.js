import "./index.css";
/* ------------------------- Import all the classes ------------------------- */
import { initialCards, selectors } from "../components/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupwithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

/* ------------------------- Set up all the classes ------------------------- */

/* --------------------- Create instances of the classes -------------------- */
const CardPreviewPopup = new PopupWithImage(selectors.previewPopup);
const CardSection = new Section(
  {
    renderer: (item) => {
      const cardEl = new Card({ item }, selectors.cardTemplate, handleClick);
      CardSection.addItems(cardEl.getView());
    },
  },
  selectors.cardSection
);
/* ----------------------- Initialize all my instances ---------------------- */
CardSection.renderItems(initialCards);
CardPreviewPopup.setEventListeners();

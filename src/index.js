import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, removeCard, handleLike } from "./components/card.js";
import { openModal, closeModal, popupOverlayClickListener, popupCloseButtonClickListener } from "./components/modal.js";
import { clearValidation, enableValidation } from "./components/validation.js";

export const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const popupImage = document.querySelector(".popup_type_image");
const imagePopup = popupImage.querySelector(".popup__image");
const imageCaption = popupImage.querySelector(".popup__caption");
const buttonEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const buttonAdd = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const profileNameElement = document.querySelector(".profile__title");
const profileJobElement = document.querySelector(".profile__description");
const formElementProfile = document.forms["edit-profile"];
const nameInput = formElementProfile.elements.name;
const formError = formElementProfile.querySelector(`.${nameInput.id}-error`);
const jobInput = formElementProfile.elements.description;
const formElementPlace = document.forms["new-place"];
const placeNameInput = formElementPlace.elements["place-name"];
const linkInput = formElementPlace.elements.link;
const newCardPopap = document.querySelector(".popup_type_new-card");
const popups = document.querySelectorAll(".popup");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileNameElement.textContent = nameValue;
  profileJobElement.textContent = jobValue;

  closeModal(popupEdit);
}

function submitPlaceForm(evt) {
  evt.preventDefault();

  const nameValue = placeNameInput.value;
  const jobValue = linkInput.value;

  placeNameInput.textContent = nameValue;
  linkInput.textContent = jobValue;

  const newCard = createCard(jobValue, nameValue, removeCard, handleLike, openImagePopup);
  placesList.prepend(newCard);

  closeModal(newCardPopap);
}

buttonEdit.addEventListener("click", function () {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  clearValidation(formElementProfile, validationConfig);
  openModal(popupEdit);
});

buttonAdd.addEventListener("click", function () {
  placeNameInput.value = "";
  linkInput.value = "";
  clearValidation(formElementPlace, validationConfig);
  openModal(popupNewCard);
});

formElementProfile.addEventListener("submit", handleFormSubmit);

formElementPlace.addEventListener("submit", submitPlaceForm);

popups.forEach(function (popup) {
  popup.addEventListener("click", popupOverlayClickListener);

  const popupCloseButton = popup.querySelector(".popup__close");
  popupCloseButton.addEventListener("click", popupCloseButtonClickListener);
});

initialCards.forEach(function (card) {
  const cardElement = createCard(card.link, card.name, removeCard, handleLike, openImagePopup);
  placesList.append(cardElement);
});

function openImagePopup(cardLink, cardName) {
  imagePopup.src = cardLink;
  imageCaption.textContent = cardName;
  imagePopup.alt = cardName;
  openModal(popupImage);
}

enableValidation(validationConfig);

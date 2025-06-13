import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const popupImage = document.querySelector(".popup_type_image");

function createCard(cardLink, cardName, cardRemover) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = cardLink;
  cardElement.querySelector(".card__title").textContent = cardName;

  const button = cardElement.querySelector(".card__delete-button");
  button.addEventListener("click", function () {
    cardRemover(cardElement);
  });

  return cardElement;
}

function removeCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach(function (card) {
  const cardElement = createCard(card.link, card.name, removeCard);
  placesList.append(cardElement);
});

const buttonEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");

buttonEdit.addEventListener("click", function () {
  popupEdit.classList.add("popup_is-opened");
});

const buttonAdd = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
buttonAdd.addEventListener("click", function () {
  popupNewCard.classList.add("popup_is-opened");
});

const popups = document.querySelectorAll(".popup");
popups.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target === popup) {
      popup.classList.remove("popup_is-opened");
    }
  });

  const popupCloseButton = popup.querySelector(".popup__close");
  popupCloseButton.addEventListener("click", function (evt) {
    popup.classList.remove("popup_is-opened");
  });

  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_is-opened");
      if (openedPopup) {
        openedPopup.classList.remove("popup_is-opened");
      }
    }
  });
});

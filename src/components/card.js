import { cardTemplate } from "../index.js";

function createCard(cardLink, cardName, cardRemover, likeHandler, cardClicker) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = cardLink;
  cardImage.alt = cardName;
  cardTitle.textContent = cardName;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function (evt) {
    cardRemover(cardElement);
    evt.stopPropagation();
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click",likeHandler);

  cardElement.addEventListener("click", function () {
    cardClicker(cardLink, cardName);
  });

  return cardElement;
}

function removeCard(cardElement) {
  cardElement.remove();
}

function handleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
  evt.stopPropagation();
}

export { createCard, removeCard, handleLike };

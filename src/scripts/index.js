// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

// @todo: DOM узлы
function createCard(cardLink, cardName, cardRemover) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = cardLink;
  cardElement.querySelector(".card__title").textContent = cardName;

// @todo: Функция создания карточки
  const button = cardElement.querySelector(".card__delete-button");
  button.addEventListener("click", function () {
    cardRemover(cardElement);
  });

// @todo: Функция удаления карточки
  return cardElement;
}

// @todo: Вывести карточки на страницу
function removeCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach(function (card) {
  const cardElement = createCard(card.link, card.name, removeCard);
  placesList.append(cardElement);
});
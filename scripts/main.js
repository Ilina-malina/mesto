import {Card} from './Card.js';

const ESC_KEY_CODE = 27;
const closeButton = ".popup__close-button";

// Константы первого попапа
const popupProfile = document.querySelector(".popup_type_profile");
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__subscribe");
const formEditElement = popupProfile.querySelector(".popup__form");
const nameInput = formEditElement.querySelector(".popup__input_type_name");
const jobInput = formEditElement.querySelector(
  ".popup__input_type_description"
);

// Константы второго попапа
const popupAddPlace = document.querySelector(".popup_type_place");
const popupAddPlaceOpenButton = document.querySelector(".profile__add-button");
const formAddElement = popupAddPlace.querySelector(".popup__form");

// Константы третьего попапа
const popupShowPic = document.querySelector(".popup_type_show-picture");
const popupPic = popupShowPic.querySelector(".popup__photo");
const popupPhotoTitle = popupShowPic.querySelector(".popup__photo-title");

// Функции открытия и закрытия попапов
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEscBtn);
  popup.querySelector(closeButton).addEventListener("click", closePopupByX);
  popup.addEventListener("click", closePopupByOverlay);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscBtn);
  popup.querySelector(closeButton).removeEventListener("click", closePopupByX);
  popup.removeEventListener("click", closePopupByOverlay);
  if (popup !== popupShowPic) {
    clearForm(popup);
  }
}

function closePopupByEscBtn(evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function closePopupByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function closePopupByX() {
  closePopup(document.querySelector(".popup_opened"));
}

function clearForm(popup) {
  popup.querySelector(config.form).reset();
}

const openPic = function (name, link) {
  popupPic.src = link;
  popupPhotoTitle.textContent = name;
  popupPic.alt = popupPhotoTitle.textContent;
  openPopup(popupShowPic);
};

function renderCard(card) {
  const cardElement = card.generateCard(openPic);
  const cardContainer = document.querySelector(".elements");
  cardContainer.prepend(cardElement);
}

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  renderCard(card);
});

// Открытие и закрытие первого попапа
function editFormSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupProfile);
  clearForm(popupProfile);
}

popupProfileOpenButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupProfile);
});

formEditElement.addEventListener("submit", editFormSubmitHandler);

// Открытие и закрытие второго попапа
popupAddPlaceOpenButton.addEventListener("click", function () {
  openPopup(popupAddPlace);
  setSubmitButtonState(popupAddPlace.querySelector(config.form), config);
});

const addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  const placeInput = popupAddPlace.querySelector(".popup__input_type_place");
  const linkInput = popupAddPlace.querySelector(".popup__input_type_link");

  const newCard = new Card(placeInput.value, linkInput.value);
  renderCard(newCard);
  closePopup(popupAddPlace);  
};

formAddElement.addEventListener("submit", addFormSubmitHandler);

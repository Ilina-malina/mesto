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
const likeButton = document.querySelector(".element__like-button");

// Константы второго попапа
const popupAddPlace = document.querySelector(".popup_type_place");
const popupAddPlaceOpenButton = document.querySelector(".profile__add-button");
const formAddElement = popupAddPlace.querySelector(".popup__form");
const placeInput = popupAddPlace.querySelector(".popup__input_type_place");
const linkInput = popupAddPlace.querySelector(".popup__input_type_link");
const elementTitle = document.querySelector(".element__title");
const elementPhoto = document.querySelector(".element__photo");

// Константы третьего попапа
const popupShowPic = document.querySelector(".popup_type_show-picture");
const popupShowPicOpenElement = document.querySelector(".element__photo");
const popupPic = popupShowPic.querySelector(".popup__photo");
const popupPhotoTitle = popupShowPic.querySelector(".popup__photo-title");
const cardContainer = document.querySelector(".elements");

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

// Добавление карточек
const openPic = function (card) {
  popupPic.src = card.link;
  popupPhotoTitle.textContent = card.name;
  popupPic.alt = popupPhotoTitle.textContent;
  openPopup(popupShowPic);
};

const template = document.getElementById("card");
const getCard = (card) => {
  const newCard = template.content.cloneNode(true);
  const cardTitle = newCard.querySelector(".element__title");
  const cardImage = newCard.querySelector(".element__photo");
  const likeButton = newCard.querySelector(".element__like-button");
  const deleteButton = newCard.querySelector(".element__delete-button");

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener("click", () => openPic(card));

  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("element__like-button_active");
  });

  deleteButton.addEventListener("click", function (e) {
    e.target.closest(".element").remove();
  });

  return newCard;
};

const renderCard = (card) => {
  cardContainer.prepend(getCard(card));
};

initialCards.forEach((card) => {
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

  const card = {
    name: placeInput.value,
    link: linkInput.value,
  };

  closePopup(popupAddPlace);
  renderCard(card);
};

formAddElement.addEventListener("submit", addFormSubmitHandler);

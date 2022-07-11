// Константы первого попапа
const popupProfile = document.querySelector(".popup_type_profile");
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupProfileCloseButton = popupProfile.querySelector(".popup__close-button");
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__subscribe');
const editFormElement = popupProfile.querySelector('.popup__form');
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const jobInput = editFormElement.querySelector('.popup__input_type_description');
const likeButton = document.querySelector('.element__like-button');

// Константы второго попапа
const popupAddPlace = document.querySelector(".popup_type_place");
const popupAddPlaceOpenButton = document.querySelector(".profile__add-button");
const popupAddPlaceCloseButton = popupAddPlace.querySelector(".popup__close-button");
const addFormElement = popupAddPlace.querySelector(".popup__form");
const placeInput = popupAddPlace.querySelector(".popup__input_type_place");
const linkInput = popupAddPlace.querySelector(".popup__input_type_link");
const elementTitle = document.querySelector(".element__title");
const elementPhoto = document.querySelector(".element__photo");

// Константы третьего попапа
const popupShowPic = document.querySelector(".popup_type_show-picture");
const popupShowPicOpenElement = document.querySelector(".element__photo");
const popupShowPicCloseButton = popupShowPic.querySelector(".popup__close-button");
const popupPic = popupShowPic.querySelector(".popup__photo");
const popupPhotoTitle = popupShowPic.querySelector(".popup__photo-title");

// Функции открытия и закрытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}; 

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

// Добавление карточек
  const openPic = function(card) {
    popupPic.src = card.link;
    popupPhotoTitle.textContent = card.name;
    popupPic.alt = popupPhotoTitle.textContent;
    openPopup(popupShowPic);
  };

const template = document.getElementById('cards');
const getCard = (card) => {
    const newCard = template.content.cloneNode(true);
    const cardTitle = newCard.querySelector('.element__title');
    const cardImage = newCard.querySelector('.element__photo');
    const likeButton = newCard.querySelector('.element__like-button');
    const deleteButton = newCard.querySelector('.element__delete-button');
    
    cardTitle.textContent = card.name;
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardImage.addEventListener('click', () => openPic(card));

    likeButton.addEventListener('click', function () {
        likeButton.classList.toggle("element__like-button_active"); 
    });

    deleteButton.addEventListener('click', function (e) {
        e.target.closest('.element').remove();
    });

    return newCard;
};

const renderCard = (card) => {
    const cardContainer = document.querySelector('.elements');
    cardContainer.prepend(getCard(card));
};

initialCards.forEach((card) => {
    renderCard(card);
});

// Открытие и закрытие первого попапа
function editFormSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupProfile);
}

popupProfileOpenButton.addEventListener("click", function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupProfile);
});

popupProfileCloseButton.addEventListener("click", function () {
    closePopup(popupProfile);
});

editFormElement.addEventListener('submit', editFormSubmitHandler);


// Открытие и закрытие второго попапа
popupAddPlaceOpenButton.addEventListener("click", function () {
  openPopup(popupAddPlace);
});

popupAddPlaceCloseButton.addEventListener("click", function () {
  closePopup(popupAddPlace);
});

const addFormSubmitHandler = (evt) => {
  evt.preventDefault();

  const card =
    {
      name: placeInput.value,
      link: linkInput.value
    };

  closePopup(popupAddPlace);
  renderCard(card);

  placeInput.value ='';
  linkInput.value ='';
};

addFormElement.addEventListener('submit', addFormSubmitHandler);

// Закрытие третьего попапа
popupShowPicCloseButton.addEventListener("click", function () {
  closePopup(popupShowPic);
});
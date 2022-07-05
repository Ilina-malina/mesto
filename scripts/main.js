// Константы первого попапа
const popupEditProfile = document.querySelector(".popup_type_profile");
const openPopupEditProfile = document.querySelector(".profile__edit-button");
const closePopupEditProfile = popupEditProfile.querySelector(".popup__close-button");
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__subscribe');
const editFormElement = popupEditProfile.querySelector('.popup__form');
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const jobInput = editFormElement.querySelector('.popup__input_type_description');
const likeButton = document.querySelector('.element__like-button');

// Константы второго попапа
const popupAddPlace = document.querySelector(".popup_type_place");
const openPopupAddPlace = document.querySelector(".profile__add-button");
const closePopupAddPlace = popupAddPlace.querySelector(".popup__close-button");
const addFormElement = popupAddPlace.querySelector(".popup__form");
const placeInput = popupAddPlace.querySelector(".popup__input_type_place");
const linkInput = popupAddPlace.querySelector(".popup__input_type_link");
const elementTitle = document.querySelector(".element__title");
const elementPhoto = document.querySelector(".element__photo");

// Константы третьего попапа
const popupShowPic = document.querySelector(".popup_type_show-picture");
const openPopupShowPic = document.querySelector(".element__photo");
const closePopupShowPic = popupShowPic.querySelector(".popup__close-button");

// Добавление карточек
const initialCards = [
    {
      name: 'Средиземноморье',
      link: 'https://media.istockphoto.com/photos/cute-sea-turtle-in-blue-water-of-tropical-sea-green-turtle-underwater-picture-id1316941980?k=20&m=1316941980&s=612x612&w=0&h=4ZgLUg7KoGOxWx3UeHFzwyvbgqoHKfqLJ7Ee6DsXlFA='
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Мексиканское побережье',
      link: 'https://images.unsplash.com/photo-1562095241-8c6714fd4178?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2909&q=80'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  const openPic = function(card) {
    console.log(card);
    const popupPic = popupShowPic.querySelector(".popup__photo");
    const popupPhotoTitle = popupShowPic.querySelector(".popup__photo-title");
    
    popupPic.src = card.link;
    popupPhotoTitle.textContent = card.name;
    popupPic.alt = popupPhotoTitle.textContent;
    popupShowPic.classList.add("popup_opened");
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
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    profileName.textContent = nameInputValue;
    profileDescription.textContent = jobInputValue;
    popupEditProfile.classList.remove("popup_opened");
}

openPopupEditProfile.addEventListener("click", function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    popupEditProfile.classList.add("popup_opened");
});

closePopupEditProfile.addEventListener("click", function () {
    popupEditProfile.classList.remove("popup_opened");
});

editFormElement.addEventListener('submit', editFormSubmitHandler);


// Открытие и закрытие второго попапа
openPopupAddPlace.addEventListener("click", function () {
  popupAddPlace.classList.add("popup_opened");
});

closePopupAddPlace.addEventListener("click", function () {
  popupAddPlace.classList.remove("popup_opened");
});

const addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  let placeInputValue = placeInput.value;
  let linkInputValue = linkInput.value;
  const card =
    {
      name: placeInputValue,
      link: linkInputValue
    };

  popupAddPlace.classList.remove("popup_opened");
  renderCard(card);
};

addFormElement.addEventListener('submit', addFormSubmitHandler);

// Закрытие третьего попапа
closePopupShowPic.addEventListener("click", function () {
  popupShowPic.classList.remove("popup_opened");
});
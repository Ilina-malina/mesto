import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

import {config, popupProfileOpenButton, formEditElement, 
  nameInput, jobInput, profileName, profileDescription, profileAvatar,
  popupAddPlaceOpenButton, formAddElement, formAvatarElement, profileAvatarElement} from '../utils/constants.js';
import { PopupWithSubmit } from '../components/PopupWitnSubmit';

const section = new Section(renderCard, ".elements");

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
    headers: {
    authorization: 'f0e9ad6e-8bb9-454b-8868-fba36d2de17c',
    'Content-Type': 'application/json'
  }
}); 

function fetchData() {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(values => {
  userInfo.setUser(values[0]);
  values[1].reverse();
  section.renderItems(values[1]);
  })
  .catch((err) => {
    console.log(err);
  })
}
fetchData();

const popupShowPic = new PopupWithImage(".popup_type_show-picture");

  const userInfo = new UserInfo({
    name: profileName, 
    descriptionSelector: profileDescription,
    avatar: profileAvatar});

const popupProfile = new PopupWithForm(".popup_type_profile", editFormSubmitHandler);
popupProfile.setEventListeners();

// Открытие и закрытие первого попапа
function editFormSubmitHandler(inputs) {
  popupProfile.renderLoading(true);

  api.editUserInfo(inputs[0], inputs[1])
  .then((user) => {
    userInfo.setUser(user);
    popupProfile.close();
  })
  .catch((err) => {
    console.log(err);
  }).finally(() => {
    popupProfile.renderLoading(false);
  })
}

popupProfileOpenButton.addEventListener("click", function () {
  profileFormValidator.clearErrors();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.description;
  
  popupProfile.open();
  profileFormValidator.setSubmitButtonState();
});

const popupAvatar = new PopupWithForm(".popup_type_avatar", changeAvatarHandler);
const avatarFormValidator = new FormValidator(config, formAvatarElement);
avatarFormValidator.enableValidation();

profileAvatarElement.addEventListener('click', function() {
  avatarFormValidator.clearErrors();
  popupAvatar.open();
  popupAvatar.setEventListeners();
})

function changeAvatarHandler(avatar) {
  popupAvatar.renderLoading(true);

  api.editUserAvatar(avatar[0])
  .then((user) => {
    userInfo.setUser(user);
    popupAvatar.close();
  })
  .catch((err) => {
    console.log(err);
  }).finally(() => {
    popupAvatar.renderLoading(false);
  })
}

// Открытие и закрытие второго попапа
const addFormValidator = new FormValidator(config, formAddElement);
addFormValidator.enableValidation();

popupAddPlaceOpenButton.addEventListener("click", function () {
  addFormValidator.clearErrors();
  addFormValidator.clearForm();

  popupAddPlace.open();
  addFormValidator.setSubmitButtonState();
});

const addFormSubmitHandler = (inputs) => {
  const newCard = {
  name: inputs[0],
  link: inputs[1]
  }
  popupAddPlace.renderLoading(true);

  api.addCard(newCard).then((res) => {
    renderCard(res);
    popupAddPlace.close();
  })
  .catch((err) => {
    console.log(err);
  }).finally(() => {
    popupAddPlace.renderLoading(false);
  })
}

const popupAddPlace = new PopupWithForm(".popup_type_place", addFormSubmitHandler);
popupAddPlace.setEventListeners();

const profileFormValidator = new FormValidator(config, formEditElement);
profileFormValidator.enableValidation();

function renderCard(cardData) {
  const card = createCard(cardData);
  const cardElement = card.getCard(cardData);
  section.addItem(cardElement);
}

function createCard(cardData) {
  const card = new Card(
    cardData, 
    cardData.owner._id == userInfo.getUserInfo().id,
    cardData.likes.map((item) => {
      return item._id;
    }).includes(userInfo.getUserInfo().id),
    "card", 
    handleCardClick, 
    handleDelete,
    handleLikeButtonClick
  );
  return card;
}

function handleLikeButtonClick(card) {
const isLiked = card.isLiked(userInfo.getUserInfo().id)
  if(isLiked) {
    api.deleteLike(card.getCardId())
    .then((likes) => {
      card.toggleLikeStatus(likes.likes, !isLiked)
    }
    )
    .catch((err) => {
      console.log(err);
    })
  } else {
    api.putLike(card.getCardId())
    .then((likes) =>
    card.toggleLikeStatus(likes.likes, !isLiked)
    )
    .catch((err) => {
      console.log(err);
    })
  }
}

const handleCardClick = function (name, link) {
  popupShowPic.open(name, link);
};
popupShowPic.setEventListeners();

// Удаление карточки

const deleteConfirmationPopup = new PopupWithSubmit(".popup_type_delete-confirmation");
deleteConfirmationPopup.setEventListeners();

function handleDelete(card) {
  const handler = () => deleteCard(card);
  deleteConfirmationPopup.setHandler(handler);
  deleteConfirmationPopup.open();
}

function deleteCard(card) {
  api.deleteCard(card.getCardId())
  .then(() => {
    card.removeCard();
    deleteConfirmationPopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
}
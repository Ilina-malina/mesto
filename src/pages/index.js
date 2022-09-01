import './index.css';
import { initialCards } from '../components/initialData.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const config = {
  button: ".popup__submit-button",
  buttonDisabled: "popup__submit-button_disadled",
};

// Константы первого попапа
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const formEditElement = document.querySelector(".popup_type_profile").querySelector(".popup__form");
const nameInput = formEditElement.querySelector(".popup__input_type_name");
const jobInput = formEditElement.querySelector(
  ".popup__input_type_description");

// Константы второго попапа
const popupAddPlaceOpenButton = document.querySelector(".profile__add-button");
const formAddElement = document.querySelector(".popup_type_place").querySelector(".popup__form");


const popupShowPic = new PopupWithImage(".popup_type_show-picture");
const popupProfile = new PopupWithForm(".popup_type_profile", editFormSubmitHandler);
popupProfile.setEventListeners();


const userInfo = new UserInfo({
  name: ".profile__name", 
  descriptionSelector: ".profile__subscribe"});


// Открытие и закрытие первого попапа
function editFormSubmitHandler(inputs) {
  userInfo.setUserInfo(inputs[0], inputs[1]);
  popupProfile.close();
}

popupProfileOpenButton.addEventListener("click", function () {
  profileFormValidator.clearErrors();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.description;
  
  popupProfile.open();
  profileFormValidator.setSubmitButtonState();
});

// Открытие и закрытие второго попапа
const addFormValidator = new FormValidator(config, formAddElement);
addFormValidator.enableValidation();
console.log(addFormValidator);

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
  renderCard(newCard);
  popupAddPlace.close();
};

const popupAddPlace = new PopupWithForm(".popup_type_place", addFormSubmitHandler);
popupAddPlace.setEventListeners();

const profileFormValidator = new FormValidator(config, formEditElement);
profileFormValidator.enableValidation();


  // Новый кусок, связaнный с классом Section
function renderCard(cardData) {
  const card = new Card(cardData.name, cardData.link, "card", handleCardClick);
  const cardElement = card.getCard(cardData);
  section.addItem(cardElement);
}

const handleCardClick = function (name, link) {
  popupShowPic.open(name, link);
  popupShowPic.setEventListeners();
};

const section = new Section({
  items: initialCards,
  renderer: renderCard}, 
  ".elements");

section.renderItems();
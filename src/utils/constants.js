export const config = {
  button: ".popup__submit-button",
  buttonDisabled: "popup__submit-button_disadled",
};

export const popupProfileOpenButton = document.querySelector(".profile__edit-button");
export const formEditElement = document.querySelector(".popup_type_profile").querySelector(".popup__form");
export const nameInput = formEditElement.querySelector(".popup__input_type_name");
export const jobInput = formEditElement.querySelector(".popup__input_type_description");
export const profileName = ".profile__name";
export const profileDescription = ".profile__subscribe";
export const profileAvatar = ".profile__image";
export const profileAvatarElement = document.querySelector(".profile__image");
export const popupAddPlaceOpenButton = document.querySelector(".profile__add-button");
export const formAddElement = document.querySelector(".popup_type_place").querySelector(".popup__form");
export const formAvatarElement = document.querySelector(".popup_type_avatar").querySelector(".popup__form");
  
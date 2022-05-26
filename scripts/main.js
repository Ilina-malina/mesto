const popup = document.querySelector(".popup");
const openPopup = document.querySelector(".profile__edit-button");
const closePopup = popup.querySelector(".popup__close");
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__subscribe');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    profileName.textContent = nameInputValue;
    profileDescription.textContent = jobInputValue;
    popup.classList.remove("popup_opened");
}

openPopup.addEventListener("click", function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    popup.classList.add("popup_opened");
});

closePopup.addEventListener("click", function () {
    popup.classList.remove("popup_opened");
});

formElement.addEventListener('submit', formSubmitHandler);
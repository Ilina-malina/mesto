const popup = document.querySelector(".popup");
const openPopup = document.querySelector(".profile__edit-button");
const closePopup = popup.querySelector(".popup__close");
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__subscribe');

function togglePopup() {
    popup.classList.toggle("popup__opened");
}

 popup.addEventListener("click", function (event) {
    if (event.target === event.currentTarget) {
        togglePopup();
    }
}) 

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_description');

nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;

function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    profileName.textContent = nameInputValue;
    profileDescription.textContent = jobInputValue;
    togglePopup();
}

openPopup.addEventListener("click", togglePopup);
closePopup.addEventListener("click", togglePopup);
formElement.addEventListener('submit', formSubmitHandler); 
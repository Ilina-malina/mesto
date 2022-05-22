const popup = document.querySelector(".popup");
const openPopup = document.querySelector(".profile__edit-button");
const closePopup = popup.querySelector(".popup__close");

function togglePopup() {
    popup.classList.toggle("popup__opened");
}

 popup.addEventListener("click", function (event) {
    if (event.target === event.currentTarget) {
        togglePopup();
    }
}) 

openPopup.addEventListener("click", togglePopup);
closePopup.addEventListener("click", togglePopup);

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_description');

function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    const profileName = document.querySelector('.profile__name');
    const profileDescription = document.querySelector('.profile__subscribe');

    profileName.textContent = nameInputValue;
    profileDescription.textContent = jobInputValue;
    togglePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 
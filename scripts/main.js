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
    popup.classList.remove("popup__opened");
}

openPopup.addEventListener("click", function () {
    popup.classList.add("popup__opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
});

closePopup.addEventListener("click", function () {
    popup.classList.remove("popup__opened");
});

popup.addEventListener("click", function (event) {
    if (event.target === event.currentTarget) {
        popup.classList.remove("popup__opened");
        
    }
});

formElement.addEventListener('submit', formSubmitHandler);
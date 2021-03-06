const formProfile = {
    form: '.popup__form[name="profile-form"]',
    button: '.popup__submit-button'
}

const formPlace = {
    form: '.popup__form[name="add-place__form"]',
    button: '.popup__submit-button'
}

function enableValidation(config) {
// Находим форму 
const form = document.querySelector(config.form);
form.addEventListener('submit', handleFormSubmit);
form.addEventListener('input', (event) => handleFormInput(event, config));
}

function handleFormSubmit(event) {
    event.preventDefault();
    // Определяем валидность формы
    const form = event.currentTarget;
    const isValid = form.checkValidity();

    if (isValid) {
        form.reset();
    } 
}

function handleFormInput(event, config) {
    const input = event.target;
    const form = event.currentTarget;

    // Устанавливаем кастомные тексты ошибок
    setCustomError(input);
    // Показываем ошибки
    showFieldError(input);
    // Деактивируем кнопку
    setSubmitButtonState(form, config);
}

function setCustomError(input) {
    const validity = input.validity;

    input.setCustomValidity('');

    if (validity.valueMissing) {
        input.setCustomValidity('Вы пропустили это поле');
    }
    if (validity.tooLong) {
        input.setCustomValidity('Много символов');
    }
    if (validity.tooShort) {
        input.setCustomValidity('Мало символов');
    }
    if (validity.typeMismatch && input.type === 'url') {
        input.setCustomValidity('Введите адрес сайта');
    }
}

function showFieldError(input) {
    const span = input.nextElementSibling;
    span.textContent = input.validationMessage;
}

function setSubmitButtonState(form, config) {
    const button = form.querySelector(config.button);
    const isValid = form.checkValidity();

    if (isValid) {
        button.removeAttribute('disabled');
        button.classList.remove('popup__submit-button_disadled');
    } else {
        button.setAttribute('disabled', true);
        button.classList.add('popup__submit-button_disadled');
    }
}

enableValidation(formProfile);
enableValidation(formPlace);
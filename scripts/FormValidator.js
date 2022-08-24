export class FormValidator {
    constructor (config, formElement) {
        this._formElement = formElement;
        this._button = this._formElement.querySelector(config.button);
        this._buttonDisabled = config.buttonDisabled;
    }

    enableValidation() {
        // Находим форму
          this._formElement.addEventListener("submit", () => this._handleFormSubmit);
          this._formElement.addEventListener("input", (event) => this._handleFormInput(event));
    };

    _handleFormSubmit(event) {
        event.preventDefault();
        // Определяем валидность формы
        const isValid = this._formElement.checkValidity();
      
        if (isValid) {
          clearForm();
        }
    }

    _handleFormInput(event) {
        const input = event.target;
      
        // Устанавливаем кастомные тексты ошибок
        this._setCustomError(input);
        // Показываем ошибки
        this._showFieldError(input);
        // Деактивируем кнопку
        this.setSubmitButtonState();
    }

    _setCustomError(input) {
        const validity = input.validity;
      
        input.setCustomValidity("");
      
        if (validity.valueMissing) {
          input.setCustomValidity("Вы пропустили это поле");
        }
        if (validity.tooLong) {
          input.setCustomValidity("Много символов");
        }
        if (validity.tooShort) {
          input.setCustomValidity("Мало символов");
        }
        if (validity.typeMismatch && input.type === "url") {
          input.setCustomValidity("Введите адрес сайта");
        }
    }

    _showFieldError(input) {
        const span = input.nextElementSibling;
        span.textContent = input.validationMessage;
    }
      
    setSubmitButtonState() {
        const isValid = this._formElement.checkValidity();
      
        if (isValid) {
          this._button.removeAttribute("disabled");
          this._button.classList.remove(this._buttonDisabled);
        } else {
          this._button.setAttribute("disabled", true);
          this._button.classList.add(this._buttonDisabled);
        }
    }

    clearForm() {
      this._formElement.reset();
    }
}

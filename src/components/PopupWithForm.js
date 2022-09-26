import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._form = this._popup.querySelector(".popup__form");
        this._inputs = this._form.querySelectorAll('.popup__input');
        this._submitHandler = submitHandler;
        this._submitBtn = this._popup.querySelector(".popup__submit-button");
        this._defaultSubmitBtn = this._popup.querySelector(".popup__submit-button").textContent;
    }

    _getInputValues() {
        const inputValues = [];
        this._inputs.forEach((input) => {
            inputValues.push(input.value);
        })
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

           // this._renderLoading(true);
            this._submitHandler(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._submitBtn.textContent = 'Сохранение...'
        } else {
            this._submitBtn.textContent = this._defaultSubmitBtn;
        }
      }
}
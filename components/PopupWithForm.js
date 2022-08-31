import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._form = this._popup.querySelector(".popup__form");
        this._inputs = this._form.querySelectorAll('.popup__input');
        this._submitHandler = submitHandler;
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
          this._submitHandler(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}
import { Popup } from './Popup.js';

export class PopupWithSubmit extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._submitBtn = this._popup.querySelector('.popup__submit-button');
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitBtn.addEventListener('click', this._proxyHandler);
    }

    _proxyHandler = () => {
        this._submitHandler();
    }

    setHandler(handler) {
        this._submitHandler = handler;
    }
}
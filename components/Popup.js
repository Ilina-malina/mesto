const ESC_KEY_CODE = 27;

export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupOpened = this._popup.querySelector(".popup_opened");
        this._closeBtn = this._popup.querySelector(".popup__close-button");
    }

    open() {
        this._popup.classList.add("popup_opened");
    }

    close() {
        this._popup.classList.remove("popup_opened");
    }

    setEventListeners() {
        this._closeBtn.addEventListener("click", () => {this._handleXClose()});
        this._popup.addEventListener("mousedown", (evt) => {this._handleOverlayClose(evt)});
        document.addEventListener("keydown",  (evt) => {this._handleEscClose(evt)});
    }

    _handleEscClose(evt) {
        if (evt.keyCode === ESC_KEY_CODE) {
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    _handleXClose() {
        this.close();
    }
}

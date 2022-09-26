const ESC_KEY_CODE = 27;

export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupOpened = this._popup.querySelector(".popup_opened");
        this._closeBtn = this._popup.querySelector(".popup__close-button");
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleSetListener);
    }

    setEventListeners() {
        this._closeBtn.addEventListener("click", () => {this.close()});
        this._popup.addEventListener("mousedown", (evt) => {this._handleOverlayClose(evt)});
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
}
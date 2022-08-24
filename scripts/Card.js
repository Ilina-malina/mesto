export class Card {
    constructor(text, image, selector) {
        this._text = text;
        this._image = image;
        this._element = this._generateCard(selector);
        this._imageElement = this._element.querySelector(".element__photo");
        this._textElement = this._element.querySelector(".element__title");
        this._likeButton = this._element.querySelector(".element__like-button");
        this._deleteBtn = this._element.querySelector(".element__delete-button");  
    }

    _generateCard = (selector) => {
        this._element = document.getElementById(selector).content.cloneNode(true);

        return this._element;
    }

    getCard = (openPic) => {
        this._imageElement.src = this._image;
        this._textElement.textContent = this._text;
        this._imageElement.alt = this._text;
        this._setEventListeners(openPic);
        return this._element;
    }

    _setEventListeners = (openPic) => {
        this._likeButton.addEventListener('click', (e) => {
            this._handleLikeButtonClick(e);
        });

        this._deleteBtn.addEventListener('click', (e) => {
            this._handleDelete(e);
        });

        this._imageElement.addEventListener("click", () => {
            openPic(this._text, this._image);
        });
    }

    _handleLikeButtonClick(e) {
        e.target.classList.toggle("element__like-button_active");
    }

    _handleDelete(e) {
        e.target.closest(".element").remove();
    }
}
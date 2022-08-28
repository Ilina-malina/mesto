export class Card {
    constructor(text, image, selector, openPic) {
        this._text = text;
        this._image = image;
        this._selector = selector;
        this._openPic = openPic;
        this._element = this._generateCard();
        this._imageElement = this._element.querySelector(".element__photo");
        this._textElement = this._element.querySelector(".element__title");
        this._likeButton = this._element.querySelector(".element__like-button");
        this._deleteBtn = this._element.querySelector(".element__delete-button");  
    }

    _generateCard = () => {
        this._element = document.getElementById(this._selector).content.querySelector('.element').cloneNode(true);

        return this._element;
    }

    getCard = () => {
        this._imageElement.src = this._image;
        this._textElement.textContent = this._text;
        this._imageElement.alt = this._text;
        this._setEventListeners();
        return this._element;
    }

    _setEventListeners = () => {
        this._likeButton.addEventListener('click', (e) => {
            this._handleLikeButtonClick(e);
        });

        this._deleteBtn.addEventListener('click', (e) => {
            this._handleDelete(e);
        });

        this._imageElement.addEventListener("click", () => {
            this._openPic(this._text, this._image);
        });
    }

    _handleLikeButtonClick(e) {
        e.target.classList.toggle("element__like-button_active");
    }

    _handleDelete(e) {
        e.target.closest(".element").remove();
    }
}
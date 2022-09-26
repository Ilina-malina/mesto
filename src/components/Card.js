export class Card {
    constructor(data, isMine, isLiked, selector, handleCardClick, handleDelete, handleLikeButtonClick) {
        this._text = data.name;
        this._image = data.link;
        this._cardId = data._id;
        this._likes = data.likes;
        this._isMine = isMine;
        this._isLiked = isLiked;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
        this._handleDelete = handleDelete;
        this._handleLikeButtonClick = handleLikeButtonClick;
        this._element = this._generateCard();
        this._imageElement = this._element.querySelector(".element__photo");
        this._textElement = this._element.querySelector(".element__title");
        this._likesElement = this._element.querySelector(".element__likes-amount");
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
        this._likesElement.textContent = this._likes.length;
        if (!this._isMine) {
            this._deleteBtn.classList.add('element__delete-button_invisible');
            }
        this._setEventListeners();

        if (this._isLiked) {
            this._likeButton.classList.add('element__like-button_active');
        }
        return this._element;
    }

    _setEventListeners = () => {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeButtonClick(this);
        });

        this._deleteBtn.addEventListener('click', () => {
            this._handleDelete(this._cardId);
        });

        this._imageElement.addEventListener("click", () => {
            this._handleCardClick(this._text, this._image);
        });
    }

    toggleLikeStatus(likes, isLiked) {
        this._likes = likes;
        this._likesElement.textContent = likes.length;
        if (isLiked) {
            this._likeButton.classList.add('element__like-button_active');
        } else {
            this._likeButton.classList.remove('element__like-button_active');
        }
    }

    isLiked(userId) {
        return this._likes.map((item) => {
            return item._id;
          }).includes(userId);
    }

    getLikesArr() {
        return this._likes;
    }

    getCardId() {
        return this._cardId;
    }
}
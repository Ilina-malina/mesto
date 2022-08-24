export class Card {
    constructor(text, image) {
        this._text = text;
        this._image = image;
        this._element = this._getCard();
    }

    _getCard = () => {
        const templateCard = document.getElementById("card").content.cloneNode(true);

        return templateCard;
    }

    generateCard = (openPic) => {
        this._element.querySelector(".element__like-button").addEventListener('click', (e) => {
            this._handleLikeButtonClick(e);
        });

        this._element.querySelector(".element__delete-button").addEventListener('click', (e) => {
            this._handleDelete(e);
        });

        this._element.querySelector(".element__photo").src = this._image;
        this._element.querySelector(".element__title").textContent = this._text;
        
        this._element.querySelector(".element__photo").addEventListener("click", () => {
            openPic(this._text, this._image);
        });
       
        return this._element;
    }

    _setEventListeners = () => {
        this.likeButton.addEventListener('click', () => {
            this._handleLikeButtonClick();
        });

        this._element.querySelector(".element__delete-button").addEventListener('click', (e) => {
            this._handleDelete(e);
        });
    }

    _handleLikeButtonClick(e) {
        e.target.classList.toggle("element__like-button_active");
    }

    _handleDelete(e) {
        e.target.closest(".element").remove();
    }
}


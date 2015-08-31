function Deck(type, id) {

    this.deckID = id;
    this.div = document.createElement('div');

    this.leftDiv = document.createElement('div');
    this.leftDiv.className = 'fleft leftPart';

    this.rightDiv = document.createElement('div');
    this.rightDiv.className = 'fright rightPart';

    this.deckTitle = document.createElement('p');
    this.deckTitle.className = 'deckTitle';

    this.deckDescription = document.createElement('p');
    this.deckDescription.className = 'deckDescription';

    this.deckAuthor = document.createElement('p');
    this.deckAuthor.className = 'deckAuthor';

    this.deckCards = document.createElement('p');
    this.deckCards.className = 'deckCards';

    this.deckViews = document.createElement('p');
    this.deckViews.className = 'deckViews';

    this.deckDate = document.createElement('p');
    this.deckDate.className = 'deckDate';

    this.play = document.createElement('span');
    this.play.className = 'fa fa-play-circle fright';
    this.playLink = document.createElement('a');
    this.playLink.className = 'pointer';
    this.playLink.appendChild(this.play);
    this.rightDiv.appendChild(this.playLink);

    switch (type) {
        case 'deck':
            this.div.className = 'deck';
            break;

        case 'mydeck':
            this.div.className = 'mydeck';

            this.share = document.createElement('span');
            this.share.className = 'fa fa-share-alt fright';
            this.shareLink = document.createElement('a');
            this.shareLink.href = '#share';
            this.shareLink.appendChild(this.share);

            this.edit = document.createElement('span');
            this.edit.className = 'fa fa-pencil fright';
            this.editLink = document.createElement('a');
            this.editLink.href = '#edit';
            this.editLink.appendChild(this.edit);

            this.remove = document.createElement('span');
            this.remove.className = 'fa fa-trash-o fright';
            this.removeLink = document.createElement('a');
            this.removeLink.href = '#remove';
            this.removeLink.appendChild(this.remove);

            this.rightDiv.appendChild(this.shareLink);
            this.rightDiv.appendChild(this.editLink);
            this.rightDiv.appendChild(this.removeLink);
            addEventLitenerToShare(this.shareLink, this.deckID);
            break;

        case 'shareddeck':
            this.div.className = 'shareddeck';
            break;

        case 'playeddeck':
            this.div.className = 'playeddeck';
            break;
    }

    this.leftDiv.appendChild(this.deckDescription);
    this.leftDiv.appendChild(this.deckAuthor);
    this.leftDiv.appendChild(this.deckCards);

    this.rightDiv.appendChild(this.deckViews);
    this.rightDiv.appendChild(this.deckDate);

    this.div.appendChild(this.deckTitle);
    this.div.appendChild(this.leftDiv);
    this.div.appendChild(this.rightDiv);

}

Deck.prototype.setDeckTitle = function (deckTitle) {
    this.deckTitle.innerHTML = deckTitle;
};

Deck.prototype.setDeckDescription = function (deckDescription) {
    this.deckDescription.innerHTML = deckDescription;
};

Deck.prototype.setDeckAuthor = function (deckAuthor) {
    this.deckAuthor.innerHTML = deckAuthor;
};

Deck.prototype.setDeckCards = function (deckCards) {
    this.deckCards.innerHTML = deckCards;
};

Deck.prototype.setDeckViews = function (deckViews) {
    this.deckViews.innerHTML = deckViews;
};

Deck.prototype.setDeckDate = function (deckDate) {
    this.deckDate.innerHTML = deckDate;
};

Deck.prototype.setDeckId = function (deckID) {
    this.deckID = deckID;
}

Deck.prototype.setEventHandler = function (deckID) {
    this.playLink.addEventListener('click', function () {
        Ajax.request(
            'GET',
            Config.cardsurl,
            {'deckid' : deckID},
            true
        ).setOnSuccess(function (xhr) {
                var cardsArray = JSON.parse(xhr.responseText);
                clearListDecks();
                showDiv('cards-container');
                getCards.setCards(cardsArray);
                getCards.returnCards();
                document.querySelector('progress').max = cardsArray.length.toString();
                check();
            });
    }, false);



};

function addEventLitenerToShare(slink, id){
    slink.addEventListener('click', function() {
        showDiv('share-container');

        document.getElementById('share-deck-send').addEventListener('click', function(){
            var email = document.getElementById('share-email').value;

            Ajax.request(
                'POST',
                Config.shareurl, {'deckid': id.toString(), 'email': email},
                true).setOnSuccess(function(xhr){
                    var result = JSON.parse(xhr.responseText);
                    if(result.hasOwnProperty('error')){
                        var errors = document.getElementById('share-error');
                        errors.style.color = 'red';
                        errors.innerHTML = result.error;
                    }
                    else{
                        showDiv('decks-container');
                    }
                })
        }, false);
    }, false);
}
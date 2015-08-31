function PlayedDeck() {
    this.div = document.createElement('div');
    this.div.className = 'playeddeck';

    this.deckName = document.createElement('p');
    this.deckName.className = 'deckName inline-block fleft';

    this.deckScore = document.createElement('p');
    this.deckScore.className = 'deckScore inline-block fright';

    this.div.appendChild(this.deckName);
    this.div.appendChild(this.deckScore);
}

PlayedDeck.prototype.setDeckName = function (deckName) {
    this.deckName.innerHTML = deckName;
};

PlayedDeck.prototype.setDeckScore = function (deckScore) {
    this.deckScore.innerHTML = deckScore;
};
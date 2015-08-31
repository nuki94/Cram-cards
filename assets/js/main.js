
window.onload = function(){

    if (JSON.parse(localStorage.getItem('userInfo'))) {
        document.getElementById('account').innerHTML = /*result.username*/ 'My Profile';
        var newLi = document.createElement('li');
        newLi.className = 'fleft pointer';
        var newA = document.createElement('a');
        newA.innerHTML = 'Log out';
        newLi.appendChild(newA);
        document.getElementById('navBar').appendChild(newLi);
        showDiv('index-container');

        newA.addEventListener('click', logOut, false);
    }

    showDiv('index-container');
    addEventHandlers();
}




function showDiv(div) {
    var loginDiv = document.getElementById('login-container');
    var indexDiv = document.getElementById('index-container');
    var decksDiv = document.getElementById('decks-container');
    var createDeckDiv = document.getElementById("createdeck-container");
    var createCardsDiv = document.getElementById('createcards-container');
    var accountDiv = document.getElementById('account-container');
    var cardsDiv = document.getElementById('cards-container');
    var shareDiv = document.getElementById('share-container');

    indexDiv.style.display = 'none';
    decksDiv.style.display = 'none';
    createDeckDiv.style.display = 'none';
    createCardsDiv.style.display = 'none';
    accountDiv.style.display = 'none';
    cardsDiv.style.display = 'none';
    loginDiv.style.display = 'none';
    shareDiv.style.display = 'none';

    document.getElementById(div).style.display = 'block';

}

function logOut() {
    clearListDecks();
    localStorage.removeItem('userInfo');
    showDiv('index-container');
    var navBar = document.getElementById('navBar');
    navBar.removeChild(navBar.lastChild);
    document.getElementById('username').value = '';
    document.getElementById('password').value = ''
    document.getElementById('login-error').innerHTML = '';
    document.getElementById('account').innerHTML = 'Log in';
}

function showRegistrationForm() {
    document.querySelector('#login-form').style.display = 'none';
    document.querySelector('#registration-form').style.display = 'inline-block';
}

function showLoginForm() {
    document.querySelector('#login-form').style.display = 'block';
    document.querySelector('#registration-form').style.display = 'none';
}


function showCardsAdd() {
    document.getElementById('createdeck-container').style.display = 'none';
    document.getElementById('createcards-container').style.display = 'block';
}


function showAllDecksList(){
    document.getElementById('allDecksList').style.display = 'block';
    document.getElementById('myDecksList').style.display = 'none';
    document.getElementById('sharedDecksList').style.display = 'none';
}

function showMyDecksList(){
    document.getElementById('allDecksList').style.display = 'none';
    document.getElementById('myDecksList').style.display = 'block';
    document.getElementById('sharedDecksList').style.display = 'none';
}

function showSharedDecksList(){
    document.getElementById('allDecksList').style.display = 'none';
    document.getElementById('myDecksList').style.display = 'none';
    document.getElementById('sharedDecksList').style.display = 'block';
}

function sendCategoryId(_this){
    var _id = parseInt(_this.id);
    Ajax.request(
        'GET',
        Config.decksurl,
        {'categoryid' : _id},
        true
    ).setOnSuccess(function (xhr) {
            showAllDecksList();

            var deckType;
            var ListType;

            var decksArray = JSON.parse(xhr.responseText);


            for (var i = 0; i < decksArray.length; i++) {

                // Checks on what is the deck type are written here:
                if (JSON.parse(localStorage.getItem('userInfo'))) {

                    if (decksArray[i].shared == true) {
                        deckType = 'shareddeck';
                        ListType = 'sharedDecksList';
                    } else if (decksArray[i].author === JSON.parse(localStorage.getItem('userInfo')).userid){
                        deckType = 'mydeck';
                        ListType = 'myDecksList';
                    } else {
                        deckType = 'deck';
                        ListType = 'allDecksList';
                    }
                } else {
                    deckType = 'deck';
                    ListType = 'allDecksList';
                }


                // Creating the div and appending it to the table:
                var deck = new Deck(deckType, decksArray[i].deckid);

                deck.setDeckTitle(decksArray[i].title);
                deck.setDeckDescription(decksArray[i].description);
                deck.setDeckAuthor('Author: ' + decksArray[i].author);
                deck.setDeckViews('Views:' + decksArray[i].viewed);
                deck.setDeckDate('Created: ' + decksArray[i].created);
                deck.setEventHandler(decksArray[i].deckid);


                document.querySelector("#allDecksList").appendChild(deck.div);
                if (ListType === 'myDecksList') {
                    document.querySelector('#myDecksList').appendChild((deck.div).cloneNode(true));
                }
                if (ListType === 'sharedDecksList') {
                    document.querySelector('#sharedDecksList').appendChild((deck.div).cloneNode(true));
                }
            }
        });
    document.getElementById('categoryTitleHeading').innerHTML = _this.innerHTML;
    showDiv('decks-container');
}

function clearListDecks(){
    if(document.getElementById('decks-container').style.display == 'block'){
        document.getElementById('allDecksList').innerHTML = '';
        document.getElementById('myDecksList').innerHTML = '';
        document.getElementById('sharedDecksList').innerHTML = '';
        document.getElementById('allDecks').checked = true;
    }
    if(document.getElementById('account-container').style.display == 'block'){
        document.getElementById('playedDecks').innerHTML = '';
    }
    if(document.getElementById('cards-container').style.display == 'block' &&
        document.getElementById('decks-container').style.display != 'block'){
        var p = document.getElementById("counter1");
        p.innerHTML = "Right: " + 0;
        var p2 = document.getElementById("counter2");
        p2.innerHTML = "Right: " + 0;
        showFlipButton();
        resetProgressBar();
        getCards.getCardsArray().length = 0;
    }
}
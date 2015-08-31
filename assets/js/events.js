function addEventHandlers(){


    var flipButton = document.getElementById('flip');
    var rightButton = document.getElementById('right');
    var wrongButton = document.getElementById('wrong');
    var saveButton = document.getElementById('saveResults-button');

    flipButton.addEventListener('click', function() {
        flipCard();
        showGuessButtons();
    }, false);

    saveButton.addEventListener('click', function(){
        var right = parseInt(document.getElementById("counter1").innerHTML.match(/\d+/).join(""));
        var wrong =  parseInt(document.getElementById("counter2").innerHTML.match(/\d+/).join(""));


        Ajax.request(
            'POST',
            Config.resulturl,
            {'deckid' : 11, 'correrctanswers' :right, 'wronganswers' : wrong},
            true
        ).setOnSuccess(function (xhr) {
                var cardsArray = JSON.parse(xhr.responseText);
                getCards.setCards(cardsArray);
                getCards.returnCards();
                document.querySelector('progress').max = cardsArray.length.toString();
                check();
            });
    },false);

    rightButton.addEventListener('click', function(){
        increaseGreenCounter();
        updateProgressBar();
        reFlipCard();
        showFlipButton();
        check();
        getCards.returnCards();
    }, false);

    wrongButton.addEventListener('click', function() {
        increaseRedCounter();
        updateProgressBar();
        reFlipCard();
        showFlipButton();
        check();
        getCards.returnCards();
    }, false);

    for(var i = 1; i<=10; i++){
        document.getElementById(i.toString()).addEventListener('click', function(){
            sendCategoryId(this);

        }, false);


    }


    var allDecksRadio = document.getElementById('allDecks');
    var myDecksRadio = document.getElementById('myDecks');
    var sharedDecksRadio = document.getElementById('sharedDecks');

    allDecksRadio.addEventListener('change', showAllDecksList, false);
    myDecksRadio.addEventListener('change', showMyDecksList, false);
    sharedDecksRadio.addEventListener('change', showSharedDecksList, false);




    document.getElementById('account').addEventListener('click', function(){
        if (document.getElementById('account').innerHTML === 'Log in') {
            clearListDecks();
            showDiv('login-container');
        } else {
            clearListDecks();

            Ajax.request(
                'GET',
                Config.accounturl,
                {/*'categoryid' : 1*/},
                true
            ).setOnSuccess(function (xhr) {

                    var response = JSON.parse(xhr.responseText);
                    var userInfo = JSON.parse(localStorage.getItem('userInfo'));

                    for (var i = 0; i < response.playeddecks.length; i++) {

                        document.getElementById('acc-username').innerHTML = 'Username: ' + userInfo.username;
                        document.getElementById('acc-firstname').innerHTML = 'First Name: ' + userInfo.firstname;
                        document.getElementById('acc-lastname').innerHTML = 'Last Name: ' + userInfo.lastname;
                        document.getElementById('acc-email').innerHTML = 'E-mail: ' + userInfo.email;

                        // Creating the div and appending it to the list:
                        var deck = new PlayedDeck();

                        deck.setDeckName(response.playeddecks[i].name);
                        deck.setDeckScore('Score: ' + response.playeddecks[i].score);

                        document.querySelector("#playedDecks").appendChild(deck.div);

                    }

                });
            clearListDecks();

            showDiv('account-container');

        }
    },false);

    document.getElementById('signUpButton').addEventListener('click', showRegistrationForm, false);


    document.getElementById('createCardsIndex').addEventListener('click', function(){
        if(JSON.parse(localStorage.getItem('userInfo'))){
            showDiv('createdeck-container');
        }
        else{
            showDiv('login-container');
        }
    }, false);


    document.getElementById('send-login').addEventListener('click', function(){
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        Ajax.request(
            'POST',
            Config.usersurl, {'username': username, 'password': password},
            true).setOnSuccess(function(xhr){
                var result = JSON.parse(xhr.responseText);
                if(result.hasOwnProperty('error')){
                   var errors = document.getElementById('login-error');
                    errors.style.color = 'red';
                    errors.innerHTML = "Invalid password or username";
                }
                else{
                    localStorage.setItem('userInfo', JSON.stringify(result));
                    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
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

            })
    }, false);



    document.getElementById('send-registration').addEventListener('click', function(){
        var username = document.getElementById('username1').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password2').value;
        var firstname = document.getElementById('firstname').value;
        var lastname = document.getElementById('lastname').value;

        Ajax.request(
            'PUT',
            Config.ajaxurl
            , {'username': username, 'password': password,'email': email, 'firstname' : firstname,
                'lastname' : lastname},
            true).setOnSuccess(function(){
                showLoginForm();
            })
    }, false);


    document.getElementById('browse').addEventListener('click', function() {
        clearListDecks();
        showDiv('index-container');

    }, false)

    document.getElementById('create').addEventListener('click', function() {
        clearListDecks();
        showDiv('createdeck-container');
    }, false)

    document.getElementById('site-logo').addEventListener('click', function() {
        clearListDecks();
        showDiv('index-container');
    }, false)

    document.getElementById('site-heading').addEventListener('click', function() {
        clearListDecks();
        showDiv('index-container');
    }, false)

    document.getElementById('create-deck-send').addEventListener('click', function(){

        var title = document.getElementById('title').value;
        var category;
        var categoryValue = document.getElementById('categories2').value;
        var description = document.getElementById('description').value;
        switch (categoryValue) {
            case 'sport':
                category = "1";
                break;
            case 'education':
                category = "2";
                break;
            case 'culture':
                category = "3";
                break;
            case 'exam':
                category = "4";
                break;
            case 'language':
                category = "5";
                break;
            case 'computers':
                category = "6";
                break;
            case 'course-subjects':
                category = "7";
                break;
            case 'careers':
                category = "8";
                break;
            case 'medical':
                category = "9";
                break;
            case 'other':
                category = "10";
                break;
        }
        if(document.getElementById('access').value == 'public'){
            var access = true;
        }
        else{
            var access = false;
        }


        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        Ajax.request(
            'POST',
            Config.newdeck, {'userid' : userInfo.userid.toString(), 'title': title,  'categoryid' : category, 'description' : description, 'isPublic': access},
            true).setOnSuccess(function(xhr){
                var response = JSON.parse(xhr.responseText);
                alert(response.deckid);
                document.getElementById("deckTitleHeading").innerHTML = title;
                showCardsAdd();

                document.getElementById('add-new-card').addEventListener('click', function(){
                    var container = document.getElementById("createcards-container");
                    var div = document.createElement('div');
                    var button = document.getElementById('button-send');
                    var parentDiv = button.parentNode;
                    div.className = 'fleft';
                    parentDiv.insertBefore(div, button);
                    var div2 = document.createElement('div');
                    parentDiv.insertBefore(div2, button);
                    var front = document.createElement('textarea');
                    front.className = "front-card-description";
                    front.maxLength = '2000'
                    front.cols = '1';
                    front.rows = '1';
                    front.name = 'front';
                    front.style.width = "320px"
                    div.appendChild(front);
                    var back = document.createElement('textarea');
                    back.className = "back-card-description";
                    back.maxLength = '2000';
                    back.cols = '1';
                    back.style.width = "320px"
                    back.rows = '1';
                    back.name = 'back';
                    div2.appendChild(back);

                }, false);

                document.getElementById('send-cards').addEventListener('click', function(){
                    var frontCards = document.getElementsByClassName("front-card-description");
                    var backCards = document.getElementsByClassName("back-card-description");

                    var cards = [];
                    for (var i = 0; i < frontCards.length; i++) {
                        cards.push({
                            'front' : frontCards[i].value,
                            'back' : backCards[i].value
                        })
                    }

                    Ajax.request(
                        'POST',
                        Config.newcards, {"deckid" : response.deckid, "cards" : cards},
                        true).setOnSuccess(function(xhr){
                            var usersArray = JSON.parse(xhr.responseText);
                            var account = document.getElementById("account");
                        })
                }, false);
            })
    }, false);
}
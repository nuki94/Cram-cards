function check(){
    if(document.querySelector('progress').value == document.querySelector('progress').max){
        showSaveButton();
        document.getElementById('question').innerHTML = 'Game over';

    }
}

var getCards = (function() {
    var cardsArray = [];
    function cards(val) {
        for(var i = 0; i<val.length; i++){
            cardsArray.push(val[i]);
        }
    }
    return {
        returnCards: function() {
            var question = document.getElementById('question');
            var answer = document.getElementById('answer');
            var counter = parseInt(document.getElementById("counter1").innerHTML.match(/\d+/).join("")) +
                parseInt(document.getElementById("counter2").innerHTML.match(/\d+/).join(""));
            if(counter != cardsArray.length){
                question.innerHTML = cardsArray[counter].front;
                setTimeout(function(){
                    answer.innerHTML = cardsArray[counter].back;
                }, 1000);
            }

        },
        setCards: function(newCardsArray) {
            cards(newCardsArray);
        },
        getCardsArray: function(){
            return cardsArray;
        }
    };
})();



function flipCard() {
    document.getElementById("card").style.transform = "rotateX(180deg)";
}

function reFlipCard() {
    document.getElementById("card").style.transform = "";
}

function showSaveButton() {
    document.getElementById('saveResults-button').style.display = 'block';
    document.getElementById('flip-button').style.display = 'none';
    document.getElementById('guess-buttons').style.display = 'none';
}

function showGuessButtons() {
    document.getElementById('guess-buttons').style.display = 'block';
    document.getElementById('flip-button').style.display = 'none';
}

function showFlipButton() {
    document.getElementById('guess-buttons').style.display = 'none';
    document.getElementById('flip-button').style.display = 'block';
    document.getElementById('saveResults-button').style.display = 'none';
}

function increaseGreenCounter() {
    var p = document.getElementById("counter1");
    var num = p.innerHTML.match(/\d+/);
    p.innerHTML = "Right: " + (parseInt(num[0]) + 1);
}

function increaseRedCounter() {
    var p = document.getElementById("counter2");
    var num = p.innerHTML.match(/\d+/);
    p.innerHTML = "Wrong: " + (parseInt(num[0]) + 1);
}

function updateProgressBar() {
    var progress = document.querySelector('progress');
    progress.value += 1;
}

function resetProgressBar() {
    var progress = document.querySelector('progress');
    progress.value = 0;
}


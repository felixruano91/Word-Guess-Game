//1.create array of the alphabet so it doesn't repeat the letter per word
//2.create array with the possible words in the hangman
//3.choose random word from the array
//4.create underscores based on the length of the word selected
//5.save users guess
//6.determine if the users guess is correct
//7.determine if the users guess is incorrect
//8.if right push to the right array
//9.if wrong push to the wrong array
//10.if the user guess is right replace the underscore accordingly
//11.determine if the user repeats input
//12.checks if the users word matches hangmans words

//1.variable for al the possible keyboard input options
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];
var repeatedAlphabet = [];
//2.array of the possible words in the hangman
var words = ['cyberpunk', 'projekt', 'hacker', 'silverhand', 'ford', 'disrespect', 'hype', 'rain', 'night', 'javascript', 'future', 'harrison', 'meme', 'hard', 'twentyseventyseven'];
//7.array for right guesses
var rightGuess = [];
//8.array for wrong guesses
var wrongGuess = [];
//3.choose a random word from the array of word options
var randomWord = Math.floor(Math.random() * words.length);
var chosenRandomWord = words[randomWord];
//array for temporal underscores
var underScore = [];
var indexRandom = [];
//leaderboard
//var winsArray = [0];
var wins = 0;
//var lossesArray = [0];
var losses = 0;
var guessesLeft = 8;
//locations in the html
var textUnderScore = document.getElementById('underscore');
var textRightGuess = document.getElementById('rightGuess');
var textWrongGuess = document.getElementById('wrongGuess');
var textWins = document.getElementById('wins')
var textLosses = document.getElementById('losses')
var textGuessesLeft = document.getElementById('guesses-left')
//4.create underscores based on the length of the word from the array
function generateUnderscore() {
    for(var i = 0; i < chosenRandomWord.length; i++) {
        underScore.push("_");
    }
    return underScore;
}
function reset () {
    randomWord = Math.floor(Math.random() * words.length);
    chosenRandomWord = words[randomWord];
    underScore = [];
    rightGuess = [];
    wrongGuess = [];
    guessesLeft = 8;
    repeatedAlphabet = [];
    for(var i = 0; i < chosenRandomWord.length; i++) {
    underScore.push("_");
    }
    textUnderScore.innerHTML = underScore.join(' ');
    textRightGuess.innerHTML = rightGuess.join(' ');
    textWrongGuess.innerHTML = wrongGuess.join(' ');
}
function playSound(url) {
    var a = new Audio(url);
    a.play();
}
//5.save users guess
generateUnderscore(document.onkeyup = function(event) {
    var standardGuess = event.key;
    var userGuess = standardGuess.toLocaleLowerCase();
    var userGuessUpper = userGuess.toUpperCase();
    textGuessesLeft.textContent = guessesLeft;
    //this checks if the user guess is repeated
    if (repeatedAlphabet.indexOf(userGuess) >= 0) {
        alert('You cant use that key again!')
    }
    else if (repeatedAlphabet.indexOf(userGuessUpper) >= 0) {
        alert('You cant use that key again!')
    }
    //this checks if the user input is in the alphabet array
    else if (alphabet.indexOf(userGuess) >= 0) {
        //6.determine if the users guess is correct
        if (chosenRandomWord.indexOf(userGuess) > -1) {
            //8.if right push to the right array
            rightGuess.push(userGuess) && repeatedAlphabet.push(userGuess);
            //----------------------------------------------------------------------------------------------------------
            for (var i = 0; i <= chosenRandomWord.length; i++) {
                if (chosenRandomWord.charAt(i) == userGuess) {
                    indexRandom.push(i)
                }
            }
            var indexRandomLength = indexRandom.length
            for (var j = indexRandomLength -1; j >= 0; j--) {
                underScore[indexRandom[j]] = userGuess;
                indexRandom.pop()
            }
            //----------------------------------------------------------------------------------------------------------
            //10.if the user guess is right replace the underscore accordingly
            //underScore[chosenRandomWord.indexOf(userGuess)] = userGuess;
            textUnderScore.innerHTML = underScore.join(' ');
            textRightGuess.innerHTML = rightGuess.join(' ');
            //13.checks if the users word matches hangmans words
            if (underScore.join('') == chosenRandomWord) {
                textWrongGuess.innerHTML = wrongGuess.join(' ');
                alert ("it's impossible, you won!");
                wins++
                textWins.textContent = wins;
                reset();
            }  
        }
        
        
        //7.determine if the users guess is incorrect
        else {
            guessesLeft--
            textGuessesLeft.textContent = guessesLeft;
            //9.if wrong push to the wrong array
            wrongGuess.push(userGuessUpper) && repeatedAlphabet.push(userGuessUpper);
            textWrongGuess.innerHTML = wrongGuess.join(' ');
            if (guessesLeft === 0) {
                alert ('You suck')
                reset ();
                losses++
                textLosses.textContent = losses;
            }
        }
    }
});


















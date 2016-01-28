var wordBank = ["cat", "couch", "computer", "airplane", "programming", "refrigerator", "tunnel", "apricot", "symphany", "obsequious", "beautiful", "runner", "bowling", "pitcher", "global", "brainiac", "slammer", "justified", "incredible", "enjoyement"];

var wordGrabber = function(randomNumber) {
  var currentWord = wordBank[randomNumber];
  return currentWord;
}

var wordSplitter = function(currentWord) {
  var backEndLetters = currentWord.split("");
  return backEndLetters;
}

var letterEncryption = function(backEndLetters) {
  var frontEndLetters = backEndLetters.slice();
  for (var i = 0; i < backEndLetters.length; i++) {
    frontEndLetters[i] = "_";
    }
  return frontEndLetters;
}

var letterGuess = function(currentGuess, backEndLetters, frontEndLetters, incorrectGuessCounter) {
  var correctGuess = false;
  for (var i = 0; i < backEndLetters.length; i++) {
    if (currentGuess === backEndLetters[i]) {
      frontEndLetters = revealCorrectLetter(i, currentGuess, frontEndLetters);
      correctGuess = true;
    }
  }
  return correctGuess;
  return incorrectGuessCounter;
}

var decreaseGuessValue = function(incorrectGuessCounter, correctGuess, currentGuess, frontEndLetters) {
  if (correctGuess === false) {
    alert("Sorry! ''" + currentGuess + "'' is not in the word!")
    incorrectGuessCounter -= 1;
  }
  return incorrectGuessCounter;
}

var revealCorrectLetter = function(currentIndex, currentGuess, frontEndLetters) {
  frontEndLetters[currentIndex] = currentGuess;
  return frontEndLetters;
}

var winLoseCondition = function(incorrectGuessCounter, frontEndLetters) {
  if (incorrectGuessCounter === 0) {
    return "lose";
  }

  var amountOfRevealedLetters = 0;
  for (var i = 0; i < frontEndLetters.length; i++) {
    if (frontEndLetters[i] != "_") {
      amountOfRevealedLetters += 1;
    }
  }

  if (amountOfRevealedLetters === frontEndLetters.length) {
    return "win";
  }

}

var displayWord = function(frontEndLetters) {
  return frontEndLetters.toString().replace( /,/g, " " );
}

var runHangman = function() {

  //Set Random Word
  var randomNumber = Math.floor((Math.random() * 18) + 0);
  var currentWord = wordGrabber(randomNumber);

  //Break Word Into Array for Front and Back End Use
  var backEndLetters = wordSplitter(currentWord);
  var frontEndLetters = letterEncryption(backEndLetters);

  //Set Initial Amount of Incorrect Guesses Remaining
  var incorrectGuessCounter = 8;

  //Intially Display Front End Array and Remaning Guesses
  $("span#displayFrontEndLetters").text(displayWord(frontEndLetters));
  $("span#displayRemainingGuesses").text(incorrectGuessCounter);

  //Define Neutral Game Outcome (as opposed to win/lose)
  var gameOutcome = "";

    //User Inputs Letter Guess
    $("button#submitLetterGuess").click(function() {
      var currentGuess = $("input#letterGuess").val();

      correctGuess = letterGuess(currentGuess, backEndLetters, frontEndLetters, incorrectGuessCounter);
      incorrectGuessCounter = decreaseGuessValue(incorrectGuessCounter, correctGuess, currentGuess, frontEndLetters)
      $("span#displayRemainingGuesses").text(incorrectGuessCounter);
      $("span#displayFrontEndLetters").text(displayWord(frontEndLetters));

      var gameOutcome = winLoseCondition(incorrectGuessCounter, frontEndLetters);
      if (gameOutcome === "win") {
        $("form#guessEntryForm").hide();
        $(".winner").show();

      } else if (gameOutcome === "lose") {
        $("form#guessEntryForm").hide();
        $(".loser").show();
      }
      $("input#letterGuess").val("");
    });
}

$(document).ready(function() {
  event.preventDefault();
  runHangman();

  $("button.reset").click(function(){

    runHangman();
    $("form#guessEntryForm").show();
    $(".loser").hide();
    $(".winner").hide();
  });
});

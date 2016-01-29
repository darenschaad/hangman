var wordBank = ["cat", "couch", "computer", "airplane", "programming", "refrigerator", "tunnel", "apricot", "symphony", "obsequious", "beautiful", "runner", "bowling", "pitcher", "global", "brainiac", "slammer", "justified", "incredible", "enjoyement", "quitter", "pheasant", "tacos", "genuine", "tubular", "groovy", "zoinks", "android", "gruel", "toast", "xenophobia", "xylophone", "matrix", "calculator", "reverberate", "pandora", "distributor", "garbage", "psalm", "zeus", "palindrome", "succulent", "morose", "serendipity", "premium", "placebo", "temporary", "cucumber", "angelic", "trombone", "smiley", "ninja", ""];

var alphabetArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

function Letter(letter) {
  this.letter = letter;
}

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
}

var decreaseGuessValue = function(incorrectGuessCounter, correctGuess, currentGuess, frontEndLetters) {
  // debugger;
  if (correctGuess === false) {
    $("#warningContainer").show();
    $("#displayWarning").text(currentGuess.toUpperCase());
    incorrectGuessCounter -= 1;
    $("#displayHangmanImage").empty().append("<img src='img/hangmanStages/hangman" + incorrectGuessCounter + ".png'>");
  }
  return incorrectGuessCounter;
}

var revealCorrectLetter = function(currentIndex, currentGuess, frontEndLetters) {
  frontEndLetters[currentIndex] = currentGuess;
  return frontEndLetters;
}

var winLoseCondition = function(incorrectGuessCounter, frontEndLetters) {
  if (incorrectGuessCounter === 0) {
    $("span.letterColor").off();
    $("span.letterColor").addClass("postLetterColor");
    $("span.letterColor").removeClass("letterColor");
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

var displayLetters = function(alphabetArray, backEndLetters, frontEndLetters, incorrectGuessCounter, currentWord) {
  for (var i = 0; i < alphabetArray.length; i++) {
    var letterObject = new Letter(alphabetArray[i]);
    $("div#letterContainer").append("<span class='letterColor'>" + letterObject.letter + "</span>")
    if (i === 12) {
      $("div#letterContainer").append("<br>")
    }

    $(".letterColor").last().click(function() {
      var currentGuess = $(this).text().toLowerCase();
      $(this).removeClass("letterColor");
      $(this).addClass("deactivatedLetter");
      $(this).off();

      $("#warningContainer").hide();

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
        $("#lossDisplayWord").text(currentWord);
        $(".loser").show();
      }
      $("input#letterGuess").val("");
    });
  }
}

var runHangman = function() {

  //Set Random Word

  var randomNumber = Math.floor((Math.random() * wordBank.length) + 0);
  var currentWord = wordGrabber(randomNumber);

  //Break Word Into Array for Front and Back End Use
  var backEndLetters = wordSplitter(currentWord);
  var frontEndLetters = letterEncryption(backEndLetters);

  //Set Initial Amount of Incorrect Guesses Remaining
  var incorrectGuessCounter = 8;
  $("#displayHangmanImage").append("<img src='img/hangmanStages/hangman" + incorrectGuessCounter + ".png'>");

  //Intially Display Front End Array and Remaning Guesses
  $("span#displayFrontEndLetters").text(displayWord(frontEndLetters));
  $("span#displayRemainingGuesses").text(incorrectGuessCounter);

  //Define Neutral Game Outcome (as opposed to win/lose)
  var gameOutcome = "";
  displayLetters(alphabetArray, backEndLetters, frontEndLetters, incorrectGuessCounter, currentWord);

}

$(document).ready(function() {
  event.preventDefault();
  runHangman();

  $("button.reset").click(function(){
    location.reload();
    // runHangman();
    // $("form#guessEntryForm").show();
    // $(".loser").hide();
    // $(".winner").hide();
  });
});

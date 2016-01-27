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
  var frontEndLetters = backEndLetters;
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

  if (correctGuess === true) {
    return frontEndLetters;
  } else {
    incorrectGuessCounter += 1;
    return incorrectGuessCounter;
  }
}

var revealCorrectLetter = function(currentIndex, currentGuess, frontEndLetters) {
  frontEndLetters[currentIndex] = currentGuess;
  return frontEndLetters;
}

var winLoseCondition = function(incorrectGuessCounter, frontEndLetters) {
  if (incorrectGuessCounter > 7) {
    return "lose";
  }

  var amountOfRevealedLetters = 0;
  for (var i = 0; i < frontEndLetters.length; i++) {
    if (frontEndLetters[i] != "_") {
      amountOfRevealedLetters += 1;
    }
  }

  if (amountOfRevealedLetters = frontEndLetters.length) {
    return "win";
  }
}

$(document).ready(function() {
  event.preventDefault();

  var randomNumber = 3;
  var currentWord = wordGrabber(randomNumber);
  var backEndLetters = wordSplitter(currentWord);
  var frontEndLetters = letterEncryption(backEndLetters);
  var incorrectGuessCounter = 0;
  $("span#displayFrontEndLetters").text(frontEndLetters);

  for (var gameOutcome = ""; gameOutcome === "win" || gameOutcome === "lose";) {
    $("button#submit").click(function() {
      var currentGuess = $("input#letterGuess").val();
      letterGuess(currentGuess, backEndLetters, frontEndLetters, incorrectGuessCounter);
      $("span#displayFrontEndLetters").text(frontEndLetters);
      var gameOutcome = winLoseCondition(incorrectGuessCounter, frontEndLetters);
    });
  }
});

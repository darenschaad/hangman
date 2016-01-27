describe('wordGrabber', function(randomNumber) {
    it("will grab a word from the specific index of the wordBank", function() {
      expect(wordGrabber(3)).to.equal("airplane");
   });
});

describe('wordSplitter', function(currentWord) {
  it("will split the characters of the word string into an array of letters", function() {
    expect(wordSplitter("airplane")).to.eql(["a", "i", "r", "p", "l", "a", "n", "e"])
  });
});

describe('letterEncryption', function(backEndLetters) {
  it("will change all letters in array to underscores", function() {
    expect(letterEncryption(["a", "i", "r", "p", "l", "a", "n", "e"])).to.eql(["_", "_", "_", "_", "_", "_", "_", "_"])
  });
});

describe('letterGuess', function(currentGuess, backEndLetters, frontEndLetters, incorrectGuessCounter) {
  it("will compare users guess to the current word's letters", function() {
    expect(letterGuess("a", ["a", "i", "r", "p", "l", "a", "n", "e"], ["_", "_", "_", "_", "_", "_", "_", "_"], 0)).to.eql(["a", "_", "_", "_", "_", "a", "_", "_"])
  });
  it("will add 1 to the incorrectGuessCounter when currentGuess does not equal any letters in the backEndLetters", function() {
    expect(letterGuess("j", ["a", "i", "r", "p", "l", "a", "n", "e"], ["_", "_", "_", "_", "_", "_", "_", "_"], 0)).to.equal(1)
  });
});

describe('revealCorrectLetter', function(currentIndex, currentGuess, frontEndLetters) {
  it("will replace underscore in frontEndLetters with a correct currentGuess letter", function() {
    expect(revealCorrectLetter(0, "a", ["_", "_", "_", "_", "_", "_", "_", "_"])).to.eql(["a", "_", "_", "_", "_", "_", "_", "_"])
  });
});

describe('winLoseCondition', function (incorrectGuessCounter, frontEndLetters) {
  it("will end the game if player has guessed wrong 8 times", function() {
    expect(8, ["_", "b", "_"]).to.equal("lose")
  });
});

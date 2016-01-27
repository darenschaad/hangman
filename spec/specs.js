describe('Player', function() {
    it("returns the player's mark", function() {
      var testPlayer = new Player("X");
      expect(testPlayer.mark()).to.equal("X");
   });
});

describe('Space', function() {
    it("returns the player's mark", function() {
      var testSpace = new Space(1,2);
      expect(testSpace.x-coordinate).to.equal(1);
   });
});

describe('Space', function() {
    it("returns the player's mark", function() {
      var testSpace = new Space(1,2);
      expect(testSpace.y-coordinate).to.equal(2);
   });

  it("lets a player mark a space", function() {
      var testPlayer = new Player("X")
      var testSpace = new Space(1,2);
      testSpace.markedBy(testPlayer)
      expect(testSpace.markedBy()).to.equal(testPlayer);
   });
});

describe('Board', function() {
  it("creates 9 spaces when it is initialized", function() {
    // You write the rest!
   });
});

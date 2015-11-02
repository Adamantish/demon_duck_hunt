// Constructor function for a Game

function Game() {
  this.lives = 10;
  this.score = 0;
  this.demonKills = 0;
  this.shotSound = new Audio()
  this.shotSound.src = 'audio/shot.mp3'

  $('#score')[0].innerText = 0

  var _this = this
  // to prevent highlighting on double click
  $('#game').mousedown(function(){ return false; })

  $('#game').on('click', _this.decrementShots)
  // Set the difficulty- easy by default
  if(typeof(globDifficulty) === "undefined") {
    this.speed = this.difficulty.easy;
  }
  else {
    this.speed = this.difficulty[globDifficulty];
  }
  // Kick-off the first wave of Ducks
  this.nextRound();
}

// Maps difficulty to speed at which a Duck traverses the screen in milliseconds.
Game.prototype.difficulty = {
  easy: 8000 ,
  medium: 4000 ,
  hard: 2500 
}

Game.prototype.resetShots = function() {
  this.shots = 3
}

Game.prototype.decrementShots = function() {

  if( game.shots > 0 ){
  game.shotSound = new Audio()
  game.shotSound.src = 'audio/shot.mp3'
  game.shotSound.play()

  game.shots -= 1
    console.log("shots left: " + game.shots)
  };
}
// Fire off two new Ducks. After waiting a little while, continue to the next
// round if we've got more lives, or show the Game Over screen.
Game.prototype.nextRound = function() {

  // myTODO: Restructure to call this on the removal of last duck rather than using setTimeout to call self.
  // This will mean we don't have to wait a long time after killing both ducks early
   // and don't have to wait for game over
  var _this = this;
  var roundTimer; 
  // Do this again in a little while...
  
  // End the game if we've run out of lives
  if(_this.lives <= 0) {
    // Game over man
    _this.gameOver();
  }
  else {
    roundTimer = setTimeout(function() {
      var duck = new Duck(_this);
      var duck2 = new Duck(_this);
      var demonDuck = new Duck(_this, 'demon');
      
      _this.resetShots();

      }
    , (5000 * Math.random())
    )

  };
};

Game.prototype.nextRoundIfReady = function() {
  var _this = this
  if ($('.duck').length == 1) {
    _this.nextRound()
  };
};

// Show the Game Over modal and insert the player's score.
Game.prototype.gameOver = function() {
  $("#points").html(this.score);
  $('#demon-kills').html(this.demonKills)
  $("#game-over").toggle();
}

// Add the given number of points to the score, and print the total to the log.
Game.prototype.addScore = function(points) {
  this.score += points;
  $('#score')[0].innerText = this.score
}
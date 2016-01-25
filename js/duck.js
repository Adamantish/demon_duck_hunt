// Constructor function for a Duck

function Duck(game, type) {
  this.game = game;
  this.el = $("#duck-template").clone();
  this.el.removeAttr("id");
  this.type = type || "plain"

  this.dieSound = new Audio()
  
  if(this.type === 'demon') {
    this.worthPoints = 300;
    this.demonImmunity = true;
    this.dieSound.src = "audio/demon_die.mp3"
  }
  else if(this.type === "henry") {
    this.worthPoints = -500;
  }
  else {
    this.worthPoints = 100;
    this.dieSound.src = "audio/quack.mp3"
  };

  var _this = this;
  $(this.el).on("click", function() {
    if( game.shots > 0 & !_this.demonImmunity ) {_this.die()};
  });

  this.draw();
}

function randomHeight() {
  return 500 * Math.random();
}

Duck.prototype.flap = function() {
  $(this.el).toggleClass("flap");

  var _this = this;

  // Do this again in 300 milliseconds
  this.flapTimer = setTimeout((function() {
    _this.flap();
  }), 300);
}

Duck.prototype.draw = function() {

  var $duck = $(this.el).addClass("sprite").addClass("duck")
  $duck.addClass(this.type)
  $duck.attr("style", "top: " + (randomHeight() ) + "px")

  $('#game').append($duck)
  this.flap()
  var _this = this
  $(this.el).animate({left:"1600", top:randomHeight()}
    , {duration: _this.game.speed
    , easing: "linear"
    , queue: false
    , complete: function() {
      if(_this.type !== 'demon') {_this.complete()};
      _this.remove()
  }})

  if(_this.type === 'demon') {
    $(_this.el).addClass('demon')
    $(_this.el).attr("style", "opacity: 0.6")
    $(_this.el).animate({opacity:0},
    {
      duration: this.game.speed * 0.3,
      queue: false,
      easing: "easeInOutBounce",
      complete: function() {
        setTimeout( function() {
            _this.demonImmunity = false
          } ,_this.game.speed * 0.15)
        }
      }
    )
  };

}

//  I've been shot!
Duck.prototype.die = function() {

  var _this = this

  this.dieSound.play()

  if(this.type === 'demon') {

    $(this.el).addClass("undead")
    $(this.el).stop()
    this.game.addScore(this.worthPoints)
    this.game.demonKills += 1
    $(this.el).animate({ top:"-=800" }, 1600, "easeInSine", function() {
      _this.remove()
    })
    $(this.el).animate({ opacity:0.6 }, { duration: 200, queue: false } )
  }
  //  else if(this.type === "henry")
  else {
    
    $(this.el).addClass("dead " + _this.type)
     // Stop flapping - clear the flapTimer
     clearTimeout(this.flapTimer)
    // Stop flying animations
    $(this.el).stop()
    this.game.addScore(this.worthPoints)
    $(this.el).animate({ top:"+=800" }, 1600, "easeInBackSharp", function() {
      _this.remove()
    })

  }

}

// I made it to the other side!
Duck.prototype.complete = function() {
  this.game.lives -= 1;
  this.game.renderLives()
  return this;
}

// Code to remove the Duck from the DOM and from memory.
Duck.prototype.remove = function() {
  $(this.el).remove();
  delete this;
  game.nextRoundIfReady()
}

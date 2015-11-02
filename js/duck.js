// Constructor function for a Duck

function Duck(game, type) {
  this.game = game;
  this.el = $("#duck-template").clone();
  this.el.removeAttr("id");
  this.type = type

  this.dieSound = new Audio()
  
  if(this.type === 'demon') {
    this.worthPoints = 300;
    this.demonImmunity = true;
    this.dieSound.src = "audio/demon_die.mp3"
  }
  else {
    this.worthPoints = 100;
    this.dieSound.src = "audio/quack.mp3"
  };

  // Add a callback for when the Duck is clicked (shot!)
  var _this = this;
  $(this.el).on("click", function() {
    if( game.shots > 0 & !_this.demonImmunity ) {_this.die()};
  });

  // Display the Duck in the #game
  this.draw();
}

// A random height generator for use when placing a Duck.
function randomHeight() {
  return 500 * Math.random();
}

// Some animation using a Timeout to make the Duck flap.
Duck.prototype.flap = function() {
  $(this.el).toggleClass("flap");

  // Oh Javascript...
  var _this = this;

  // Do this again in 300 milliseconds
  this.flapTimer = setTimeout((function() {
    _this.flap();
  }), 300);
}

// TODO: Display the Duck on the screen.
Duck.prototype.draw = function() {
  // Make the duck appear somewhere random along the page and just off the screen

  var $duck = $(this.el).addClass("sprite").addClass("duck")
  // $duck = $('<div>').addClass('duck-holder')
  $duck.attr("style", "top: " + (randomHeight() ) + "px")
  // $duck.append($innerDuck)

  $('#game').append($duck)
  this.flap()
  var _this = this
  $(this.el).animate({left:"1600", top:randomHeight()}
    , this.game.speed
    , "linear"
    , function() {
      if(_this.type !== 'demon') {_this.complete()};
      _this.remove()
  })

  if(this.type === 'demon') {
    $(this.el).addClass('demon')
    $(this.el).attr("style", "opacity: 0.6")
    $(this.el).animate({opacity:0},
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
  }
  // this.remove()
}

//  I've been shot!
Duck.prototype.die = function() {

  var _this = this

  this.dieSound.play()

  if(this.type === 'demon') {

    $(this.el).addClass("undead")
    // $(this.el).removeClass('demon')
    // clearTimeout(this.flapTimer)
    $(this.el).stop()
    this.game.addScore(this.worthPoints)
    this.game.demonKills += 1
    $(this.el).animate({ top:"-=800" }, 1600, "easeInSine", function() {
      _this.remove()
    })
    $(this.el).animate({ opacity:0.6 }, { duration: 200, queue: false } )
  }
  else {

    $(this.el).addClass("dead")
     // Stop flapping - clear the flapTimer
     clearTimeout(this.flapTimer)
    // Stop flying animations
    $(this.el).stop()
    // Notify the Game object and add 100 to the score
    this.game.addScore(this.worthPoints)
    $(this.el).animate({ top:"+=800" }, 1600, "easeInBackCustomised", function() {
      _this.remove()
    })

  }

  // function allDeadDucksDo() {
    
  // }
}

// I made it to the other side!
Duck.prototype.complete = function() {
  this.game.lives -= 1;
  return this;
}

// Code to remove the Duck from the DOM and from memory.
Duck.prototype.remove = function() {
  $(this.el).remove();
  delete this;
  game.nextRoundIfReady()
}

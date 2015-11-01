// Constructor function for a Duck

function Duck(game) {
  this.game = game;
  this.el = $("#duck-template").clone();
  this.el.removeAttr("id");

  // Add a callback for when the Duck is clicked (shot!)
  var _this = this;
  $(this.el).on("click", function() {
    _this.die();
  });

  // Display the Duck in the #game
  this.draw();
}

// A random height generator for use when placing a Duck.
function randomHeight() {
  return 600 * Math.random();
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

  $duck = $(this.el).addClass("sprite").addClass("duck")
  $($duck).attr("style", "top: " + randomHeight() + "px")
  // Append the element to the DOM, use the #game element
  $('#game').append($duck)
  // Start Flapping...
  this.flap()
  // ... and Fly!
  var _this = this
  $(this.el).animate({left:"1600", top:randomHeight()}
    , this.game.speed
    , "linear"
    , function() {
      _this.remove()
                 // this.remove(); 
               })
  // this.remove()
}

// TODO: I've been shot!
Duck.prototype.die = function() {
  // Add a .dead CSS class
    $(this.el).addClass("dead")
  // Stop flapping - clear the flapTimer
   clearTimeout(this.flapTimer)
  // Stop flying animations
  $(this.el).stop()
  // Notify the Game object and add 100 to the score
  this.game.addScore(100)
  // Fall to the bottom of the screen 
  // Note: 
  $(this.el).animate({top:"+=800"}, 1600, "easeInBackCustomised", function() {this.remove()})

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
}
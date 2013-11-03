// Constructor function for a Duck

function Duck(game) {
  this.game = game;
  this.el = $("#duck-template").clone();
  this.el.removeAttr("id");

  // Add a callback for when the Duck is clicked (shot!)
  var _this = this;
  $(this.el).click(function() {
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

  // Append the element to the DOM, use the #game element

  // Start Flapping...

  // ... and Fly!
}

// TODO: I've been shot!
Duck.prototype.die = function() {
  // Add a .dead CSS class

  // Stop flapping - clear the flapTimer

  // Stop flying animations

  // Notify the Game object and add 100 to the score

  // Fall to the bottom of the screen
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
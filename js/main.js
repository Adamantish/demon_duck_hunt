$(document).ready(function() {
  console.log("Welcome to Duck Hunt!");

  // Behaviour for the play again link
  $('#play-again').click(function(e) {
    $("#game-over").toggle();
    new Game();
  });

  // Moves the crosshair with the mousepointer
  // TODO: Add a mousemove event to the #game element...
  $('#game').on("mousemove", function(){ 
    $('#crosshair').css("left" , event.pageX - 30)
    $('#crosshair').css("top" , event.pageY - 30)
  })
  // Kick-off a New Game
  // TODO: Pass in a string to represent the difficlty level
  new Game("medium");
});
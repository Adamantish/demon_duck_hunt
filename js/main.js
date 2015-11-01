
function renderStartScreen() {
  var html = "<h1>Duck Hunt!</h1>"
  html += "<p>How tough do you like your duck?</p>"
  html += "<form id='difficulties' >"
   html += "          <input type='radio' name='difficulty' value='easy'>Soft</input>"
   html += "          <input type='radio' name='difficulty' value='medium' checked=true >Chewy</input>"
   html += "          <input type='radio' name='difficulty' value='hard'>Well Hard</input>"
   html += "  </form>"

   html += "<button id='play-button' class='modal-button'>Play</button>"

   var _this = this

   var $playButton = $('html')
   $playButton.on('click', '#play-button', function() { 
    
    var difficulty = $('input[name=difficulty]:checked', '#difficulties').val()
    globModal.remove()

    beginNewGame(difficulty)

   })

  return html
}

function beginNewGame(difficulty) {
  game = new Game(difficulty)
};

$(document).ready(function() {
  console.log("Welcome to Duck Hunt!");

  globModal = new MyModal("", renderStartScreen())

  // Behaviour for the play again link
  $('#play-again').click(function(e) {
    $("#game-over").toggle();
    delete game;
    beginNewGame()
  });

  $('#game').on("mousemove", function(){ 
    $('#crosshair').css("left" , event.pageX - 30)
    $('#crosshair').css("top" , event.pageY - 30)
  })
  // Kick-off a New Game
  // TODO: Pass in a string to represent the difficlty level
  // new Game("medium");


});
// use strict

var globalTragedy

function renderStartScreen() {
  var html = ""
  html += "<div class='sound-icon'></div>"
  html += "<h1 class='creepy'>Demon</h1>"
  html += "<h1>Duck Hunt!</h1>"
  html += "<p>Your job is to kill them ducks dead. <br> Your pleasure may be to kill the already dead ones deader. Double-dead it after it turns invisible for triple points.</p>"
  html += "<p>How tough do you like your duck?</p>"
  html += "<form id='difficulties' >"
  html += "          <input type='radio' name='difficulty' value='easy'>Soft</input>"
  html += "          <input type='radio' name='difficulty' value='medium' checked=true >Chewy</input>"
  html += "          <input type='radio' name='difficulty' value='hard'>Rubber</input>"
  html += "  </form>"

  html += "<button id='play-button' class='modal-button'>Play</button>"

  var _this = this

  $('html').on('click', '.sound-icon', function() {
    $('.sound-icon').toggleClass('unmute')
    if(globalTragedy === undefined) {
      globalTragedy = new Audio('audio/tragedy128.mp3')
      globalTragedy.loop = true
    }
    if(globalTragedy.paused){
      globalTragedy.play()
    }
    else {
      globalTragedy.pause()
    };
  })

  var $playButton = $('html')
  $playButton.on('click', '#play-button', function() { 
   
    globDifficulty = $('input[name=difficulty]:checked', '#difficulties').val()
    globModal.remove()
    game = new Game()

  })

  return html
}


$(document).ready(function() {
  console.log("Welcome to Duck Hunt!");

  globModal = new MyModal("", renderStartScreen())

  // Behaviour for the play again link
  $('#play-again').click(function(e) {
    $("#game-over").toggle();
    delete game;
    game = new Game()
  });

  $('#game').on("mousemove", function(){ 
    $('#crosshair').css("left" , event.pageX - 30)
    $('#crosshair').css("top" , event.pageY - 30)
  })
  // Kick-off a New Game
  // TODO: Pass in a string to represent the difficlty level
  // new Game("medium");


});
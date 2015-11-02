// use strict

var globalTragedy
var globModal

$(document).ready(function() {
  console.log("Welcome to Duck Hunt!");

  globModal = new MyModal("", renderStartScreen())
  initCallbacks()
});

function renderStartScreen() {
  var html = ""
  html += "<div class='sound-icon'></div>"
  html += "<h1 class='creepy'>Demon</h1>"
  html += "<h1>Duck Hunt!</h1>"
  html += "<p>Your job is to kill them ducks dead. <br> To kill the demon one deader is purely for your pleasure and triple points. You can only kill it after it turns invisible.</p>"
  html += "<p>How tough do you like your duck?</p>"
  html += "<form id='difficulties' >"
  html += "          <input type='radio' name='difficulty' value='easy'>Soft</input>"
  html += "          <input type='radio' name='difficulty' value='medium' checked=true >Chewy</input>"
  html += "          <input type='radio' name='difficulty' value='hard'>Rubber</input>"
  html += "  </form>"

  html += "<button id='play-button' class='modal-button'>Play</button>"

 

  var $playButton = $('html')
  $playButton.on('click', '#play-button', function() { 
   
    globDifficulty = $('input[name=difficulty]:checked', '#difficulties').val()
    globModal.remove()
    game = new Game()

  })

  return html
}

function initCallbacks() {
    var _this = this

  $('html').on('click', '.sound-icon', function() {
    $('.sound-icon').toggleClass('unmute')
    if(globalTragedy === undefined) {
      globalTragedy = new Audio('audio/tragedy128.mp3')
      globalTragedy.loop = true
      globalTragedy.currentTime=(1)
    }
    if(globalTragedy.paused){
      globalTragedy.play()
    }
    else {
      globalTragedy.pause()
    };
  })
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
}


//Handle startButton click, send the boolean to the gameValues const, initialize other data
$("#startButton").click(function() {
	console.log("Start clicked!")
	gameValues.gameStarted = true;
	gameValues.userScore = 0;
	gameValues.targetScore = 1000;
	$("#startButton").addClass("disabled");
	$("#acceptCargoButton").removeClass().addClass("btn btn-success");;
});

//Contains game elements for use in game processing. 
//Will be expanded for icebox elements.
const gameValues = {
  PLACEHOLDER: function(){
    if (gameValues.gameStarted) {

    }
  },
  gameStarted: false,
  timerValue: 0,
  targetScore: 0,
  userScore: 1000,
  playerWin: false,
  }

//NewTimer 
//Use setTimeout to track time in seconds (1000ms per tick)
//store seconds in var

const gameTimeElapsed = {
	tickClock: function(){
		if (gameTimeElapsed.isRunning) {
			setTimeout(gameTimeElapsed,tickClock, 1000);
			gameTimeElapsed.addTimeElapsed();
			//placeholder for display call
		},
		isRunning: false,
		secondsElapsed: ,
		addTimeElapsed: function() {
			gameTimeElapsed.secondsElapsed ++;
		}

	}
};





//Timer functions
/////////////////////////////////////////////////////////////////
const gameTimer = {
  tickClock: function(){
    if (gameTimer.isRunning) {
      setTimeout(gameTimer.tickClock, 1000); // trigger next clock tick
      gameTimer.decreaseOneSecond();
      AppController.handleClockTick();
    }
  },
  isRunning: false,
  minutes: 0,
  seconds: 0,
  decreaseOneSecond: function(){
    gameTimer.seconds -= 1;
    if (gameTimer.seconds = 0) {
        gameTimer.seconds +59;
        gameTimer.minutes --;
    }
  },

  reset: function(){
    gameTimer.seconds = 00;
    gameTimer.minutes = 00;
  },

  start: function(){
    if (!gameTimer.isRunning) {
        gameTimer.isRunning = true;
        gameTimer.tickClock();
    }
  },
};

// /// User Interface ///
// const ViewEngine = {
//   updateTimeDisplay: function(minutes, seconds){
//     document.getElementById('seconds').innerHTML = 
//     ViewHelpers.zeroFill(secs, 2);
//     document.getElementById('minutes').innerHTML = 
//     ViewHelpers.zeroFill(mins, 2);
//   },
// };
// const ViewHelpers = {
//   zeroFill: function(number, length){
//     var numberToString = number.toString();
//     let numberOfZeroesNeeded = (length - numberToString.length, 0);
//     for( var i = 0; i < (length - numberToString.length); i++){
//       numberToString = "0" + numberToString;
//     }
//     return numberToString;
//     //checks if timer number is currently at the needed length, if not, adds a zero to the front
//     //Note: doesn't seem to work if kept as a number, worked once converted to string first. Remember this in future
//   },
// };

// /// Top-Level Application Code ///
// const AppController = {
//   //Clicks feed into this
//   handleClockTick: function(){
//     ViewEngine.updateTimeDisplay(gameTimer.mins, gameTimer.secs, gameTimer.millisecs);
//     // Accesses viewengine and updatetimedisplay, feeds them mins, secs and millisecs from gameTimer
//   },
//   handleClickStart: function() {
//     if (!gameTimer.isRunning) { gameTimer.start(); 
//     }
//     // onclick (from window.onload) checks if gameTimer isrunning, starts it if not, using start function above
//   },
//   handleClickStopReset: function(){
//     if (gameTimer.isRunning) {
//       gameTimer.stop();
//     } else {
//       ViewEngine.updateTimeDisplay(00, 00);
//       gameTimer.reset();
//     }
//     //onclick (from window.onload) checks if gameTimer isrunning, if it is, stops it by triggering stop function, if not, returns initialized numbers
//   },
//   // handleClickLap: function(){
//   //   // Your Code Here  ---skip this
//   // }
// };

// window.onload = function(){
//   // Attach AppController methods to the DOM as -event handlers- here.  
//   //Get the html element, listen for click, feed into appcontroler
//   document.getElementById('start').onclick = AppController.handleClickStart;
//   document.getElementById('stop').onclick = AppController.handleClickStopReset;
// };
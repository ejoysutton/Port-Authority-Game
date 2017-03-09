//Handle startButton click, send the boolean to the gameValues const, initialize other data
$("#startButton").click(function() {
	console.log("Start clicked!");
	gameValues.gameStarted = true;
	gameValues.userScore = 0;
	gameValues.targetScore = 1000;
	$("#startButton").addClass("disabled");
	$("#acceptCargoButton").removeClass().addClass("btn btn-success");
	$(".gameBoardBoxBase").removeClass("elementInactive");
	if (gameValues.gameStarted) {$pullCurrentCargo();}
	if (!gameTimeElapsed.isRunning) {gameTimeElapsed.start();}
});

//Contains game elements for use in game processing. 
//Will be expanded for icebox elements.
const gameValues = {
  PLACEHOLDER: function(){
    if (gameValues.gameStarted) {

    }
  },
  gameStarted: false,
  secondsElapsed: 0,
  timeRemaining: 0,
  timerSeconds: 0,
  timeMax: 90,
  displaySeconds: 0,
  displayMinutes: 0,
  gameBoardBoxOne: 0,
  gameBoardBoxTwo: 0,
  gameBoardBoxThree: 0,
  gameBoardBoxFour: 0,
  targetScore: 0,
  userScore: 1000,
  playerWin: false,
  cargoInnerHTML: 0,
  cargoAddClass:0,
  };

/////////////////////////////////////////////////////////////////
//Game Logic section
//populate random array
var levelOneRawCargoArray = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4];
var levelOneRandomCargoArray = 
levelOneRawCargoArray.sort(function(a, b){return 0.5 - Math.random()});
    console.log(levelOneRandomCargoArray);

//GameBoard manager
//call at the start of the game and again at each cargoAccept until the array is empty
$pullCurrentCargo = function() {
	gameValues.gameBoardBoxOne = levelOneRandomCargoArray.pop();
		$setCargoType(gameValues.gameBoardBoxOne); 
			$("#gameBoardBox1").addClass(gameValues.cargoAddClass);
			$("#gameBoardBox1").text(gameValues.cargoInnerHTML);
	gameValues.gameBoardBoxTwo = levelOneRandomCargoArray.pop();
		$setCargoType(gameValues.gameBoardBoxTwo); 
			$("#gameBoardBox2").addClass(gameValues.cargoAddClass);
			$("#gameBoardBox2").text(gameValues.cargoInnerHTML);
	gameValues.gameBoardBoxThree = levelOneRandomCargoArray.pop();
		$setCargoType(gameValues.gameBoardBoxThree); 
			$("#gameBoardBox3").addClass(gameValues.cargoAddClass);
			$("#gameBoardBox3").text(gameValues.cargoInnerHTML);
	gameValues.gameBoardBoxFour = levelOneRandomCargoArray.pop();
		$setCargoType(gameValues.gameBoardBoxFour); 
			$("#gameBoardBox4").addClass(gameValues.cargoAddClass);
			$("#gameBoardBox4").text(gameValues.cargoInnerHTML);
	};
$setCargoType = function(boxNumber) {
	if  (boxNumber === 1) {
		gameValues.cargoInnerHTML = "lapis";
		gameValues.cargoAddClass = "cargoTypeOne";
	}
	else if (boxNumber === 2) {
		gameValues.cargoInnerHTML = "amethyst";
		gameValues.cargoAddClass = "cargoTypeTwo";
	}
	else if (boxNumber === 3) {
		gameValues.cargoInnerHTML = "rose quartz";
		gameValues.cargoAddClass = "cargoTypeThree";
	}
	else if (boxNumber === 4) {
		gameValues.cargoInnerHTML = "aquamarine";
		gameValues.cargoAddClass = "cargoTypeFour";
	}
	else {}
};

//////////////////////////////////////////////////////////////////
//NewTimer 
//Use setTimeout to track time in seconds (1000ms per tick)
//store seconds in var

const gameTimeElapsed = {
	tickClock: function(){
		if (gameTimeElapsed.isRunning) {
			setTimeout(gameTimeElapsed.tickClock, 1000);
			gameTimeElapsed.addSecond();
			gameTimeElapsed.timeRemaining();
		}
	},
	isRunning: false,
	addSecond: function(){
		gameValues.timerSeconds += 1;
		},
	start: function(){
    //called to start the clock, check if running first, then turn one and turn on the tick function
    if (!this.isRunning) {
        this.isRunning = true;
        this.tickClock();
    	}
  	},
  	//Calculates the time remaining based on values stored in gameValues. Calls game end function
  	timeRemaining: function(){
  		if (gameValues.timeMax > gameValues.timerSeconds) {
  			gameValues.timeRemaining = gameValues.timeMax - gameValues.timerSeconds;
  		}
  		else if (gameValues.timeMax === gameValues.timerSeconds) {
  			//PLACEHOLDER call game end
  		}
  	},
};
$timerConversion = function(seconds) {
	if (seconds > 0) {
		gameValues.displaySeconds = seconds%60;
		gameValues.displayMinutes = Math.floor(seconds/60);
	}
};

////////////////////////////////////////////////////////////////////
//Accept Cargo control and Logic
//onclick, set class to excludedPiece
// document.getElementById('gameBoardBox1').onclick = console.log("Box Clicked");
// $("#gameBoardBox1").addClass("excludedPiece"); 
$("#gameBoardBox1").on("click", (function() {
    if ($(this).hasClass('excludedPiece')) {
      $(this).removeClass('excludedPiece');
    } else {
      $(this).addClass('excludedPiece');
    }
}));
$("#gameBoardBox2").on("click", (function() {
    if ($(this).hasClass('excludedPiece')) {
      $(this).removeClass('excludedPiece');
    } else {
      $(this).addClass('excludedPiece');
    }
}));
$("#gameBoardBox3").on("click", (function() {
    if ($(this).hasClass('excludedPiece')) {
      $(this).removeClass('excludedPiece');
    } else {
      $(this).addClass('excludedPiece');
    }
}));
$("#gameBoardBox4").on("click", (function() {
    if ($(this).hasClass('excludedPiece')) {
      $(this).removeClass('excludedPiece');
    } else {
      $(this).addClass('excludedPiece');
    }
}));

//////////////////////////////////////////////////////////////////
//Accept Cargo Functions
//////////////////////////////////////////////////////////////////
$("#acceptCargoButton").on("click", (function() {
	pointCalculator.cargoBoxesTally();
	$("#gameBoardBox1").removeClass().addClass('gameBoardBoxBase').text('');
	$("#gameBoardBox2").removeClass().addClass('gameBoardBoxBase').text('');
	$("#gameBoardBox3").removeClass().addClass('gameBoardBoxBase').text('');
	$("#gameBoardBox4").removeClass().addClass('gameBoardBoxBase').text('');
	if (levelOneRandomCargoArray.length >= 1) {
		$pullCurrentCargo();
	} else {
	$("#acceptCargoButton").removeClass().addClass("btn btn-success disabled");	
	};
}));
const pointCalculator = {
	cargoType1: -2,
	cargoType2: 4,
	cargoType3: 6,
	cargoType4: 8,
	embargoType: 1,
	cargoBoxesTally: function(){
		if ($("#gameBoardBox1").hasClass('excludedPiece')) {

		} else {
		//MAKE THIS A FUNCTION TO CALL INSTAED OF REPEATING IT
			switch(gameValues.gameBoardBoxOne) {
				case 1:
				gameValues.userScore += this.cargoType1;
				break;
				case 2:
				gameValues.userScore += this.cargoType2;
				break;
				case 3:
				gameValues.userScore += this.cargoType3;
				break;
				case 4:
				gameValues.userScore += this.cargoType4;
				break;
			}
		}
		if ($("#gameBoardBox2").hasClass('excludedPiece')) {

		} else {
			switch(gameValues.gameBoardBoxTwo) {
				case 1:
				gameValues.userScore += this.cargoType1;
				break;
				case 2:
				gameValues.userScore += this.cargoType2;
				break;
				case 3:
				gameValues.userScore += this.cargoType3;
				break;
				case 4:
				gameValues.userScore += this.cargoType4;
				break;
			}
		}
		if ($("#gameBoardBox3").hasClass('excludedPiece')) {

		} else {
			switch(gameValues.gameBoardBoxThree) {
				case 1:
				gameValues.userScore += this.cargoType1;
				break;
				case 2:
				gameValues.userScore += this.cargoType2;
				break;
				case 3:
				gameValues.userScore += this.cargoType3;
				break;
				case 4:
				gameValues.userScore += this.cargoType4;
				break;
			}
		if ($("#gameBoardBox4").hasClass('excludedPiece')) {

		} else {
			switch(gameValues.gameBoardBoxFour) {
				case 1:
				gameValues.userScore += this.cargoType1;
				break;
				case 2:
				gameValues.userScore += this.cargoType2;
				break;
				case 3:
				gameValues.userScore += this.cargoType3;
				break;
				case 4:
				gameValues.userScore += this.cargoType4;
				break;

			}
		}
}}
	};

	// subtractPoints: function(){
	// 	if (this.embargoType === 1, gameValues.){
	// 		gameValues.userScore -= this.cargoType1;
	// 		console.log(gameValues.userScore);
	// 	}
	// 	if (this.embargoType === 2){
	// 		gameValues.userScore -= this.cargoType2;
	// 		console.log(gameValues.userScore);
	// 	}
	// 	if (this.embargoType === 3){
	// 		gameValues.userScore -= this.cargoType3;
	// 		console.log(gameValues.userScore);
	// 	}
	// 	if (this.embargoType === 4){
	// 		gameValues.userScore -= this.cargoType4;
	// 		console.log(gameValues.userScore);
	// 	}
	// },
	// addPoints: function(){
	// 	if (this.embargoType !== 1){
	// 		gameValues.userScore += this.cargoType1;
	// 		console.log(gameValues.userScore);
	// 	}
	// 	if (this.embargoType !== 2){
	// 		gameValues.userScore = this.cargoType2;
	// 		console.log(gameValues.userScore);
	// 	}
	// 	if (this.embargoType !== 3){
	// 		gameValues.userScore += this.cargoType3;
	// 		console.log(gameValues.userScore);
	// 	}
	// 	if (this.embargoType !== 4){
	// 		gameValues.userScore += this.cargoType4;
	// 		console.log(gameValues.userScore);
	// 	}
	// },

// pointCalculator.embargoPointSet();

// check for bad items
// for each bad item - points
// check for good items
// for each good item, + points

//////////////////////////////////////////////////////////////////
//OLD PIECES ARCHIVE//////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//Populate game board with cargo
//////////////////////////////////////////////////////////////
// $populateGameBoardBox = function() {
// 	$("#gameBoardBox1").addClass
// };
// const cargoPopulate  = {
// 	getCargoType: function (gameBoardBox) {
// 		if (gameBoardBox === 1)
// 	}
// 	}
// }


//Timer functions
/////////////////////////////////////////////////////////////////
// const gameTimer = {
//   tickClock: function(){
//     if (gameTimer.isRunning) {
//       setTimeout(gameTimer.tickClock, 1000); // trigger next clock tick
//       gameTimer.decreaseOneSecond();
//       AppController.handleClockTick();
//     }
//   },
//   isRunning: false,
//   minutes: 0,
//   seconds: 0,
//   decreaseOneSecond: function(){
//     gameTimer.seconds -= 1;
//     if (gameTimer.seconds = 0) {
//         gameTimer.seconds +59;
//         gameTimer.minutes --;
//     }
//   },

//   reset: function(){
//     gameTimer.seconds = 00;
//     gameTimer.minutes = 00;
//   },

//   start: function(){
//     if (!gameTimer.isRunning) {
//         gameTimer.isRunning = true;
//         gameTimer.tickClock();
//     }
//   },
// };

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
//Handle startButton click, send the boolean to the gameValues const, initialize other data
$("#startButton").click(function() {
	console.log("Start clicked!");
	gameValues.gameStarted = true;
	gameValues.userScore = 0;
	gameValues.targetScore = 10;
	$("#startButton").addClass("disabled");
	$("#acceptCargoButton").removeClass().addClass("btn btn-success");
	$(".gameBoardBoxBase").removeClass("elementInactive");
	if (gameValues.gameStarted) {$pullCurrentCargo();}
	if (!gameTimeElapsed.isRunning) {gameTimeElapsed.start();}
	if (!updateScores.isRunning) {updateScores.start();}
});

//Contains game elements for use in game processing. 
//Will be expanded for icebox elements.
const gameValues = {
  PLACEHOLDER: function(){
    if (gameValues.gameStarted) {

    }
  },
  gameStarted: false,
  gameComplete: false,
  secondsElapsed: 0,
  timeRemaining: 0,
  timerSeconds: 0,
  timeMax: 10,
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
  gameResult: false,
  };

/////////////////////////////////////////////////////////////////
//Game Logic section
//populate random array
var levelOneRawCargoArray = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4];
var levelOneRandomCargoArray = 
levelOneRawCargoArray.sort(function(a, b){return 0.5 - Math.random()});
    console.log(levelOneRandomCargoArray);

///////////////////////////////////////////////////////////////////////
//GameBoard manager
//call at the start of the game and again at each cargoAccept until the 
//array is empty
///////////////////////////////////////////////////////////////////////
$pullCurrentCargo = function() {
	if (levelOneRandomCargoArray.length >= 1) {
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
	} else {}
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
//////////////////////////////////////////////////////////////////

const gameTimeElapsed = {
	tickClock: function(){
		if (gameTimeElapsed.isRunning) {
			setTimeout(gameTimeElapsed.tickClock, 1000);
			gameTimeElapsed.addSecond();
			gameTimeElapsed.timeRemaining();
			gameTimeElapsed.timerConversion(gameValues.timeRemaining);
			gameTimeElapsed.displayTimeRemaining();
			// $displayUserScore();
			// $displayTargetScore();
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
  			gameEnd.checkWin();
  			//PLACEHOLDER call game end
  		}
  	},
  	timerConversion: function(seconds) {
	if (seconds > 0) {
		gameValues.displaySeconds = seconds%60;
		gameValues.displayMinutes = Math.floor(seconds/60);
		}
	},
	displayTimeRemaining: function() {
		$('#seconds').text(gameValues.displaySeconds);
		$('#minutes').text(gameValues.displayMinutes);
	},
};

////////////////////////////////////////////////////////////////////
//Accept Cargo control and Logic
//onclick, set class to excludedPiece
////////////////////////////////////////////////////////////////////
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
	if (!pointCalculator.isRunning) {
	
	} else if (!levelOneRandomCargoArray.length){
	console.log("ended");
	pointCalculator.cargoBoxesTally();
	$("#acceptCargoButton").removeClass().addClass("btn btn-success disabled");	
	$("#gameBoardBox1").removeClass().addClass('gameBoardBoxBase').text('');
	$("#gameBoardBox2").removeClass().addClass('gameBoardBoxBase').text('');
	$("#gameBoardBox3").removeClass().addClass('gameBoardBoxBase').text('');
	$("#gameBoardBox4").removeClass().addClass('gameBoardBoxBase').text('');
	pointCalculator.isRunning = false;
	gameValues.gameComplete = true;
	} else {
	pointCalculator.cargoBoxesTally();
	$("#gameBoardBox1").removeClass().addClass('gameBoardBoxBase').text('');
	$("#gameBoardBox2").removeClass().addClass('gameBoardBoxBase').text('');
	$("#gameBoardBox3").removeClass().addClass('gameBoardBoxBase').text('');
	$("#gameBoardBox4").removeClass().addClass('gameBoardBoxBase').text('');
		$pullCurrentCargo();
	};

}));
const pointCalculator = {
	isRunning: true,
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
		}
	}
};

/////////////////////////////////////////////////////////////
//Diplays
/////////////////////////////////////////////////////////////
$displayUserScore = function() {
	$('#userScoreDiv').text(gameValues.userScore);
};
$displayTargetScore = function() {
	$('#targetScoreDiv').text(gameValues.targetScore);
};

$finishedBacklog = function() {
	if (gameValues.gameComplete) {
		gameEnd.checkWin();
	}
};
// $checkEndArray = function(){
// 	if (!levelOneRandomCargoArray.length){
// 		pointCalculator.isRunning = false;
// 	}
// }

const updateScores = {
	tickClock: function(){
		if (updateScores.isRunning) {
			setTimeout(updateScores.tickClock, 10);
			$displayUserScore();
			$displayTargetScore();
			$finishedBacklog();
			// $checkEndArray();

		}
	},
	isRunning: false,
	start: function(){
    if (!this.isRunning) {
        this.isRunning = true;
        this.tickClock();
    	}
    },
    // timeOut: function(){
    // 	if (){}
    // },
};

//////////////////////////////////////////////////////////////
//GameEnd Methods
//////////////////////////////////////////////////////////////
const gameEnd = {
	checkWin: function(){
		console.log("Tallying")
		gameValues.gameComplete = false;
		if (gameValues.targetScore - gameValues.userScore <= 0 ) {
			gameValues.gameResult = true;
		}
		this.callResult();
	},
	callResult: function(){
		if (gameValues.gameResult) {
			console.log("you win");
		} else {
			console.log("Try again");
		}
	},

};




// const ViewEngine = {
//   updateTimer: function(minutes, seconds){
//     document.getElementById('seconds').innerHTML = 
//     ViewHelpers.zeroFill(gameValues.displaySeconds, 2);
//     document.getElementById('minutes').innerHTML = 
//     ViewHelpers.zeroFill(gameValues.displayMinutes, 2);
//   },
//   // updateLapLitDisplay: function(laps){
//   //   // Your Code Here - skip this
//   // },
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

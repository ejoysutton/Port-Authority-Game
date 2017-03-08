//Handle startButton click
$("#startButton").click(function() {
	console.log("Start clicked!")
	gameValues.gameStarted = true;
});

const gameValues = {
  PLACEHOLDER: function(){
    if (gameValues.gameStarted) {

    }
  },
  gameStarted: false,
  timerValue: 0,
  targetScore: 0,
  playerScore: 0,
  playerWin: false,
  // advanceTenMillisecs: function(){
  //   this.millisecs += 10;
  //   if (this.millisecs >= 1000) {
  //       this.millisecs -= 1000;
  //       this.secs ++;
  //   }
  //   if (this.secs >= 60) {
  //       this.secs -= 60;
  //       this.mins ++;
  //   }
  }


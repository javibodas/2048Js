var EndGame = function(){
	this.end = false;
};

EndGame.prototype = {

	endGameGood : function(){
		alert('Congratulations has ganado');
	},
	endGameBad : function(mode){
						
		alert('El juego ha terminado');
		var high = localStorage.getItem('highscore_2048');
		var hscore = high && JSON.parse(high);	
		if(hscore[mode.getMode()] < score.getValue()){
			localStorage['highscore_2048'][mode.mode] =  score.getValue();
		}		
	},

	setEnd : function(end){
		this.end = end;
	},

	getEnd : function(){
		return this.end;
	}
}
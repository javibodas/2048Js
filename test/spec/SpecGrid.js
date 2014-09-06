describe('Grid', function(){

	var grid;
	var controller;
	var view;
	var score;
	var endgame;
	var modegame;

	var lines = 4;
	var cols = 4;
	grid = new Grid(lines,cols);

	var frames = [];
	var count = 0;
	for(var i=0;i<lines;i++){
		for(var j=0;j<cols;j++){
			var frame = new Frame(count,j,i,'',grid);
			frames[count] = frame;
			count++;
		}
	}

	grid.frames = frames;
	modegame = new ModeGame('4x4');
	endgame = new EndGame();
	view = new View(grid,endgame,modegame);
	score = new Score(0);
	controller = new Controller(grid,view,score);

	beforeEach(function(){});

	it('should return zero frames no emptys before load',function(){
		expect(0).toEqual(grid.getFramesNoEmpty().length);
	});

	it('should return two frames no emptys after load', function(){
		controller.load(false);
		expect(2).toEqual(grid.getFramesNoEmpty().length);
	});

	it('should return the right next frame to the indicated frame', function(){
		var auxFrame = new Frame(2,2,0,'',grid);
		var resultFrame = grid.getNext(auxFrame,'+','right');
		expect(resultFrame.pos).toEqual(3);

		auxFrame.pos = 3;
		auxFrame.line = 0;
		auxFrame.col = 3;

		resultFrame = grid.getNext(auxFrame,'+','right');
		expect(resultFrame.pos).toEqual(4);
	});

	/*it('should return false to the possibility to move something when the grid is full and is not possible to join frames', function(){
		
	});*/

	it('should return true to the possibility to move something', function(){
		controller.load(true);
		expect(grid.isPosibleToMoveSomething()).toEqual(true);
	});

});
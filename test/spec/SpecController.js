describe('Controller', function(){
	
	var controller;
	var grid;
	var view;
	var score;
	var endgame;
	var modegame;

	beforeEach(function(){
		grid = new Grid(4,4);
		modegame = new ModeGame('4x4');
		endgame = new EndGame();
		view = new View(grid,endgame,modegame);
		score = new Score(0);
		controller = new Controller(grid,view,score);
	});

	it('should load minimun two frames in the grid', function(){
		controller.load(false);
		var framesPaint = grid.getFramesNoEmpty();
		expect(framesPaint.length).toEqual(2);
	});
});
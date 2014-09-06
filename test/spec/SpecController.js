describe('Controller', function(){
	
	var controller;
	var grid;
	var view;
	var score = new Score(0);
	var endgame = new EndGame();
	var modegame = new ModeGame('4x4');
	
	var lines = 4;
	var cols = 4;
	
	beforeEach(function(){
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
		view = new View(grid,endgame,modegame);
		controller = new Controller(grid,view,score);
	});

	it('should load two frames in the grid', function(){
		controller.load(false);
		var framesPainted = grid.getFramesNoEmpty();
		expect(2).toEqual(framesPainted.length);
	});

	it('should return two frames for posibly move after load', function(){
		controller.load(false);
		var framesToMove = controller.move();
		expect(2).toEqual(framesToMove.length);
	});

	it('should return zero frames for posibly move before load', function(){
		var framesToMove = controller.move();
		expect(0).toEqual(framesToMove.length);
	});

	it('should add one frame to the grid', function(){
		controller.addFrame();
		var framesPainted = grid.getFramesNoEmpty();
		expect(1).toEqual(framesPainted.length);
	});

	it('should move two frames to the right position for the way "right"', function(){
		controller.load(false);
		var framesToMove = controller.move();

		var firstPosition = framesToMove[0].line*4 + 3;
		var secondPosition = framesToMove[1].line*4 + 3;

		var framesToPaint = controller.dirToMove('right',framesToMove);
		view.rePaint(framesToMove,framesToPaint);

		var framesPainted = grid.getFramesNoEmpty();

		var first = framesPainted[0].pos;
		expect(firstPosition).toEqual(first);
		
		//Is posible that the frames move to the same position due to they stay in same line become in a frame with value '4'
		if(framesPainted.length==2){
			var second = framesPainted[1].pos;
			expect(secondPosition).toEqual(second);
		}else{
			expect('4').toEqual(framesPainted[0].val);
		}
	});

	it('should not return any frame for paint when all frames stay in finals position', function(){
		grid.setValueFrame(3,'2');
		grid.setValueFrame(7,'2');
		grid.setValueFrame(11,'2');
		grid.setValueFrame(15,'2');

		var framesToMove = controller.move();

		var framesToPaint = controller.dirToMove('right', framesToMove); 

		expect(0).toEqual(framesToPaint.length);

	});
});
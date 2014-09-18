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

	it('should return the correct full line and the correct full col', function(){
		//This is neccesary because the method return the frames that isn´t empty
		frames[0].val = '2';
		
		var line = grid.getFramesLine(0);

		expect(4).toEqual(line.length);
		
		var bool = false;
		for(var i=0;i<line.length;i++){
			if(line[i].pos == i){
				bool = true;
			}else{
				bool = false;
			}
		}
		expect(true).toEqual(bool);

		
		var col = grid.getFramesCol(0);
		expect(4).toEqual(col.length); 

		for(var i=0;i<col.length;i++){
			if(col[i].pos == i*grid.lines){
				bool = true;
			}else{
				bool = falseM
			}
		}
		expect(true).toEqual(bool);
	});

	it('should return two frames no emptys after load', function(){
		controller.load(true);
		expect(2).toEqual(grid.getFramesNoEmpty().length);
	});

	it('should return the right next frame to the indicated frame', function(){
		var auxFrame = new Frame(2,2,0,'',grid);
		var resultFrame = grid.getNext(auxFrame,'+','right');
		expect(3).toEqual(resultFrame.pos);

		auxFrame.pos = 3;
		auxFrame.line = 0;
		auxFrame.col = 3;

		resultFrame = grid.getNext(auxFrame,'+','right');
		expect(4).toEqual(resultFrame.pos);
	});

	it('should return false to the possibility to move something when the grid is full and is not possible to join frames', function(){
		var frames = grid.frames;

		frames[0].val = '2';
		frames[1].val = '4';			//	|-----|-----|-----|-----|
		frames[2].val = '2';			//	|  2  |  4  |  2  |  4  |
		frames[3].val = '4';			//	|-----|-----|-----|-----|
		frames[4].val = '4';			//	|  4  |  2  |  4  |  2  |
		frames[5].val = '2';			//	|-----|-----|-----|-----|
		frames[6].val = '4';			//	|  2  |  4  |  2  |  4  |
		frames[7].val = '2';			//	|-----|-----|-----|-----|
		frames[8].val = '2';			//	|  4  |  2  |  4  |  2  |
		frames[9].val = '4';			//	|-----|-----|-----|-----|
		frames[10].val = '2';			
		frames[11].val = '4';		
		frames[12].val = '4';
		frames[13].val = '2';
		frames[14].val = '4';
		frames[15].val = '2';

		expect(false).toEqual(grid.isPosibleToMoveSomething());
	});

	it('should return true to the possibility to move something after load', function(){
		controller.load(true);
		expect(true).toEqual(grid.isPosibleToMoveSomething());
	});

	it('should return true to the possibility to move something when the grid is full and is possible to join frames', function(){
		var frames = grid.frames;

		frames[0].val = '2';
		frames[1].val = '2';			//	|-----|-----|-----|-----|
		frames[2].val = '2';			//	|  2  |  2  |  2  |  4  |
		frames[3].val = '4';			//	|-----|-----|-----|-----|
		frames[4].val = '4';			//	|  4  |  2  |  4  |  2  |
		frames[5].val = '2';			//	|-----|-----|-----|-----|
		frames[6].val = '4';			//	|  2  |  4  |  2  |  4  |
		frames[7].val = '2';			//	|-----|-----|-----|-----|
		frames[8].val = '2';			//	|  4  |  2  |  4  |  2  |
		frames[9].val = '4';			//	|-----|-----|-----|-----|
		frames[10].val = '2';			
		frames[11].val = '4';		
		frames[12].val = '4';
		frames[13].val = '2';
		frames[14].val = '4';
		frames[15].val = '2';

		expect(true).toEqual(grid.isPosibleToMoveSomething());
	});

});
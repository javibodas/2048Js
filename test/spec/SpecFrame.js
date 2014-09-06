describe("Frame", function() {
  var frame;
  var grid;

  grid = new Grid(0,0);
  frame = new Frame(0,0,0,'',grid);
  
  beforeEach(function() {});

  it('should be empty with val ""', function() {
    expect(frame.isEmpty()).toEqual(true);
  });

  it('should not be empty with val "2"', function(){
    frame.val = '2';
    expect(frame.isEmpty()).not.toEqual(true);
  });

  it('should stay in final position when the way is "right" and position "7"', function(){
     frame.pos = 7;
     expect(frame.isFinal('right')).toEqual(true);
  });

  it('should not stay in final position when the way is "right" and position "8"', function(){
    frame.pos = 8;
    expect(frame.isFinal('right')).not.toEqual(true);
  });
});

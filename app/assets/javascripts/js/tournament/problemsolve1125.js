 $scope.problemsolve = function() { 
   //start doing stuff
var pgnData,
    board, //the chessboard
    game, //the current  game
    currentPly,
    currentGame,
    currentGameSolution,
    solution=[],
    fen;
    
    // console.log("pgnData1:"+pgnData1);
    pgnData=mate2;
    console.log("allPuzzle"+pgnData.length);

    

// do not pick up pieces if the game is over
// only pick up pieces for the side to move
var onDragStart = function(source, piece, position, orientation) {
  if (game.game_over() === true ||
      (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
};

var onDrop = function(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null) return 'snapback';
  
  currentPly++;
  //buruu nuusen esehiig shalgah
  hist=game.history();
  if (hist.length>0) {
    lastMove = hist[hist.length - 1];
    //history-s awsan suuliin nuudel solution dotor bga suuliin 
    //nuudeltei adilhan uyd tsaashid urgeljile buruu nuudel bol WRONG MOVE
    if (lastMove!=solution[currentPly]) {  
      alertFail.setAttribute('class', 'alert alert-danger visible');
    }else
    {  //suuliin nuusen nuudel zow uyd l daraagiin nuudelee nuune
      window.setTimeout(possibleMove, 500); 
      var moveLast=solution[currentPly].indexOf("#");
      if (solution[currentPly+1]=='1-0' || solution[currentPly+2]=='0-1' || moveLast!=-1) {
          alertSuccess.setAttribute('class', 'alert alert-success visible');
        // $('#alertSuccess').show();
      }   
    }
   
  }
  
  // possibleMove();
  updateStatus();

  // 
};

// update the board position after the piece snap 
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
  board.position(game.fen());
};


var cfg = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
};
board = ChessBoard('board', cfg);



//pgnData-s FEN file-g tataj awah
function getFenFromPgnData(g) {
  var h = g.header();
  fen=h.FEN;
  currentGameSolution=h.FES; //[FES "1. Re8+ Kf7 2. R1e7#"] deerh format-r bichsen uyd ajilna

 }

function loadGame(i) {
  board.clear();
  game1 = new Chess();

  // fen='r1bqkb1r/ppp2ppp/2np1n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1';
  console.log(variable1);
  game = new Chess(fen);

  // pgnMoveStringToArray(currentGameSolution); 
   if (game.turn() === 'b') {

    if (board.orientation()=="white") board.flip();
      
  } else {  
    if (board.orientation()=="black") board.flip();
  }
  
  board.position(game.fen());
  currentGame = i;
  updateStatus();
 
  
}



  //problemsolve end
  //load the first game
  currentGame=91;
  loadGame(currentGame);
 //titan end

};
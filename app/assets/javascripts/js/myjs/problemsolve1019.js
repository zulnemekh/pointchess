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
    //read all the games to populate the select
for (var i = 0; i < pgnData.length; i++) {
  var g = new Chess();
  g.load_pgn(pgnData[i].join('\n'), {newline_char:'\n'});
  var h = g.header();
  $('#gameSelect')
     .append($('<option></option>')
     .attr('value', i)
     .text(h.INFO + ' - ' + h.TYPE));
     // .text(h.White + ' - ' + h.Black + ', ' + h.Event + ' ' + h.Site + ' ' + h.Date));
}

  statusEl = $('#status'),
  fenEl = $('#fen'),
  pgnEl = $('#pgn');

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
  console.log("gameHistory:"+game.history());
  console.log("dropMove:"+solution[currentPly]);
  //buruu nuusen esehiig shalgah
  hist=game.history();
  if (hist.length>0) {
	  lastMove = hist[hist.length - 1];
	  //history-s awsan suuliin nuudel solution dotor bga suuliin 
	  //nuudeltei adilhan uyd tsaashid urgeljile buruu nuudel bol WRONG MOVE
	  if (lastMove!=solution[currentPly]) {  
	  	alert("Wrong move!");
	  }
	  if (solution[currentPly+1]=='1-0' || solution[currentPly+2]=='0-1') {
 			alert("DONE!");
	  }
  }
  window.setTimeout(possibleMove, 500);
  // possibleMove();
  updateStatus();

  // 
};

// update the board position after the piece snap 
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
  board.position(game.fen());
};

var updateStatus = function() {
  var status = '';

  var moveColor = 'White';
  if (game.turn() === 'b') {
    moveColor = 'Black';
  }

  // checkmate?
  if (game.in_checkmate() === true) {
    status = 'Game over, ' + moveColor + ' is in checkmate.';
  }

  // draw?
  else if (game.in_draw() === true) {
    status = 'Game over, drawn position';
  }

  // game still on
  else {
    status = moveColor + ' to move';

    // check?
    if (game.in_check() === true) {
      status += ', ' + moveColor + ' is in check';
    }
  }

  statusEl.html(status);
  fenEl.html(game.fen());
  console.log("pgn:"+game.pgn());
  pgnEl.html(game.pgn());
};

var cfg = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
};
board = ChessBoard('board', cfg);

// User drag drop-r nuusenii daraa solution dotor bga nuudeliig 
//nuuhed zow bwal daraagin nuudeliig nuune
var  possibleMove = function() {
   
   console.log('currentPly:'+currentPly);
   if (currentPly < solution.length - 1) {
    currentPly++;
    game.move(solution[currentPly]);
    console.log(solution[currentPly]);
    board.position(game.fen());
  }
   
};

//problemsolve begin
//pgnData-s FEN file-g tataj awah
function getFenFromPgnData(g) {
  var h = g.header();
  fen=h.FEN;
  currentGameSolution=h.FES;
  console.log("oFEN:"+fen);
  console.log("oFES:"+currentGameSolution);
 }
//bodlognii hariu boloh pgn file-g nuudel nuudeleer n zadalaad solutiond hiine
//mon 
function pgnMoveStringToArray(currentGameSolution) {
  var h = g.header();
  results = currentGameSolution.match(/\S+\s*/g);
  mymoveArray = currentGameSolution.split(/([0-9]+\.\s)/).filter(function(n) {return n;});
  for (var i = 0, l = mymoveArray.length; i < l; ++i) {
    var s = $.trim(mymoveArray[i]);
    if (!/^[0-9]+\.$/.test(s)) { //move numbers
      m = s.split(/\s+/);
      for (var j = 0, ll = m.length; j < ll; ++j) {
        solution.push(m[j]);
        m[j] = '<span class="gameMove' + (i + j - 1) + '"><a id="myLink" href="#" onclick="goToMove(' + (i + j - 1) + ');return false;">' + m[j] + '</a></span>';
      }
      s = m.join(' ');
    }
    mymoveArray[i] = s;
  }
  $("#game-data").html('<div class="gameMoves">' + mymoveArray.join(' ') + ' <span class="gameResult">' +'' + '</span></div>');
}
function solutionParsing() {
    for (var i = 0; i < solution.length; i++) {
      var n=solution[i].indexOf("...");
        if (n!=-1) { //n -1 ylgaatai uyd tuhain utga substring oldson gesen ug
          if (solution[i].substring(n-1, n)=='1') {currentPly++;}
        }
    }
}

function goToMove(ply) {
 
  if (ply > solution.length - 1) ply = solution.length - 1;
  for (var i = 0; i <= ply; i++) {
    game.move(solution[i]);
  }
  currentPly = i - 1;
  console.log("currentPly:"+currentPly);
  board.position(game.fen());
}

function loadGame(i) {
  game1 = new Chess();
  game1.load_pgn(pgnData[i].join('\n'), {newline_char:'\n'});
  getFenFromPgnData(game1);
	solution.length=0;
  
  game = new Chess(fen);
  goToMove(-1);
  pgnMoveStringToArray(currentGameSolution); 
   if (game.turn() === 'b') {
    solutionParsing();
    if (board.orientation()=="white") {
      board.flip();
    }
    
    console.log("solution"+JSON.stringify(solution));
  }


  updateStatus();
  currentGame = i;
  
}

//buttons
$('#btnNew').on('click', function() {
  loadGame(currentGame+1);
});
$('#btnRetry').on('click', function() {
  loadGame(currentGame);
});
$('#btnStart').on('click', function() {
  game.reset();
  currentPly = -1;
  board.position(game.fen());
});
$('#btnPrevious').on('click', function() {
  if (currentPly >= 0) {
    game.undo();
    currentPly--;
    board.position(game.fen());
  }

});
$('#btnNext').on('click', function() {
 
  if (currentPly < solution.length - 1) {
    currentPly++;
    game.move(solution[currentPly]);
    console.log(solution[currentPly]);
    board.position(game.fen());
  }
});
$('#btnEnd').on('click', function() {
  while (currentPly < gameHistory.length - 1) {
    currentPly++;
    game.move(gameHistory[currentPly].san);
  }
  board.position(game.fen());
});


//problemsolve end

	//load the first game
	loadGame(1);
//titan end
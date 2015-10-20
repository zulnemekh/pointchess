 pgnData = [
  ['[Event "Casual Game"]',
       '[Site "Berlin GER"]',
       '[Date "1852.??.??"]',
       '[EventDate "?"]',
       '[Round "?"]',
       '[Result "1-0"]',
       '[White "Adolf Anderssen"]',
       '[Black "Jean Dufresne"]',
       '[ECO "C52"]',
       '[FEN "2q5/pR6/1p3pnk/1P4pp/8/5QPP/P2r2BK/8 w - - 0 1"]',
       '[FEM "1. Qxh5+ Kxh5 2. Rh7# 1-0"]',
       '[WhiteElo "?"]',
       '[BlackElo "?"]',
       '[PlyCount "47"]',
       '',
       '1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.b4 Bxb4 5.c3 Ba5 6.d4 exd4 7.O-O',
       'd3 8.Qb3 Qf6 9.e5 Qg6 10.Re1 Nge7 11.Ba3 b5 12.Qxb5 Rb8 13.Qa4',
       'Bb6 14.Nbd2 Bb7 15.Ne4 Qf5 16.Bxd3 Qh5 17.Nf6+ gxf6 18.exf6',
       'Rg8 19.Rad1 Qxf3 20.Rxe7+ Nxe7 21.Qxd7+ Kxd7 22.Bf5+ Ke8',
       '23.Bd7+ Kf8 24.Bxe7# 1-0'
       ],
	[
    '[Event "Euro Club Cup"]',
    '[Site "Kallithea GRE"]',
    '[Date "2008.10.18"]',
    '[EventDate "2008.10.17"]',
    '[Round "2"]',
    '[Result "1-0"]',
    '[White "Simon Ansell"]',
    '[Black "J Garcia-Ortega Mendez"]',
    '[ECO "B27"]',
    '[FEN "R4rk1/5bb1/1N1Qpq1p/3pn1p1/3N4/2P2P1P/P5P1/5B1K w - - 0 1"]',
    '[FEM "1. Nxd5 exd5 2. Rxf8+ Bxf8 3. Qxf6 1-0"]',
    '[WhiteElo "2410"]',
    '[BlackElo "2223"]',
    '[PlyCount "29"]',
    '',
    '1. e4 c5 2. Nf3 g6 3. d4 cxd4 4. Qxd4 Nf6 5. e5 Nc6 6. Qa4 Nd5 7. Qe4 Ndb4 8. Bb5 Qa5 9. Nc3 d5 10. exd6 Bf5 11. d7+ Kd8 12. Qc4 Nxc2+ 13. Ke2 Nxa1 14. Rd1 Be6 15. Qxe6 1-0'
  ]
 ];


   //start doing stuff
var board, //the chessboard
    game, //the current  game
    currentPly,
    currentGame,
    currentGameSolution,
    solution=[],
    fen;
    
    // console.log("pgnData1:"+pgnData1);
    pgnData=pgnData1;
    //read all the games to populate the select
for (var i = 0; i < pgnData.length; i++) {
  console.log("for:"+i);
  var g = new Chess();
  g.load_pgn(pgnData[i].join('\n'), {newline_char:'\n'});
  var h = g.header();
  $('#gameSelect')
     .append($('<option></option>')
     .attr('value', i)
     .text(h.White + ' - ' + h.Black + ', ' + h.Event + ' ' + h.Site + ' ' + h.Date));
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
	  if (solution[currentPly+1]=='1-0') {
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
  currentGameSolution=h.FEM;
  console.log("oFEN:"+fen);
  console.log("oFEN:"+currentGameSolution);
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

function goToMove(ply) {
 
  if (ply > solution.length - 1) ply = solution.length - 1;
  for (var i = 0; i <= ply; i++) {
    game.move(solution[i]);
  }
  currentPly = i - 1;
  board.position(game.fen());
}

function loadGame(i) {
  game1 = new Chess();
  game1.load_pgn(pgnData[i].join('\n'), {newline_char:'\n'});
  getFenFromPgnData(game1);
	solution.length=0;
  pgnMoveStringToArray(currentGameSolution);  
  game = new Chess(fen);
  goToMove(-1);
  updateStatus();
  currentGame = i;
  
}

//buttons
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
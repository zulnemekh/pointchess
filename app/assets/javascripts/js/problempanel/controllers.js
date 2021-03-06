    
         mainApp.controller("parentController", function($scope,$timeout,Service) {
            $scope.message = "In parent controller";
            $scope.tempPoint = Service.tempPoint;
            $scope.counter = 300;
            $scope.problems =[];
				

			function getRandomSubarray(arr, size) {
			    var shuffled = arr.slice(0), i = arr.length, temp, index;
			    while (i--) {
			        index = Math.floor((i + 1) * Math.random());
			        temp = shuffled[index];
			        shuffled[index] = shuffled[i];
			        shuffled[i] = temp;
			    }
			    return shuffled.slice(0, size);
			}
 
      $scope.data = getRandomSubarray(Service.pgnData, 5);
		    
 		
         });
         
      
         mainApp.controller("listController", function($scope,$timeout,Service) {
            $scope.message = "In list controller";
       //baazas medeellee awah begin
       
       
       // end
            
				    for (var i = 0; i < $scope.$parent.data.length; i++) {
						  var g = new Chess();
						  g.load_pgn($scope.$parent.data[i].join('\n'), {newline_char:'\n'});
						  var h = g.header();
							$scope.$parent.problems[i] = h;
				
						 }
			
					var boardname='board_';
					 $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
				  	for (var i = 0; i < $scope.$parent.problems.length; i++) {
									var board2 = ChessBoard(boardname+i, {
									  position: $scope.$parent.problems[i].FEN,
									  showNotation: false
									});
								}
				  });

			
  
		    $scope.goto_detail = function(id) {
		       Service.id=id;
		    };
  

      });
         
         mainApp.controller("detailController", function($rootScope,$scope,Service, $stateParams,$window) {
            $scope.message = "In detail controller";
            $scope.type = "detail";


	//detailProblem begin
 //start doing stuff
var board, //the chessboard
    game, //the current  game
    currentPly,
    currentGame,
    currentGameSolution,
    solution=[],
    fen;
    
    pgnData = $scope.$parent.data;
		currentGame=Service.id;
  

    var alertSuccess = document.getElementById('alertSuccess');
    var alertFail = document.getElementById('alertFail')
    alertSuccess.setAttribute('class', 'hidden');
    alertFail.setAttribute('class', 'hidden');

  statusEl = $('#status'),
  fenEl = $('#fen'),
  pgnEl = $('#pgn');
  currentPuzzleEl = $('#currentPuzzle');

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
         $scope.$parent.tempPoint=$scope.$parent.tempPoint+currentGameSolution.length;
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

// User drag drop-r nuusenii daraa solution dotor bga nuudeliig 
//nuuhed zow bwal daraagin nuudeliig nuune
var  possibleMove = function() {
   
   if (currentPly < solution.length - 1) {
    currentPly++;
    game.move(solution[currentPly]);
    board.position(game.fen());
  }
   
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
  currentPuzzleEl.html(""+currentGame+"/"+pgnData.length);
};

//bodlognii hariu boloh pgn file-g nuudel nuudeleer n zadalaad solutiond hiine
//mon 
function pgnMoveStringToArray(currentGameSolution,g) {
  var h = g.header();
  results = currentGameSolution.match(/\S+\s*/g);
  mymoveArray = currentGameSolution.split(/([0-9]+\.\s)/).filter(function(n) {return n;});
  for (var i = 0, l = mymoveArray.length; i < l; ++i) {
    var s = $.trim(mymoveArray[i]);
    if (!/^[0-9]+\.$/.test(s)) { //move numbers
      m = s.split(/\s+/);
      for (var j = 0, ll = m.length; j < ll; ++j) {
        solution.push(m[j]);
      }
      s = m.join(' ');
    }
    mymoveArray[i] = s;
  }
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
  board.position(game.fen());
}

//pgnData-s FEN file-g tataj awah
function getFenFromPgnData(g) {
  var h = g.header();
  fen=h.FEN;
  currentGameSolution=h.FES; //[FES "1. Re8+ Kf7 2. R1e7#"] deerh format-r bichsen uyd ajilna

 }

function loadGame(i) {
  board.clear();
  game1 = new Chess();
 	game1.load_pgn(pgnData[i].join('\n'), {newline_char:'\n'});
  getFenFromPgnData(game1);
	solution.length=0;

  game = new Chess(fen);
	goToMove(-1);
  pgnMoveStringToArray(currentGameSolution,game1); 
   if (game.turn() === 'b') {
  	solutionParsing();
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
  loadGame(currentGame);
 
//buttons
// $(window).resize(board.resize);
// $(window).resize(board.resize)
$('#btnNew').on('click', function() {
  min=0;
  max=pgnData.length;
  currentGame=Math.floor(Math.random() * (max - min + 1)) + min;
    alertSuccess.setAttribute('class', 'hidden');
    alertFail.setAttribute('class', 'hidden');
  loadGame(currentGame);
});
$('#btnRetry').on('click', function() {
    alertSuccess.setAttribute('class', 'hidden');
    alertFail.setAttribute('class', 'hidden');
  loadGame(currentGame);
});
$('#btnNextProb').on('click', function() {
    alertSuccess.setAttribute('class', 'hidden');
    alertFail.setAttribute('class', 'hidden');
    if (currentGame+1 < pgnData.length) 
    	loadGame(currentGame+1);
    else
    	loadGame(currentGame=0);
});

$('#arrow_btnStart').on('click', function() {
		alertSuccess.setAttribute('class', 'hidden');
    alertFail.setAttribute('class', 'hidden');
    if (currentGame > 0) 
    	loadGame(currentGame-1);
    else
    	loadGame(currentGame=pgnData.length-1);
});

$('#arrow_btnPrevious').on('click', function() {
  if (currentPly >= 0) {
    game.undo();
    currentPly--;
    board.position(game.fen());
  }

});
$('#arrow_btnNext').on('click', function() {
 
  if (currentPly < solution.length - 1) {
    currentPly++;
    game.move(solution[currentPly]);
    console.log(solution[currentPly]);
    board.position(game.fen());
  }
});
$('#arrow_btnNextPuzzle').on('click', function() {
    alertSuccess.setAttribute('class', 'hidden');
    alertFail.setAttribute('class', 'hidden');
    if (currentGame+1 < pgnData.length) 
    	loadGame(currentGame+1);
    else
    	loadGame(currentGame=0);
});




 //detailProblem end


}); //detailController end


    
     mainApp.controller("parentController", function($scope,$timeout,Service) {
        $scope.message = "In parent controller";
        $scope.tempPoint = Service.tempPoint;
        $scope.allPoint = 0;
        $scope.timer = "";
        $scope.problems =array;
		 

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
		    
 				// console.log("shapeController");
         });
         
      
      mainApp.controller("listController", function($scope,$timeout,Service) {
        $scope.message = "In list controller";

  			var boardname='board_';
  			 $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
  		  	for (var i = 0; i < $scope.$parent.problems.length; i++) {
  							var board2 = ChessBoard(boardname+i, {
  							  position: $scope.$parent.problems[i].fen,
  							  showNotation: false
  							});
  						}
  		  });


      });
         
 mainApp.controller("detailController", function($rootScope,$scope,$timeout,Service, $stateParams,$window) {
    $scope.message = "In detail controller";
    $scope.type = "detail";
    $scope.timer = "";
    $scope.progress = 100;
    $scope.counter = 0;
    $scope.firstMove = '';
    $scope.tacticType = '';
    //point calculate begin
    maxPoint=20;
    masterDone=20;
    tacticDone1=1;
    tacticDone2=0.75;
    tacticDone3=0.6;
    tacticDone4=0.4;
    currentCorrectMoveCount=0;
    currentTacticIsDone=false;
    //point calculate end
  //timer for detail
  $scope.onTimeout = function(){
    // if ($scope.counter == 0) {
    //   console.log("Game Over");
    //   return false;
    // }
  valeur=$scope.progress-$scope.counter;
  if (valeur > -1) 
    $('.progress-bar').css('width', valeur+'%').attr('aria-valuenow', valeur);    
    
    $scope.counter++;
    $scope.timer= $scope.counter;
    mytimeout = $timeout($scope.onTimeout,1000);

  }
    var mytimeout = $timeout($scope.onTimeout,1000);
    
    $scope.stop = function(){
        $timeout.cancel(mytimeout);
    }


	//detailProblem begin
 //start doing stuff
var board, //the chessboard
    game, //the current  game
    currentPly,
    currentGame,
    currentGameSolution,
    solution=[],
    squareToHighlight='e5',
    boardEl = $('#board'),
    myMove_from='e2',
    myMove_to='e4';
    fen;
    
    pgnData = array;
		currentGame=Service.id;
  

    var alertSuccess = document.getElementById('alertSuccess');
    var alertFail = document.getElementById('alertFail')
    alertSuccess.setAttribute('class', 'hidden');
    alertFail.setAttribute('class', 'hidden');

  statusEl = $('#status'),
  fenEl = $('#fen'),
  pgnEl = $('#pgn');
  currentPuzzleEl = $('#currentPuzzle');

  var removeHighlights = function(color) {
        boardEl.find('.square-55d63')
          .removeClass('highlight-' + color);

  };
var removeGreySquares = function() {
  $('#board .square-55d63').css('background', '');
};

var greySquare = function(square) {
  var squareEl = $('#board .square-' + square);
  
  var background = '#99C39A';
  if (squareEl.hasClass('black-3c85d') === true) {
    background = '#5F885E';
  }

  squareEl.css('background', background);
};

function pointCalculate() {
  
  if (currentCorrectMoveCount==0) return false
  
  perSec=$scope.counter/currentCorrectMoveCount;
  tempPoint=maxPoint-perSec/2;
  if (tempPoint < 1) tempPoint=0;
  tempDone=0;
  if (currentTacticIsDone) {
    // if (perSec <= 5) {tempDone=masterDone*tacticDone1;}
    //   if (perSec > 5 && perSec <=15) {tempDone=masterDone*tacticDone2;}
    //     if (perSec > 15 && perSec <= 30) {tempDone=masterDone*tacticDone3;}
    //       if (perSec > 30) {tempDone=masterDone*tacticDone4;}
    var x = perSec;
    switch (true) {
        case (x < 5):
            tempDone=masterDone*tacticDone1;
            break;
        case (perSec > 5 && perSec <=20):
            tempDone=masterDone*tacticDone2;
            break;
        case (perSec > 20 && perSec <= 50):
            tempDone=masterDone*tacticDone3;
            break;
        case (perSec > 50):
            tempDone=masterDone*tacticDone4;
            break;    
        default:
            tempDone=masterDone*tacticDone4;
            break;
    }
  }

  console.log("perSec:"+perSec);
  console.log("tempDone:"+tempDone);
  console.log("tempPoint:"+tempPoint);
  $scope.$parent.allPoint=$scope.$parent.allPoint+tempPoint+tempDone;
  $scope.$parent.tempPoint=tempPoint+tempDone;
}
// do not pick up pieces if the game is over
// only pick up pieces for the side to move
var onDragStart = function(source, piece, position, orientation) {
  if (game.game_over() === true ||
      (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
    removeGreySquares();
    //removeHighlights('white');
    greySquare(source);
    //boardEl.find('.square-' + source).addClass('highlight-white');
    myMove_from=source; //nuuh talin piece deer n darsan uyd ene uildel ajilna
};

 //click to click move method
//nuden deer daraad daraagiin nuuh nudruugee darahad nuune
 function clicked_move() {
  var move = game.move({
            from: myMove_from,
            to: myMove_to,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
          });

  if (move === null) return 'snapback';
    
    removeGreySquares();
  // removeHighlights('white');
    greySquare(myMove_from);
    greySquare(myMove_to);
  // boardEl.find('.square-' + myMove_from).addClass('highlight-white');
  // boardEl.find('.square-' + myMove_to).addClass('highlight-white');
 
    onSnapEnd();
    movingUser();
 }
  var onDrop = function(source, target) {
    if (target==source) {
        // clicked_move();
        return false;
  }

  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

 // removeHighlights('white');
  removeGreySquares();
  // illegal move
  if (move === null) return 'snapback';
  
   
    greySquare(source);
    greySquare(target);
   // boardEl.find('.square-' + source).addClass('highlight-white');
   // boardEl.find('.square-' + target).addClass('highlight-white');

    // isDrop=false;  // drag drop-r amjilta nuutsen uyd click-r nuuhiig false bolgono
    movingUser();

};
  //computer nuuj duusahad buusan buudaliig highlight bolgono
  var onMoveEnd = function() {
    boardEl.find('.square-' + squareToHighlight)
      .addClass('highlight-black');
  };
function movingUser(){
    currentPly++;
  //buruu nuusen esehiig shalgah
  hist=game.history();
  if (hist.length>0) {
    lastMove = hist[hist.length - 1];
    //history-s awsan suuliin nuudel solution dotor bga suuliin 
    //nuudeltei adilhan uyd tsaashid urgeljile buruu nuudel bol WRONG MOVE
    if (lastMove!=solution[currentPly]) {  
      alertFail.setAttribute('class', 'alert alert-danger visible');
      pointCalculate();
    }else
    {  //suuliin nuusen nuudel zow uyd l daraagiin nuudelee nuune
      window.setTimeout(possibleMove, 500); 
      var moveLast=solution[currentPly].indexOf("#");
      if (solution[currentPly+1]=='1-0' || solution[currentPly+2]=='0-1' || moveLast!=-1) {
          alertSuccess.setAttribute('class', 'alert alert-success visible');
        // $('#alertSuccess').show();
        currentTacticIsDone=true;
        pointCalculate();
         
      }   
    }
   
  }
  
  // possibleMove();
  updateStatus();
}
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


// User drag drop-r nuusenii daraa solution dotor bga nuudeliig 
//nuuhed zow bwal daraagin nuudeliig nuune
var  possibleMove = function() {
   
   if (currentPly < solution.length - 1) {
    currentPly++;
    movedObj=game.move(solution[currentPly]);
    board.position(game.fen());
    //
    currentCorrectMoveCount++;

    //nuusen square-g highlight bolgoh
    removeGreySquares();
    greySquare(movedObj.from);
    greySquare(movedObj.to);
    // removeHighlights('white');
    // boardEl.find('.square-' + movedObj.from).addClass('highlight-white');
    // boardEl.find('.square-' + movedObj.to).addClass('highlight-white');
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
function pgnMoveStringToArray(currentGameSolution) {
  // var h = g.header();
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
  console.log(solution);
}
function solutionParsing() {
    for (var i = 0; i < solution.length; i++) {
      var n=solution[i].indexOf("...");
        if (n!=-1) { //n -1 ylgaatai uyd tuhain utga substring oldson gesen ug
          if (solution[i].substring(n-1, n)=='1') {currentPly++;}
        }
    }
}
function setTacticStatus(type){
    switch (true) {
        case (type == 2):
            $scope.tacticType='Mate in 2';
            break;
        case (type == 3):
            $scope.tacticType='Mate in 3';
            break;
        case (type == 2):
            $scope.tacticType='Mate in 4';
            break;
        default:
            $scope.tacticType='Find best move';
            break;
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

board = ChessBoard('board', cfg);
function loadGame(i) {
  $scope.counter = 0; // tur zuur 0 utgaar bichew
  currentCorrectMoveCount=0; //zow nuusen nuudeluudiig tooloh
  currentTacticIsDone=false;

  board.clear();
  removeGreySquares();
  
  fen=pgnData[i].fen;
  currentGameSolution=pgnData[i].fes;
	solution.length=0;

  game = new Chess(fen);
	goToMove(-1);
  pgnMoveStringToArray(currentGameSolution); 
  //tactic type-g display deer haragduulah
  setTacticStatus(pgnData[i].tactic_type);
  if (game.turn() === 'b') {
  	solutionParsing();
    $scope.firstMove = 'Black to move';
    if (board.orientation()=="white") board.flip();
      
  } else {  
    $scope.firstMove = 'White to move';
    if (board.orientation()=="black") board.flip();
  }
 	board.position(game.fen());
  currentGame = i;
  updateStatus();
 tBoard=board;
 tGame=game;
  $("div[class^='square-']").on("click", function(){
    
    myMove_to=this.id.substring(0,2);
      console.log(myMove_to);  
        clicked_move();
});
}

  //problemsolve end
  //load the first game
  loadGame(currentGame);
 
//buttons
// $(window).resize(board.resize);
// $(window).resize(board.resize)

//click selected square
 
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


    
     mainApp.controller("parentController", function($scope,$timeout,Service) {
        $scope.message = "In parent controller";
        $scope.tempPoint = 0;
        $scope.allPoint = 0;
        $scope.timer = "";
        $scope.problems =array;
		    $scope.current_fen = "";
        $scope.pl_color = "white";

			// function getRandomSubarray(arr, size) {
			//     var shuffled = arr.slice(0), i = arr.length, temp, index;
			//     while (i--) {
			//         index = Math.floor((i + 1) * Math.random());
			//         temp = shuffled[index];
			//         shuffled[index] = shuffled[i];
			//         shuffled[i] = temp;
			//     }
			//     return shuffled.slice(0, size);
			// }
 
   //    $scope.data = getRandomSubarray(Service.pgnData, 5);
		    
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
         
 mainApp.controller("detailController", function($rootScope,$scope,$timeout,Service, dbSrvc, $stateParams,$window) {
    $scope.message = "In detail controller";
    $scope.type = "detail";
    $scope.timer = "";
    $scope.share_url = "";
    $scope.progress = 100;
    $scope.counter = 0;
    $scope.firstMove = '';
    $scope.tacticType = '';
    $scope.user_rating =user_rating;
    $scope.roundStrRating= Math.round($scope.user_rating.rating);
    $scope.currenGame_id = 1;
   
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
    
    $scope.pgnData = array;
		currentGame=0;
  

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

function pointCalculate(isSuccess) {
   //point calculate begin
    maxPoint=20;
    masterDone=20;
    tacticDone1=1;
    tacticDone2=0.75;
    tacticDone3=0.6;
    tacticDone4=0.4;

   var settings = {
      // tau : "Reasonable choices are between 0.3 and 1.2, though the system should
      //      be tested to decide which value results in greatest predictive accuracy."
      tau : 0.5,
      // rating : default rating
      rating : 1500,
      //rd : Default rating deviation 
      //     small number = good confidence on the rating accuracy
      rd : 200,
      //vol : Default volatility (expected fluctation on the player rating)
      vol : 0.06
    };
    var ranking = new glicko2.Glicko2(settings);

    // Create players
    i=$scope.currenGame_id;
    var Zulaa = ranking.makePlayer($scope.user_rating.rating, 
      $scope.user_rating.rd, $scope.user_rating.vol);
    var puzzle = ranking.makePlayer($scope.pgnData[i].rating,
     $scope.pgnData[i].rd, $scope.pgnData[i].vol);
    var matches = [];
    //Bodlogoo bodson bol hugatsaanaas hamaaraad amjiltaas n % hasana
    if (isSuccess==1) {
      result1 = isSuccess-0.05;
      result2 = isSuccess-0.1;
      result3 = isSuccess-0.2;
      result4 = isSuccess-0.25;
    }else{  
      //bodoj chadaagui uyd hugatsaa hamaarahgui bugd '0'
      result1 = 0;
      result2 = 0;
      result3 = 0;
      result4 = 0;
    }
  
   var user_add_point=0;
  if (currentCorrectMoveCount==0) {
    matches.push([Zulaa, puzzle, result1]);
  }else{
  
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
            matches.push([Zulaa, puzzle, isSuccess]);
            break;
        case (perSec > 5 && perSec <=20):
            tempDone=masterDone*tacticDone2;
            matches.push([Zulaa, puzzle, result1]);
            break;
        case (perSec > 20 && perSec <= 50):
            tempDone=masterDone*tacticDone3;
            matches.push([Zulaa, puzzle, result2]);
            break;
        case (perSec > 50 && perSec <= 100):
            tempDone=masterDone*tacticDone4;
            matches.push([Zulaa, puzzle, result3]);
            break;    
        default:
            tempDone=masterDone*tacticDone4;
            matches.push([Zulaa, puzzle, result4]);
            break;
    }

   } // if (currentTacticIsDone)  end
      // console.log("perSec:"+perSec);
      // console.log("tempDone:"+tempDone);
      // console.log("tempPoint:"+tempPoint);
      $scope.$parent.allPoint=$scope.$parent.allPoint+tempPoint+tempDone;
      $scope.$parent.tempPoint=Math.floor(tempPoint+tempDone);
      user_add_point = $scope.$parent.tempPoint;
  }// if (currentCorrectMoveCount==0) end
   
 ranking.updateRatings(matches);

    dbSrvc.post("tactics/update_rating", {authenticity_token: _AUTH_TOKEN,
                  is_success: isSuccess,
                  user_rating: Zulaa.getRating(), 
                  user_rd: Zulaa.getRd(),
                  user_vol: Zulaa.getVol(),
                  user_point: user_add_point,
                  puzzle_id: $scope.pgnData[i].id,
                  puzzle_rating: puzzle.getRating(), 
                  puzzle_rd: puzzle.getRd(),
                  puzzle_vol: puzzle.getVol()}).then(function(data) {
              // console.log(JSON.stringify(data));      

    });

    // console.log("Zulaa new rating: " + Zulaa.getRating());
    // console.log("Zulaa new rating deviation: " + Zulaa.getRd());
    // console.log("Zulaa new volatility: " + Zulaa.getVol());
    // console.log("====================");
    // console.log("Puzzle new rating: " + puzzle.getRating());
    // console.log("Puzzle new rating deviation: " + puzzle.getRd());
    // console.log("Puzzle new volatility: " + puzzle.getVol());

    $scope.user_rating.rating = Zulaa.getRating();
    $scope.user_rating.point = $scope.user_rating.point + user_add_point;
    $scope.roundStrRating= Math.round($scope.user_rating.rating);
    $scope.user_rating.rd=Zulaa.getRd();
    $scope.user_rating.vol=Zulaa.getVol();
    $scope.pgnData[i].rating=puzzle.getRating();
    $scope.pgnData[i].rd=puzzle.getRd();
    $scope.pgnData[i].vol=puzzle.getVol();

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
    var moveLast=solution[currentPly].indexOf("#");
    if (lastMove!=solution[currentPly] && moveLast == -1) {
      alertFail.setAttribute('class', 'alert alert-danger visible');
      $('#btnRetry').show();
      pointCalculate(0);
      // ratingCalculate(0);
    }else
    {  //suuliin nuusen nuudel zow uyd l daraagiin nuudelee nuune
      window.setTimeout(possibleMove, 500); 
      if (solution[currentPly+1]=='1-0' || solution[currentPly+2]=='0-1' || moveLast!=-1) {
          console.log("else"+solution[currentPly+1]);
          alertSuccess.setAttribute('class', 'alert alert-success visible');
        // $('#alertSuccess').show();
        currentTacticIsDone=true;
        pointCalculate(1);
        // ratingCalculate(1);
         
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
  pgnEl.html(game.pgn());
  $scope.$parent.current_fen = game.fen();
  currentPuzzleEl.html(""+currentGame+"/"+$scope.pgnData.length);
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
  // console.log(solution);
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
        case (type == 4):
            $scope.tacticType='Mate in 4';
            break;
        default:
            $scope.tacticType='Find best move';
            break;
    }
}


// generate url with params 
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
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

board = ChessBoard('board', cfg);
function loadGame(i) {
  


  $scope.currenGame_id = i;
  $scope.counter = 0; // tur zuur 0 utgaar bichew
  currentCorrectMoveCount=0; //zow nuusen nuudeluudiig tooloh
  currentTacticIsDone=false;

  board.clear();
  removeGreySquares();
  
  $scope.$parent.current_fen = $scope.pgnData[i].fen;

  currentGameSolution=$scope.pgnData[i].fes;
	solution.length=0;

  game = new Chess($scope.$parent.current_fen);
	goToMove(-1);
  pgnMoveStringToArray(currentGameSolution); 
  //tactic type-g display deer haragduulah
  setTacticStatus($scope.pgnData[i].tactic_type);
  if (game.turn() === 'b') {
  	solutionParsing();
    $scope.firstMove = 'Black to move';
    if (board.orientation()=="white") board.flip();
      
  } else {  
    $scope.firstMove = 'White to move';
    if (board.orientation()=="black") board.flip();
  }
  $scope.$parent.pl_color = board.orientation();
  $scope.share_url = window.location.protocol + "//" + window.location.host + "/"
  + "tactics/tactic?tactic=" + $scope.pgnData[i].id + "&type=puzzle" ;

 	board.position(game.fen());
  currentGame = i;
  updateStatus();
 tBoard=board;
 tGame=game;
  $("div[class^='square-']").on("click", function(){
    
    myMove_to=this.id.substring(0,2);
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


$('#btnPlayAI').on('click', function() {
  $("#play_with_ai").submit();
});
$('#btnGiveUp').on('click', function() {
    alertSuccess.setAttribute('class', 'hidden');
    alertFail.setAttribute('class', 'alert alert-danger visible');
  $('#btnRetry').show();
  $('#buttonSolution').show();
  loadGame(currentGame);
});
$('#btnRetry').on('click', function() {
    alertSuccess.setAttribute('class', 'hidden');
    alertFail.setAttribute('class', 'hidden');
  $('#btnRetry').hide();
  loadGame(currentGame);
});
$('#btnNextProb').on('click', function() {
    $('#buttonSolution').hide();
    $('#btnRetry').hide();
    alertSuccess.setAttribute('class', 'hidden');
    alertFail.setAttribute('class', 'hidden');
    if (currentGame+1 < $scope.pgnData.length) 
    	loadGame(currentGame+1);
    else
    	loadGame(currentGame=0);
});

// $('#arrow_btnStart').on('click', function() {
// 		alertSuccess.setAttribute('class', 'hidden');
//     alertFail.setAttribute('class', 'hidden');
//     if (currentGame > 0) 
//     	loadGame(currentGame-1);
//     else
//     	loadGame(currentGame=$scope.pgnData.length-1);
// });

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
    // console.log(solution[currentPly]);
    board.position(game.fen());
  }
});
// $('#arrow_btnNextPuzzle').on('click', function() {
//     alertSuccess.setAttribute('class', 'hidden');
//     alertFail.setAttribute('class', 'hidden');
//     if (currentGame+1 < $scope.pgnData.length) 
//     	loadGame(currentGame+1);
//     else
//     	loadGame(currentGame=0);
// });




 //detailProblem end


}); //detailController end


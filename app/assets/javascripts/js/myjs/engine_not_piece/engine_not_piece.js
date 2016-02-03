function myEngineGame(fen, options) {
   options = options || {}
var stockfish = new Worker(options.stockfishjs || '/assets/stockfish.js'); 
     
       var prex = 'position fen';
       var my1_pgn = fen;
       var my2_pgn = prex + " " + my1_pgn;
       var allscores = [];
       var time = { wtime: 300000, btime: 300000, winc: 2000, binc: 2000 };
       
       var board,  
          game = new Chess(),
          statusEl = $('#status'),
          fenEl = $('#fen'),
          pgnEl = $('#pgn1'),
          boardEl = $('#board'),
          squareToHighlight,
          isDrop=true,    //drop eswel click
          myMove_from='e2',
          myMove_to='e4';

      var removeHighlights = function(color) {
        boardEl.find('.square-55d63')
          .removeClass('highlight-' + color);

      };
     
       // Setting w, b first move from FEN
       var playerColor = 'black';
       playerColor = game.turn() == 'w' ? 'white' : 'black';
        
        // do not pick up pieces if the game is over
        // only pick up pieces for the side to move
        var onDragStart = function(source, piece, position, orientation) {

          removeHighlights('white');
          boardEl.find('.square-' + source).addClass('highlight-white');

          var re = playerColor == 'white' ? /^b/ : /^w/
          if (game.game_over() === true ||  piece.search(re) !== -1){
            // console.log("dragStart:"+playerColor);
              // (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
              // (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
            return false;
          }
             myMove_from=source; 
     
        };
        //click to click move method
        //nuden deer daraad daraagiin nuuh nudruugee dararad nuune
         function clicked_move() {
       
       console.log("clicked_move"+myMove_from+":"+myMove_to);
          var move = game.move({
                    from: myMove_from,
                    to: myMove_to,
                    promotion: 'q' // NOTE: always promote to a queen for example simplicity
                  });

          if (move === null) return 'snapback';
             

          removeHighlights('white');
          boardEl.find('.square-' + myMove_from).addClass('highlight-white');
          boardEl.find('.square-' + myMove_to).addClass('highlight-white');
  
                prepareMove("onDrop");
               updateStatus();
            
         }
        var onDrop = function(source, target) {
           console.log("onDrop"+source+":"+target);
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

          removeHighlights('white');
          // illegal move
          if (move === null) return 'snapback';
					
           isDrop=false;  // drag drop-r amjilta nuutsen uyd click-r nuuhiig false bolgono

          // highlight white's move
          boardEl.find('.square-' + source).addClass('highlight-white');
          boardEl.find('.square-' + target).addClass('highlight-white');

					prepareMove("onDrop");
          updateStatus();

        };

        // update the board position after the piece snap 
        // for castling, en passant, pawn promotion
        var onSnapEnd = function() {
           board.position(game.fen());
        };
        //computer nuuj duusahad buusan buudaliig highlight bolgono
        var onMoveEnd = function() {
          boardEl.find('.square-' + squareToHighlight)
            .addClass('highlight-black');
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
 					
 					if(engineStatus.score) {
                status += '<br>Score: ' + engineStatus.score;

            }
          if(engineStatus.search) {
                status += '<br>Search: ' + engineStatus.search;
            } 
          status += ' Book: ' + engineStatus.book;
          // board.position(game.fen());
          statusEl.html(status);
          // fenEl.html(game.fen());
          // pgnEl.html(game.pgn());
        };

        var cfg = {
          draggable: true,
          position: game.fen(),
          onDragStart: onDragStart,
          onDrop: onDrop,
          onSnapEnd: onSnapEnd,
          onMoveEnd: onMoveEnd,
          pieceTheme: '/assets/img/chesspieces/empty/zulaa.png'
        };
     
    //book
     if(options.book) {
      console.log("bookOption");
        var bookRequest = new XMLHttpRequest();
        bookRequest.open('GET', options.book, true);
        bookRequest.responseType = "arraybuffer";
        bookRequest.onload = function(event) {
            if(bookRequest.status == 200) {
                stockfish.postMessage({book: bookRequest.response});
                engineStatus.book = 'ready.';
                updateStatus();
            } else {
                engineStatus.book = 'failed!';
                updateStatus();
            }
        };
        bookRequest.send(null);
    } else {
        engineStatus.book = 'none';
    }
 
      //board
      board = ChessBoard('board', cfg);
      // board.position(game.fen());
    	var engineStatus = {};

      stockfish.onmessage = function(event) { 
        // console.log(event.data);
      	var line = event.data;
				var match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbk])?/);
          if(match) {
          	
              isEngineRunning = false;

              // game.move({from: 'f3', to: 'f7', promotion: 'q'});
              game.move({from: match[1], to: match[2], promotion: match[3]});
               fenEl.html(match[1]);
              //computer-n suuliin nuudeliig highlight bolgoh
              removeHighlights('black');
              boardEl.find('.square-' + match[1]).addClass('highlight-black');
              squareToHighlight = match[2];
              
              isDrop=true;// drop-r ail nuutsen uyd butsaagad click-r nuuh bolomjtoi bolgno
               prepareMove();
          } else if(match = line.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/)) {
              engineStatus.search = 'Depth: ' + match[1] + ' Nps: ' + match[2];
          }  	
          if(match = line.match(/^info .*\bscore (\w+) (-?\d+)/)) {

                var score = parseInt(match[2]) * (game.turn() == 'w' ? 1 : -1);
                if(match[1] == 'cp') {
                    engineStatus.score = (score / 100.0).toFixed(2);
                    engineStatus.scoreChart=engineStatus.score;
                } else if(match[1] == 'mate') {
                    engineStatus.score = '#' + score;
                    engineStatus.scoreChart=score;
                }
                if(match = line.match(/\b(upper|lower)bound\b/)) {
                    engineStatus.score = ((match[1] == 'upper') == (game.turn() == 'w') ? '<= ' : '>= ') + engineStatus.score
                }
            }
          updateStatus();

       };
   
      updateStatus();
    function uciCmd() {  

     stockfish.postMessage(prex+" "+game.fen());
      stockfish.postMessage('go depth 11');
      // stockfish.postMessage('go movetime 2000');
    }


     function prepareMove(from){
        if (from!="onDrop") 
         board.position(game.fen());
        var turn = game.turn() == 'w' ? 'white' : 'black';
      updateBoardHint();
        if(!game.game_over()) 
            if(turn != playerColor)          
              uciCmd();
      }
    

  		return {
        getGame: function() {
            return game;
        },
        getBoard: function() {
            return board;
        },
        reset: function() {
            game.reset();
        },
        getScores: function() {
            return allscores;
        },
        loadPgn: function(pgn) { game.load_pgn(pgn); },
        setPlayerColor: function(color) {       
            playerColor = color;
            board.orientation(playerColor);
        },
        getSquare: function() {
          return myMove_to;
        },
        setSquare: function(two) {
          myMove_to=two;
          console.log(isDrop);
          if (isDrop==true)
          clicked_move();

       
            
        },
        setSkillLevel: function(skill) {
            // uciCmd('setoption name Skill Level value ' + skill);
        },
        setTime: function(baseTime, inc) {
            time = { wtime: baseTime * 1000, btime: baseTime * 1000, winc: inc * 1000, binc: inc * 1000 };
        },
        setDepth: function(depth) {
            time = { depth: depth };
        },
        setNodes: function(nodes) {
            time = { nodes: nodes };
        },
        setContempt: function(contempt) {
            // uciCmd('setoption name Contempt Factor value ' + contempt);
        },
        setAggressiveness: function(value) {
            // uciCmd('setoption name Aggressiveness value ' + value);
        },
        setDisplayScore: function(flag) {
            displayScore = flag;
           
        },
        flipColor: function() {
      
           playerColor = playerColor == 'white' ? 'black' : 'white';
           prepareMove();
           board.flip();
      
        },
        flip: function() {
            board.flip();
        },
        start: function() {
            // uciCmd('ucinewgame');
            // uciCmd('isready');
            
            engineStatus.engineReady = false;
            engineStatus.search = null;
            prepareMove();
        },
        undo: function() {
         
            if(isEngineRunning)
                return false;
            game.undo();
            game.undo();
            engineStatus.search = null;
          
            prepareMove();
            return true;
        }
    };

}
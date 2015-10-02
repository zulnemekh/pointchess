function myEngineGame(fen, options) {

var stockfish = new Worker(options.stockfishjs || '/assets/stockfish.js'); 
     
       var prex = 'position fen';
       var my1_pgn = fen;
       var my2_pgn = prex + " " + my1_pgn;
       var time = { wtime: 300000, btime: 300000, winc: 2000, binc: 2000 };
       
       var board,  
          game = new Chess(my1_pgn),
          statusEl = $('#status'),
          fenEl = $('#fen'),
          pgnEl = $('#pgn1');
       // Setting w, b first move from FEN
       var playerColor = 'black';
       playerColor = game.turn() == 'w' ? 'white' : 'black';
        
        // do not pick up pieces if the game is over
        // only pick up pieces for the side to move
        var onDragStart = function(source, piece, position, orientation) {
          var re = playerColor == 'white' ? /^b/ : /^w/
          if (game.game_over() === true ||  piece.search(re) !== -1){
            // console.log("dragStart:"+playerColor);
              // (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
              // (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
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
					
					prepareMove();
          updateStatus();
        };

        // update the board position after the piece snap 
        // for castling, en passant, pawn promotion
        var onSnapEnd = function() {
          // board.position(game.fen());
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
            board.position(game.fen());
          statusEl.html(status);
          // fenEl.html(game.fen());
          // pgnEl.html(game.pgn());
        };

        var cfg = {
          draggable: true,
          position: game.fen(),
          onDragStart: onDragStart,
          onDrop: onDrop,
          onSnapEnd: onSnapEnd
        };
     
      board = ChessBoard('board', cfg);
      // board.position(game.fen());
    	var engineStatus = {};

      stockfish.onmessage = function(event) { console.log(event.data);
      	var line = event.data;
				var match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbk])?/);
          if(match) {
          	console.log("MATCH:"+match[1]+":"+match[2]+":"+match[3]);
              isEngineRunning = false;

              // game.move({from: 'f3', to: 'f7', promotion: 'q'});
              game.move({from: match[1], to: match[2], promotion: match[3]});
              // board.position(game.fen());
                prepareMove();
          } else if(match = line.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/)) {
              engineStatus.search = 'Depth: ' + match[1] + ' Nps: ' + match[2];
          }  	
          if(match = line.match(/^info .*\bscore (\w+) (-?\d+)/)) {

                var score = parseInt(match[2]) * (game.turn() == 'w' ? 1 : -1);
                console.log("bscore:"+ score);
                if(match[1] == 'cp') {
                    engineStatus.score = (score / 100.0).toFixed(2);
                } else if(match[1] == 'mate') {
                    engineStatus.score = '#' + score;
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
    }

  

    function prepareMove(){

         board.position(game.fen());
       
        var turn = game.turn() == 'w' ? 'white' : 'black';
        if(!game.game_over()) {
        	   console.log("prepareMove:"+playerColor);
          	if(turn != playerColor) {
          		  // var moves = '';
              //   var history = game.history({verbose: true});
              //   for(var i = 0; i < history.length; ++i) {
              //       // var move = history[i];
              //       // moves += ' ' + move.from + move.to + (move.promotion ? move.promotion : '');
              //   }
              uciCmd();

          	}
        
        }
    }

    

  		return {
        reset: function() {
            game.reset();
          
        },
        loadPgn: function(pgn) { game.load_pgn(pgn); },
        setPlayerColor: function(color) {       
            playerColor = color;
            board.orientation(playerColor);
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
        // var color = game.turn() == 'b' ? 'white' : 'black';
         console.log("FLIPCOLOR:"+game.turn());
         playerColor = 'white';
         prepareMove();
        //     playerColor = color;
          board.flip();
           
        //     updateStatus();
        //     game.reset();
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
            console.log("undo titan")
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
// // Piece and mobility weights for evaulation function.
// var kingWt = 200;
// var queenWt = 9;
// var rookWt = 5;
// var knightWt = 3;
// var bishopWt = 3;
// var pawnWt = 1;
// var mobilityWt = 0.1;

// // Implements at replaceAt function to change a char at specific index.
// function stringReplaceAt(s, index, replacement) {
//     return s.substr(0, index) + replacement + s.substr(index+1, s.length);
// }

// // Check to see if computer should move, if yes find/make the move, update the
// // board and callback.
// function engine() {
//   if (game.game_over()) {
//     return false;
//   }

//   var move = think();
//   game.move(move);
//   board.position(game.fen());
//   window.setTimeout(
//     function() {$('#board').trigger('moveDone')}, 2000
//   );
// }

// // Wrapper for search and evaluate.
// // TODO: remove hardcoded initial scores, find suitable alternative.
// function think(){
//     return negaMax(game, 2);
// }

// function negaMax (state, depth) {
//     var bestMove = {
//         'move': null,
//         'score': -Infinity,
//     };
//     var possibleMoves = state.moves();

//     for (var x = 0; x < possibleMoves.length; x++) {
//         state.move(possibleMoves[x]);
//         var score = -negaMaxRecur(state, depth-1);
//         state.undo_move();
//         console.log(possibleMoves[x])
//         if (score > bestMove['score']) {
//             bestMove['move'] = possibleMoves[x];
//             bestMove['score'] = score;
//         }
//     }
//     return bestMove['move'];
// }


// function negaMaxRecur (state, depth) {
//     var bestMove = -Infinity;
//     if (depth === 0) {
//         return evaluate(state);
//     }
//     var possibleMoves = state.moves();

//     for (var x = 0; x < possibleMoves.length; x++) {
//         state.move(possibleMoves[x]);
//         var move = -negaMaxRecur(state, depth-1);
//         state.undo_move();
//         if (move > bestMove) {
//             bestMove = move;
//         }
//     }
//       return bestMove;
// }

// function flipPlayer(player) {
//     if (player === 'w') {
//         return 'b';
//     } else if (player === 'b') {
//         return 'w';
//     }
// }

// function evaluate(game) {
//     game.flip_turn()
//     var currentFen = game.fen()
//     currentPlayer = game.turn()
//     var currentChar;
//     var piecesMap = {
//         'p': 0,
//         'b': 0,
//         'n': 0,
//         'r': 0,
//         'q': 0,
//         'k': 0,
//         'P': 0,
//         'B': 0,
//         'N': 0,
//         'R': 0,
//         'Q': 0,
//         'K': 0,
//     };

//     for (var x = 0; x < currentFen.length; x++) {
//         currentChar = currentFen.charAt(x);
//         if (currentChar === ' ') {
//             break;
//         } 
//         if (currentChar in piecesMap) {
//             piecesMap[currentChar] += 1;
//         }
//     }

//     var materialScore = (
//           kingWt * (piecesMap['K'] - piecesMap['k'])
//         + queenWt * (piecesMap['Q'] - piecesMap['q'])
//         + rookWt * (piecesMap['R'] - piecesMap['r'])
//         + bishopWt * (piecesMap['B'] - piecesMap['b'])
//         + knightWt * (piecesMap['N'] - piecesMap['n'])
//         + pawnWt * (piecesMap['P'] - piecesMap['p'])
//     );

//     if (currentPlayer === 'w') {
//         whiteMobility = game.moves().length;
//         game.flip_turn();
//         blackMobility = game.moves().length;
//     } else {
//         whiteMobility = game.moves().length;
//         game.flip_turn();
//         blackMobility = game.moves().length;
//     }


//     var mobilityScore = mobilityWt * (whiteMobility - blackMobility);
//     return (materialScore + mobilityScore) * (currentPlayer === 'w' ? 1:-1);
// }
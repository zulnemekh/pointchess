var board,
  boardEl = $('#board'),
  game = new Chess(),
  squareClass = 'square-55d63',
  squareToHighlight,
  colorToHighlight;

var makeRandomMove = function() {
  var possibleMoves = game.moves({
    verbose: true
  });

  // exit if the game is over
  if (game.game_over() === true ||
    game.in_draw() === true ||
    possibleMoves.length === 0) return;

  var randomIndex = Math.floor(Math.random() * possibleMoves.length);
  var move = possibleMoves[randomIndex];

  if (move.color === 'w') {
    boardEl.find('.' + squareClass).removeClass('highlight-white');
    boardEl.find('.square-' + move.from).addClass('highlight-white');
    squareToHighlight = move.to;
    colorToHighlight = 'white';
  }
  else {
    boardEl.find('.square-55d63').removeClass('highlight-black');
    boardEl.find('.square-' + move.from).addClass('highlight-black');
    squareToHighlight = move.to;
    colorToHighlight = 'black';    
  }

  game.move(possibleMoves[randomIndex].san);
  board.position(game.fen());

  window.setTimeout(makeRandomMove, 1200);
};

var onMoveEnd = function() {
  boardEl.find('.square-' + squareToHighlight)
    .addClass('highlight-' + colorToHighlight);
};

var cfg = {
  position: 'start',
  onMoveEnd: onMoveEnd
};
board = ChessBoard('board', cfg);

window.setTimeout(makeRandomMove, 500);
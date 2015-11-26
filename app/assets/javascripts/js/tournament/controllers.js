    
         mainApp.controller("shapeController", function($scope,$timeout) {
            $scope.message = "In shape controller";
            $scope.type = "Shape";
            $scope.timer = "";
            $scope.counter = 300;
						    $scope.onTimeout = function(){
						        $scope.counter--;
						        if ($scope.counter == 0) {
						        	alert("Game Over");
						        	return false;
						        }

						        var value = $scope.counter;
						        var sec = $scope.counter;						        
						        // total seconds
							var seconds = $scope.counter;

							// calculate seconds
							var s = seconds % 60;
							// add leading zero to seconds if needed
							s = s < 10 ? "0" + s : s;

							// calculate minutes
							var m = Math.floor(seconds / 60) % 60;
							// add leading zero to minutes if needed
							m = m < 10 ? "0" + m : m;

							// calculate hours
							var h = Math.floor(seconds / 60 / 60);

							var time = h + ":" + m + ":" + s

										$scope.timer=time;
						        mytimeout = $timeout($scope.onTimeout,1000);
						    }
						    var mytimeout = $timeout($scope.onTimeout,1000);
						    
						    $scope.stop = function(){
						        $timeout.cancel(mytimeout);
						    }
 				console.log("shapeController");
         });
         
      
         mainApp.controller("circleController", function($scope) {
            $scope.message = "In circle controller";
            $scope.data = mate2;
            $scope.problems =[];
				   //  for (var i = 0; i < $scope.data.length; i++) {
						 //  var g = new Chess();
						 //  g.load_pgn($scope.data[i].join('\n'), {newline_char:'\n'});
						 //  var h = g.header();
							// $scope.problems[i] = h;
				
						 // }
			
					var boardname='board_';
					 $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
				  	for (var i = 0; i < $scope.problems.length; i++) {
									// var board2 = ChessBoard(boardname+i, {
									//   position: $scope.problems[i].FEN,
									//   showNotation: false
									// });
								}
				  });
  console.log("circleController");
      });
         
         mainApp.controller("squareController", function($scope) {
            $scope.message = "In square controller";
            $scope.type = "Square";
            console.log("squareController");
         });
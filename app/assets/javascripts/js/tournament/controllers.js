    
         mainApp.controller("parentController", function($scope,$timeout) {
            $scope.message = "In parent controller";
            $scope.type = "parent";
            $scope.timer = "";
            $scope.counter = 300;
				    $scope.onTimeout = function(){
				        if ($scope.counter == 0) {
				        	alert("Game Over");
				        	return false;
				        }
				        var value = $scope.counter;
				        var sec = $scope.counter;						        
				        // total seconds
							var seconds = $scope.counter;
							 $scope.counter--;
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
         
      
         mainApp.controller("listController", function($rootScope,$scope,$timeout,Service) {
            $scope.message = "In list controller";
            $scope.data = mate2;
            $scope.problems =[];

				    for (var i = 0; i < $scope.data.length; i++) {
						  var g = new Chess();
						  g.load_pgn($scope.data[i].join('\n'), {newline_char:'\n'});
						  var h = g.header();
							$scope.problems[i] = h;
				
						 }
			
					var boardname='board_';
					 $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
				  	for (var i = 0; i < $scope.problems.length; i++) {
									var board2 = ChessBoard(boardname+i, {
									  position: $scope.problems[i].FEN,
									  showNotation: false
									});
								}
				  });

			


  		console.log("listController");
  	 $scope.foo = Service.foo;
		  console.log($scope.foo);
		  Service.foo = 'I am from contoller 1';

      });
         
         mainApp.controller("detailController", function($rootScope,$scope,Service, $stateParams) {
            $scope.message = "In detail controller";
            $scope.type = "detail";
						$scope.foo = Service.foo;
						$scope.id = $stateParams.id;
  				// var param1 = $routeParams.id;
          
      //       console.log("detailController");
            console.log($stateParams);
      //       console.log("id:"+param1);
         });

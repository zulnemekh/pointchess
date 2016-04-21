    
     mainApp.controller("parentController", function($rootScope,$scope,$timeout,sharedService) {
        $scope.array = array;
        $scope.problems = tactic_array;
        // $scope.users=[];
        $rootScope.users = [];
        $rootScope.isMqttConnected;
        $scope.tmpUsers=[];
        $scope.message = "In parent controller";
        $scope.tempPoint = sharedService.tempPoint();
        console.log("tempPoint:"+$scope.tempPoint);
        $scope.allPoint = 0;
        $scope.timer = "";
        $scope.counter = 300;
        $scope.onTimeout = function(){
        if ($scope.counter == 0) {
              console.log("Game Over");
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
 
      // $scope.data = getRandomSubarray(Service.pgnData, 5);
        
     });
     

     mainApp.controller("listController", function($scope,$timeout,sharedService) {
        $scope.message = "In list controller";
        $scope.$parent.tmpUsers.push(sharedService.getUser());
         

       // $scope.problems = sharedService.getTactic();

       console.log("parent:"+ $scope.$parent.problems);
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
   
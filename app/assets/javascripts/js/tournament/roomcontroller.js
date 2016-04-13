
mainApp.controller("roomController", function($rootScope,$scope,$timeout,sharedService,msgService,dbSrvc) {
  $scope.message = "In room controller";
// room controller n buh hereglegchidee tsugluulchaad
// start towch darahad listruu orj tsag ywj ehleed tournament ehlene
	$scope.goto_init = function() {
		console.log("goto_init");
		dbSrvc.post("tournament/get_tournament_users", {authenticity_token: _AUTH_TOKEN, tournament_id: current_tournament.id}).then(function(data) {
         console.log("tournamentdata:"+JSON.stringify(data)); 
         $rootScope.users=data;
         for (var i = 0; i < $rootScope.users.length; i++) {
        	$rootScope.users[i].point=0;
      	 }
     });
		
	}

});
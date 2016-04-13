
mainApp.controller("home", function($rootScope,$scope,$timeout,sharedService,msgService,dbSrvc) {
  $scope.message = "In home controller";
     
  $scope.goto_detail = function(index, id) {
    console.log(id);
    current_tournament = $scope.$parent.array[index];
		msgService.joinRoom1(id, current_tournament.id, listenerMessageHandler);
		
		dbSrvc.post("tournament/get_tournament_users", {authenticity_token: _AUTH_TOKEN, tournament_id: current_tournament.id}).then(function(data) {
         console.log("tournamentdata:"+JSON.stringify(data)); 
         $rootScope.users=data;
         $scope.$parent.mytimeout = $timeout($scope.onTimeout,1000);
         for (var i = 0; i < $rootScope.users.length; i++) {
        	$rootScope.users[i].point=0;
      	 }
     });
		
 		// var last_element = $rootScope.users[$rootScope.users.length - 1];
   //      newtagJson = {
   //        "user_name": sharedService.getUser(),
   //        "selected": 1,
   //        "clicked": 0,
   //        "point": 0,
   //        "id":-1
   //      }
   //  $rootScope.users.push(newtagJson);
  };

 listenerMessageHandler = function(mqttMsg){
 	console.log("call listenerMessageHandler from home controller");
  var topic = mqttMsg.destinationName;
  var payload = mqttMsg.payloadString;

  var msgObj = jQuery.parseJSON( payload );
  var msgType = msgObj.msgtype;

  switch (msgType){
    case 'text': 
      $('#messagelist').prepend('<li>'+msgObj.username+ '->' +msgObj.message+'</li>');
     break;
    case 'point': 
      console.log("sendAllPoint1:"+msgObj.message);
      console.log("user:"+$scope.$parent.tmpUsers.length);
       for (var i = 0; i < $scope.$parent.tmpUsers.length; i++) {
        if ($scope.$parent.tmpUsers[i]==msgObj.username){
            $('#'+$scope.$parent.tmpUsers[i].id).html(msgObj.username+ '->' +msgObj.message);
            break;
          }

         
       };
      
     break; 
   }
};
});
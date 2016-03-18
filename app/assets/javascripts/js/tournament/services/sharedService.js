angular.module("mainApp").factory('sharedService', function(dbSrvc) {
   
  var tempPoint = function(){
  		return 0;
  }
  var getId = function(){
  		return 1;
  }
 
  var currentUser = null;
  var getUser = function(){
      if(currentUser == null){
          data = dbSrvc.get("tournament/get_user").then(function(data) {
              currentUser = data;
              return currentUser;
          });
      } else {
         
        return currentUser;
          
      }
  }

  var currentTactic = null;
  var getTactic = function(){
      if(currentTactic == null){
          data = dbSrvc.get("tournament/get_tactic").then(function(data) {
              currentTactic = data;
              // console.log(currentTactic);
              return currentTactic;
          });
      } else {
         
        return currentTactic;
          
      }
  }
   
 getUser();
 getTactic();
	
		 return {
		 	 getId: getId,
		 	 tempPoint: tempPoint,
		 	 getUser: getUser,
		 	 getTactic: getTactic
		 };
});

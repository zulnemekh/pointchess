var current_tournament="";  
var current_tactic="";  
var mainApp = angular.module('mainApp', ['ui.router'])
  .directive('onFinishRender', function ($timeout) {
  return {
      restrict: 'A',
      link: function (scope, element, attr) {
          if (scope.$last === true) {
              $timeout(function () {
                  scope.$emit('ngRepeatFinished');
              });
          }
      }
  }
});

mainApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
 $urlRouterProvider.otherwise('/home');
	$stateProvider.state("home", {
		url: "/home",
		templateUrl: "/assets/js/tournament/views/home.html",
		controller: "home"
	});
  $stateProvider.state("room", {
    url: "/room",
    templateUrl: "/assets/js/tournament/views/room.html",
    controller: "roomController"
  });
  $stateProvider.state("list", {
    url: "/list",
    templateUrl: "/assets/js/tournament/views/list.html",
    controller: "listController"
  });
	$stateProvider.state("detail", {
		url: "/detail/:id",
		templateUrl: "/assets/js/tournament/views/detail.html",
		controller: "detailController"
	});
	

}]);

     
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

mainApp.factory('Service', function() {


 var Service = {
    foo: 'Shared service',
    fen: mate2.length

  };
 
 return Service;
});


mainApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
 $urlRouterProvider.otherwise('/home');
	$stateProvider.state("list", {
		url: "/home",
		templateUrl: "/assets/js/tournament/views/list.html",
		controller: "listController"
	});

	$stateProvider.state("detail", {
		url: "/detail/:id",
		templateUrl: "/assets/js/tournament/views/detail.html",
		controller: "detailController"
	});
	

}]);

/*
mainApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/problems', {
        templateUrl: '/assets/js/tournament/views/list.html',
        controller: 'shapeController'
      }).
      when('/detail/:phoneId', {
        templateUrl: '/assets/js/tournament/views/detail.html',
        controller: 'circleController'
      }).
      otherwise({
        redirectTo: '/problems'
      });
  }]);

*/
     
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
	$stateProvider.state("detail", {
		url: "/poll/detail",
		//templateUrl: "/app/views/welcome.html"
		templateUrl: "/assets/js/chart/partials/phone-list.html",
		controller: "squareController"
	});
	

}]);


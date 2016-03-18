/**
 * Created by colinjlacy on 8/31/14.
 */
angular.module("mainApp")
.factory("dbSrvc", function($http, $q) {
		return {
			// database operations
			post: function(name, data) {
				var returnData = $q.defer();
				var url = "/api/" + name;
				$http({
					url: url,
					method: "POST",
					data: data,
          headers: {
              "X-CSRF-Guard": "on"
          }
				})
				.success(function(data) {
					returnData.resolve(data);
				})
				.error(function(data) {
					//console.log(data);
					if(data.error == "login"){
						window.location.href = "/login";
					}
				});
				// returns the promise of the API call - whether successful or not
				return returnData.promise;
			},
			get: function(name) {
				var returnData = $q.defer();
				var url = "/api/" + name;
				$http({
					url: url,
					method: "GET"
				})
				.success(function(data) {
					returnData.resolve(data);
				})
				.error(function(data) {
				});
				return returnData.promise;
			},
			processInputs: function(order_foods) {
				//order_foods = isNaN(order_foods) ? "" : order_foods;

				return {
					order_foods: order_foods
				}
			}
		}
	});
(function() {
	angular.module('mr.directives', [])
	var app = angular.module('MRBoxTalk', ['mr.directives'])

	app.controller('Controller', function($scope, $timeout, $q) {
		$scope.waitsAndResolves = function() {
			var dfd = $q.defer()
			$timeout(function() {
				dfd.resolve()
			}, 2000);
			return dfd.promise
		}

		$scope.waitsAndRejects = function() {
			var dfd = $q.defer()
			$timeout(function() {
				dfd.reject()
			}, 1000);
			return dfd.promise
		}

		$scope.imgUrl = "/images/foo.jpg"
	})
})()

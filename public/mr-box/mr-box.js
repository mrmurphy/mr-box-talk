(function() {
	angular.module('mr.directives')
	.directive('mrBox', function() {
		return {
			restrict: 'E',
			templateUrl: '/mr-box/mr-box.html',
			replace: true,
			transclude: true,
			scope: {
				loadMsg: "@",
				errorMsg: "@",
				resolveFn: "&"
			},
			controller: function($scope) {
				$scope.state = 'loading'
				$scope.resolveFn()
				.then(function() {
					$scope.state = 'loaded'
				}, function() {
					$scope.state = 'error'
				})
			}
		}
	})
})()

// Before each:
// 1. Declare the module
// 2. Inject $compile and $rootScope
// In test:
// 3. Compile string to element on rootScope
// 4. rootScope.$digest!
// 5. Make sure it all worked!

describe('A test', function() {
	var $compile, $rootScope, $q

	beforeEach(module('mr.directives'))
	beforeEach(module('templates'))

	beforeEach(inject(function(_$compile_, _$rootScope_, _$q_) {
		$compile = _$compile_
		$rootScope = _$rootScope_
		$q = _$q_
	}))

	it("should render loading text when promise unresolved", function() {
		$rootScope.fooFn = function() {
			return $q.defer().promise
		}
		var elem = $compile("<mr-box load-msg='foo' " +
			"resolve-fn='fooFn()'></mr-box>")($rootScope)
		$rootScope.$digest()
		expect(elem.html()).toContain("foo")
	});

	it("should render error text when promise rejected", function() {
		$rootScope.fooFn = function() {
			return $q.reject()
		}
		var elem = $compile("<mr-box error-msg='ohno' " +
			"resolve-fn='fooFn()'></mr-box>")($rootScope)
		$rootScope.$digest()
		expect(elem.html()).toContain("ohno")
	});

	it("show transcluded data when promise is resolved", function() {
		$rootScope.fooFn = function() {
			return $q.when(true)
		}
		var elem = $compile("<mr-box " +
			"resolve-fn='fooFn()'>Hello, there!</mr-box>")($rootScope)
		$rootScope.$digest()
		expect(elem.html()).toContain("Hello, there!")
	});
});

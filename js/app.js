var app = angular.module('GEOINK', ['GEOINK.Service', 'GEOINK.Controller', 'ngCookies', 'ngRoute', 'ngAnimate', 'ngDialog', 'ngFileUpload']);

//http://stackoverflow.com/questions/14791361/how-to-achieve-a-safe-authentication-system-in-an-angularjs-app
//http://blog.brunoscopelliti.com/deal-with-users-authentication-in-an-angularjs-web-app/
//http://www.frederiknakstad.com/2013/08/04/authentication-in-single-page-applications-with-angular-js-part-2/

//http://riadbenguella.com/cookie-session-based-authentication-in-angularjs-applications/
//https://github.com/chieffancypants/angular-loading-bar
//1 = admin
//2 = regular user

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
    //  when('/users', {templateUrl: 'tpl/lists.php', controller: 'ListCtrl', accessLevel: 1}).
    //  when('/', {templateUrl: 'tpl/login.php', controller: 'LoginCtrl'}).
    //  when('/add-user', {templateUrl: 'tpl/add-new.php', controller: 'AddCtrl', accessLevel: 1}).
    //  when('/edit/:id', {templateUrl: 'tpl/edit.php', controller: 'EditCtrl', accessLevel: 2}).
      when('/', {templateUrl: 'tpl/upload.html', controller: 'UploadCtrl'}).
      otherwise({redirectTo: '/'});

}]).
    run(function($rootScope, $location, cookieStoreService, $window, ngDialog) {
        $rootScope.$on( "$routeChangeStart", function(event, next) {
        });
    });

	/*

	var app = angular.module('SPAGS', ['ngCookies', 'ngRoute', 'ngAnimate']);

app.config(['$routeProvider', function($routeProvider ) {
  $routeProvider.
      when('/users', {templateUrl: 'tpl/lists.php', controller: 'ListCtrl'}).
      when('/', {templateUrl: 'tpl/login.php', controller: 'LoginCtrl'}).
      when('/add-user', {templateUrl: 'tpl/add-new.php', controller: 'AddCtrl'}).
      when('/edit/:id', {templateUrl: 'tpl/edit.php', controller: 'EditCtrl'}).
      otherwise({redirectTo: '/'});
}]).
    run(function($rootScope, $location, $cookieStore) {
        $rootScope.$on( "$routeChangeStart", function(event, next) {
            if ($cookieStore.get('user') == null) {
                // no logged user, redirect to /login
               // $location.path("/");
                if ( next.templateUrl === "tpl/login.php") {
                } else {
                    $location.path("/");
                }
            }
            else if($cookieStore.get('user') != null){

                if ( next.templateUrl === "tpl/login.php") {
                    $location.path("/users");
                }else{

                }
            }
        });
    });


//create a factory to handle central location of data
app.factory('user', ['$http', function($http) {
var users = {};
var baseURL = 'http://localhost/SPAGS_API/';

users.getall = function(){
return $http.get(baseURL + 'users');
},

users.checkLogin = function(params){
return $http.post(baseURL + 'login', params);
}

return users;

}]);


app.controller('UsernameCtrl', ['$scope', '$location', '$cookieStore', '$rootScope', function ($scope, $location, $cookieStore, $rootScope) {
       $scope.user = $cookieStore.get('user');
        $scope.logout = function () {
            $cookieStore.remove('user');
            $scope.activePath = $location.path('/');
        }
}]);


app.controller('ListCtrl', ['$scope', '$http', 'user', function ($scope, $http, user) {
    $scope.css = 'reveal-animation';

	user.getall().success(function (data) {
	$scope.users = data;
	})


}]);


app.controller("LoginCtrl",['$scope', '$http', '$location', '$cookieStore', 'user', function ($scope, $http, $location, $cookieStore, user) {
    $scope.check = {};
    $scope.activePath = null;

	//using a promise here
	$scope.checkLogin = function () {
	user.checkLogin(this.check).then(function (reponse) {
	  if (reponse.data.loginStatus == true) {
                $cookieStore.put('user', reponse.data.email);
                $location.path('/users');
            }
            else {
                $scope.email = reponse.data.errors.email;
                $scope.passwd = reponse.data.errors.password;
            }
	}, function(response){
	  alert(response.data);
	})
	}
}]);


app.controller("AddCtrl",['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.master = {};
    $scope.activePath = null;
    $scope.formData = {};

    $scope.add_new = function() {
        $http.post('CRUD_API/add_user', this.formData).success(function(data){
            // $scope.reset();

            if (data.saved == true) {
                $scope.message = data.msg;
                $scope.passwlt='';
            }
            else {
                $scope.passwlt = data.errors.passwd;
            }
            //$scope.activePath = $location.path('/');
        });

        //   $scope.reset = function() {
        //  $scope.user = angular.copy($scope.master);
        // };

        // $scope.reset();
    };
}]);


app.controller("EditCtrl",['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {
    var id = $routeParams.id;
    $scope.activePath = null;

    $http.get('CRUD_API/users/'+id).success(function(data) {
        $scope.users = data;

    });

    $scope.update = function(user){
        $http.put('CRUD_API/users/'+id, user).success(function(data) {
            $scope.message = data;
            //$scope.activePath = $location.path('/');
        });
    };

    $scope.delete = function(user) {
        var deleteUser = confirm('Are you absolutely sure you want to delete?');
        if (deleteUser) {
            $http.delete('CRUD_API/users/'+user.id);
            $scope.activePath = $location.path('/');
        }
    };
}]);
*/

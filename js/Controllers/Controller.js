angular.module('GEOINK.Controller', [])

.controller('UsernameCtrl', ['$scope', '$location','$rootScope','user','cookieStoreService', function ($scope, $location, $rootScope, user, cookieStoreService) {
       $scope.user = cookieStoreService.getItem('user');
	   $scope.level = cookieStoreService.getItem('level');


        $scope.logout = function () {
		    cookieStoreService.removeItem('user');
			cookieStoreService.removeItem('level');
            $scope.activePath = $location.path('/');
        }
}])




.controller('UploadCtrl', ['$scope', '$http','user', function ($scope, $http, user) {
/*
testing upload function
Based on solution by https://github.com/danialfarid/ng-file-upload
*/
$scope.name='';
$scope.greeting = function (){
	user.getGreeting($scope.name).success(function(data) {
		$scope.greet = data;
	}).error(function(){
		$scope.greet = "something went wrong";
	})
}

$scope.upload = function (files) {
    $scope.results = [];

        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                user.upload(file).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    $scope.log = 'PROGRESS: ' + progressPercentage + '% ' + evt.config.file.name;
                    $scope.progressPerc = progressPercentage;
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                    $scope.log = 'File: ' + config.file.name + ' uploaded and processed. \n\nJSON stringify: \n ' + JSON.stringify(data)  + '\n';

                    for(var i = 1; i <= Object.keys(data.results.records).length; i++){ //since each object was assigned a unique key, loop through to dynamically assign results
                    $scope.results.push(data.results.records[i]);
                     }
                });
            }
        }
    };
}])


/* check time for local storage cookie
var object = {value: "value", timestamp: new Date().getTime()}
localStorage.setItem("key", JSON.stringify(object));
You can parse the object, get the timestamp and compare with the current Date, and if necessary, update the value of the object.

var object = JSON.parse(localStorage.getItem("key")),
    dateString = object.timestamp,
    now = new Date().getTime().toString();

compareTime(dateString, now); //to implement



http://stackoverflow.com/questions/2326943/when-do-items-in-html5-local-storage-expire

*/

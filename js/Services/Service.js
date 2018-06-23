//create a factory to handle central location of user data

angular.module('GEOINK.Service', [])

.factory('user', ['$http', 'cookieStoreService', 'Upload', function($http, cookieStoreService, Upload) {
var baseURL = 'http://localhost:8080/';

var users = {
isLogged: false,
accessLevel:'',
email:''
};

/* can move to its own upload service to be consistent*/
users.upload = function(file) {
return Upload.upload({
url: baseURL + 'upload',
file: file,
headers: {
    'Accept': 'application/json;charset=utf-8'
    //'token' : cookieStoreService.getItem('user')
    }

})}

users.getGreeting = function(name) {
  return $http({
   method: 'GET',
   url: baseURL + 'greetings?name=' + name,
   headers:  {
          'Accept': 'application/json;charset=utf-8'
      }
  })
}


return users;

}])

.factory('cookieStoreService', ['$cookieStore', function($cookieStore) {
return {
                    getItem: function(item){
                        var data = $cookieStore.get(item);
                        if (!data){
                            data = {};
                            return null;
                        }else{
                            return data;
                        }
                    },
                    setItem: function(key, value){
                        $cookieStore.put(key, value);
                        return true;
                    },
                    removeItem: function(key){
                        $cookieStore.remove(key);
                        return true;
                    }
};
}]);

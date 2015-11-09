////////////////////////////////////////
/////////// MOOD APPLICATION ///////////
////////////////////////////////////////
var app = angular.module('moodApp', ['ngRoute']);


////////////////////////////////////////
/////////// HEADER CONTROLLER //////////
////////////////////////////////////////

// Verifies the current_user
app.controller('HeaderController', ['$http', function($http){
  var controller = this;
  $http.get('/session').success(function(data){
    controller.current_user = data.current_user;
  });
}]);


// ////////////////////////////////////////
// /////////// MOOD CONTROLLER ////////////
// ////////////////////////////////////////
app.controller('MoodController', ['$http', '$scope', function($http, $scope){

  // authenticity token
  var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  var controller = this;


  // value of happiness determined by emoji picked; default is null
  this.happiness = null;

  this.factors[factors.length] = {
    "blurb": blurb
  };


  // get the happiness value for current user
  this.getMood = function(){
    $http.get('/moods').success(function(data){
      controller.current_user_moods = data.moods;
    });
  };

  // fetching happiness data
  this.getMood();

  // post the new mood
  this.createMood = function(){
    console.log(this);
    controller.current_user_moods.push({
      happiness: this.happiness,
      factors: this.factors
    });

  // post to /moods
  $http.post('/moods', {
    authenticity_token: authenticity_token,
    mood: {
      happiness: this.happiness,
      factors: this.factors
    }
  }).success(function(data){
    controller.current_user_moods.pop();
    controller.current_user_moods.push(data.moods);
    controller.getMood();
  });
  };
}]);

////////////////////////////////////////
/////////// FACTOR CONTROLLER //////////
////////////////////////////////////////
app.controller('FactorController', ['$http', '$scope', function($http, $scope){

  // call in the authenticity token
  var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


  $scope.blurb = "";


  this.getFactor = function(){
    $http.get('/moods/'+$scope.$parent.factors.id+'/factors').success(function(data){
      controller.current_user_factors = data.moods;
    });
  };

  this.getFactor();

  // post the new mood
  this.createFactor = function(){

    controller.current_user_factors.push.length({
      blurb: this.blurb,
      id: this.id
    });

  // post to /moods
  $http.post('/moods/'+$scope.$parent.factors.id+'/factors', {
    authenticity_token: authenticity_token,
    factors: {
      blurb: this.blurb,
      id: this.id
    }
  }).success(function(data){
    controller.current_user_factors.pop();
    controller.current_user_factors.push(data.factors);
    controller.getFactor();
  });
  };
}]);




////////////////////////////////////////
/////////////// ROUTING ////////////////
////////////////////////////////////////
// app.config(['$routeProvider', '$locationProvider',
//   function($routeProvider, $locationProvider){
//     $locationProvider.html5mode(true);
//     $routeProvider
//       .when('/home', {
//         templateUrl: '/views/home.html.erb',
//         controller: 'MoodController'
//   })
//       .otherwise({
//         redirectTo: '/'
//       });
// }]);

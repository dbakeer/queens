////////////////////////////////////////
/////////// MOOD APPLICATION ///////////
////////////////////////////////////////
var app = angular.module('moodApp', ['ngResource']);


////////////////////////////////////////
/////////////// ROUTING ////////////////
////////////////////////////////////////
app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider){
    $locationProvider.html5mode(true);
    $routeProvider
      .when('/factors', {
        templateUrl: '<%= new_mood_factor('moods/enter-factors.html') %>',
        controller: 'MoodController'
  })
      .otherwise({
        redirectTo: '/'
      });
}]);


// app.config([‘$routeProvider, $locationProvider) {
//   $locationProvider.html5Mode(true);
//   $routeProvider
//     .when("/contacts",
//       { templateUrl: "<%= asset_path('contacts/index.html') %> ",
//         controller: "ContactsIndexCtrl" })
//     .when("/contacts/new",
//       { templateUrl: "<%= asset_path('contacts/edit.html') %> ",
//         controller: "ContactsEditCtrl" })
//     .when("/contacts/:id",
//       { templateUrl: "<%= asset_path('contacts/show.html') %> ",
//         controller: "ContactsShowCtrl" })
//     .when("/contacts/:id/edit",
//       { templateUrl: "<%= asset_path('contacts/edit.html') %> ",
//         controller: "ContactsEditCtrl" })
//     .otherwise({ redirectTo: "/contacts" });
// });


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


////////////////////////////////////////
/////////// MOOD CONTROLLER ////////////
////////////////////////////////////////
app.controller('MoodController', ['$http', function($http){

  // authenticity token
  var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  var controller = this;

  // value of happiness determined by emoji picked; default is null
  this.happiness = null;


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
    console.log("mood controller in createmood is", controller)
    controller.current_user_moods.push({
      happiness: this.happiness
    });

  // post to /moods
  $http.post('/moods', {
    authenticity_token: authenticity_token,
    mood: {
      happiness: this.happiness
    }
  }).success(function(data){
    console.log("controller in moddsCTRL is", controller)
    console.log("data in moodsCTRL is",data)
    console.log("data.mood is", data.mood)

    controller.current_user_moods.pop();
    controller.current_user_moods.push(data.mood);
    controller.getMood();
  });
  };

  this.createFactor = function(mood_id){
    console.log("mood id is", mood_id);
    console.log('/moods/'+mood_id+'/factors');

 $http.post('/moods/'+mood_id+'/factors', {
     authenticity_token: authenticity_token,
     factor: {
       blurb: this.newblurb
     }
}).success(function(data){
  console.log('SUCCESS');
//   //   controller.data.mood.factors.push()
//   //   console.log($scope)
//   //  $scope.$parent.mood.getMood();  //This line matches what is in scope
//   // // });
//   // })


 });
}
}]);

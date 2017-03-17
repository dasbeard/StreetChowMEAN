//==================== Creating Angular App ====================
var app = angular.module('myApp', ['ngRoute', 'ngCookies']);

//==================== Angular Routes ====================
app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'static/partials/home.html',
      controller: 'controller1'
    })
    .when('/logReg', {
      templateUrl: 'static/partials/logReg.html',
      controller: 'logReg'
    })
    .when('/reg', {
      templateUrl: 'static/partials/locationDetails.html',
      controller: 'locationController'
    })
    .otherwise({
      redirectTo: '/'
    })
});

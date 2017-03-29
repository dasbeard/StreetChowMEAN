//==================== Creating Angular App ====================
var app = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngMap']);

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
    .when('/food', {
      templateUrl: 'static/partials/foodschedule.html',
      controller: 'foodController'
    })
    .when('/multi', {
      templateUrl: 'static/partials/multiLocal.html',
      controller: 'logReg'
    })
    .when('/showpage', {
      templateUrl: 'static/partials/showpage.html',
      controller: 'showPageController'
    })
    .otherwise({
      redirectTo: '/'
    })
});

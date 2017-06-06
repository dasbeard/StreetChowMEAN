//==================== Creating Angular App ====================
var app = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngMap', 'vAccordion', 'ngAnimate']);

app.run(function () {
    var mdlUpgradeDom = false;
    setInterval(function() {
      if (mdlUpgradeDom) {
        componentHandler.upgradeDom();
        mdlUpgradeDom = false;
      }
    }, 160);

    var observer = new MutationObserver(function () {
      mdlUpgradeDom = true;
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});


//==================== Angular Routes ====================
app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'static/partials/home.html',
      controller: 'homeController'
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
    .when('/editPage', {
      templateUrl: 'static/partials/editPage.html',
      controller: 'myEditPageController'
    })
    .when('/showPage/:id', {
      templateUrl: 'static/partials/showPage.html',
      controller: 'showPageController'
    })
    .when('/testing/:id', {
      templateUrl: 'static/partials/testing.html',
      controller: 'testing'
    })
    .otherwise({
      redirectTo: '/'
    })
});

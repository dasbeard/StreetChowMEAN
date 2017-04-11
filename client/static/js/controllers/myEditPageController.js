app.controller('myEditPageController', function($scope, myEditPageFactory, $location, $cookies, NgMap){
  $scope.user = $cookies.getObject('loggedUser');

  getData();

  $scope.linkModelFunc = function (){
    var site = 'http://'
    site += $scope.thisOrg.website
    $window.open(site);
  }


  $scope.deleteDay = function(idx){
    $scope.toRemove = {id: $scope.user.id, index: idx},
    myEditPageFactory.destroy($scope.toRemove, function(output){
      if (output.data){
        getData();
      } else {
        $scope.error = 'Problem removing day'
      }
    });
  }; // End deleteDay


  var map = function(){
    NgMap.getMap().then(function(map) {
        var marker = new google.maps.Marker({
          position: {lat: $scope.thisOrg.latitude, lng: $scope.thisOrg.longitude},
          map: map,
          clickable: false,
          animation: google.maps.Animation.DROP,
        })
    });
  }


  $scope.updateServices = function(){
    var myServices = {};

    if ($scope.thisOrg.services){
      if ($scope.thisOrg.services.beds == true){
        myServices.beds = true;
      } else {
        myServices.beds = false;
      }
      if ($scope.thisOrg.services.clothes == true){
        myServices.clothes = true;
      } else {
        myServices.clothes = false;
      }
      if ($scope.thisOrg.services.education == true){
        myServices.education = true;
      } else {
        myServices.education = false;
      }
      if ($scope.thisOrg.services.interviewHelp == true){
        myServices.interviewHelp = true;
      } else {
        myServices.interviewHelp = false;
      }
      if ($scope.thisOrg.services.jobs == true){
        myServices.jobs = true;
      } else {
        myServices.jobs = false;
      }
      if ($scope.thisOrg.services.childcare == true){
        myServices.childcare = true;
      } else {
        myServices.childcare = false;
      }
      if ($scope.thisOrg.services.recActivities == true){
        myServices.recActivities = true;
      } else {
        myServices.recActivities = false;
      }
      if ($scope.thisOrg.services.donations == true){
        myServices.donations = true;
      } else {
        myServices.donations = false;
      }
      if ($scope.thisOrg.services.otherServices){
        myServices.otherServices = $scope.services.otherServices;
      } else {
        myServices.otherServices = '';
      }


    } else {
      myServices.beds = false;
      myServices.clothes = false;
      myServices.education = false;
      myServices.interviewHelp = false;
      myServices.jobs = false;
      myServices.childcare = false;
      myServices.recActivities = false;
      myServices.donations = false;
      myServices.otherServices = '';
    }
    myServices.id = $scope.user.id;

    myEditPageFactory.updateServices(myServices, function(output){
      if (output.data){
        getData();
        var snackbarContainer = document.querySelector('#demo-toast-example');
          'use strict';
          var data = {message: output.data.message};
          snackbarContainer.MaterialSnackbar.showSnackbar(data);
      } else {
        $scope.error = 'Problem updating service';
      }
    });
  }; // End updateServices








  function getData(){
    myEditPageFactory.getShow($scope.user, function(output){
      if (output.data){
        $scope.thisOrg = output.data;
        $scope.latLong = output.data.latitude + ',' + output.data.longitude
        map();
      } else {
        $scope.error = 'Something went wrong';
      }
    })
  }

}); // End controller

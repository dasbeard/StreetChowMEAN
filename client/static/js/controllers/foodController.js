app.controller('foodController', function($scope, foodFactory, $location, $cookies, $http){
  $scope.days = [{}];
  $scope.user = $cookies.getObject('loggedUser');

  getData();

  $scope.addDay = function(){
    $scope.newDayTime = { 'user': $scope.user.id,
                          'day': $scope.days.day,
                          'start': $scope.days.start + $scope.days.start2,
                          'end': $scope.days.end + $scope.days.end2
                        };
    foodFactory.addDay($scope.newDayTime, function(output){
      if (output.data){
        getData();
      } else {
        $scope.error = 'Problem saving day'
      }
    })
  }; // End addDay


  function getData (){
    foodFactory.getDayService($scope.user, function(output){
      if (output.data.days){
        $scope.days = output.data.days;
      }
      if (output.data.services){
        $scope.services = output.data.services;
      }
      if (output.data.otherServices){
        $scope.otherServices = output.data.otherServices;
      }
    });

  }; // End getData

  $scope.deleteDay = function(idx){
    $scope.toRemove = {id: $scope.user.id, index: idx},
    foodFactory.destroy($scope.toRemove, function(output){
      if (output.data){
        getData();
      } else {
        $scope.error = 'Problem removing day'
      }
    });
  }; // End deleteDay

  $scope.updateServices = function(){
    var myServices = {};

    if ($scope.services){
      if ($scope.services.beds == true){
        myServices.beds = true;
      } else {
        myServices.beds = false;
      }
      if ($scope.services.cloths == true){
        myServices.cloths = true;
      } else {
        myServices.cloths = false;
      }
      if ($scope.services.education == true){
        myServices.education = true;
      } else {
        myServices.education = false;
      }
      if ($scope.services.interviewHelp == true){
        myServices.interviewHelp = true;
      } else {
        myServices.interviewHelp = false;
      }
      if ($scope.services.jobs == true){
        myServices.jobs = true;
      } else {
        myServices.jobs = false;
      }
      if ($scope.services.childcare == true){
        myServices.childcare = true;
      } else {
        myServices.childcare = false;
      }
      if ($scope.services.recActivities == true){
        myServices.recActivities = true;
      } else {
        myServices.recActivities = false;
      }
      if ($scope.services.donations == true){
        myServices.donations = true;
      } else {
        myServices.donations = false;
      }
    } else {
      myServices.beds = false;
      myServices.cloths = false;
      myServices.education = false;
      myServices.interviewHelp = false;
      myServices.jobs = false;
      myServices.childcare = false;
      myServices.recActivities = false;
      myServices.donations = false;
    }
    myServices.id = $scope.user.id;
    foodFactory.updateServices(myServices, function(output){
      if (output.data){
        getData();
      } else {
        $scope.error = 'Problem updating service';
      }
    });
  }; // End updateServices



  $scope.addOtherService = function(){
    var updateServices = {id: $scope.user.id, service: $scope.otherServices};

    foodFactory.addOtherService(updateServices, function(output){
      if (output.data){
        getData();
      } else {
        $scope.error = 'Problem updating other services';
      }
    });
  }; // End addOtherService




});

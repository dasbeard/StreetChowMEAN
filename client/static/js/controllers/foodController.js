app.controller('foodController', function($scope, foodFactory, $location, $cookies){
  $scope.days = [{}];
  $scope.user = $cookies.getObject('loggedUser');


  $scope.daySelect = [
    {code: 'Monday', name: "Monday"},
    {code: 'Tuesday', name: "Tuesday"},
    {code: 'Wednesday', name: 'Wednesday'},
    {code: 'Thursday', name: 'Thursday'},
    {code: 'Friday', name: 'Friday'},
    {code: 'Saturday', name: 'Saturday'},
    {code: 'Sunday', name: 'Sunday'},
  ];

  $scope.timeSelect = [
    {code: '1', name: '1'},
    {code: '2', name: '2'},
    {code: '3', name: '3'},
    {code: '4', name: '4'},
    {code: '5', name: '5'},
    {code: '6', name: '6'},
    {code: '7', name: '7'},
    {code: '8', name: '8'},
    {code: '9', name: '9'},
    {code: '10', name: '10'},
    {code: '11', name: '11'},
    {code: '12', name: '12'},
  ];

  $scope.period = [
    {code: 'am', name: 'am'},
    {code: 'pm', name: 'pm'},
  ]

  getData();




  $scope.addDay = function(){
  // Validate Info is present
    if (validateNewDay($scope.days) == true){

      $scope.newDayTime = { 'user': $scope.user.id,
                            'day': $scope.days.day,
                            'start': $scope.days.start + $scope.days.start2,
                            'end': $scope.days.end + $scope.days.end2
                          };
      foodFactory.addDay($scope.newDayTime, function(output){
        if (output.data){
          getData();
          $scope.error = '';
        } else {
          $scope.error = 'Problem saving day'
        }
      })
    } else {
      $scope.error = validateNewDay($scope.days);
    }
  }; // End addDay


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
      if ($scope.services.clothes == true){
        myServices.clothes = true;
      } else {
        myServices.clothes = false;
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
      if ($scope.services.otherServices){
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

    foodFactory.updateServices(myServices, function(output){
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


  function getData (){
    foodFactory.getDayService($scope.user, function(output){
      if (output.data.days){
        $scope.days = output.data.days;
      }
      if (output.data.services){
        $scope.services = output.data.services;
      }
    });
  }; // End getData

});


// ========== Helper Functions ==========

function validateNewDay(date){
  var flag = true;
  if (!date){
    flag =  'Please enter a day to add';
  } else {
    if (!date.day){
      flag = 'Please enter a Day';
    } else if (!date.start){
      flag = 'Please enter a Start Time';
    } else if (!date.start2) {
      flag = 'Please enter a Start Time am/pm';
    } else if(!date.end) {
      flag = 'Please enter a End Time';
    } else if (!date.end2) {
      flag = 'Please enter a End Time am/pm';
    }
  }
  return flag;
} // End validateNewDay

app.controller('foodController', function($scope, foodFactory, $location, $cookies){
  $scope.days = [{}];
  $scope.user = $cookies.getObject('loggedUser');

  if(!($scope.user)){
    $location.url('/');
  } else {
    getData();
  }


  $scope.updateHoursOfOp = function() {
      console.log($scope.newHOPDay);
    // Still need to Validate times are correct

    var flag = true;
      if ($scope.newHOPDay){
        if (!($scope.newHOPDay.day)){
          flag = false;
          $scope.error = 'Please enter the day you are Open';
        }
        else if (!($scope.newHOPDay.startTime)){
          flag = false;
          $scope.error = 'Please enter the Time you Open';
        }
        else if (!($scope.newHOPDay.startPeriod)){
          flag = false;
          $scope.error = 'Please enter the period you Open';
        }
        else if (!($scope.newHOPDay.endTime)){
          flag = false;
          $scope.error = 'Please enter the Time when you Close';
        }
        else if (!($scope.newHOPDay.endPeriod)){
          flag = false;
          $scope.error = 'Please enter the period when you Close';
        }
      } else {
        flag = false;
      }

      if (flag){
        $scope.newHOPDay.id = $scope.user.id;
        foodFactory.updateHoursOfOp2($scope.newHOPDay, function(output){
          console.log(output);
          if (output.data == true){
            getData();
            $scope.error = '';
          } else {
            $scope.error = 'Problem saving day'
          }
        })
      }

  } // End updateHoursOfOp

  $scope.deleteHOPDay = function(idx){
    $scope.toRemove = {id: $scope.user.id, index: idx},
    foodFactory.destroyHOP($scope.toRemove, function(output){
      if (output.data){
        getData();
      } else {
        $scope.error = 'Problem removing day'
      }
    });
  }; // End deleteDa




  $scope.addDay = function(){
  // Still need to Validate times are correct

  var flag = true;
    if ($scope.newDay){
      if (!($scope.newDay.day)){
        flag = false;
        $scope.error = 'Please enter the day you are serving food';
      }
      else if (!($scope.newDay.startTime)){
        flag = false;
        $scope.error = 'Please enter the Time you are starting to serve food';
      }
      else if (!($scope.newDay.startPeriod)){
        flag = false;
        $scope.error = 'Please enter the period you are starting to serve food';
      }
      else if (!($scope.newDay.endTime)){
        flag = false;
        $scope.error = 'Please enter the Time when you stop serve food';
      }
      else if (!($scope.newDay.endPeriod)){
        flag = false;
        $scope.error = 'Please enter the period when you stop serve food';
      }
    } else {
      flag = false;
    }

    if (flag){
      $scope.newDay.id = $scope.user.id;
      foodFactory.addDay($scope.newDay, function(output){
        console.log(output);
        if (output.data == true){
          getData();
          $scope.error = '';
        } else {
          $scope.error = 'Problem saving day'
        }
      })
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
        snackBar(output.data.message);
      } else {
        $scope.error = 'Problem updating service';
      }
    });
  }; // End updateServices



  var snackBar = function(message){ snackbarContainer = document.querySelector('#snackbarDiv');
    'use strict';
    var data = {message: message};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }


  function getData (){
    foodFactory.getDayService($scope.user, function(output){
      if (output.data.days){
        $scope.days = output.data.days;
        // console.log($scope.days);
      }
      if (output.data.services){
        $scope.services = output.data.services;
      }
      if (output.data.hoursOfOp){
        $scope.hoursOfOp = output.data.hoursOfOp;
      }
      if (output.data.org){
        $scope.org = output.data.org;
      }
    });
  }; // End getData



}); // End Controller


// ========== Helper Functions ==========

// ===== Sleep Function =====
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
};



// ===== Not Used == Needs to be updated =====
// function validateNewDay(date){
//   var flag = true;
//   if (!date){
//     flag =  'Please enter a day to add';
//   } else {
//     if (!date.day){
//       flag = 'Please enter a Day';
//     } else if (!date.start){
//       flag = 'Please enter a Start Time';
//     } else if (!date.start2) {
//       flag = 'Please enter a Start Time am/pm';
//     } else if(!date.end) {
//       flag = 'Please enter a End Time';
//     } else if (!date.end2) {
//       flag = 'Please enter a End Time am/pm';
//     }
//   }
//   return flag;
// } // End validateNewDay

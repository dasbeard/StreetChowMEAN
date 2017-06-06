app.controller('foodController', function($scope, foodFactory, $location, $cookies){
  $scope.days = [{}];
  $scope.user = $cookies.getObject('loggedUser');

  var phoneRegex = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

  var websiteRegex = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;


  if(!($scope.user)){
    $location.url('/');
  } else {
    getData();
  }


  $scope.updateHoursOfOp = function() {
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

    // If user has properly input all info, Check for valid times

    if (flag){
      if (($scope.newHOPDay.startTime > $scope.newHOPDay.endTime) && ($scope.newHOPDay.startPeriod == $scope.newHOPDay.endPeriod)){
          $scope.error = 'End time can not be before Start time'
      } else {
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

    // If user has properly input all info, Check for valid times


    if (flag){
      if (($scope.newDay.startTime > $scope.newDay.endTime) && ($scope.newDay.startPeriod == $scope.newDay.endPeriod)){
          $scope.error = 'End time can not be before Start time'
      } else {
        $scope.newDay.id = $scope.user.id;
        foodFactory.addDay($scope.newDay, function(output){
          // console.log(output);
          if (output.data == true){
            getData();
            $scope.error = '';
          } else {
            $scope.error = 'Problem saving day'
          }
        })
      }
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
    var flag = true;
    $scope.error = '';

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


    var orgInfo = {};
    if ($scope.org.website){
      if (!websiteRegex.test($scope.org.website)){
        flag = false;
        $scope.error = 'Please enter a valid website';
      } else {
        orgInfo.website = $scope.org.website;
      }
    }
    if ($scope.org.description){
      if ($scope.org.description.length < 3){
        flag = false;
        $scope.error = 'Description must be at least 3 characers long';
      } else {
        orgInfo.description = $scope.org.description;
      }
    }
    if ($scope.org.phone){
      if (!phoneRegex.test($scope.org.phone)){
        flag = false;
        $scope.error = 'Please enter a valid phone number';
      } else {
        orgInfo.phone = $scope.org.phone;
      }
    }

    var toSend = {services: myServices, info: orgInfo, id: $scope.user.id};
    // myServices.id = $scope.user.id;


    if (flag){
      var flag2 = true;
      foodFactory.updateServices2(toSend, function(output){
        if (output.data){
          getData();
          // snackBar(output.data.message);
          $location.url('/showPage/' + $scope.user.id)


        } else {
          flag2 = false;
          $scope.error = 'Problem updating service';
        }
      });
      if (flag2){
      }
    }
  }; // End updateServices









  var snackBar = function(message){ snackbarContainer = document.querySelector('#snackbarDiv');
    'use strict';
    var data = {message: message};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  };



  function getData (){
    foodFactory.getDayService($scope.user, function(output){
      // console.log(output.data);
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
      // =================================
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

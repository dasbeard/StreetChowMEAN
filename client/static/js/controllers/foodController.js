app.controller('foodController', function($scope, foodFactory, $location, $cookies){
  $scope.days = [{}];
  $scope.user = $cookies.getObject('loggedUser');

  if(!($scope.user)){
    $location.url('/');
  } else {
    getData();
  }



  $scope.updateHoursOfOp = function(){
    var hours={};
    if ($scope.hoursOfOp){
      var flag = true;
      if($scope.hoursOfOp.mon){
        if (!($scope.hoursOfOp.mon.open && $scope.hoursOfOp.mon.close)){
          flag = false;
          $scope.hopError = 'Open and Close time needed for Monday'
        }else {
          hours.mon = $scope.hoursOfOp.mon;
        }
      }
      if($scope.hoursOfOp.tues){
        if (!($scope.hoursOfOp.tues.open && $scope.hoursOfOp.tues.close)){
          flag = false;
          $scope.hopError = 'Open and Close time needed for Tuesday'
        }else {
          hours.tues= $scope.hoursOfOp.tues;
        }
      }
      if($scope.hoursOfOp.wen){
        if (!($scope.hoursOfOp.wen.open && $scope.hoursOfOp.wen.close)){
          flag = false;
          $scope.hopError = 'Open and Close time needed for Tuesday'
        }else {
          hours.wen= $scope.hoursOfOp.wen;
        }
      }
      if($scope.hoursOfOp.thur){
        if (!($scope.hoursOfOp.thur.open && $scope.hoursOfOp.thur.close)){
          flag = false;
          $scope.hopError = 'Open and Close time needed for Tuesday'
        }else {
          hours.thur= $scope.hoursOfOp.thur;
        }
      }
      if($scope.hoursOfOp.fri){
        if (!($scope.hoursOfOp.fri.open && $scope.hoursOfOp.fri.close)){
          flag = false;
          $scope.hopError = 'Open and Close time needed for Tuesday'
        }else {
          hours.fri= $scope.hoursOfOp.fri;
        }
      }
      if($scope.hoursOfOp.sat){
        if (!($scope.hoursOfOp.sat.open && $scope.hoursOfOp.sat.close)){
          flag = false;
          $scope.hopError = 'Open and Close time needed for Tuesday'
        }else {
          hours.sat= $scope.hoursOfOp.sat;
        }
      }
      if($scope.hoursOfOp.sun){
        if (!($scope.hoursOfOp.sun.open && $scope.hoursOfOp.sun.close)){
          flag = false;
          $scope.hopError = 'Open and Close time needed for Tuesday'
        }else {
          hours.sun= $scope.hoursOfOp.sun;
        }
      }
    } // End if hoursOfOp
    if (flag){
      var toSend = {};
      toSend.id = $scope.user.id;
      toSend.hours = hours;

      foodFactory.updateHoursOfOp(toSend, function(output){
        // console.log(output.data);
        if (output.data){
          getData();
          snackBar('Hours Updated');

        }
      })
    }
  };


  // $scope.addDay = function(){
  // // Validate Info is present
  //   console.log($scope.days.new);
  //   $scope.days.new.id = $scope.user.id;
  //   foodFactory.addDay($scope.days.new, function(output){
  //     if (output.data){
  //       getData();
  //       $scope.error = '';
  //     } else {
  //       $scope.error = 'Problem saving day'
  //     }
  //   })
  // }; // End addDay




  $scope.addDay = function(){
  // Validate Info is present
    console.log($scope.days.new);
    // $scope.days.new.id = $scope.user.id;
    // foodFactory.addDay($scope.days.new, function(output){
    //   if (output.data){
    //     getData();
    //     $scope.error = '';
    //   } else {
    //     $scope.error = 'Problem saving day'
    //   }
    // })
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
      // console.log(output.data);
      if (output.data.days){
        $scope.days = output.data.days;
      }
      if (output.data.services){
        $scope.services = output.data.services;
      }
      if (output.data.hoursOfOp){
          var hop = output.data.hoursOfOp;

        if (hop.mon){
          hop.mon.open = new Date(hop.mon.open);
          hop.mon.close = new Date(hop.mon.close);
        }
        if (hop.tues){
          hop.tues.open = new Date(hop.tues.open);
          hop.tues.close = new Date(hop.tues.close);
        }
        if (hop.wen){
          hop.wen.open = new Date(hop.wen.open);
          hop.wen.close = new Date(hop.wen.close);
        }
        if (hop.thur){
          hop.thur.open = new Date(hop.thur.open);
          hop.thur.close = new Date(hop.thur.close);
        }
        if (hop.fri){
          hop.fri.open = new Date(hop.fri.open);
          hop.fri.close = new Date(hop.fri.close);
        }
        if (hop.sat){
          hop.sat.open = new Date(hop.sat.open);
          hop.sat.close = new Date(hop.sat.close);
        }
        if (hop.sun){
          hop.sun.open = new Date(hop.sun.open);
          hop.sun.close = new Date(hop.sun.close);
        }
        $scope.hoursOfOp = hop;
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

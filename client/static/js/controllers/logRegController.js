// =========================================================================
// ==================== Login / Register Controller ========================
// =========================================================================
app.controller('logReg', function($scope, logRegFactory, $location, $cookies){
  $scope.user = {};
  var testing;
  var toSearch;
// See Locations Button
  $scope.locations = function (){
    console.log(testing);
  }


// Validate before changing pages
  $scope.continueReg = function (){
    $scope.error = '';
    // ===== Need to validate info is here and not already registered =====
    var toCheck = $scope.temp;
    if(!toCheck){
      $scope.error = 'Please enter information to begin registration, or log in to continue';
// ==== Validate that input was received ====
    } else if (regCheck(toCheck) == true){
      var toSearch = ($scope.temp.street1 + ', ' + $scope.temp.city + $scope.temp.city);

      callMe(toSearch);
      console.log(toSearch);
      console.log(testing);

      // var temp = (geocodeAddress($scope.temp.street1 + ', ' + $scope.temp.city + $scope.temp.city));




// ==== Did not pass regCheck ====
    } else {
      $scope.error = regCheck(toCheck);
    }
  }; // End continueReg




// Login Method
  $scope.loginUser = function(){
    // console.log('Login Button Clicked');
    // ===== Front End Validation ====
    if (!$scope.login){
      $scope.error = 'Please Enter in Email and Password';
    } else {
      if(!$scope.login.email){
        $scope.error = 'Email required to sign in';
        $scope.login = {};
      }
      else if (!$scope.login.password){
        $scope.error = 'Password required to sign in';
      } else {
        // Call Factory Method to Login
        logRegFactory.login($scope.login, function(output){
          // console.log(output);
          // console.log('Back from factory --> finished login');
          if(output.data.error){
            $scope.error = output.data.error;
          } else {
            $cookies.putObject("loggedUser", output.data);
            $scope.user = $cookies.getObject('loggedUser');
            $location.url('/');
          }
        })
      $location.url('/logReg');
      $scope.login = {};
      }
    }
  }; // End Login Method




  // ========== Geocode Lat/Long from Adress ==========
  function geocodeAddress(address, callback) {

    var geocoder = new google.maps.Geocoder()
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        console.log('all good in the function');
        testing = results;
        // return results;
      } else {
        testing = false;
        // return false;
      }
      callback();
    });
  }; // End geocodeAddress

  function callMe(toSearch){
    geocodeAddress(toSearch, function(){
      // sleep(2000);
      console.log(testing);
      console.log('testing');
    });
  };


  // ===== Sleep Function =====
  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  };



}); //End of LogReg Controller





// ===== Front End Validation ====
function regCheck(reg){
  var zipRegex = /^\d{5}(?:[-\s]\d{4})?$/;

  var error = '';
  var flag = true;

    // if (!reg.organization){
    //   error = 'Please enter a Organization name to continue';
    //   flag = false;
    // }
    // else if (reg.organization.length < 3){
    //   error = 'Organization Name must be at least 3 characters long';
    //   flag = false;
    // }
    if (!reg.street1){
      error = 'Please enter a Street Address to continue';
      flag = false;
    }
    else if (reg.street1.length < 3){
      error = 'Street Address must be at least 3 characters long';
      flag = false;
    }
    // else if (!reg.zip){
    //   error = 'Please enter a Zip Code to continue';
    //   flag = false;
    // }
    // else if (!zipRegex.test(reg.zip)){
    //   error = 'Please enter a valid Zip Code';
    //   flag = false;
    // }
    if (flag == true){
      return true;
    } else if (flag == false){
      return error;
    }
} // End Reg Check

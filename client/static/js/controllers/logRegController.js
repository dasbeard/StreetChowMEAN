// =========================================================================
// ==================== Login / Register Controller ========================
// =========================================================================
app.controller('logReg', function($scope, logRegFactory, $location, $cookies){
  $scope.user = {};
  $scope.foundLocations = $cookies.getObject('locations');

// Validate before changing pages
  $scope.continueReg = function (){
    $scope.error = '';
    // ===== Need to validate info is here and not already registered =====
    var toCheck = $scope.temp;
    if(!toCheck){
      $scope.error = 'Please enter information to begin registration, or log in to continue';
// ==== Validate that input was received ====
    } else if (regCheck(toCheck) == true){
      $cookies.put('orgName', $scope.temp.organization)
      logRegFactory.findAddress($scope.temp, function(output){
        if (output.data == false){
          $scope.error = 'Please enter a valid location to continue';
        } else if (output.data.length > 1){
          $cookies.putObject('locations', output.data)
          $location.url('/multi');
        } else {
          $scope.toCheckDB = output.data[0];

          logRegFactory.newRegCheck($scope.toCheckDB, function(output){
            if (output.data == false){
                $scope.error = 'Error, There is already an organization at this address';
            } else {
              if (output){
                $cookies.putObject('myTemp', $scope.toCheckDB)
                $location.url('/reg');
              } else {
                $scope.error = output.error;
              }
            }
          })
        }
      });
// ==== Did not pass regCheck ====
    } else {
      $scope.error = regCheck(toCheck);
    }
  }; // End continueReg



// Select correct Address if multiple
  $scope.selectedAddress = function(correctAddress){

    $scope.toCheckDB = correctAddress;
    console.log($scope.toCheckDB);

    logRegFactory.newRegCheck($scope.toCheckDB, function(output){
      if (output.data == false){
          $scope.error = 'Error, There is already an organization at this address';
      } else {
        if (output){
          $cookies.putObject('myTemp', $scope.toCheckDB)
          $location.url('/reg');
        } else {
          $scope.error = output.error;
        }
      }
    })
  };


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


  $scope.cancelReg = function(){
    $cookies.remove('myTemp');
    $cookies.remove('locations');
    $cookies.remove('orgName');
    $location.url('/logReg')
  }


}); //End of LogReg Controller





// ===== Front End Validation ====
function regCheck(reg){

  var error = '';
  var flag = true;

    if (!reg.organization){
      error = 'Please enter a Organization name to continue';
      flag = false;
    }
    else if (reg.organization.length < 3){
      error = 'Organization Name must be at least 3 characters long';
      flag = false;
    }
    if (!reg.street1){
      error = 'Please enter a Street Address to continue';
      flag = false;
    }
    else if (reg.street1.length < 3){
      error = 'Street Address must be at least 3 characters long';
      flag = false;
    }
    else if (!reg.city){
      error = 'Please enter a City Name to continue';
      flag = false;
    }
    else if (!reg.zip == ' '){
      error = 'Please enter a valid City Name';
      flag = false;
    }
    if (flag == true){
      return true;
    } else if (flag == false){
      return error;
    }
} // End Reg Check



// ===== Sleep Function =====
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
};

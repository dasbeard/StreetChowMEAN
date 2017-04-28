// =========================================================================
// ==================== Login / Register Controller ========================
// =========================================================================
app.controller('logReg', function($scope, logRegFactory, $location, $cookies){
  $scope.user = {};
  $scope.foundLocations = $cookies.getObject('locations');
  // $scope.multiLocation = true;
  // $scope.orgNameMask = true;


  $scope.register = function (){
    if ($scope.temp){
      if (!$scope.temp.email){
        $scope.error = 'Please enter an email to be registered';
      } else if (!$scope.temp.street){
        $scope.error = 'Please enter the street of the organization to be registered';
      } else if (!$scope.temp.city){
        $scope.error = 'Please enter the city of the organization to be registered';
      } else {
        // ========== All inputs satisfied ==========
        logRegFactory.newRegistration($scope.temp, function (output){
          // console.log(output.data);
          if (output.data.error){
            $scope.error = output.data.error;
          } else if (output.data.length == 1){
            var temp = $scope.temp;
            temp.location = output.data[0];
            $scope.temp = temp;
            $scope.passwordPrompt = true;
          } else if (output.data.length > 1){
            var temp = $scope.temp;
            $scope.foundLocations = output.data;
            $scope.multiLocation = true;

          }

        }) // End newRegistration
      }

    } else {
      $scope.error = 'Please enter information to register'
    } // End if scope.temp

  } // End register method



// Select correct Address if multiple
  $scope.selectedAddress = function(correctAddress){
    $scope.error = '';
    $scope.toCheckDB = correctAddress;

    logRegFactory.newRegCheck($scope.toCheckDB, function(output){
      if (output.data.error){
          $scope.multiLocalError = output.data.error;
      } else {
        $scope.temp.location = $scope.toCheckDB;
        $scope.passwordPrompt = true;
        $scope.multiLocation = false;
      }
    })
  };




  $scope.confirmPassword = function(){
    $scope.error = '';
    if (!$scope.password){
      $scope.passwordError = 'Please enter a password';
    } else {
      if($scope.password.password.length < 5){
        $scope.passwordError = 'Password must be at least 5 characters long';
        $scope.password = {};
      } else if ($scope.password.password != $scope.password.passconf){
        $scope.passwordError = 'Passwords do not match';
        $scope.password = {};
      }
      else {
    // Pick Org Name
    $scope.temp.password = $scope.password.password;
    $scope.passwordPrompt = false;
    $scope.orgNameMask = true;
        // logRegFactory.confirmRegistration($scope.temp, function(output){
        //   if (output.data.success){
        //     $scope.passwordPrompt = false;
        //     $scope.orgName = true;
        //   }
        // })
      }
    }
  }


  $scope.pickOrgName = function(){
    $scope.error = '';
    $scope.temp.organization = $scope.orgName;
    logRegFactory.confirmRegistration($scope.temp, function(output){
      if (output.data.success){
        $cookies.putObject('loggedUser', output.data.sentback);
        $scope.orgNameMask = false;

// =============== Need to fix log/reg to logout ===============
        $location.url('/food');

      }
    })
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
      $cookies.put('orgName', $scope.temp.organization)

      logRegFactory.newRegister($scope.temp, function(output){
        console.log(output.data);

        if (output.data.error){
          $scope.error = output.data.error;
        } else if (output.data == false){
          $scope.error = 'Please enter a valid location to continue';
        } else if (output.data.length > 1){
  // Handle if multiple locations
          $cookies.putObject('locations', output.data)
          $location.url('/multi');
        } else {
  // Only One Location - Need to prompt for password
        // $scope.addressHolder = output.data[0];
        $scope.passwordPrompt = true;

          $scope.toCheckDB = output.data[0];

        }
      });
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
            // $location.url('/');
            window.location.replace('/');
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

    if (!reg.email){
      error = 'Please enter your email to continue';
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

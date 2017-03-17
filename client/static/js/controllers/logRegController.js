// =========================================================================
// ==================== Login / Register Controller ========================
// =========================================================================
app.controller('logReg', function($scope, logRegFactory, $location, $cookies){
  $scope.user = {};

// Validate before changing pages
  $scope.continueReg = function (){
    $scope.error = '';
    // ===== Need to validate info is here and not already registered =====
    var toCheck = $scope.temp;
    if(!toCheck){
      $scope.error = 'Please enter information to begin registration, or log in to continue';
    } else if (regCheck(toCheck) == true){
        logRegFactory.newRegCheck(toCheck, function(output){
          console.log(output);
          if(!output.data){
            $scope.error = 'Organization already registered. Please log in to continue';
          } else {
            $cookies.putObject("myTemp", $scope.temp);
            $location.url('/reg');
            $scope.temp = {};
          }
        })
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


}); //End of LogReg Controller





// ===== Front End Validation ====
function regCheck(reg){
  var zipRegex = /^\d{5}(?:[-\s]\d{4})?$/;

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
    else if (!reg.street1){
      error = 'Please enter a Street Address to continue';
      flag = false;
    }
    else if (reg.street1.length < 3){
      error = 'Street Address must be at least 3 characters long';
      flag = false;
    }
    else if (!reg.zip){
      error = 'Please enter a Zip Code to continue';
      flag = false;
    }
    else if (!zipRegex.test(reg.zip)){
      error = 'Please enter a valid Zip Code';
      flag = false;
    }
    if (flag == true){
      return true;
    } else if (flag == false){
      return error;
    }
} // End Reg Check

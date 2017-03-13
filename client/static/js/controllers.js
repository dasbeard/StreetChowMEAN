// =========================================================================
// =========================== Controller 1 ================================
// =========================================================================
app.controller('controller1', function($scope, $location, $cookies){
  $scope.test = 'Hello';

  if($cookies.getObject('loggedUser')){
    $scope.organization = $cookies.getObject('loggedUser')
  }

  $scope.logout = function(){
    $cookies.remove('loggedUser');
    $location.url('/logout');
  } // End Logout



});


// =========================================================================
// ==================== Login / Register Controller ========================
// =========================================================================
app.controller('logReg', function($scope, logRegFactory, $location, $cookies){
  $scope.user = {};
  // $scope.error = {};

// Register New Organization Method
  $scope.regOrganization = function (){
    console.log('Register Button Clicked');
    console.log($scope.reg);

    $scope.error = "";
    $scope.user = {};
    if($scope.reg){
      var reg = $scope.reg;
      var test = regValidation(reg)
      if (test != true){
        $scope.error = test;
      } else {

        // ==================================
            // Call Factory method to register
            logRegFactory.register($scope.reg, function(output){
              // console.log(output);
              // console.log("Back from factory --> finished registering");
              $scope.user = output.data;

              if (output.data.error){
                $scop.error = output.data.error;
              } else {
                // console.log("Here is the output");
                // console.log(output.data);
                // Store User info in cookie
                $cookies.putObject("loggedUser", output.data);
                $scope.user = $cookies.getObject("loggedUser");
                // Redirect User
                $location.url('/');
              }
            });
            // Clear Register Inputs
            $scope.reg = {};
        // ==================================

      }
    } else {
      $scope.error = 'Please enter in the required information to continue';
    }













  } // End regOrganization Method


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





// ===== Front End Validation Sill Needed ====
function regValidation(reg){
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  var websiteRegex = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
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
    else if (!reg.email){
      error = 'Please enter a Email to continue';
      flag = false;
    }
    else if (!emailRegex.test(reg.email)){
      error = 'Please enter in a valid email';
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
    else if (!reg.city){
      error = 'Please enter a City Name to continue';
      flag = false;
    }
    else if (reg.city.length < 2){
      error = 'City Name must be at least 2 characters long';
      flag = false;
    }
    else if (!reg.zip){
      error = 'Please enter a Zip Code to continue';
      flag = false;
    }
    else if (reg.zip.length < 5){
      error = 'Zip Code must be at least 5 characters long';
      flag = false;
    }
    else if (!reg.description){
      error = 'Please enter a Description to continue';
      flag = false;
    }
    else if (reg.description.length < 3){
      error = 'Description must be at least 3 characters long';
      flag = false;
    }
    else if (reg.description.length > 150){
      error = 'Description is too long. 150 Characters max';
      flag = false;
    }
    else if (!reg.password){
      error = 'Please enter a password to continue';
      flag = false;
    }
    else if (reg.password.length < 5){
      error = 'Password must be at least 5 characters long';
      reg.password = '';
      flag = false;
    }
    else if(reg.password != reg.password_conf){
      error = 'Passwords do not match!';
      reg.password = '';
      flag = false;
    }
    if (reg.phone){
      if (reg.phone.length < 10){
      error = 'Phone Number must be 10 digits long';
      flag = false;
      }
    }
    if (reg.website){
      if (!websiteRegex.test(reg.website)){
        error = 'Please enter a valid Website';
        flag = false;
      }
    }
    if (flag == true){
      return true;
    } else if (flag == false){
      return error;
    }


} // End if Scope.Reg




//  =========== Check if user is logged in ==========
// $scope.user = $cookies.get('loggedUser');
// if(!$scope.user){
//   $location.url('/');
// }

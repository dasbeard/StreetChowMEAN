// =========================================================================
// =========================== Location Controller ================================
// =========================================================================
app.controller('locationController', function($scope, logRegFactory, $location, $cookies){
  $scope.myTemp = $cookies.getObject('myTemp');
  $scope.orgName = $cookies.get('orgName');


  $scope.cancelReg = function(){
    $cookies.remove('myTemp');
    $cookies.remove('locations');
    $cookies.remove('orgName');
    $location.url('/logReg')
  };


  // Register New Organization Method
  $scope.regOrganization = function (){
    $scope.error = "";
    $scope.user = {};

    if($scope.reg){
      var reg = $scope.reg;

      if (regValidation(reg) != true){
        $scope.error = regValidation(reg);
      } else {
  // Call Factory method to register
        $scope.reg.organization = $scope.orgName;
        $scope.reg.formattedAddress = $scope.myTemp.formattedAddress;
        $scope.reg.streetNumber = $scope.myTemp.streetNumber;
        $scope.reg.streetName = $scope.myTemp.streetName;
        $scope.reg.city = $scope.myTemp.city;
        $scope.reg.zipcode = $scope.myTemp.zipcode;
        $scope.reg.state = $scope.myTemp.administrativeLevels.level1short;
        $scope.reg.latitude = $scope.myTemp.latitude;
        $scope.reg.longitude = $scope.myTemp.longitude;

        logRegFactory.register($scope.reg, function(output){
          console.log(output.data);
          console.log("Back from factory --> finished registering");
          $scope.user = output.data;

          if (output.data.error){
            $scope.error = output.data.error;
          } else {
            // Store User info in cookie
            $cookies.putObject("loggedUser", output.data);
            $scope.user = $cookies.getObject("loggedUser");
            $cookies.remove('myTemp');
            $cookies.remove('locations');
            $cookies.remove('orgName');
            // Redirect User
            console.log('dfsafdsa');
            $location.url('/food');
          }
          $scope.reg = {};
        });
        // Clear Register Inputs
    // ==================================

      }
    } else {
      $scope.error = 'Please enter in the required information to continue';
    }
  $cookies.remove('myTemp');
  } // End regOrganization Method


}); // End Controller









// ===== Front End Validation ====
function regValidation(reg){
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  var phoneRegex = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;


  var websiteRegex = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  var error = '';
  var flag = true;

    if (!reg.email){
      error = 'Please enter an Email to continue';
      flag = false;
    }
    else if (!emailRegex.test(reg.email)){
      error = 'Please enter in a valid email';
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
    else if (reg.password == "     ") {
      error = 'Please enter a password to continue';
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
    if (reg.website){
      if (!websiteRegex.test(reg.website)){
        error = 'Please enter a valid Website';
        flag = false;
      }
    }
    if (reg.phone){
      if (!phoneRegex.test(reg.phone)){
        error = 'Please enter a valid Phone Number';
        flag = false;
      }
    }

    if (flag == true){
      return true;
    } else if (flag == false){
      return error;
    }

} // End Front End Validation

// =========================================================================
// =========================== Controller 1 ================================
// =========================================================================
app.controller('showPageController', function($scope, $location, showPageFactory, $cookies, $routeParams, $window, NgMap){
  $scope.org = $routeParams;
  $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyBN4DR6_NEex4E0iFmkgDgqANrO69pCgtM";
  $scope.thisOrg = $cookies.getObject('loggedUser')

  $scope.isHOP = false;


  if ($scope.thisOrg){
    if ($scope.thisOrg.id == $scope.org.id){
      $scope.showEdit = true;
    }
  }


  showPageFactory.getInfo ($scope.org, function(output){
    if(!output){
      console.log('Someing went wrong');
    } else {
      // console.log(output);
      
      // ========== Need Error Checking for what comes back ==========




      $scope.thisOrg = output;
      $scope.latLong = output.latitude + ',' + output.longitude
      if ($scope.thisOrg.phone){
        $scope.thisOrg.phone = phoneDisplay(output.phone)
      }
      if ($scope.thisOrg.hoursOfOp.length > 0){
        $scope.isHOP = true;
      }
      map();
    }
  });



  $scope.linkModelFunc = function (){
    var site = 'http://'
    site += $scope.thisOrg.website
    $window.open(site);
  }


var map = function (){
  NgMap.getMap().then(function(map) {
      var marker = new google.maps.Marker({
        position: {lat: $scope.thisOrg.latitude, lng: $scope.thisOrg.longitude},
        map: map,
        clickable: false,
        animation: google.maps.Animation.DROP,
      })
  });
}




}); //End Controller


function phoneDisplay(str){
  if (str.length == 10){
    return '(' + str.substr(0,3) + ')' + str.substr(3,3) + '-' + str.substr(6);
  } else {
    return str.substr(0,1) + '(' + str.substr(1,3) + ')' + str.substr(4,3) + '-' + str.substr(7);
  }
};

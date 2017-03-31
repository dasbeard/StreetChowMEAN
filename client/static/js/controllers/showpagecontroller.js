// =========================================================================
// =========================== Controller 1 ================================
// =========================================================================
app.controller('showPageController', function($scope, $location, showPageFactory, $cookies, $routeParams, $window, NgMap){
  $scope.org = $routeParams;

  showPageFactory.getInfo ($scope.org, function(output){
    if(!output){
      console.log('Someing went wrong');
    } else {
      console.log(output);
      $scope.thisOrg = output;
      $scope.latLong = output.latitude + ',' + output.longitude
    }
  });



  $scope.linkModelFunc = function (){
    var site = 'http://'
    site += $scope.thisOrg.website
    $window.open(site);
  }


  NgMap.getMap().then(function(map) {
      var marker = new google.maps.Marker({
        position: {lat: $scope.thisOrg.latitude, lng: $scope.thisOrg.longitude},
        map: map,
        animation: google.maps.Animation.DROP,
      })

  });







}); //End Controller

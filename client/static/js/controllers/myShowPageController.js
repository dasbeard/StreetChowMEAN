app.controller('myShowPageController', function($scope, myShowPageFactory, $location, $cookies, NgMap){
  $scope.user = $cookies.getObject('loggedUser');

  myShowPageFactory.getShow($scope.user, function(output){
    if (output.data){
      $scope.organization = output.data;
      $scope.latLong = output.data.latitude + ',' + output.data.longitude
    } else {
      $scope.error = 'Something went wrong';
    }
  })

  $scope.linkModelFunc = function (){
    var site = 'http://'
    site += $scope.organization.website
    $window.open(site);
  }


  NgMap.getMap().then(function(map) {
      var marker = new google.maps.Marker({
        position: {lat: $scope.organization.latitude, lng: $scope.organization.longitude},
        map: map,
        clickable: false,
        animation: google.maps.Animation.DROP,
      })

  });





}); // End controller

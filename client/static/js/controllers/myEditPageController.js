app.controller('myEditPageController', function($scope, myEditPageFactory, $location, $cookies, NgMap){
  $scope.user = $cookies.getObject('loggedUser');

  myEditPageFactory.getShow($scope.user, function(output){
    if (output.data){
      $scope.thisOrg = output.data;
      $scope.latLong = output.data.latitude + ',' + output.data.longitude
      map();
    } else {
      $scope.error = 'Something went wrong';
    }
  })

  $scope.linkModelFunc = function (){
    var site = 'http://'
    site += $scope.thisOrg.website
    $window.open(site);
  }

  var map = function(){
    NgMap.getMap().then(function(map) {
        var marker = new google.maps.Marker({
          position: {lat: $scope.thisOrg.latitude, lng: $scope.thisOrg.longitude},
          map: map,
          clickable: false,
          animation: google.maps.Animation.DROP,
        })
    });
  }





}); // End controller

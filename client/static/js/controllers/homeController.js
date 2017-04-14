// =========================================================================
// =========================== Controller 1 ================================
// =========================================================================
app.controller('homeController', function($scope, $location, logRegFactory, searchFactory, $cookies, $window, NgMap){
  $scope.organization = $cookies.getObject('loggedUser')
  $scope.position = 'nope';
  $scope.loading = true;


  $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyBN4DR6_NEex4E0iFmkgDgqANrO69pCgtM";
  // var map, marker;


  getLocation();

  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
      var userLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
      // console.log("Latitude: " + position.coords.latitude +
      // "<br>Longitude: " + position.coords.longitude);
  // }

// =============== Google Maps ===============
    NgMap.getMap().then(function(map) {

        map.setCenter(userLocation);
        map.setZoom(12);

        getNearby(userLocation);


  logRegFactory.getAll(function(output){

  // Need Error checking

      var orgNames =[];
      // var orgDescrips = [];
      for (var i=0; i<output.data.length; i++){
        orgNames.push('<a href="#!/showPage/' + output.data[i]._id+ '">' + output.data[i].organization + '<br>' + output.data[i].address + '</a>');
        // orgNames.push(output.data[i].description);

      };

      $scope.nearbyOrgs = output.data;
      // console.log($scope.nearbyOrgs);

      for (var i=0; i<output.data.length; i++){
        var marker = new google.maps.Marker({
          position: {lat: output.data[i].latitude, lng: output.data[i].longitude},
          map: map,
          clickable: true,
          animation: google.maps.Animation.DROP,
        });
        attachOrgName(marker, orgNames[i]);

      } // End For Loop


      function attachOrgName(marker, orgName) {
        var infowindow = new google.maps.InfoWindow({
          content: orgName
        });

        marker.addListener('click', function() {
          infowindow.open(marker.get('map'), marker);
        });
      }

  }); // End getAll


  function drop() {
    for (var i =0; i < markerArray.length; i++) {
      setTimeout(function() {
        addMarkerMethod();
      }, i * 100);
    }
  }

  });
// ============= End NgMap Method ===============
}


function getNearby(pos){
  logRegFactory.getNearby(pos, function(output){
    $scope.within2miles = output.data.within2miles;
    $scope.within5miles = output.data.within5miles;
    $scope.within10miles = output.data.within10miles;
    $scope.loading = false;
  });

};


  $scope.searchByCity = function(){
    $scope.noLocations = '';
    $scope.searchedCity = {};
    searchFactory.citySearch($scope.searchBy, function(output){
      if (output.data.error){
        $scope.noLocations = "No Locations Found";
      } else {
        console.log(output.data);
        $scope.searchedCity = output.data;
      }
    });
  }


  $scope.linkModelFunc = function (linkedSite){
    // console.log(linkedSite);
    var site = 'http://'
    site += linkedSite;
    $window.open(site);
  }









}); // End Controller


// =============== Random unUsed functions ===============


//  =========== Check if user is logged in ==========
// $scope.user = $cookies.get('loggedUser');
// if(!$scope.user){
//   $location.url('/');
// }


// // ===== Make markers bounce on click =====
//    function toggleBounce() {
//      if (marker.getAnimation() !== null) {
//        marker.setAnimation(null);
//      } else {
//        marker.setAnimation(google.maps.Animation.BOUNCE);
//      }
//    } // End Marker Bounce



// ===== Sleep Function =====
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
};

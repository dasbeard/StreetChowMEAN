// var ngmap = require('ngmap');
// =========================================================================
// =========================== Controller 1 ================================
// =========================================================================
app.controller('controller1', function($scope, $location, $cookies, NgMap){

  // $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyBN4DR6_NEex4E0iFmkgDgqANrO69pCgtM&callback=map";


  if($cookies.getObject('loggedUser')){
    $scope.organization = $cookies.getObject('loggedUser')
  }

  $scope.logout = function(){
    $cookies.remove('loggedUser');
    $location.url('/logout');
  } // End Logout



// =============== Google Maps ===============
  NgMap.getMap().then(function(map) {
   // Try HTML5 geolocation.
   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        zoom: 8
      };
      var userLocation = new google.maps.Marker({
        position: pos,
        animation: google.maps.Animation.DROP,
        map: map,
      });
      map.setCenter(pos);
      map.setZoom(12);
    },
      function() {
      handleLocationError(true, infowindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infowindow, map.getCenter());
  }

// ========== Build Markers Here ==========
  var marker = new google.maps.Marker({
    position: {lat: 34.194779, lng: -118.443614},
    map: map,
    animation: google.maps.Animation.DROP,
  });
// ========== End Markers ==========

     function handleLocationError(browserHasGeolocation, infoWindow, pos) {
       map.setPosition(pos);
       map.setContent(browserHasGeolocation ?
                             'Error: The Geolocation service failed.' :
                             'Error: Your browser doesn\'t support geolocation.');
     }


     marker.addListener('click', function() {
       infowindow.open(map, marker);
     });

     var contentString = '<div id="content">'+
            '<h1>Test Header</h1>'+
            '<div id="bodyContent">'+
            '<p>Testing</p> ' +
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });


     function drop() {
       for (var i =0; i < markerArray.length; i++) {
         setTimeout(function() {
           addMarkerMethod();
         }, i * 100);
       }
     }



  }); // End NgMap Method





}); // End Controller


// =============== Random unUsed functions ===============


//  =========== Check if user is logged in ==========
// $scope.user = $cookies.get('loggedUser');
// if(!$scope.user){
//   $location.url('/');
// }


// ===== Make markers bounce on click =====
  //  function toggleBounce() {
  //    if (marker.getAnimation() !== null) {
  //      marker.setAnimation(null);
  //    } else {
  //      marker.setAnimation(google.maps.Animation.BOUNCE);
  //    }
  //  } // End Marker Bounce

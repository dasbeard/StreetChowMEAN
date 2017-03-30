// var ngmap = require('ngmap');
// =========================================================================
// =========================== Controller 1 ================================
// =========================================================================
app.controller('controller1', function($scope, $location, logRegFactory, $cookies, NgMap){
  $scope.organization = $cookies.getObject('loggedUser')
  $scope.position = 'nope';


  // $scope.logout = function(){
  //   console.log('button clicked');
  //   $cookies.remove('loggedUser');
  //   window.location.replace('/');
  // } // End Logout



// =============== Google Maps ===============
  NgMap.getMap().then(function(map) {
   // Try HTML5 geolocation.

   if (navigator.geolocation) {
    // var infowindow = new google.maps.InfoWindow({map: map});
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        zoom: 8
      };


      var userLocationIcon = "assets/locationPinSmall.png";
      var userLocation = new google.maps.Marker({
        position: pos,
        animation: google.maps.Animation.DROP,
        map: map,
        icon: userLocationIcon
      });
      map.setCenter(pos);
      map.setZoom(12);

      getNearby(pos);


    },
      function() {
      handleLocationError(true, infowindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infowindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    map.setPosition(pos);
    map.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  }


  logRegFactory.getAll(function(output){

  // Need Error checking

      var orgNames =[];
      // var orgDescrips = [];
      for (var i=0; i<output.data.length; i++){
        orgNames.push(output.data[i].organization);
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


  function getNearby(pos){
    logRegFactory.getNearby(pos, function(output){
      // console.log(output.data);
      $scope.nearbyLocations = output.data;
    });
  };







    //  var contentString = '<div id="content">'+
    //         '<h1>Test Header</h1>'+
    //         '<div id="bodyContent">'+
    //         '<p>Testing Random Location</p> ' +
    //         '</div>'+
    //         '</div>';

        // var infowindow = new google.maps.InfoWindow({
        //   content: '<div id="content">'+
        //           '<h1>Test Header</h1>'+
        //           '<div id="bodyContent">'+
        //           '<p>Testing Random Location</p> ' +
        //           '</div>'+
        //           '</div>',
        // });


     function drop() {
       for (var i =0; i < markerArray.length; i++) {
         setTimeout(function() {
           addMarkerMethod();
         }, i * 100);
       }
     }


    //  // ========== End Markers ==========
    //  marker.addListener('click', function() {
    //    infowindow.open(map, marker);
    //  });


  }); // End NgMap Method














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

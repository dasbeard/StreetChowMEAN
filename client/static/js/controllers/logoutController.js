app.controller('logOutController', function($scope, $location, logRegFactory, $cookies){
  $scope.logout = function(){
    console.log('button clicked');
    $cookies.remove('loggedUser');
    window.location.replace('/');
  } // End Logout

});

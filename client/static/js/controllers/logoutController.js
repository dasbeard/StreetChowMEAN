app.controller('logOutController', function($scope, $location, logRegFactory, $cookies){
  $scope.organization = $cookies.getObject('loggedUser')


  $scope.logout = function(){
    // console.log('button clicked');
    $cookies.remove('loggedUser');
    window.location.replace('/');
  } // End Logout

  $scope.returnHome = function(){
    window.location.replace('/');
  }


});

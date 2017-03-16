// =========================================================================
// =========================== Controller 1 ================================
// =========================================================================
app.controller('controller1', function($scope, $location, $cookies){
  $scope.test = 'Hello';

  if($cookies.getObject('loggedUser')){
    $scope.organization = $cookies.getObject('loggedUser')
  }

  $scope.logout = function(){
    $cookies.remove('loggedUser');
    $location.url('/logout');
  } // End Logout



});



//  =========== Check if user is logged in ==========
// $scope.user = $cookies.get('loggedUser');
// if(!$scope.user){
//   $location.url('/');
// }

app.controller('showPageController', function($scope, showPageFactory, $location, $cookies){
  $scope.user = $cookies.getObject('loggedUser');

  showPageFactory.getShow($scope.user, function(output){
    if (output.data){
      $scope.organization = output.data;
    } else {
      $scope.error = 'Something went wrong';
    }
  })


}); // End controller

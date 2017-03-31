app.controller('myShowPageController', function($scope, myShowPageFactory, $location, $cookies){
  $scope.user = $cookies.getObject('loggedUser');

  myShowPageFactory.getShow($scope.user, function(output){
    if (output.data){
      $scope.organization = output.data;
    } else {
      $scope.error = 'Something went wrong';
    }
  })

}); // End controller

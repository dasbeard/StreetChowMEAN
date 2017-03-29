app.controller('showPageController', function($scope, showPageFactory, $location, $cookies){
  console.log('testing');
  console.log($cookies.getObject('loggedUser'));


  $scope.user = $cookies.getObject('loggedUser');
 // need to get the organization ID from the restful route and pass that into the function. Then you can extract all the data from the $scope.organization object.



  showPageFactory.getShow($scope.user, function(output){
    console.log(output.data);
    if (output.data){
      $scope.organization = output.data;
    } else {
      $scope.error = 'Something went wrong';
    }
  })





}); // End controller

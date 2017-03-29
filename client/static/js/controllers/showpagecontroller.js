app.controller('showController', function($scope, showFactory, $location, $cookies){

 // need to get the organization ID from the restful route and pass that into the function. Then you can extract all the data from the $scope.organization object.

 getData (){
   showpageFactory.getShow($scope.user, function(output){
     console.log(output.data);
     if (output.data){
       $scope.organization = output.data;
     } else {
       $scope.error = 'Something went wrong';
     }
   });
 };

});

app.controller('dayscontroller', function($scope, daysFactory, $location, $cookies){
  $scope.days = [];
  $scope.endTime =[];
  $scope.startTime=[];
  $scope.services = [];


  daysFactory.getdays(function(data){
    $scope.error = "";
    if(data.error){
      $scope.error = data.error;
    } else {
      $scope.days= data.days;
      $scope.startTime= data.startTime;
      $scope.endTime= data.endTime;
    }
    console.log($scope.days);
  })

daysFactory.getservices(function(data){
  $scope.error = "";
  if(!data.error){
    $scope.services = data.services;
  } else{
    $scope.error = "messed up"
  }
  console.log($scope.services);
});

$scope.updateServices = function(){
 console.log($scope.services);
}



});

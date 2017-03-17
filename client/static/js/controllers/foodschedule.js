app.controller('dayscontroller', function($scope, daysFactory){
  $scope.days = [];

  daysFactory.getdays(function(data){
    $scope.days= data;
    console.log($scope.days);
  })





});

app.controller('foodController', function($scope, foodFactory, $location, $cookies){
  $scope.days = [];
  $scope.endTime =[];
  $scope.startTime=[];
  $scope.services = [];


//   foodFactory.getdays(function(data){
//     $scope.error = "";
//     if(data.error){
//       $scope.error = data.error;
//     } else {
//       $scope.days= data.days;
//       $scope.startTime= data.startTime;
//       $scope.endTime= data.endTime;
//     }
//     console.log($scope.days);
//   })
//
// foodFactory.getservices(function(data){
//   $scope.error = "";
//   if(!data.error){
//     $scope.services = data.services;
//   } else{
//     $scope.error = "messed up"
//   }
//   console.log($scope.services);
// });
//
// $scope.updateServices = function(){
//  console.log($scope.services);
// }



});

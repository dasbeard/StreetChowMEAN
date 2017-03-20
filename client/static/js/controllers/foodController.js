app.controller('foodController', function($scope, foodFactory, $location, $cookies, $http){
  $scope.days = [];
  $scope.endTime =[];
  $scope.startTime=[];
  $scope.services = [];


  // foodFactory.getdays(function(data){
  //   $scope.error = "";
  //   if(data.error){
  //     $scope.error = data.error;
  //   } else {
  //     $scope.days= data.days;
  //     $scope.startTime= data.startTime;
  //     $scope.endTime= data.endTime;
  //   }
  //   console.log($scope.days);
  // })

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

  $scope.deleteDay = function(idx){
    console.log("deleting this shit");
    foodFactory.destroy(idx, function(data){
      $scope.services = data;

  });
  }
// $scope.updateServices = function(){
 // console.log($scope.services);
 // if(Meteor.isClient) { Template.services.events({ 'submit form': function()
  // { var formObject = $('#services').serializeJSON();
  // var checkboxs = formObject.services; checkboxs._id = Checkboxs.insert(checkboxs);
 // } }); } with: Checkboxs = new Mongo.Collection('checkboxs');
// }

$scope.addNewService = function(data){
  console.log($scope.newService);
  servicesFactory.add($scope.newService, function(data){
    $scope.services = data
  });
    $scope.newService = {};
}
// $scope.get(addDay(data))
// .then(function(response){
//   $scope.days = response.data.days
//   $scope.startTime = response.data.startTime
//   $scope.endTime = response.data.endTime
// });

$scope.deleteService = function(idx){
  console.log("deleting this shit");
  sFactory.destroy(idx, function(data){
    $scope.services = data;

});
}
});

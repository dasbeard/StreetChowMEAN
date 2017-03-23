app.controller('foodController', function($scope, foodFactory, $location, $cookies, $http){
  $scope.days = [{}];
  $scope.user = $cookies.getObject('loggedUser');

  console.log($scope.user);

  getData();



  $scope.addDay = function(){
    $scope.newDayTime = { 'user': $scope.user.id,
                          'day': $scope.days.day,
                          'start': $scope.days.start + $scope.days.start2,
                          'end': $scope.days.end + $scope.days.end2
                        };
                        console.log($scope.newDayTime);
    foodFactory.addDay($scope.newDayTime, function(output){
      if (output.data){
        getData();
      } else {
        $scope.error = 'Problem saving day'
      }
    })
  }; // End addDay


  function getData (){
    foodFactory.getDayService($scope.user, function(output){
      console.log(output.data);
      $scope.days = output.data.days;
      $scope.services = output.data.services;

    });
  };

  $scope.deleteDay = function(idx){
    console.log(idx);
    $scope.toRemove = {id: $scope.user.id, index: idx},
    foodFactory.destroy($scope.toRemove, function(output){
      if (output.data){
        getData();
      } else {
        $scope.error = 'Problem removing day'
      }
    });
  };

  $scope.updateServices = function(){
    var myServices = [{}];
    if ($scope.services){
      if ($scope.services.Jobs == true){
        myServices.push({name: 'Jobs', val: true});
      } else {
        myServices.push({name: 'Jobs', val: false});
      }
      if ($scope.services.Education == true){
        myServices.push({name: 'Education', val: true});
      }
      //  else {
      //   myServices.push({name: 'Education', val: false});
      // }
      if ($scope.services.Childcare == true){
        myServices.push({name: 'Childcare', val: true});
      } else {
        myServices.push({name: 'Childcare', val: false});
      }
      if ($scope.services.Recreational == true){
        myServices.push({name: 'Recreational', val: true});
      } else {
        myServices.push({name: 'Recreational', val: false});
      }
      if ($scope.services.Beds == true){
        myServices.push({name: 'Beds', val: true});
      } else {
        myServices.push({name: 'Beds', val: false});
      }
      if ($scope.services.Donations == true){
        myServices.push({name: 'Donations', val: true});
      } else {
        myServices.push({name: 'Donations', val: false});
      }
      if ($scope.services.Clothes == true){
        myServices.push({name: 'Clothes', val: true});
      } else {
        myServices.push({name: 'Clothes', val: false});
      }
      if ($scope.services.Interview == true){
        myServices.push({name: 'Interview', val: true});
      } else {
        myServices.push({name: 'Interview', val: false});
      }
    } // End If
    console.log(myServices);
  }




// $scope.addNewService = function(data){
//   console.log($scope.newService);
//   servicesFactory.add($scope.newService, function(data){
//     $scope.services = data
//   });
//     $scope.newService = {};
// }
// $scope.get(addDay(data))
// .then(function(response){
//   $scope.days = response.data.days
//   $scope.startTime = response.data.startTime
//   $scope.endTime = response.data.endTime
// });

});

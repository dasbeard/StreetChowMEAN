// function intParsing(input){
//   var myArr = ('' + input).split('');
//   var myStr = '';
//
//   for (var i=0; i<myArr.length; i++){
//     if (!isNaN(myArr[i])){
//       myStr += myArr[i];
//     }
//   }
// console.log('in function');
// console.log(myStr);
// return Number(myStr);
// }
//
// var x = '23-454';
//
// console.log(intParsing(x));



// var fullPhoneRegex = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
//
// var phoneNum = '(234).567.8901';
// console.log(fullPhoneRegex.test(phoneNum));


function firstFunction(_callback){
    // do some asynchronous work
    // and when the asynchronous stuff is complete
    console.log('some stuff in one');
    _callback();
}

function geocodeAddress(address, callback) {
  console.log('in function');
  var geocoder = new google.maps.Geocoder()
  geocoder.geocode({'address': address}, function(results, status) {
    console.log('back from api');
    if (status === 'OK') {
      return results;
    } else {
      return false;
    }
  });
  callback();
}; // End geocodeAddress



function secondFunction(){
    // call first function and pass in a callback function which
    // first function runs when it has completed
    geocodeAddress('245 main st, los angeles', function() {
        console.log('huzzah, I\'m done!');
    });
}

secondFunction()





// services: [{name: 'Jobs', val: false},
//  {name: 'Education', val: false},
//  {name: 'Childcare', val: false},
//  {name: 'Recreational Activities', val: false},
//  {name: 'Beds', val: false},
//  {name: 'Takes Donations', val: false},
//  {name: 'Clothes', val: false},
//  {name: 'Interview Help', val: false}
// ]



// getShow: function(req,res){
//        Organization.findOne({_id: req.body.id}, function(err, oneUser){
//          if (err){
//            console.log('not working');
//          } else {
//            var sendBack = {formattedAddress: organization.formattedAddress,
//                        organization: organization.organization,
//                        website: organization.website,
//                        phone: organization.phone,
//                        description: organization.description,
//                      }
//          }
//        });
//      };





// app.controller('showController', function($scope, showFactory, $location, $cookies){
//
//   // need to get the organization ID from the restful route and pass that into the function. Then you can extract all the data from the $scope.organization object.
//
//   getData (){
//     showpageFactory.getservices(<organization_Id>, function(output){
//       console.log(output.data);
//       if (output.data){
//         $scope.organization = output.data;
//       } else {
//         $scope.error = 'Something went wrong';
//       }
//     });
//   };
//
// });











$scope.addDay = function(){

  if(!$scope.days){
    $scope.error = 'Please enter a day to add';
  } else{

  }



}


// function validateNewDay(date){
//   var flag = true;
//   if (!date){
//     flag = false;
//     $scope.error = 'Please enter a day to add';
//   } else {
//     if (!date.day){
//       flag = false;
//       $scope.error = 'Please enter a Day';
//     } else if (!date.start){
//       flag = false;
//       $scope.error = 'Please enter a Start Time';
//     } else if (!date.start2) {
//       flag = false;
//       $scope.error = 'Please enter a Start Time am/pm';
//     } else if(!date.end) {
//       flag = false;
//       $scope.error = 'Please enter a End Time';
//     } else if (!date.end2) {
//       flag = false;
//       $scope.error = 'Please enter a End Time am/pm';
//     }
//   }
//   return flag;
// } // End validateNewDay

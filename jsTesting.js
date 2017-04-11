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


// function firstFunction(_callback){
//     // do some asynchronous work
//     // and when the asynchronous stuff is complete
//     console.log('some stuff in one');
//     _callback();
// }
//
// function geocodeAddress(address, callback) {
//   console.log('in function');
//   var geocoder = new google.maps.Geocoder()
//   geocoder.geocode({'address': address}, function(results, status) {
//     console.log('back from api');
//     if (status === 'OK') {
//       return results;
//     } else {
//       return false;
//     }
//   });
//   callback();
// }; // End geocodeAddress
//
//
//
// function secondFunction(){
//     // call first function and pass in a callback function which
//     // first function runs when it has completed
//     geocodeAddress('245 main st, los angeles', function() {
//         console.log('huzzah, I\'m done!');
//     });
// }
//
// secondFunction()





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











// $scope.addDay = function(){
//
//   if(!$scope.days){
//     $scope.error = 'Please enter a day to add';
//   } else{
//
//   }
//
//
//
// }


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




//
// function phoneDisplay(phoneNumber){
//   var output = '';
//   var temp = '' + phoneNumber;
//   var count = 0;
//   console.log(phoneNumber);
//   console.log(temp);
//   for (var i = 0; i< temp.length; i++){
//     if (temp.length == 11){
//       output += temp[i];
//       output += '(';
//     }
//     if (count == 0){
//       output += temp[i];
//     } else if (count == 2) {
//       output += temp[i];
//       output += ') ';
//     } else if (count == 6) {
//       output += '-';
//       output += temp[i];
//     } else {
//       output += temp[i];
//     }
//     count ++;
//   }
//   console.log(output);
// }
//
// phoneDisplay(91234567890);


// var str = "10000000000";
//
// // var res = '(' + str.substr(0,3) + ')' + str.substr(3,3) + '-' + str.substr(6);
//
// function testing(str){
//   if (str.length == 10){
//     return '(' + str.substr(0,3) + ')' + str.substr(3,3) + '-' + str.substr(6);
//   } else {
//     return str.substr(0,1) + '(' + str.substr(1,3) + ')' + str.substr(4,3) + '-' + str.substr(7);
//   }
// }
//
// console.log(testing(str));




// function titleCase(str) {
//      words = str.toLowerCase().split(' ');
//
//      for(var i = 0; i < words.length; i++) {
//           var letters = words[i].split('');
//           letters[0] = letters[0].toUpperCase();
//           words[i] = letters.join('');
//      }
//      return words.join(' ');
// }
// console.log(titleCase("i'm a little tea pot"));







//
//
// <div class="datesOpen">
//
//   <table>
//     <tr>
//       <td>
//         <h5>Monday</h5>
//       </td>
//       <td>
//         From
//       </td>
//       <td>
//         <div class="datesOpen-Input mdl-textfield mdl-js-textfield ">
//           <input class="mdl-textfield__input" type="time">
//         </div>
//       </td>
//       <td>
//         - to -
//       </td>
//       <td>
//         <div class="datesOpen-Input mdl-textfield mdl-js-textfield ">
//           <input class="mdl-textfield__input" type="time">
//         </div>
//       </td>
//     </tr>
//     <tr>
//       <td>
//         <h5>Tuesday</h5>
//       </td>
//       <td>
//         From
//       </td>
//       <td>
//         <div class="datesOpen-Input mdl-textfield mdl-js-textfield ">
//           <input class="mdl-textfield__input" type="time">
//         </div>
//       </td>
//       <td>
//         - to -
//       </td>
//       <td>
//         <div class="datesOpen-Input mdl-textfield mdl-js-textfield ">
//           <input class="mdl-textfield__input" type="time">
//         </div>
//       </td>
//     </tr>
//     <tr>
//       <td>
//         <h5>Wednesday</h5>
//       </td>
//       <td>
//         From
//       </td>
//       <td>
//         <div class="datesOpen-Input mdl-textfield mdl-js-textfield ">
//           <input class="mdl-textfield__input" type="time">
//         </div>
//       </td>
//       <td>
//         - to -
//       </td>
//       <td>
//         <div class="datesOpen-Input mdl-textfield mdl-js-textfield ">
//           <input class="mdl-textfield__input" type="time">
//         </div>
//       </td>
//     </tr>
//     <tr>
//       <td>
//         <h5>Thursday</h5>
//       </td>
//       <td>
//         From
//       </td>
//       <td>
//         <div class="datesOpen-Input mdl-textfield mdl-js-textfield ">
//           <input class="mdl-textfield__input" type="time">
//         </div>
//       </td>
//       <td>
//         - to -
//       </td>
//       <td>
//         <div class="datesOpen-Input mdl-textfield mdl-js-textfield ">
//           <input class="mdl-textfield__input" type="time">
//         </div>
//       </td>
//     </tr>
//     <tr>
//       <td>
//         <h5>Friday</h5>
//       </td>
//       <td>
//         From
//       </td>
//       <td>
//         <div class="datesOpen-Input mdl-textfield mdl-js-textfield ">
//           <input class="mdl-textfield__input" type="time">
//         </div>
//       </td>
//       <td>
//         - to -
//       </td>
//       <td>
//         <div class="datesOpen-Input mdl-textfield mdl-js-textfield ">
//           <input class="mdl-textfield__input" type="time">
//         </div>
//       </td>
//     </tr>
//     <tr>
//       <td>
//         <h5>Saturday</h5>
//       </td>
//       <td>
//         From
//       </td>
//       <td>
//         <div class="datesOpen-Input mdl-textfield mdl-js-textfield ">
//           <input class="mdl-textfield__input" type="time">
//         </div>
//       </td>
//       <td>
//         - to -
//       </td>
//       <td>
//         <div class="datesOpen-Input mdl-textfield mdl-js-textfield ">
//           <input class="mdl-textfield__input" type="time">
//         </div>
//       </td>
//     </tr>
//     <tr>
//       <td>
//         <h5>Sunday</h5>
//       </td>
//       <td>
//         From
//       </td>
//       <td>
//         <div class="datesOpen-Input mdl-textfield mdl-js-textfield ">
//           <input class="mdl-textfield__input" type="time">
//         </div>
//       </td>
//       <td>
//         - to -
//       </td>
//       <td>
//         <div class="datesOpen-Input mdl-textfield mdl-js-textfield ">
//           <input class="mdl-textfield__input" type="time">
//         </div>
//       </td>
//     </tr>
//
//   </table>
// </div>







var myObj = { mon: { open: '1970-01-01T20:30:00.000Z',close: '1970-01-01T09:00:00.000Z' }, tues: { open: '1970-01-01T20:30:00.000Z',close: '1970-01-01T09:00:00.000Z' } };


// for (var key in myObj) {
//     // skip loop if the property is from prototype
//     if (!myObj.hasOwnProperty(key)) continue;
//     console.log(key);
//     var obj = myObj[key];
//     for (var prop in obj) {
//         // skip loop if the property is from prototype
//         if(!obj.hasOwnProperty(prop)) continue;
//
//
//         console.log(prop + " = " + obj[prop]);
//     }
// }


Object.keys(myObj).forEach(key => {
    console.log(key);          // the name of the current key.
    console.log(myObj[key]);   // the value of the current key.
});

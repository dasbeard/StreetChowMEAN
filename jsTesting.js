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







// var myObj = { mon: { open: '1970-01-01T20:30:00.000Z',close: '1970-01-01T09:00:00.000Z' }, tues: { open: '1970-01-01T20:30:00.000Z',close: '1970-01-01T09:00:00.000Z' } };


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


// Object.keys(myObj).forEach(key => {
//     console.log(key);          // the name of the current key.
//     console.log(myObj[key]);   // the value of the current key.
// });




//
// <!-- <div class="hopDays">
//   <h6>Monday</h6>
//   <div class="hopDayDiv mdl-selectfield mdl-js-selectfield">
//     <select id='monOpen' class="mdl-selectfield__select" ng-model='hoursOfOp.mon.openTime'>
//       <option value=""></option>
//       <option value="1:00">1:00</option>
//       <option value="1:30">1:30</option>
//       <option value="2:00">2:00</option>
//       <option value="2:30">2:30</option>
//       <option value="3:00">3:00</option>
//       <option value="3:30">3:30</option>
//       <option value="4:00">4:00</option>
//       <option value="4:30">4:30</option>
//       <option value="5:00">5:00</option>
//       <option value="5:30">5:30</option>
//       <option value="6:00">6:00</option>
//       <option value="6:30">6:30</option>
//       <option value="7:00">7:00</option>
//       <option value="7:30">7:30</option>
//       <option value="8:00">8:00</option>
//       <option value="8:30">8:30</option>
//       <option value="9:00">9:00</option>
//       <option value="9:30">9:30</option>
//       <option value="10:00">10:00</option>
//       <option value="10:30">10:30</option>
//       <option value="11:00">11:00</option>
//       <option value="11:30">11:30</option>
//       <option value="12:00">12:00</option>
//       <option value="12:30">12:30</option>
//     </select>
//     <label class="mdl-selectfield__label" for='monOpen'>From..</label>
//   </div>
//   <div class="hopDayDiv mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.mon.openPeriod'>
//       <option value=""></option>
//       <option value="am">am</option>
//       <option value="pm">pm</option>
//     </select>
//     <label class="mdl-selectfield__label">am/pm..</label>
//   </div>
//   <div class="hopDayDiv mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.mon.closeTime'>
//       <option value=""></option>
//       <option value="1:00">1:00</option>
//       <option value="1:30">1:30</option>
//       <option value="2:00">2:00</option>
//       <option value="2:30">2:30</option>
//       <option value="3:00">3:00</option>
//       <option value="3:30">3:30</option>
//       <option value="4:00">4:00</option>
//       <option value="4:30">4:30</option>
//       <option value="5:00">5:00</option>
//       <option value="5:30">5:30</option>
//       <option value="6:00">6:00</option>
//       <option value="6:30">6:30</option>
//       <option value="7:00">7:00</option>
//       <option value="7:30">7:30</option>
//       <option value="8:00">8:00</option>
//       <option value="8:30">8:30</option>
//       <option value="9:00">9:00</option>
//       <option value="9:30">9:30</option>
//       <option value="10:00">10:00</option>
//       <option value="10:30">10:30</option>
//       <option value="11:00">11:00</option>
//       <option value="11:30">11:30</option>
//       <option value="12:00">12:00</option>
//       <option value="12:30">12:30</option>
//     </select>
//     <label class="mdl-selectfield__label">To..</label>
//   </div>
//   <div class="hopDayDiv mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.mon.closePeriod'>
//       <option value=""></option>
//       <option value="am">am</option>
//       <option value="pm">pm</option>
//     </select>
//     <label class="mdl-selectfield__label">am/pm..</label>
//   </div>
// </div>
//
// <div class="hopDays">
//   <h6>Tuesday</h6>
//   <div class="hopDayDiv mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.tues.openTime'>
//       <option value=""></option>
//       <option value="1:00">1:00</option>
//       <option value="1:30">1:30</option>
//       <option value="2:00">2:00</option>
//       <option value="2:30">2:30</option>
//       <option value="3:00">3:00</option>
//       <option value="3:30">3:30</option>
//       <option value="4:00">4:00</option>
//       <option value="4:30">4:30</option>
//       <option value="5:00">5:00</option>
//       <option value="5:30">5:30</option>
//       <option value="6:00">6:00</option>
//       <option value="6:30">6:30</option>
//       <option value="7:00">7:00</option>
//       <option value="7:30">7:30</option>
//       <option value="8:00">8:00</option>
//       <option value="8:30">8:30</option>
//       <option value="9:00">9:00</option>
//       <option value="9:30">9:30</option>
//       <option value="10:00">10:00</option>
//       <option value="10:30">10:30</option>
//       <option value="11:00">11:00</option>
//       <option value="11:30">11:30</option>
//       <option value="12:00">12:00</option>
//       <option value="12:30">12:30</option>
//     </select>
//     <label class="mdl-selectfield__label">From..</label>
//   </div>
//   <div class="hopDayDiv mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.tues.openPeriod'>
//       <option value=""></option>
//       <option value="am">am</option>
//       <option value="pm">pm</option>
//     </select>
//     <label class="mdl-selectfield__label">am/pm..</label>
//   </div>
//   <div class="hopDayDiv mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.tues.closeTime'>
//       <option value=""></option>
//       <option value="1:00">1:00</option>
//       <option value="1:30">1:30</option>
//       <option value="2:00">2:00</option>
//       <option value="2:30">2:30</option>
//       <option value="3:00">3:00</option>
//       <option value="3:30">3:30</option>
//       <option value="4:00">4:00</option>
//       <option value="4:30">4:30</option>
//       <option value="5:00">5:00</option>
//       <option value="5:30">5:30</option>
//       <option value="6:00">6:00</option>
//       <option value="6:30">6:30</option>
//       <option value="7:00">7:00</option>
//       <option value="7:30">7:30</option>
//       <option value="8:00">8:00</option>
//       <option value="8:30">8:30</option>
//       <option value="9:00">9:00</option>
//       <option value="9:30">9:30</option>
//       <option value="10:00">10:00</option>
//       <option value="10:30">10:30</option>
//       <option value="11:00">11:00</option>
//       <option value="11:30">11:30</option>
//       <option value="12:00">12:00</option>
//       <option value="12:30">12:30</option>
//     </select>
//     <label class="mdl-selectfield__label">To..</label>
//   </div>
//   <div class="hopDayDiv mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.tues.closePeriod'>
//       <option value=""></option>
//       <option value="am">am</option>
//       <option value="pm">pm</option>
//     </select>
//     <label class="mdl-selectfield__label">am/pm..</label>
//   </div>
// </div>
//
// <div class="hopDays">
//   <h6>Wednesday</h6>
//   <div class="mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.wen.openTime'>
//       <option value=""></option>
//       <option value="1:00">1:00</option>
//       <option value="1:30">1:30</option>
//       <option value="2:00">2:00</option>
//       <option value="2:30">2:30</option>
//       <option value="3:00">3:00</option>
//       <option value="3:30">3:30</option>
//       <option value="4:00">4:00</option>
//       <option value="4:30">4:30</option>
//       <option value="5:00">5:00</option>
//       <option value="5:30">5:30</option>
//       <option value="6:00">6:00</option>
//       <option value="6:30">6:30</option>
//       <option value="7:00">7:00</option>
//       <option value="7:30">7:30</option>
//       <option value="8:00">8:00</option>
//       <option value="8:30">8:30</option>
//       <option value="9:00">9:00</option>
//       <option value="9:30">9:30</option>
//       <option value="10:00">10:00</option>
//       <option value="10:30">10:30</option>
//       <option value="11:00">11:00</option>
//       <option value="11:30">11:30</option>
//       <option value="12:00">12:00</option>
//       <option value="12:30">12:30</option>
//     </select>
//     <label class="mdl-selectfield__label">From..</label>
//   </div>
//   <div class="mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.wen.openPeriod'>
//       <option value=""></option>
//       <option value="am">am</option>
//       <option value="pm">pm</option>
//     </select>
//     <label class="mdl-selectfield__label">am/pm..</label>
//   </div>
//   <div class="mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.wen.closeTime'>
//       <option value=""></option>
//       <option value="1:00">1:00</option>
//       <option value="1:30">1:30</option>
//       <option value="2:00">2:00</option>
//       <option value="2:30">2:30</option>
//       <option value="3:00">3:00</option>
//       <option value="3:30">3:30</option>
//       <option value="4:00">4:00</option>
//       <option value="4:30">4:30</option>
//       <option value="5:00">5:00</option>
//       <option value="5:30">5:30</option>
//       <option value="6:00">6:00</option>
//       <option value="6:30">6:30</option>
//       <option value="7:00">7:00</option>
//       <option value="7:30">7:30</option>
//       <option value="8:00">8:00</option>
//       <option value="8:30">8:30</option>
//       <option value="9:00">9:00</option>
//       <option value="9:30">9:30</option>
//       <option value="10:00">10:00</option>
//       <option value="10:30">10:30</option>
//       <option value="11:00">11:00</option>
//       <option value="11:30">11:30</option>
//       <option value="12:00">12:00</option>
//       <option value="12:30">12:30</option>
//     </select>
//     <label class="mdl-selectfield__label">To..</label>
//   </div>
//   <div class="mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.wen.closePeriod'>
//       <option value=""></option>
//       <option value="am">am</option>
//       <option value="pm">pm</option>
//     </select>
//     <label class="mdl-selectfield__label">am/pm..</label>
//   </div>
// </div>
//
// <div class="hopDays">
//   <h6>Thursday</h6>
//   <div class="mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.thurs.openTime'>
//       <option value=""></option>
//       <option value="1:00">1:00</option>
//       <option value="1:30">1:30</option>
//       <option value="2:00">2:00</option>
//       <option value="2:30">2:30</option>
//       <option value="3:00">3:00</option>
//       <option value="3:30">3:30</option>
//       <option value="4:00">4:00</option>
//       <option value="4:30">4:30</option>
//       <option value="5:00">5:00</option>
//       <option value="5:30">5:30</option>
//       <option value="6:00">6:00</option>
//       <option value="6:30">6:30</option>
//       <option value="7:00">7:00</option>
//       <option value="7:30">7:30</option>
//       <option value="8:00">8:00</option>
//       <option value="8:30">8:30</option>
//       <option value="9:00">9:00</option>
//       <option value="9:30">9:30</option>
//       <option value="10:00">10:00</option>
//       <option value="10:30">10:30</option>
//       <option value="11:00">11:00</option>
//       <option value="11:30">11:30</option>
//       <option value="12:00">12:00</option>
//       <option value="12:30">12:30</option>
//     </select>
//     <label class="mdl-selectfield__label">From..</label>
//   </div>
//   <div class="mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.thurs.openPeriod'>
//       <option value=""></option>
//       <option value="am">am</option>
//       <option value="pm">pm</option>
//     </select>
//     <label class="mdl-selectfield__label">am/pm..</label>
//   </div>
//   <div class="mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.thurs.closeTime'>
//       <option value=""></option>
//       <option value="1:00">1:00</option>
//       <option value="1:30">1:30</option>
//       <option value="2:00">2:00</option>
//       <option value="2:30">2:30</option>
//       <option value="3:00">3:00</option>
//       <option value="3:30">3:30</option>
//       <option value="4:00">4:00</option>
//       <option value="4:30">4:30</option>
//       <option value="5:00">5:00</option>
//       <option value="5:30">5:30</option>
//       <option value="6:00">6:00</option>
//       <option value="6:30">6:30</option>
//       <option value="7:00">7:00</option>
//       <option value="7:30">7:30</option>
//       <option value="8:00">8:00</option>
//       <option value="8:30">8:30</option>
//       <option value="9:00">9:00</option>
//       <option value="9:30">9:30</option>
//       <option value="10:00">10:00</option>
//       <option value="10:30">10:30</option>
//       <option value="11:00">11:00</option>
//       <option value="11:30">11:30</option>
//       <option value="12:00">12:00</option>
//       <option value="12:30">12:30</option>
//     </select>
//     <label class="mdl-selectfield__label">To..</label>
//   </div>
//   <div class="mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.thurs.closePeriod'>
//       <option value=""></option>
//       <option value="am">am</option>
//       <option value="pm">pm</option>
//     </select>
//     <label class="mdl-selectfield__label">am/pm..</label>
//   </div>
// </div>
//
// <div class="hopDays">
//   <h6>Friday</h6>
//   <div class="mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.fri.openTime'>
//       <option value=""></option>
//       <option value="1:00">1:00</option>
//       <option value="1:30">1:30</option>
//       <option value="2:00">2:00</option>
//       <option value="2:30">2:30</option>
//       <option value="3:00">3:00</option>
//       <option value="3:30">3:30</option>
//       <option value="4:00">4:00</option>
//       <option value="4:30">4:30</option>
//       <option value="5:00">5:00</option>
//       <option value="5:30">5:30</option>
//       <option value="6:00">6:00</option>
//       <option value="6:30">6:30</option>
//       <option value="7:00">7:00</option>
//       <option value="7:30">7:30</option>
//       <option value="8:00">8:00</option>
//       <option value="8:30">8:30</option>
//       <option value="9:00">9:00</option>
//       <option value="9:30">9:30</option>
//       <option value="10:00">10:00</option>
//       <option value="10:30">10:30</option>
//       <option value="11:00">11:00</option>
//       <option value="11:30">11:30</option>
//       <option value="12:00">12:00</option>
//       <option value="12:30">12:30</option>
//     </select>
//     <label class="mdl-selectfield__label">To..</label>
//   </div>
//   <div class="mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.fri.openPeriod'>
//       <option value=""></option>
//       <option value="am">am</option>
//       <option value="pm">pm</option>
//     </select>
//     <label class="mdl-selectfield__label">am/pm..</label>
//   </div>
//   <div class="mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.fri.closeTime'>
//       <option value=""></option>
//       <option value="1:00">1:00</option>
//       <option value="1:30">1:30</option>
//       <option value="2:00">2:00</option>
//       <option value="2:30">2:30</option>
//       <option value="3:00">3:00</option>
//       <option value="3:30">3:30</option>
//       <option value="4:00">4:00</option>
//       <option value="4:30">4:30</option>
//       <option value="5:00">5:00</option>
//       <option value="5:30">5:30</option>
//       <option value="6:00">6:00</option>
//       <option value="6:30">6:30</option>
//       <option value="7:00">7:00</option>
//       <option value="7:30">7:30</option>
//       <option value="8:00">8:00</option>
//       <option value="8:30">8:30</option>
//       <option value="9:00">9:00</option>
//       <option value="9:30">9:30</option>
//       <option value="10:00">10:00</option>
//       <option value="10:30">10:30</option>
//       <option value="11:00">11:00</option>
//       <option value="11:30">11:30</option>
//       <option value="12:00">12:00</option>
//       <option value="12:30">12:30</option>
//     </select>
//     <label class="mdl-selectfield__label">To..</label>
//   </div>
//   <div class="mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.fri.closePeriod'>
//       <option value=""></option>
//       <option value="am">am</option>
//       <option value="pm">pm</option>
//     </select>
//     <label class="mdl-selectfield__label">am/pm..</label>
//   </div>
// </div>
//
// <div class="hopDays">
//   <h6>Saturday</h6>
//   <div class="mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.sat.openTime'>
//       <option value=""></option>
//       <option value="1:00">1:00</option>
//       <option value="1:30">1:30</option>
//       <option value="2:00">2:00</option>
//       <option value="2:30">2:30</option>
//       <option value="3:00">3:00</option>
//       <option value="3:30">3:30</option>
//       <option value="4:00">4:00</option>
//       <option value="4:30">4:30</option>
//       <option value="5:00">5:00</option>
//       <option value="5:30">5:30</option>
//       <option value="6:00">6:00</option>
//       <option value="6:30">6:30</option>
//       <option value="7:00">7:00</option>
//       <option value="7:30">7:30</option>
//       <option value="8:00">8:00</option>
//       <option value="8:30">8:30</option>
//       <option value="9:00">9:00</option>
//       <option value="9:30">9:30</option>
//       <option value="10:00">10:00</option>
//       <option value="10:30">10:30</option>
//       <option value="11:00">11:00</option>
//       <option value="11:30">11:30</option>
//       <option value="12:00">12:00</option>
//       <option value="12:30">12:30</option>
//     </select>
//     <label class="mdl-selectfield__label">From..</label>
//   </div>
//   <div class="mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.sat.openPeriod'>
//       <option value=""></option>
//       <option value="am">am</option>
//       <option value="pm">pm</option>
//     </select>
//     <label class="mdl-selectfield__label">am/pm..</label>
//   </div>
//   <div class="mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.sat.closeTime'>
//       <option value=""></option>
//       <option value="1:00">1:00</option>
//       <option value="1:30">1:30</option>
//       <option value="2:00">2:00</option>
//       <option value="2:30">2:30</option>
//       <option value="3:00">3:00</option>
//       <option value="3:30">3:30</option>
//       <option value="4:00">4:00</option>
//       <option value="4:30">4:30</option>
//       <option value="5:00">5:00</option>
//       <option value="5:30">5:30</option>
//       <option value="6:00">6:00</option>
//       <option value="6:30">6:30</option>
//       <option value="7:00">7:00</option>
//       <option value="7:30">7:30</option>
//       <option value="8:00">8:00</option>
//       <option value="8:30">8:30</option>
//       <option value="9:00">9:00</option>
//       <option value="9:30">9:30</option>
//       <option value="10:00">10:00</option>
//       <option value="10:30">10:30</option>
//       <option value="11:00">11:00</option>
//       <option value="11:30">11:30</option>
//       <option value="12:00">12:00</option>
//       <option value="12:30">12:30</option>
//     </select>
//     <label class="mdl-selectfield__label">To..</label>
//   </div>
//   <div class="mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.sat.closePeriod'>
//       <option value=""></option>
//       <option value="am">am</option>
//       <option value="pm">pm</option>
//     </select>
//     <label class="mdl-selectfield__label">am/pm..</label>
//   </div>
// </div>
//
// <div class="hopDays">
//   <h6>Sunday</h6>
//   <div class="mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.sun.openTime'>
//       <option value=""></option>
//       <option value="1:00">1:00</option>
//       <option value="1:30">1:30</option>
//       <option value="2:00">2:00</option>
//       <option value="2:30">2:30</option>
//       <option value="3:00">3:00</option>
//       <option value="3:30">3:30</option>
//       <option value="4:00">4:00</option>
//       <option value="4:30">4:30</option>
//       <option value="5:00">5:00</option>
//       <option value="5:30">5:30</option>
//       <option value="6:00">6:00</option>
//       <option value="6:30">6:30</option>
//       <option value="7:00">7:00</option>
//       <option value="7:30">7:30</option>
//       <option value="8:00">8:00</option>
//       <option value="8:30">8:30</option>
//       <option value="9:00">9:00</option>
//       <option value="9:30">9:30</option>
//       <option value="10:00">10:00</option>
//       <option value="10:30">10:30</option>
//       <option value="11:00">11:00</option>
//       <option value="11:30">11:30</option>
//       <option value="12:00">12:00</option>
//       <option value="12:30">12:30</option>
//     </select>
//     <label class="mdl-selectfield__label">From..</label>
//   </div>
//   <div class="mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.sun.openPeriod'>
//       <option value=""></option>
//       <option value="am">am</option>
//       <option value="pm">pm</option>
//     </select>
//     <label class="mdl-selectfield__label">am/pm..</label>
//   </div>
//   <div class="mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.sun.closeTime'>
//       <option value=""></option>
//       <option value="1:00">1:00</option>
//       <option value="1:30">1:30</option>
//       <option value="2:00">2:00</option>
//       <option value="2:30">2:30</option>
//       <option value="3:00">3:00</option>
//       <option value="3:30">3:30</option>
//       <option value="4:00">4:00</option>
//       <option value="4:30">4:30</option>
//       <option value="5:00">5:00</option>
//       <option value="5:30">5:30</option>
//       <option value="6:00">6:00</option>
//       <option value="6:30">6:30</option>
//       <option value="7:00">7:00</option>
//       <option value="7:30">7:30</option>
//       <option value="8:00">8:00</option>
//       <option value="8:30">8:30</option>
//       <option value="9:00">9:00</option>
//       <option value="9:30">9:30</option>
//       <option value="10:00">10:00</option>
//       <option value="10:30">10:30</option>
//       <option value="11:00">11:00</option>
//       <option value="11:30">11:30</option>
//       <option value="12:00">12:00</option>
//       <option value="12:30">12:30</option>
//     </select>
//     <label class="mdl-selectfield__label">To..</label>
//   </div>
//   <div class="mdl-selectfield mdl-js-selectfield">
//     <select class="mdl-selectfield__select" ng-model='hoursOfOp.sun.closePeriod'>
//       <option value=""></option>
//       <option value="am">am</option>
//       <option value="pm">pm</option>
//     </select>
//     <label class="mdl-selectfield__label">am/pm..</label>
//   </div>
// </div>
//
//
//
//
//   <!-- <div class="hoursOfOperation mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet mdl-cell--4-col-phone">
//     <h4>Hours of Operation</h4>
//       <li class='datesOpen-Input2'>
//         <h6>Monday</h6>
//         <p>From</p> <input class="mdl-textfield__input" type="time" ng-model='hoursOfOp.mon.open' step='1800'> <p>to</p> <input class="mdl-textfield__input" type="time" ng-model='hoursOfOp.mon.close' step='1800'>
//       </li>
//       <li class='datesOpen-Input2'>
//         <h6>Tuesday</h6>
//         <p>From</p> <input class="mdl-textfield__input" type="time" ng-model='hoursOfOp.tues.open' step='1800'> <p>to</p> <input class="mdl-textfield__input" type="time" ng-model='hoursOfOp.tues.close' step='1800'>
//       </li>
//       <li class='datesOpen-Input2'>
//         <h6>Wednesday</h6>
//         <p>From</p> <input class="mdl-textfield__input" type="time" ng-model='hoursOfOp.wen.open' step='1800'> <p>to</p> <input class="mdl-textfield__input" type="time" ng-model='hoursOfOp.wen.close' step='1800'>
//       </li>
//       <li class='datesOpen-Input2'>
//         <h6>Thursday</h6>
//         <p>From</p> <input class="mdl-textfield__input" type="time" ng-model='hoursOfOp.thur.open' step='1800'> <p>to</p> <input class="mdl-textfield__input" type="time" ng-model='hoursOfOp.thur.close' step='1800'>
//       </li>
//       <li class='datesOpen-Input2'>
//         <h6>Friday</h6>
//         <p>From</p> <input class="mdl-textfield__input" type="time" ng-model='hoursOfOp.fri.open' step='1800'> <p>to</p> <input class="mdl-textfield__input" type="time" ng-model='hoursOfOp.fri.close' step='1800'>
//       </li>
//       <li class='datesOpen-Input2'>
//         <h6>Saturday</h6>
//         <p>From</p> <input class="mdl-textfield__input" type="time" ng-model='hoursOfOp.sat.open' step='1800'> <p>to</p> <input class="mdl-textfield__input" type="time" ng-model='hoursOfOp.sat.close' step='1800'>
//       </li>
//       <li class='datesOpen-Input2'>
//         <h6>Sunday</h6>
//         <p>From</p> <input class="mdl-textfield__input" type="time" ng-model='hoursOfOp.sun.open' step='1800'> <p>to</p> <input class="mdl-textfield__input" type="time" ng-model='hoursOfOp.sun.close' step='1800'>
//       </li>
//
//       <li class='datesOpen-Input2'><h5>{{hopError}}</h5></li>
//       <li class='datesOpen-Input2'><button class="mdl-button mdl-js-button mdl-button--raised" type="button" ng-click = 'updateHoursOfOp()'>Update Hours Of Operation</button> </li>
//   </div> -->

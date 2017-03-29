app.factory('showFactory', function($http){
var factory = {};

factory.getShow = function(input, callback){
   $http.post('/show', input).then(function(output){
     callback(output);
   });
 };
 factory.getservices = function(input, callback){
   $http.post('/getServices', input).then(function(output){
   callback(output);
   });
 }
  return factory;
});

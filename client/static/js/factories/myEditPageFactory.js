app.factory('myEditPageFactory', function($http){
  var factory = {};

  factory.getShow = function(input, callback){
     $http.post('/getShow', input).then(function(output){
       callback(output);
     });
   };


   factory.destroy = function(idx, callback){
     $http.post('/removeDay', idx).then(function(output){
       callback(output);
     })
   };


   factory.updateServices = function(input, callback){
     $http.post('/updateServices', input).then(function(output){
       callback(output);
     });
   };


    return factory;
});

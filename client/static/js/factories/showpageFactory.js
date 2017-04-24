app.factory('showPageFactory', function($http){
  var factory = {};

  factory.getShow = function(input, callback){
     $http.post('/getShow', input).then(function(output){
       callback(output);
     });
   };

    return factory;
});

app.factory('daysFactory', function(http){
  var factory = {};

factory.getdays = function(input, callback){
  $http.post('/getDays', input).then(function(output){


  callback(output);
});
}
factory.getservices = function(input, callback){
  $http.post('/getServices', input).then(function(output){


  callback(output);
});
}





  return factory;
});

app.factory('foodFactory', function ($http){
  var factory = {};

  factory.addDay = function(input, callback){
    $http.post('/addDay', input).then(function(output){
      callback(output);
    });
  };

  factory.getDayService = function(input, callback){
    $http.post('/getDayService', input).then(function(output){
    callback(output);
    });
  };


  factory.updateServices = function(input, callback){
    $http.post('/updateServices', input).then(function(output){
      callback(output);
    });
  };

  factory.addOtherService = function(input, callback){
    $http.post('/otherServices', input).then(function(output){
      callback(output);
    });
  };


  factory.destroy = function(idx, callback){
    $http.post('/removeDay', idx).then(function(output){
      callback(output);
    })
  };



  return factory;
});

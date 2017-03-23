app.factory('foodFactory', function ($http){
  var factory = {};

  factory.addDay = function(input, callback){
    $http.post('/addDay', input).then(function(output){
      callback(output);
    });
  }

  factory.getDayService = function(input, callback){
    $http.post('/getDayService', input).then(function(output){
    callback(output);
    });
  }





  factory.destroy = function(idx, callback){
    days.splice(idx, 1);
    callback(days);
  };

  factory.getservices = function(input, callback){
    $http.post('/getServices', input).then(function(output){
    callback(output);
    });
  }


  factory.destroy = function(idx, callback){
    $http.post('/removeDay', idx).then(function(output){
      callback(output);
    })
};



  return factory;
});

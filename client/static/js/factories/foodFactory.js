app.factory('foodFactory', function ($http){
  var factory = {};

  factory.getdays = function(input, callback){
    $http.post('/getDays', input).then(function(output){


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

  factory.add = function(newService, callback){
    services.push(newService);
    callback(services);
  };

  factory.destroy = function(idx, callback){
    days.splice(idx, 1);
    callback(services);
};



  return factory;
});

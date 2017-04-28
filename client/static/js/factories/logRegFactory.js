// =========================================================================
// ====================== Login / Register Factory =========================
// =========================================================================
app.factory('logRegFactory', function ($http){
  var factory = {};
  var nearbyLocations = {};


  factory.newRegistration = function (input, callback){
    $http.post('/newRegistration', input).then(function(output){
      callback(output)
    });
  } // End newRegistration

  factory.confirmRegistration = function (input, callback){
    $http.post('/confirmRegistration', input).then(function(output){
      callback(output)
    });
  } // End confirmRegistration

// Find address
  factory.newRegister = function(input, callback){
    $http.post('/newRegister', input).then(function(output){
      callback(output)
    });
  } // End findAddress

  factory.getNearby = function(input, callback){
    $http.post('/getNearby', input).then(function(output){
      callback(output)
    });
  }


  //Check if user is registered already or not
  factory.newRegCheck = function(input, callback){
    $http.post('/newRegCheck', input).then(function(output){
      // console.log('Back from server');
      callback(output);
    });
  } // End newRegCheck


  //Register method
  factory.register = function(input, callback){
    $http.post('/reg', input).then(function(output){
      // console.log('Made it back to factory');
      callback(output);
    });
  } // End register


  //Login method
  factory.login = function(input, callback){
    $http.post('/login', input).then(function(output){
      // console.log('Made it back to factory');
      callback(output);
    });
  } // End login


  factory.getAll = function(callback){
    $http.get('/getAll').then(function(output){
      callback(output);
    });
  } // End Get All





return factory;
}); // End Login Factory

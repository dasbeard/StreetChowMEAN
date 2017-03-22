// =========================================================================
// ====================== Login / Register Factory =========================
// =========================================================================
app.factory('logRegFactory', function ($http){
  var factory = {};

// Find address
  factory.findAddress = function(input, callback){
    $http.post('/findLocation', input).then(function(output){
      callback(output)
    });
  } // End findAddress


  //Check if user is registered already or not
  factory.newRegCheck = function(input, callback){
    console.log(input);
    $http.post('/newRegCheck', input).then(function(output){
      console.log('Back from server');
      console.log(output);
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

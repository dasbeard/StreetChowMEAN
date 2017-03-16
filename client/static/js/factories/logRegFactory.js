// =========================================================================
// ====================== Login / Register Factory =========================
// =========================================================================
app.factory('logRegFactory', function ($http){
  var factory = {};
  var user = {};
  var message = {}


  //Register method
  factory.register = function(input, callback){
    $http.post('/reg', input).then(function(output){
      console.log('Made it back to factory');
      callback(output);
    });
  }

  //Login method
  factory.login = function(input, callback){
    $http.post('/login', input).then(function(output){
      console.log('Made it back to factory');
      callback(output);
    });
  }

  return factory;
}); // End Login Factory

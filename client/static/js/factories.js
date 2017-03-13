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


// =========================================================================
// ========================= Wall Factory ===============================
// =========================================================================
// app.factory('wallFactory', function($http){
//   var factory = {};
//
// factory.getAllMessages = function(callback){
//   $http.get('/messages/all').then(function(output){
//     console.log('Got all Messages');
//     callback(output.data);
//   });
// }
//
// factory.addComment = function(input, callback){
//   $http.post('/comments/new', input).then(function(output){
//     console.log('Added new Comment');
//     callback(output.data);
//   });
// }
//
//
// return factory;
//
// }); // End Message Factory

// =========================================================================
// ========================= Wall Factory ===============================
// =========================================================================
app.factory('searchFactory', function($http){
  var factory = {};


  factory.citySearch = function(input, callback){
    $http.post('/citySearch', input).then(function(output){
      callback(output);
    })
  }


return factory;

}); // End Message Factory

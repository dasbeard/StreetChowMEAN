
// =========================================================================
// ========================= Show Page Factory =============================
// =========================================================================
app.factory('showPageFactory', function($http){
  var factory = {};

  factory.getInfo = function(input, callback){
    $http.post('/getOrg', input).then(function(output){
      callback(output.data);
    });
  }


return factory;

}); // End showPageFactory Factory

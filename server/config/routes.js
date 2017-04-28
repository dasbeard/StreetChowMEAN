// =========================================================================
// ========================= Required Models ===============================
// =========================================================================
var organizations = require('./../controllers/organizations.js');

module.exports = function(app){
// =========================================================================
// ======================= Organization Routes =============================
// =========================================================================
  app.post('/reg', function(req,res){
    organizations.reg(req,res)
  });

  app.post('/newRegistration', function(req,res){
    organizations.newRegistration(req,res)
  });

  app.post('/confirmRegistration', function (req,res){
    organizations.confirmRegistration(req,res)
  });

  app.post('/login', function(req,res){
    organizations.login(req,res)
  });

  app.post('/newRegCheck', function(req,res){
    organizations.newRegCheck(req,res)
  });

  app.post('/newRegister', function(req, res){
    organizations.newRegister(req,res)
  });

  app.post('/getOrg', function(req,res){
    organizations.getOrg(req,res)
  });

  app.get('/getAll', function(req,res){
    organizations.getAll(req,res)
  });

  app.post('/addDay', function(req, res){
    organizations.addDay(req,res)
  });

  app.post('/getNearby', function(req, res){
    organizations.getNearbyWeb(req,res)
  });

  app.post('/getDayService', function(req,res){
    organizations.getDayService(req,res)
  });

  app.post('/removeDay', function(req,res){
    organizations.removeDay(req,res)
  });

  app.post('/removeHOPDay', function(req,res){
    organizations.removeHOPDay(req,res)
  });

  app.post('/getShow', function(req,res){
    organizations.getShow(req,res)
  });

  app.post('/updateServices', function(req,res){
    organizations.updateServices(req,res)
  });

  app.post('/updateServices2', function(req,res){
    organizations.updateServices2(req,res)
  });

  app.post('/updateHoursOfOp', function(req,res){
    organizations.updateHoursOfOp(req,res)
  });

  app.post('/updateHoursOfOp2', function(req,res){
    organizations.updateHoursOfOp2(req,res)
  });

  app.post('/citySearch', function(req,res){
    organizations.citySearch(req,res)
  });

  app.post('/getShow', function(req,res){
    organizations.getShow(req,res)
  });

  app.get('/apiTest', function(req,res){
    organizations.apiTest(req,res)
  });

  app.get('/apiTest2/:location', function(req,res){
    organizations.apiTest2(req,res)
  });

  app.get('/apiTest3/:location', function(req,res){
    organizations.apiTest3(req,res)
  });

}; // End Routes

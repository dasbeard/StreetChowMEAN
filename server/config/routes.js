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

  app.post('/login', function(req,res){
    organizations.login(req,res)
  });

  app.post('/newRegCheck', function(req,res){
    organizations.regCheck(req,res)
  });

  app.post('/findLocation', function(req, res){
    organizations.findLocal(req,res)
  });

  app.get('/getAll', function(req,res){
    organizations.getAll(req,res)
  });

  app.post('/addDay', function(req, res){
    organizations.addDay(req,res)
  });

  app.post('/getDayService', function(req,res){
    organizations.getDayService(req,res)
  });

  app.post('/removeDay', function(req,res){
    organizations.removeDay(req,res)
  });


  app.get('/apiTest', function(req,res){
    organizations.apiTest(req,res)
  });


// =========================================================================
// ============================ Wall Routes ================================
// =========================================================================
// app.get('/messages/all', function(req,res){
//   messages.getAllMessages(req, res);
// });
//
// app.post('/messages/new', function(req,res){
//   messages.addMessage(req,res);
// });


}; // End Routes

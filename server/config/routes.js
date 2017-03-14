// =========================================================================
// ========================= Required Models ===============================
// =========================================================================
var organizations = require('./../controllers/organizations.js');
var services = require('./../controllers/services.js');

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

const mongoose = require('mongoose');

var Message = mongoose.model('Message');


module.exports = (function(){
  return {

    reg: function(req,res){
      console.log('In server/controllers/messages'.cyan);
      res.json({message: 'In server/controllers/messages'})
    }, //End Get All Messages

  }
})();

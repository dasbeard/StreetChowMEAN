// =========================================================================
// ============================== Require ==================================
// =========================================================================
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var Organization = mongoose.model('Organization');

module.exports = (function(){
  return {

    reg: function(req,res){
      console.log('In the Reg method  ----> users controler'. cyan);
      console.log(req.body);


    // ===== Validations Needed Here =====


      Organization.findOne({email: req.body.email}, function(err, oneUser){
        if (err){
          console.log('==== Error ===='.red);
        } else {
          // Email already in the system
          if (oneUser){
          console.log('==== User Found in System'.yellow);
          res.json({error: "This email is already registered to an account. Please Login to continue"});
          } else {
            // No Email Found
            console.log('=== New User ready to be created ==='.yellow);

            // Encrypting password
            var pw = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));

            // Create User object
              // WITHOUT LAT AND LONG!! -- 3/12/17
            var newOrganization = new Organization({
              organization: req.body.organization, street1: req.body.street1, street2: req.body.street2, city: req.body.city, state: req.body.state, zip: req.body.zip, phone: req.body.phone, website: req.body.website, description: req.body.description, services: req.body.services, email: req.body.email, password: pw
            })
            newOrganization.save(function(err){
              if (err){
                console.log('==== Error When saving new organization ===='.red);
              } else {
                console.log('==== Successfuly Registed ===='.yellow);
                res.json(newOrganization)
              }
            });
          }
        }
      });
    },  // End Reg Method



  login: function(req,res){
    console.log('In the login method  ----> users controler'. cyan);
    console.log(req.body);

    // Find user by email
    Organization.findOne({email: req.body.email}, function(err, oneUser){
      if(err){
        console.log('====== Error ======'.red);
      } else {
        if(!oneUser){
          console.log('====== user NOT Found ======'.yellow);
          res.json({error: "Email not in the system. Please Register"});

        } else {
          console.log('====== Checking password ======'.yellow);
          // Authenticate password
          if(bcrypt.compareSync(req.body.password, oneUser.password)){
            console.log('====== Successfuly Logged In ======');
            res.json(oneUser)
          } else {
            res.json({error: "Email or Password do not match"});
          }
        }
      }
    });
  } // End Login Method


  } // End Return
})();




// ============================== Helper Functions ==============================

function validateEmail(email){
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(!emailRegex.test(email)){
    return true;
  } else {
    return false;
  }
} // End Validate Email Function


function validateLocation(orgObj){
var error = '';
var streetFlag = false;

  if(!orgObj.organization){
    error = 'Organization name is required';
    return error;
  }
  else if (orgObj.organization.length < 3){
    error = 'Organization name must be at least 3 characters long';
    return error;
  }
  else if (!orgObj.street1){
    error = 'Street address is required';
    return error;
  }
  else if (orgObj.street1.length < 3){
    error = 'Street address must be at least 3 characters long';
    return error;
  }
  else if (orgObj.street2){
    streetFlag = true;
    if (orgObj.street2.length < 2){
      error = 'Street address 2 must be at least 2 characters long';
      return error;
    }
  }
  else if (!orgObj.city){
    error = 'City name is required';
    return error;
  }
  else if (orgObj.city.length < 2){
    error = 'City name must be at least 2 characters long';
    return error;
  }
  else if (!orgObj.zip){
    error = 'ZIP code is required';
    return error;
  }
  else if (orgObj.zip.length < 5){
    error = 'ZIP code must be at least 5 digits long';
    return error;
  }



}

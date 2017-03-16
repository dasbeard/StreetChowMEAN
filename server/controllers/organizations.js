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


    // ===== Validations =====
        if (validateLocation(req.body)){
          console.log();
          var myPhone = intParsing(req.body.phone);
          var myZip = intParsing(req.body.zip);
        } else {
          res.json({error: validatedObj});
        }
    // ===== Creating and Saving new Organization =====
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

// ============= WITHOUT LAT AND LONG!! -- 3/12/17 =============

            var newOrganization = new Organization({
              organization: req.body.organization, street1: req.body.street1, street2: req.body.street2, city: req.body.city, state: req.body.state, zip: req.body.zip, description: req.body.description, website: req.body.website, email: req.body.email, password: pw
            })
            newOrganization.save(function(err){
              if (err){
                console.log('==== Error When saving new organization ===='.red);
                console.log(err);
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
function intParsing(input){
  var myArr = ('' + input).split('');
  var myStr = '';

  for (var i=0; i<myArr.length; i++){
    if (!isNaN(myArr[i])){
      myStr += myArr[i];
    }
  }
return Number(myStr);
} // End intParsing



function validateLocation(orgObj){
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var zipRegex = /^\d{5}(?:[-\s]\d{4})?$/;
  var phoneRegex = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
  var websiteRegex = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  var error = '';
  var streetFlag = false;

  if(!orgObj.organization){
    return 'Organization name is required';
  }
  else if (orgObj.organization.length < 3){
    return 'Organization name must be at least 3 characters long';
  }
  else if (!emailRegex.test(orgObj.email)){
    return 'Please enter in a valid email';
  }
  else if (!orgObj.street1){
    return 'Street address is required';
  }
  else if (orgObj.street1.length < 3){
    return 'Street address must be at least 3 characters long';
  }
  else if (orgObj.street2){
    streetFlag = true;
    if (orgObj.street2.length < 2){
      return 'Street address 2 must be at least 2 characters long';
    }
  }
  else if (!orgObj.city){
    return 'City name is required';
  }
  else if (!orgObj.state){
    return 'State is required';
  }
  else if (!zipRegex.test(orgObj.zip)){
    return 'Please enter a valid Zip Code';
  }
  else if (!orgObj.description){
    return 'Please enter a Description to continue';
  }
  else if (orgObj.description.length < 3){
    return 'Description must be at least 3 characters long';
  }
  else if (orgObj.description.length > 150){
    return 'Description is too long. 150 Characters max';
  }
  else if (orgObj.password == "     ") {
    return 'Please enter a password to continue';
  }
  else if (!orgObj.password){
    return 'Please enter a password to continue';
  }
  else if (orgObj.password.length < 5){
    return 'Password must be at least 5 characters long';
  }
  else if(orgObj.password != orgObj.password_conf){
    return 'Passwords do not match!';
  }

// Needs intParsing
  else if (!orgObj.zip){
    return 'ZIP code is required';
  }
  if (orgObj.website){
    if (!websiteRegex.test(orgObj.website)){
      return 'Please enter a valid Website';
    }
  }

// Needs intParsing
  if (orgObj.phone){
    if (!phoneRegex.test(orgObj.phone)){
      return 'Please enter a valid Phone Number';
    }
  }
  return true;
}; // End Validate Location

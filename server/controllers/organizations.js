// =========================================================================
// ============================== Require ==================================
// =========================================================================
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const NodeGeocoder = require('node-geocoder');
const distance = require('google-distance');
// distance.key = ('AIzaSyBN4DR6_NEex4E0iFmkgDgqANrO69pCgtM');

var options = {
  provider: 'google'
};
var geocoder = NodeGeocoder(options)


var Organization = mongoose.model('Organization');

module.exports = (function(){
  return {



  getNearbyWeb: function(req,res){
    console.log(req.body);
    Organization.find(({}), function(err, nearbyOrgs){
      if (err){
        console.log('==== Error When finding user ===='.red);
        console.log(err);
      } else {
        var sendBack = [];
        var lat = req.body.lat;
        var long = req.body.lng;
        var origin = lat + ',' + long;
        var destinations = [];
      }

      // Need to make sure that all locations are less than 25 per google api
      // if (allLocations.length > 2){
      //   console.log('greater than 2');
      //   console.log(allLocations.length);
      // }
          for (var i=0; i<nearbyOrgs.length;i++){
            destinations.push(nearbyOrgs[i].latitude + ',' + nearbyOrgs[i].longitude);
          }
          distance.get({origin: origin, destinations}, function(err, data) {
              if (err){
                return console.log(err)
              } else {
                // console.log(data);
                for (var i=0; i<data.length; i++){
                  if (data[i].distanceValue < 16500){
                    sendBack.push(nearbyOrgs[i]);

                  }
                }
                res.json(sendBack)
              }
          });


    })


  },





    // ============== Get all info from DB for API Using Distance Matrix ==============
    apiTest2: function(req,res){

      Organization.find(({}), function(err, allLocations){
        if (err){
          console.log('==== Error When finding user ===='.red);
          console.log(err);
        } else {
          // console.log(allLocations);
          var sendBack = [];
          var origins = req.params.location
          var destinations = [];

      // Need to make sure that all locations are less than 25 per google api
      // if (allLocations.length > 2){
      //   console.log('greater than 2');
      //   console.log(allLocations.length);
      // }
          for (var i=0; i<allLocations.length;i++){
            destinations.push(allLocations[i].latitude + ',' + allLocations[i].longitude);
          }
          distance.get({origin: req.params.location, destinations}, function(err, data) {
              if (err){
                return console.log(err)
              } else {
                // console.log(data);
                for (var i=0; i<data.length; i++){
                  if (data[i].distanceValue < 16500){
                    console.log('=================================='.red);
                    console.log(data[i]);
                    console.log(destinations[i]);
                    console.log('=================================='.yellow);
                    console.log(allLocations[i]);
                    sendBack.push(allLocations[i]);

                  }
                }
                console.log('=================================='.cyan);
                console.log(sendBack);
                console.log('=================================='.cyan);

                res.json(sendBack)
              }
          });

        }
      });
    }, // End apiTest2




  getShow: function(req,res){
    Organization.findOne({_id: req.body.id}, function(err, oneUser){
      if (err){
        console.log("===== Error =======");
        console.log(err);
      } else {
        var sendBack = { formattedAddress: oneUser.formattedAddress, organization: oneUser.organization, website: oneUser.website, phone: oneUser.phone, description: oneUser.description, email: oneUser.email, services: oneUser.services, otherServices: oneUser.otherServices, days: oneUser.days};
        res.json(sendBack);
      }
    })
  }, // End getShow






  addDay: function(req,res){
    Organization.findOne({_id: req.body.user}, function(err, oneUser){
      if (err){
        console.log('===== Error ====='.red);
        console.log(err);
      } else {
        console.log('The User'.cyan);
        console.log(req.body);
        oneUser.days.push(req.body);
        oneUser.save(function(err){
          if (err){
            console.log('==== Error When saving new day ===='.red);
            console.log(err);
          } else {
            console.log('==== Successfuly Saved New Day ===='.yellow);
            var toSendBack = {'days': oneUser.days, 'services': oneUser.services};
            res.json(toSendBack);
          }
        })
      }
    })
  }, //End addDay


  getDayService: function(req, res){
    Organization.findOne({_id: req.body.id}, function(err, oneUser){
      if (err){
        console.log('==== Error When saving new day ===='.red);
        console.log(err);
      } else {
        var toSendBack = {days: oneUser.days, services: oneUser.services, otherServices: oneUser.otherServices};
        res.json(toSendBack);
      }
    })
  }, // End getDayService


  updateServices: function(req,res){
    // console.log(req.body);
    Organization.findOne({_id: req.body.id}, function(err, oneUser){
      if (err){
        console.log('==== Error updating services ===='.red);
        console.log(err);
      } else {
        oneUser.services = req.body;
        oneUser.save(function(err){
          if (err){
            console.log('==== Error saving services ===='.red);
            console.log(err);
          } else {
            res.json(true);
          }
        })
      }
    })
  }, // End updateServices


  updateOtherService: function(req,res){
    Organization.findOne({_id: req.body.id}, function(err, oneUser){
      if (err){
        console.log('==== Error When finding user ===='.red);
        console.log(err);
      } else {
        oneUser.otherServices = req.body.service;
        oneUser.save(function(err){
          if (err){
            console.log('==== Error When updating Other Services ===='.red);
            console.log(err);
          } else {
            res.json(true);
          }
        })
      }
    });
  }, // End addOtherService



  removeDay: function(req,res){
    Organization.findOne({_id: req.body.id}, function(err, oneUser){
      if (err){
        console.log('==== Error When finding user ===='.red);
        console.log(err);
      } else {
        oneUser.days.splice(req.body.index,1)
        oneUser.save(function(err){
          if (err){
            console.log('==== Error When removing day ===='.red);
            console.log(err);
          } else {
            res.json(true);
          }
        })
      }
    })
  },

  // ============== Get all info from DB for API ==============
  apiTest: function(req,res){
    Organization.find({}, function(err, data){
      if (err){
        console.log('===== Error ====='.red);
        console.log(err);
      } else {
        res.json(data);
      }
    });
  }, // End API Test



  findLocal: function (req,res){
    console.log(req.body);
    var toSearch = (req.body.street1 + ', ' + req.body.city);
    geocoder.geocode(toSearch, function(err, output){
      if (err){
        console.log('===== Error ====='.red);
        console.log(err);
      } else {
        if (output.length > 0){
        console.log('the output'.cyan);
        console.log(output.length);
        console.log(output);
        res.json(output);
        } else {
          console.log('Nope'.red);
          res.json(false)
        }
      }
    });
  }, // End findLocal


  getAll: function(req,res){
    Organization.find(({}),function(err, allOrgs){
      if (err){
        console.log('===== ERROR ====='.red);
        console.log(err);
      } else {
        var sendBack = [];
        for (var i = 0; i<allOrgs.length; i++){
          sendBack.push({ formattedAddress: allOrgs[i].formattedAddress,
                      organization: allOrgs[i].organization,
                      description: allOrgs[i].description,
                      latitude: allOrgs[i].latitude,
                      longitude: allOrgs[i].longitude,
                      _id: allOrgs[i]._id
                    }
          );
        }
        res.json(sendBack);
      };
    });
  },



  getShow: function(req,res){
    Organization.findOne({_id: req.body.id}, function(err, oneUser){
      if (err){
        console.log('not working');
      } else {
        var sendBack = {formattedAddress: oneUser.formattedAddress,
          organization: oneUser.organization,
          website: oneUser.website,
          phone: oneUser.phone,
          description: oneUser.description,
          email: oneUser.email,
          services: oneUser.services,
          otherServices: oneUser.otherServices,
          days: oneUser.days
        };
        console.log(sendBack);
        res.json(sendBack);
      }
    });
  }, // End get show





  regCheck: function(req,res){
    var checkObj = req.body;
    console.log('in regCheck'.cyan);
    console.log(checkObj);
    if (checkNewReg(checkObj)){
  // ======== Query DB to find instance ========
      Organization.findOne({formattedAddress: checkObj.formattedAddress}, function(err, oneUser){
        if (err){
          console.log('===== Error ====='.red);
          console.log(err);
        } else if (oneUser){
          // All Good
          console.log('Already in system'.red);
          res.json(false);
        } else {
          console.log('All Good'.cyan);
          res.json(true);
        }
      });
    } else {
      res.json({error: checkNewReg(checkObj)});
    }
  }, // End regCheck


  reg: function(req,res){
  // ===== Validations =====
    console.log('In the reg method'.yellow);
    console.log(req.body);
    var myPhone;
    var myZip;
      var validatedObj = req.body;
      if (validateLocation(validatedObj)){
        myPhone = intParsing(req.body.phone);
        // myZip = intParsing(req.body.zip);
      } else {
        res.json({error: validateLocation(validatedObj)});
      }
  // ===== Creating and Saving new Organization =====
    Organization.findOne({formattedAddress: req.body.formattedAddress}, function(err, oneUser){
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
          var newOrganization = new Organization({
            organization: req.body.organization, formattedAddress: req.body.formattedAddress, streetNumber: req.body.streetNumber, streetName: req.body.streetName, city: req.body.city, state: req.body.state, zip: req.body.zipcode, phone: myPhone, website: req.body.website, description: req.body.description, latitude: req.body.latitude, longitude: req.body.longitude, email: req.body.email, password: pw,
          })
          newOrganization.save(function(err){
            if (err){
              console.log('==== Error When saving new organization ===='.red);
              console.log(err);
            } else {
              console.log('==== Successfuly Registered ===='.yellow);

              var toSendBack = {id: newOrganization._id,
                formattedAddress: newOrganization.formattedAddress,
                organization: newOrganization.organization,
              };
              res.json(toSendBack)
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
            var toSendBack = {id: oneUser._id,
              formattedAddress: oneUser.formattedAddress,
              organization: oneUser.organization,
            };
            res.json(toSendBack)
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


function checkNewReg(regObj){
  if(!regObj.organization){
    return 'Organization name is required';
  }
  else if (regObj.organization.length < 3){
    return 'Organization name must be at least 3 characters long';
  }
  else if (!regObj.street1){
    return 'Street address is required';
  }
  else if (regObj.street1.length < 3){
    return 'Street address must be at least 3 characters long';
  }
  else if (!regObj.city){
    return 'Please enter a City Name';
  } else {
    return true;
  }
} // End checkNewReg



function validateLocation(orgObj){
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  var phoneRegex = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

  var websiteRegex = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

if (!emailRegex.test(orgObj.email)){
    return 'Please enter in a valid email';
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
  if (orgObj.website){
    if (!websiteRegex.test(orgObj.website)){
      return 'Please enter a valid Website';
    }
  }
  if (orgObj.phone){
    if (!phoneRegex.test(orgObj.phone)){
      return 'Please enter a valid Phone Number';
    }
  }
  return true;
}; // End Validate Location





// ===== Sleep Function =====
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
};

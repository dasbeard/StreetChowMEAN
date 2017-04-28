// =========================================================================
// ============================== Require ==================================
// =========================================================================
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const NodeGeocoder = require('node-geocoder');
const distance = require('google-distance');
const moment = require('moment');

distance.key = ('AIzaSyBN4DR6_NEex4E0iFmkgDgqANrO69pCgtM');

var options = {
  provider: 'google',
  apiKey: 'AIzaSyBN4DR6_NEex4E0iFmkgDgqANrO69pCgtM'
};
var geocoder = NodeGeocoder(options)


var Organization = mongoose.model('Organization');

module.exports = (function(){
  return {

    citySearch: function(req,res){
      var city = titleCase(req.body.city)
      Organization.find({$and: [{state: req.body.state}, {city: city}]}, function(err, results){
        if (err){
          console.log('==== Error finding by state ===='.red);
          console.log(err);
        } else {
          // console.log(results);
          var sendBack = [];

          for (var i=0; i<results.length; i++){
            organization = { formattedAddress: results[i].formattedAddress, organization: results[i].organization, website: results[i].website, _id: results[i]._id}
            sendBack.push(organization);
          };

          if (sendBack.length == 0){
            res.json({error: 'No locations found'});
          } else {
            res.json(sendBack);
          }
        }
      })
    },



    getOrg: function(req,res){
      Organization.findOne({_id: req.body.id}, function(err, oneUser){
        if (err){
          console.log('==== Error When finding user ===='.red);
          console.log(err);
        } else {
          var sendBack = { formattedAddress: oneUser.formattedAddress, organization: oneUser.organization, website: oneUser.website, phone: oneUser.phone, description: oneUser.description, email: oneUser.email, services: oneUser.services, otherServices: oneUser.otherServices, days: oneUser.days, latitude: oneUser.latitude, longitude: oneUser.longitude, hoursOfOp: oneUser.hoursOfOperation};
          res.json(sendBack);
        }
      });
    }, // End getOrg


    getNearbyWeb: function(req,res){
      // console.log(req.body);
      Organization.find(({}), function(err, allLocations){
        if (err){
          console.log('==== Error When finding user ===='.red);
          console.log(err);
        } else {
          var within2miles = [];
          var within5miles = [];
          var within10miles = [];
          var lat = req.body.lat;
          var long = req.body.lng;
          var destinations = [];

        // Need to make sure that all locations are less than 25 per google api

            for (var i=0; i<allLocations.length; i++){
              if(myDistance(lat, long, allLocations[i].latitude, allLocations[i].longitude)<=2){
                var org = {_id: allLocations[i]._id, formattedAddress: allLocations[i].formattedAddress, organization: allLocations[i].organization, website: allLocations[i].website};
                within2miles.push(org);

                } else if (myDistance(lat, long, allLocations[i].latitude, allLocations[i].longitude)>2 && myDistance(lat, long,             allLocations[i].latitude, allLocations[i].longitude)<=5) {
                  var org = {_id: allLocations[i]._id, formattedAddress: allLocations[i].formattedAddress, organization: allLocations[i].organization, website: allLocations[i].website};
                within5miles.push(org);

                } else if (myDistance(lat, long, allLocations[i].latitude, allLocations[i].longitude)>5 && myDistance(lat, long,             allLocations[i].latitude, allLocations[i].longitude)<=10) {
                  var org = {_id: allLocations[i]._id, formattedAddress: allLocations[i].formattedAddress, organization: allLocations[i].organization, website: allLocations[i].website};
                  within10miles.push(org);
                }
              }
              var sendBack = {within2miles, within5miles, within10miles};
              res.json(sendBack);

          }
      })
    },



    getShow: function(req,res){
      Organization.findOne({_id: req.body.id}, function(err, oneUser){
        if (err){
          console.log("===== Error =======");
          console.log(err);
        } else {
          var sendBack = { formattedAddress: oneUser.formattedAddress, organization: oneUser.organization, website: oneUser.website, phone: oneUser.phone, description: oneUser.description, email: oneUser.email, services: oneUser.services, otherServices: oneUser.otherServices, days: oneUser.days, latitude: oneUser.latitude, longitude: oneUser.longitude};
          res.json(sendBack);
        }
      })
    }, // End getShow



    addDay: function(req,res){
      // console.log(req.body);
      Organization.findOne({_id: req.body.id}, function(err, oneUser){
        if (err){
          console.log('===== Error ====='.red);
          console.log(err);
        } else {
          var newDay = {day: req.body.day, startTime: req.body.startTime, startPeriod: req.body.startPeriod, endTime: req.body.endTime, endPeriod: req.body.endPeriod};
          // console.log(newDay);
          oneUser.days.push(newDay);
          oneUser.save(function(err){
            if (err){
              console.log('==== Error When saving new day ===='.red);
              console.log(err);
            } else {
              res.json(true);
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
          var orgInfo = {phone: oneUser.phone, website: oneUser.website, description: oneUser.description};
          var toSendBack = {days: oneUser.days, services: oneUser.services, hoursOfOp: oneUser.hoursOfOperation, org: orgInfo };
          res.json(toSendBack);
        }
      })
    }, // End getDayService


    updateServices: function(req,res){
      console.log(req.body);
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
              res.json({message: 'Services Saved'});
            }
          })
        }
      })
    }, // End updateServices


    updateServices2: function(req,res){
      // console.log(req.body);
      Organization.findOne({_id: req.body.id}, function(err, oneUser){
        if (err){
          console.log('==== Error updating services ===='.red);
          console.log(err);
        } else {

          oneUser.services = req.body.services;
          oneUser.website = req.body.info.website;
          oneUser.phone = req.body.info.phone;
          oneUser.description = req.body.info.description;

          // console.log(oneUser);
          oneUser.save(function(err){
            if (err){
              console.log('==== Error saving services ===='.red);
              console.log(err);
            } else {
              res.json({message: 'Services Saved'});
            }
          })
        }
      })

    }, // End updateServices2







    updateHoursOfOp2: function(req,res){
      console.log(req.body);
      Organization.findOne({_id: req.body.id}, function(err, oneUser){
        if (err){
          console.log('===== Error ====='.red);
          console.log(err);
        } else {
          var newDay = {day: req.body.day, startTime: req.body.startTime, startPeriod: req.body.startPeriod, endTime: req.body.endTime, endPeriod: req.body.endPeriod};
          // console.log(newDay);
          oneUser.hoursOfOperation.push(newDay);
          oneUser.save(function(err){
            if (err){
              console.log('==== Error When saving new day ===='.red);
              console.log(err);
            } else {
              res.json(true);
            }
          })
        }
      })
    }, //End updateHoursOfOp2







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



    removeHOPDay: function(req,res){
      Organization.findOne({_id: req.body.id}, function(err, oneUser){
        if (err){
          console.log('==== Error When finding user ===='.red);
          console.log(err);
        } else {
          oneUser.hoursOfOperation.splice(req.body.index,1)
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



    newRegistration: function (req,res){
      Organization.findOne({email: req.body.email}, function(err, oneUser){
        if (err){
          console.log('===== ERROR ====='.red);
          console.log(err);
        } else {
          if (oneUser){
            var temp = oneUser.organization
            res.json({error: 'Email is already registered to ' + temp})
          }
          else {
            // ======== Check if address already registered =========
            var toSearch = (req.body.street + ', ' + req.body.city);
            geocoder.geocode(toSearch, function(err, output){
              if (err){
                console.log('===== ERROR ====='.red);
                console.log(err);
              } else {
                if (output.length > 0){
                  res.json(output);
                } else {
                  res.json({error: 'Please provide a real address'});
                }
              }
            }) // End geocode
          }
        }
      });
    }, // End newRegistration







    confirmRegistration: function(req,res){
      // console.log('In the reg method'.yellow);
      // console.log(req.body);
      // console.log('=========================='.cyan);
      var myEmail = req.body.email.toLowerCase();
      var myZip;
      var validatedObj = req.body;
      if (validateLocation(validatedObj)){
        myPhone = intParsing(req.body.phone);
        // myZip = intParsing(req.body.zip);
      } else {
        res.json({error: validateLocation(validatedObj)});
      }
    // ========= Check if email is already registered =========
      Organization.findOne({email: myEmail}, function(err, oneUser){
        if (err){
          console.log('===== Error ====='.red);
          console.log(err);
        } else if (oneUser) {
          res.json({error: "This E-Mail is already registered to an account. Please Login to continue"})
        } else {

    // ===== Creating and Saving new Organization =====
          Organization.findOne({formattedAddress: req.body.formattedAddress}, function(err, oneUser){
            if (err){
              console.log('==== Error ===='.red);
            } else {
              // Email already in the system
              if (oneUser){
              // console.log('==== User Found in System'.yellow);
              res.json({error: "This address is already registered to an account. Please Login to continue"});
              } else {
                // No Email Found
                // console.log('=== New User ready to be created ==='.yellow);
          // Encrypting password
                var pw = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
          // Create User object
                var newOrganization = new Organization({
                  organization: req.body.organization, formattedAddress: req.body.location.formattedAddress, streetNumber: req.body.location.streetNumber, streetName: req.body.location.streetName, city: req.body.location.city, state: req.body.location.administrativeLevels.level1short, zip: req.body.location.zipcode, latitude: req.body.location.latitude, longitude: req.body.location.longitude, email: myEmail, password: pw,
                })
                newOrganization.save(function(err){
                  if (err){
                    console.log('==== Error When saving new organization ===='.red);
                    console.log(err);
                  } else {
                    // console.log('==== Successfuly Registered ===='.yellow);

                    var toSendBack = {id: newOrganization._id,
                      formattedAddress: newOrganization.formattedAddress,
                      organization: newOrganization.organization,
                    };
                    res.json({success: true, sentback: toSendBack})
                  }
                });
              }
            }
          });

        }
      });
    },








    getAll: function(req,res){
      Organization.find(({}),function(err, allOrgs){
        if (err){
          console.log('===== ERROR ====='.red);
          console.log(err);
        } else {
          var sendBack = [];
          for (var i = 0; i<allOrgs.length; i++){
            sendBack.push({ formattedAddress: allOrgs[i].formattedAddress,
                        website: allOrgs[i].website,
                        address: allOrgs[i].streetNumber + ' ' + allOrgs[i].streetName + ', ' + allOrgs[i].city,
                        organization: allOrgs[i].organization,
                        description: allOrgs[i].description,
                        latitude: allOrgs[i].latitude,
                        longitude: allOrgs[i].longitude,
                        _id: allOrgs[i]._id
                      }
            );
          }
          // console.log(sendBack);
          res.json(sendBack);
        };
      });
    },


    newRegCheck: function(req,res){
      // console.log(req.body);
      Organization.findOne({formattedAddress: req.body.formattedAddress}, function (err, oneUser){
        if (err){
          console.log('==== Error ===='.red);
          console.log(err);
        } else {
          if (oneUser){
            res.json({error: 'Organization already registered at this address'});
          } else {
            res.json(true);
          }
        }
      });
    }, // End newRegCheck


    regCheck: function(req,res){
      var checkObj = req.body;
      // console.log('in regCheck'.cyan);
      // console.log(checkObj);
      if (checkNewReg(checkObj)){
    // ======== Query DB to find instance ========
        Organization.findOne({formattedAddress: checkObj.formattedAddress}, function(err, oneUser){
          if (err){
            console.log('===== Error ====='.red);
            console.log(err);
          } else if (oneUser){
            // All Good
            // console.log('Already in system'.red);
            res.json(false);
          } else {
            // console.log('All Good'.cyan);
            res.json(true);
          }
        });
      } else {
        res.json({error: checkNewReg(checkObj)});
      }
    }, // End regCheck


    reg: function(req,res){
    // ===== Validations =====
      // console.log('In the reg method'.yellow);
      // console.log(req.body);
      var myEmail = req.body.email.toLowerCase();
      var myPhone;
      var myZip;
      var validatedObj = req.body;
      if (validateLocation(validatedObj)){
        myPhone = intParsing(req.body.phone);
        // myZip = intParsing(req.body.zip);
      } else {
        res.json({error: validateLocation(validatedObj)});
      }
    // ========= Check if email is already registered =========
      Organization.findOne({email: myEmail}, function(err, oneUser){
        if (err){
          console.log('===== Error ====='.red);
          console.log(err);
        } else if (oneUser) {
          res.json({error: "This E-Mail is already registered to an account. Please Login to continue"})
        } else {

    // ===== Creating and Saving new Organization =====
          Organization.findOne({formattedAddress: req.body.formattedAddress}, function(err, oneUser){
            if (err){
              console.log('==== Error ===='.red);
            } else {
              // Email already in the system
              if (oneUser){
              // console.log('==== User Found in System'.yellow);
              res.json({error: "This address is already registered to an account. Please Login to continue"});
              } else {
                // No Email Found
                // console.log('=== New User ready to be created ==='.yellow);
          // Encrypting password
                var pw = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
          // Create User object
                var newOrganization = new Organization({
                  organization: req.body.organization, formattedAddress: req.body.formattedAddress, streetNumber: req.body.streetNumber, streetName: req.body.streetName, city: req.body.city, state: req.body.state, zip: req.body.zipcode, phone: myPhone, website: req.body.website, description: req.body.description, latitude: req.body.latitude, longitude: req.body.longitude, email: myEmail, password: pw,
                })
                newOrganization.save(function(err){
                  if (err){
                    console.log('==== Error When saving new organization ===='.red);
                    console.log(err);
                  } else {
                    // console.log('==== Successfuly Registered ===='.yellow);

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

        }
      });


    },  // End Reg Method



    login: function(req,res){

      var myEmail = req.body.email.toLowerCase();
      // Find user by email
      Organization.findOne({email: myEmail}, function(err, oneUser){
        if(err){
          console.log('====== Error ======'.red);
        } else {
          if(!oneUser){
            // console.log('====== user NOT Found ======'.yellow);
            res.json({error: "Email not in the system. Please Register"});

          } else {
            // console.log('====== Checking password ======'.yellow);
            // Authenticate password
            if(bcrypt.compareSync(req.body.password, oneUser.password)){
              // console.log('====== Successfuly Logged In ======');
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
    }, // End Login Method




// ========================================================================
// ================================ API's =================================
// ========================================================================



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


apiTest3: function(req,res){
  console.log(req.params);
  var myLatLng =  req.params.location.split(',');
  var myLat = parseFloat(myLatLng[0]);
  var myLng = parseFloat(myLatLng[1]);

  Organization.find(({}), function(err, allLocations){
    if (err){
      console.log('==== Error When finding user ===='.red);
      console.log(err);
    } else {
      var sendBack =[];
      for (var i=0; i<allLocations.length; i++){
        if(myDistance(myLat, myLng, allLocations[i].latitude, allLocations[i].longitude)<=10){
          sendBack.push(allLocations[i]);
        }
      }
      res.json(sendBack);
    }
  }) // End find All

}, // End API Test 3



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
                sendBack.push(allLocations[i]);

              }
            }
            res.json(sendBack)
          }
      });

    }
  });
}, // End apiTest2















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


function emailParse(input){

} // End emailParse



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
  // else if (!orgObj.description){
  //   return 'Please enter a Description to continue';
  // }
  // else if (orgObj.description.length < 3){
  //   return 'Description must be at least 3 characters long';
  // }
  // else if (orgObj.description.length > 150){
  //   return 'Description is too long. 150 Characters max';
  // }
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
  // if (orgObj.website){
  //   if (!websiteRegex.test(orgObj.website)){
  //     return 'Please enter a valid Website';
  //   }
  // }
  // if (orgObj.phone){
  //   if (!phoneRegex.test(orgObj.phone)){
  //     return 'Please enter a valid Phone Number';
  //   }
  // }
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


function titleCase(str) {
     words = str.toLowerCase().split(' ');

     for(var i = 0; i < words.length; i++) {
          var letters = words[i].split('');
          letters[0] = letters[0].toUpperCase();
          words[i] = letters.join('');
     }
     return words.join(' ');
};





// ========== Distance Matrix 2.0 ==========
function myDistance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p))/2;
  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

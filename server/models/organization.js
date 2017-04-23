// =========================================================================
// ============================== Require ==================================
// =========================================================================
const mongoose = require('mongoose');


// =========================================================================
// ============================== Schemas ==================================
// =========================================================================
var OrganizationSchema = new mongoose.Schema({
  organization: {type: String, required: true, minlength: 3, trim: true},
  formattedAddress: {type: String, required: true},
  streetNumber: {type: Number, required: true, minlength: 1, trim: true},
  streetName: {type: String, required: false, minlength: 2, trim: true},
  city: {type: String, required: true, minlength: 1, trim: true},
  state: {type: String, required: true, minlength: 1, trim: true},
  zip: {type: String, required: true, minlength: 5, trim: true},
  phone: {type: String, required: false, trim: true},
  website: {type: String, required: false, minlength: 3, trim: true},
  description: {type: String, required: true, minlength: 3, maxlength: 150, trim: true},
  latitude:{type: Number, trim: true},
  longitude:{type: Number, trim: true},
  hoursOfOperation: [{}],
  email:{
        type: String,
        required: true,
        validate: [{
          validator: function (email){
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
          },
          error: "{ VALUE } is not a valid email"
        }]
      },
  password: {type: String, required: true, minlength: 5, trim: true},
  // county: {type: String, required: true, trim: true},
  services: {},
  days: [{}],

}, {timestamps: true});

// =========================================================================
// ========================== Set Schema Name===============================
// =========================================================================

mongoose.model('Organization', OrganizationSchema);

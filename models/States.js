const mongoose = require('mongoose');
// Define the States schema
const statesSchema = new mongoose.Schema({
  stateCode: {
    type: String,
    required: true,
    unique: true,
  },
  funFacts: [{
    type: String
  }] 
});

module.exports = mongoose.model("state", statesSchema); 








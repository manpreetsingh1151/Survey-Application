

const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true
  },
  communicatorName: {
    type: String,
    required: false
  },
  issueDesciption: {
    type: String,
    required: false
  },
  surveyorComments: {
    type: String,
    required: false
  },
  cDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Business", businessSchema);

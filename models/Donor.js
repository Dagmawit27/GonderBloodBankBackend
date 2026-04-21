const mongoose = require('mongoose');

const donorSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  secondName: {type: String, required: true},
  lastName: {type: String, required: true},
  dob: {type: Date, required: true},
  contact: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  bloodGroup: {type: String},
  address: {type: String},
  createdAt: {type: Date, default: Date.now}
})

const Donor = mongoose.model("Donor", donorSchema);

module.exports = Donor;
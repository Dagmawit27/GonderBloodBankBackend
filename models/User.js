const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {type : String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, unique: true},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true},
  role:{type: String, default: 'donor', required: true}
})

const UserDonor = mongoose.model("UserDonor", userSchema);

module.exports = UserDonor;
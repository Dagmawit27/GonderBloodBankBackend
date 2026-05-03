const mongoose = require('mongoose');

const empUserSchema = new mongoose.Schema({
  username: {type : String, required: true, unique: true },
  password: {type: String, required: true},
  role: {type: String, required: true}
});

const EmpUser = mongoose.model('EmpUser', empUserSchema);

module.export = EmpUser;
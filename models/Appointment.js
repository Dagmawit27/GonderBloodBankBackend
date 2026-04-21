const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  firstName: {type: String, require: true},
  middleName: {type: String, require: true},
  lastName: {type: String, require: true},
  dob: {type: Date, required: true},
  appointDate: {type: Date, required: true},
  createdAt: {type: Date, default: Date.now}
})

const Appointment = mongoose.model("Appointment", apointmentSchema);

module.exports = 'Appointment';
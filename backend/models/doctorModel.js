const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  availableTimes: [
    {
      date: String,
      time: String,
    },
  ],
});

module.exports = mongoose.model('Doctor', DoctorSchema);

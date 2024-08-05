const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');

// Create an appointment
router.post('/', async (req, res) => {
  const { userId, name, contact, doctor, date, time } = req.body;
  try {
    const doctorDetails = await Doctor.findById(doctor);
    if (!doctorDetails) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const newAppointment = new Appointment({
      userId,
      name,
      contact,
      doctorId: doctorDetails._id,
      doctorName: doctorDetails.name,
      date,
      time
    });
    const appointment = await newAppointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get all appointments

router.get('/', async (req, res) => {
    try {
      const appointments = await Appointment.find();
      res.json(appointments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Get all appointments for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const appointments = await Appointment.find({ userId });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

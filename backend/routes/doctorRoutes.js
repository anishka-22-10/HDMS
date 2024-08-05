const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctorModel');

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

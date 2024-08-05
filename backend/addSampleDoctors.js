const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('./models/doctorModel');

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const addSampleDoctors = async () => {
  const doctors = [
    {
      doctorId: 'D004',
      name: 'Dr. Harshil Patel',
      speciality: 'Child Care',
      availableTimes: [
        { date: '2024-07-1', time: '10:00 AM' },
        { date: '2024-07-16', time: '02:00 PM' },
      ],
    },
    {
      doctorId: 'D005',
      name: 'Dr. Sahil Achhava',
      speciality: 'Neurologist',
      availableTimes: [
        { date: '2024-06-29', time: '09:00 AM' },
        { date: '2024-07-17', time: '01:00 PM' },
      ],
    },
    {
      doctorId: 'D006',
      name: 'Dr. Dhruv Shah',
      speciality: 'General Surgeon',
      availableTimes: [
        { date: '2024-06-18', time: '11:00 AM' },
        { date: '2024-07-01', time: '03:00 PM' },
      ],
    },
    {
        doctorId: 'D007',
        name: 'Dr. Vijeta Kumari',
        speciality: 'Health Checkup',
        availableTimes: [
          { date: '2024-07-15', time: '12:00 PM' },
          { date: '2024-07-17', time: '05:00 PM' },
        ],
      },
      {
        doctorId: 'D008',
        name: 'Dr. Yagnesh Patel',
        speciality: 'Dermatologist',
        availableTimes: [
          { date: '2024-07-1', time: '03:00 PM' },
          { date: '2024-08-17', time: '06:00 PM' },
        ],
      },
      {
        doctorId: 'D009',
        name: 'Dr. Namita Bhoj',
        speciality: 'Eye Specialist',
        availableTimes: [
          { date: '2024-07-13', time: '09:00 AM' },
          { date: '2024-09-20', time: '04:00 PM' },
        ],
      },
      {
        doctorId: 'D010',
        name: 'Dr. Jeel Khan',
        speciality: 'CCU & ICU',
        availableTimes: [
          { date: '2024-06-15', time: '10:00 AM' },
          { date: '2024-06-17', time: '03:00 PM' },
        ],
      },
      {
        doctorId: 'D011',
        name: 'Dr. Harman',
        speciality: 'Health Checkup',
        availableTimes: [
          { date: '2024-06-15', time: '09:00 AM' },
          { date: '2024-10-28', time: '02:00 PM' },
        ],
      },
      {
        doctorId: 'D012',
        name: 'Dr. Anjasha Singh',
        speciality: 'Cardiologist',
        availableTimes: [
          { date: '2024-06-22', time: '09:00 AM' },
          { date: '2024-07-25', time: '05:00 PM' },
        ],
      },
  ];

  try {
    await Doctor.insertMany(doctors);
    console.log('Sample doctors added successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding sample doctors:', error);
    mongoose.connection.close();
  }
};

addSampleDoctors();

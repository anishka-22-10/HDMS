// backend/models/User.js

const mongoose = require('mongoose');
const Counter = require('./Counter');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  UHID: {
    type: String,
    unique: true,
  },
});


UserSchema.pre('save', async function (next) {
  if (!this.UHID) {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2); 
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); 
    const date = now.getDate().toString().padStart(2, '0'); 

   
    const counter = await Counter.findOneAndUpdate(
      { name: 'userUHID' },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    const serialNumber = counter.count.toString().padStart(5, '0'); 

    
    this.UHID = `${year}${month}${date}${serialNumber}`;
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);

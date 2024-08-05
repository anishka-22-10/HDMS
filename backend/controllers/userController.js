const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
    try {
      // Log the incoming request
      console.log('Incoming registration request:', req.body);
  
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        console.log('User already exists:', email);
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      // Create a new user instance
      user = new User({ firstName, lastName, email, password });
  
      // Generate a salt and hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      // Save the user to the database
      console.log('Saving user to database...');
      await user.save();
      console.log('User saved successfully:', user);
  
      // Create a JWT payload
      const payload = { user: { id: user._id } };
  
      // Sign the JWT and send it in the response
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
        if (err) {
          console.error('Error signing JWT:', err);
          throw err;
        }
        console.log('User registered successfully, sending response:', { token, userId: user._id });
        res.json({ token, userId: user._id }); // Return userId in the response
      });
    } catch (err) {
      console.error('Server error:', err); // Add this log
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const payload = { user: { id: user._id, firstName: user.firstName } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token, userId: user._id, firstName: user.firstName }); // Return userId and firstName in the response
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

const resetPassword = async (req, res) => {
  const { firstName, lastName, email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.firstName !== firstName || user.lastName !== lastName) {
      return res.status(400).json({ msg: 'Invalid details' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { registerUser, loginUser, resetPassword, getUserById };
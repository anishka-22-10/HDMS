const express = require('express');
const router = express.Router();
const { registerUser, loginUser, resetPassword, getUserById} = require('../controllers/userController');
const User = require('../models/User');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/reset-password', resetPassword);
router.get('/:userId', getUserById ); // Add this route

// Add this route to get all users
router.get('/', async (req, res) => {
    try {
      const users = await User.find().select('-password');
      console.log('Fetched Users:', users); // Add this log
      res.json(users);
    } catch (err) {
      console.error('Error fetching users:', err); // Add this log
      res.status(500).json({ msg: 'Server error' });
    }
  });

module.exports = router;
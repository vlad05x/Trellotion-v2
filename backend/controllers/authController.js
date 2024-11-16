const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    if ( password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });

    const user = await User.create({ username, email, password });
    res.status(201).json({
      token: generateToken(user._id),
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.json({
      token: generateToken(user._id),
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

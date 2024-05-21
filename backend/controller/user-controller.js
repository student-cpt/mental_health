import User from '../models/userModel.js';
import Journal from '../models/journalModel.js';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import bcrypt from 'bcryptjs';


// User Signup
// User Signup
export const userSignup = async (req, res) => {
  try {
      let exist = await User.findOne({ username: req.body.username });
      if (exist) {
          return res.status(200).json({ msg: 'User already exists!' });
      }
      const newUser = new User(req.body);
      if (req.file) {
          newUser.profilePicture = req.file.path; // save the file path to the user document
      }
      await newUser.save();
      return res.status(200).json(newUser);
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};


// User Login
export const userLogin = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Invalid login', error: info });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.send(err);
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.status(200).json({ user, token });
    });
  })(req, res, next);
};

// Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const { username } = req.params;

    // Find the user by username
    const user = await User.findOneAndDelete({ username });
    console.log(user);
    if (!user) {
      return res.status(404).json({ msg: 'User not found!' });
    }

    // Delete all journals associated with the user
    await Journal.deleteMany({ _id: { $in: user.journals } });

    return res.status(200).json({ msg: 'User and associated journals deleted successfully!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const { username } = req.params;

    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ msg: 'No data provided to update!' });
    }

    // Define the fields that can be updated
    const allowedUpdates = ['name', 'email', 'bio', 'password', 'age', 'gender']; // Include 'password' for updating
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      return res.status(400).json({ msg: 'Invalid updates!' });
    }

    // Hash the password if it is being updated
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    // Find and update the user
    const user = await User.findOneAndUpdate({ username }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ msg: 'User not found!' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


export const getUserDetails = async (req, res) => {
  try {
    // Find the user based on the username provided in the request parameters
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      // If user not found, send 404 status with error message
      return res.status(404).json({ error: 'User not found' });
    }

    // If user found, send user details in the response
    res.json(user);
  } catch (error) {
    // If any error occurs, send 500 status with error message
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
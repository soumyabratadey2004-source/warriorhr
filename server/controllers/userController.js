const User = require('../models/userModel');

const userLogin = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        if (!Email || !Password) {
            return res.status(400).json({
                success: false,
                message: 'Email and Password are required'
            });
        }

        const foundUser = await User.findOne({ Email });
        if (!foundUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (foundUser.Password !== Password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: foundUser._id,
                Email: foundUser.Email,
                FullName: foundUser.FullName
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const userRegister = async (req, res) => {
    try {
        console.log('Registration request body:', req.body);
        const { FullName, Email, Password } = req.body;
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        const newUser = new User({
            FullName,
            Email,
            Password
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                FullName: newUser.FullName,
                Email: newUser.Email
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message // Exposing message for debugging
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-Password'); // Exclude passwords for security
        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { userLogin, userRegister, getAllUsers };

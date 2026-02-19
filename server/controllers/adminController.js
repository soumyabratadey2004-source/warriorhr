const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');

const adminLogin = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        if (!Email || !Password) {
            return res.status(400).json({
                success: false,
                message: 'Email and Password are required'
            });
        }

        const foundUser = await Admin.findOne({ Email });
        if (!foundUser) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        if (foundUser.Password !== Password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }

        if (foundUser.role !== 'Admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Administrator privileges required.'
            });
        }

        const token = jwt.sign(
            { id: foundUser._id, role: 'Admin' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
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

const adminRegister = async (req, res) => {
    try {
        const { FullName, Email, Password } = req.body;
        const existingUser = await Admin.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Admin already exists'
            });
        }

        const newUser = new Admin({
            FullName,
            Email,
            Password
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'Admin registered successfully',
            user: {
                id: newUser._id,
                FullName: newUser.FullName,
                Email: newUser.Email
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { adminLogin, adminRegister };

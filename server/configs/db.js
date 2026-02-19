const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        // Do not exit process here so Render doesn't loop forever, 
        // but it will help you see the error in logs.
    }
};

module.exports = connectDB;
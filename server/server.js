const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./middleware/Cors');
const connectDB = require('./configs/db');
connectDB();
app.use(cors(corsOptions));
app.use(express.json());

const userRoutes = require('./Routes/userRoutes');
const adminRoutes = require('./Routes/adminRoutes');

app.use('/api/users', userRoutes);
app.use(process.env.ADMIN_ROUTE, adminRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});



const jwt = require('jsonwebtoken');

const authAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];

        if (!token || token === 'null' || token === 'undefined') {
            return res.status(401).json({
                success: false,
                message: 'No token provided or invalid token format'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== 'Admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Administrator privileges required.'
            });
        }

        req.admin = decoded;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({ success: false, message: 'Token is not valid' });
    }
};

module.exports = { authAdmin };

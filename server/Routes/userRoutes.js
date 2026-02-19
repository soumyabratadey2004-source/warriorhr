const express = require('express');
const { userLogin, userRegister, getAllUsers } = require('../controllers/userController');
const { authAdmin } = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/login', userLogin);
router.post('/register', userRegister);
router.get('/', authAdmin, getAllUsers);

module.exports = router;
const express = require('express');
const router = express.Router();
const { registerUser, updatePassword } = require('../controllers/userController');

router.post('/register', registerUser);

// 🚨 Nueva ruta
router.put('/update-password', updatePassword);

module.exports = router;

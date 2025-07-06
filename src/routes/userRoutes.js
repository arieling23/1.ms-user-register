const express = require('express');
const router = express.Router();
const { registerUser, updatePassword } = require('../controllers/userController');

router.post('/register', registerUser);


router.put('/update-password', updatePassword);

module.exports = router;

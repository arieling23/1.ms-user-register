const express = require('express');
const router = express.Router();
const { registerUser, updatePassword } = require('../controllers/userController');

router.post('/register', registerUser);

// 🚨 Nueva ruta
router.put('/update-password', updatePassword);

router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

module.exports = router;

// utils/generateToken.js
const jwt = require('jsonwebtoken');

module.exports = function generateToken(id, email, role, name) {
  return jwt.sign(
    {
      id: id.toString(), // ✅ asegura que el ID sea string
      email,
      role,
      name,
    },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '1h' }
  );
};

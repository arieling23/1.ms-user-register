const User = require('../models/User');
const bcrypt = require('bcryptjs');
const validateEmail = require('../utils/validateEmail');
const generateToken = require('../utils/generateToken');
const { publishEvent } = require('../events/publisher');

async function registerUserService({ name, email, password }) {
  if (!name || !email || !password) {
    throw { status: 400, message: 'Todos los campos son obligatorios.' };
  }

  if (!validateEmail(email)) {
    throw { status: 400, message: 'El correo electrónico no es válido.' };
  }

  if (password.length < 8) {
    throw { status: 400, message: 'La contraseña debe tener al menos 8 caracteres.' };
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw { status: 409, message: 'El correo electrónico ya está registrado.' };
  }

  
  const existingAdmin = await User.findOne({ role: 'admin' });

  const role = existingAdmin ? 'user' : 'admin';

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, role });
  await newUser.save();


  await publishEvent('user.registered', {
    type: 'user.registered',
    data: {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
      timestamp: new Date().toISOString()
    }
  });

  const token = generateToken(newUser._id, newUser.email, newUser.role, newUser.name);

  return {
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    },
    token
  };
}


async function updatePasswordService(email, newPassword) {
  if (!email || !newPassword) {
    throw { status: 400, message: 'Email y nueva contraseña son requeridos.' };
  }

  const user = await User.findOne({ email });
  if (!user) {
    return { success: false, message: 'Usuario no encontrado.' };
  }

  user.password = newPassword; 
  await user.save();

  return { success: true };
}

module.exports = {
  registerUserService,
  updatePasswordService
};

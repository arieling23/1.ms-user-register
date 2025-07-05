const { registerUserService, updatePasswordService } = require('../services/userService');

const registerUser = async (req, res) => {
  try {
    console.log('[REGISTER] Body recibido:', req.body); 
    const result = await registerUserService(req.body);
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      ...result
    });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(error.status || 500).json({ message: error.message || 'Error en el servidor' });
  }
};

// 🚨 Nuevo controlador
const updatePassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email y nueva contraseña son requeridos' });
  }

  try {
    const result = await updatePasswordService(email, newPassword);
    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error('❌ Error al actualizar contraseña:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { registerUser, updatePassword };

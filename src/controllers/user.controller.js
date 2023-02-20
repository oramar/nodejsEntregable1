const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.models')

exports.findUsers = catchAsync(async (req, res, next) => {
  // 1. Obtener la lista de los usuarios en la base de datos
  const users = await User.findAll({});

  // 2. Si hay Uusarios devolvemos un mensaje de exito
  res.status(200).json({
    status: 'success',
    message: 'Users was found successfully',
    users,
  });
});

//Buscamos un usuario por id y que no este disabled
exports.findUserById = catchAsync(async (req, res, next) => {
  const { user } = req;
  // 4. Enviamos respuesta affirmativa
  res.status(200).json({
    status: 'success',
    message: 'User was found successfully',
    user,
  });
});

exports.updateUserById = catchAsync(async (req, res, next) => {
  // 2. OBTENER LA INFORMACION A ACTUALIZAR DE LA REQ.BODY
  const { name, email } = req.body;
  const { user } = req;

  // 5. REALIZAR LA ACTUALIZACIÓN DEL USUARIO, CAMPOS USERNAME, EMAIL
  await user.update({ name, email });

  // 6. ENVIAR UNA RESPUESTA AL CLIENTE
  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  // 4. REALIZAR LA ACTUALIZACIÓN DEL STATUS DEL USUARIO ENCONTRADO ANTERIORMENTE
  await user.update({ status: 'disabled' });
  // 5. ENVIAR UNA RESPUESTA AL CLIENTE
  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { currentPassword, newPassword } = req.body;

  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return next(new AppError('Incorrect password', 401));
  }

  const salt = await bcrypt.genSalt(10);
  const encriptedPassword = await bcrypt.hash(newPassword, salt);

  await user.update({
    password: encriptedPassword,
    passwordChangedAt: new Date(),
  });

  res.status(200).json({
    status: 'success',
    message: 'The user password was updated successfully',
  });
});



const catchAsync = require('../../utils/catchAsync');
const User = require('../models/user.models');

const findUsers = catchAsync(async (req, res, next) => {
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
const findUserById = catchAsync(async (req, res, next) => {
  const { user } = req;
  // 4. Enviamos respuesta affirmativa
  res.status(200).json({
    status: 'success',
    message: 'User was found successfully',
    user,
  });
});

const createUser = catchAsync(async (req, res, next) => {
  //1. OBTENER LA INFORMACION DE LA REQ.BODY
  const { name, email, password, role } = req.body;
  //2. CREAR EL USUARIO CON LA INFORMACION DE LA REQ.BODY
  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
    role,
  });
  //3. ENVIAR UNA RESPUESTA AL USUARIO
  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    user,
  });
});

const updateUserById = catchAsync(async (req, res, next) => {
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

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  // 4. REALIZAR LA ACTUALIZACIÓN DEL STATUS DEL USUARIO ENCONTRADO ANTERIORMENTE
  await user.update({ status: 'disabled' });
  // 5. ENVIAR UNA RESPUESTA AL CLIENTE
  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});

module.exports = {
  findUsers,
  findUserById,
  createUser,
  updateUserById,
  deleteUser,
};

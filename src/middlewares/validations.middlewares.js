const { check } = require('express-validator');
const AppError = require('../utils/appError');

//Verificamos que el usuario ingrese la informacion completa para registrar usuario
exports.registerUserValidation = [
  check('name', 'The name must be mandatory').not().isEmpty(),
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The password must be mandatory').not().isEmpty(),
];
//Verificamos si el email y password a sido ingresado por el usuario
exports.loginUserValidation = [
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The password must be mandatory').not().isEmpty(),
];

exports.updateUserValidation = [
  check('name', 'The username must be mandatory').not().isEmpty(),
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
];
//Validamos que el usuario actualice la contraseña correctamente
exports.updatePasswordUserValidation = [
  check('currentPassword', 'The current password must be mandatory')
    .not()
    .isEmpty(),
  check('newPassword', 'The new password must be mandatory').not().isEmpty(),
];
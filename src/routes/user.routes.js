//Importamos routes,check y elcontrolador de user para trabajar con rutas y validacion
const { Router } = require('express'); 
const { check } = require('express-validator');
const {
  findUsers,
  createUser,
  updateUserById,
  findUserById,
  deleteUser,
} = require('../controllers/user.controller');
const {
  validIfExistUser,
  validIfExistUserEmail,
} = require('../middlewares/user.middlewares');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

//Definimos los endpoints que utilizaremos en estas rutas
router.get('/', findUsers);
router.get('/:id', validIfExistUser, findUserById);
router.post(
  '/',
  [
    check('name', 'The name must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password must be mandatory').not().isEmpty(),
    validateFields,
    validIfExistUserEmail,
  ],
  createUser
);
router.patch(
  '/:id',
  [
    check('name', 'The name must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    validateFields,
    validIfExistUser,
  ],
  updateUserById
);
router.delete('/:id', validIfExistUser, deleteUser);
module.exports = {
  userRouter: router,
};

//Importamos routes,check y elcontrolador de user para trabajar con rutas y validacion
const { Router } = require('express'); 
const { check } = require('express-validator');
const {
  findUsers,
  createUser,
  updateUserById,
  findUserById,
  deleteUser,
  updatePassword,
} = require('../controllers/user.controller');
const { protect, protectAccountOwner } = require('../middlewares/auth.middleware');
const {
  validIfExistUser,
  validIfExistUserEmail,
} = require('../middlewares/user.middlewares');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

//Definimos los endpoints que utilizaremos en estas rutas
router.get('/', findUsers);
router.get('/:id', validIfExistUser, findUserById);

router.use(protect);

router.patch(
  '/:id',
  [
    check('name', 'The name must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    validateFields,
    validIfExistUser,
    protectAccountOwner,
  ],
  updateUserById
);
router.patch(
  '/password/:id',
  [
    check('currentPassword', 'The current password must be mandatory')
      .not()
      .isEmpty(),
    check('newPassword', 'The new password must be mandatory').not().isEmpty(),
    validateFields,
    validIfExistUser,
    protectAccountOwner,
  ],
  updatePassword
);
router.delete('/:id', validIfExistUser,protectAccountOwner, deleteUser);
module.exports = {
  userRouter: router,
};

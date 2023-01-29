const { Router } = require('express'); //Importamos routes para trabajar con rutas
const {
  findTransfers,
  createTransfer,
  updateTransfer,
  findById,
  deleteTransfer,
} = require('../controllers/transfer.controller');
const {
  valideTransferById,
  valideTransferByIdStatus,
} = require('../middlewares/transfer.middlewares');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateField.middleware');
const router = Router();

//Definimos los endpoints que utilizaremos en estas rutas
router.get('/', findTransfers);
router.get('/:id', valideTransferById, findById);
router.post(
  '/',
  [
    check('date', 'The date must be mandatory').not().isEmpty(),
    check('date', 'The email must be a correct format').isDate(),
    check('userId', 'The UserId must be mandatory').not().isEmpty(),
    validateFields,
  ],
  createTransfer
);
router.patch(
  '/:id',
  [
    check('sttus', 'The status must be mandatory').not().isEmpty(),
    validateFields,
  ],
  valideTransferById,
  updateTransfer
);
router.delete('/:id', valideTransferByIdStatus, deleteTransfer);
module.exports = {
  transferRouter: router,
};

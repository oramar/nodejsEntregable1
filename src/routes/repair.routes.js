const { Router } = require('express'); //Importamos routes para trabajar con rutas
const {
  findTransfers,
  createTransfer,
  updateTransfer,
  findById,
  deleteTransfer,
} = require('../controllers/repair.controller');
const {
  valideRepairById,
  valideRepairByIdStatus,
} = require('../middlewares/repair.middlewares');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateField.middleware');
const router = Router();

//Definimos los endpoints que utilizaremos en estas rutas
router.get('/', findTransfers);
router.get('/:id', valideRepairById, findById);
router.post(
  '/',
  [
    check('date', 'The date must be mandatory').not().isEmpty(),
    check('date', 'The email must be a correct format').isDate(),
    check('userId', 'The UserId must be mandatory').not().isEmpty(),
    check('motorsNumbers', 'The UserId must be mandatory').not().isEmpty(),
    check('description', 'The UserId must be mandatory').not().isEmpty(),
    validateFields,
  ],
  createTransfer
);
router.patch(
  '/:id',
  [
    check('status', 'The status must be mandatory').not().isEmpty(),
    validateFields,
  ],
  valideRepairById,
  updateTransfer
);
router.delete('/:id', valideRepairByIdStatus, deleteTransfer);

module.exports =  {
  repairRouter: router
} 


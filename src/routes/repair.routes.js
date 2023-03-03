const { Router } = require('express'); //Importamos routes para trabajar con rutas
const {
  findAllRepair,
  createRepair,
  updateRepair,
  findById,
  deleteRepair
} = require('../controllers/repair.controller');
const {
  valideRepairById,
  valideRepairByIdStatus,
} = require('../middlewares/repair.middlewares');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateField.middleware');
const { restrictTo } = require('../middlewares/auth.middleware');
const router = Router();

//Definimos los endpoints que utilizaremos en estas rutas

router.get('/', restrictTo('employee'),findAllRepair);
router.get('/:id', restrictTo('employee'),valideRepairById, findById);
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
  createRepair
);
router.patch(
  '/:id',
  [
    check('status', 'The status must be mandatory').not().isEmpty(),
    restrictTo('employee'),
    validateFields,
  ],
  valideRepairById,
  updateRepair
);
router.delete('/:id', restrictTo('employee'),valideRepairByIdStatus, deleteRepair);

module.exports =  {
  repairRouter: router
} 


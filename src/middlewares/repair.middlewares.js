const catchAsync = require('../utils/catchAsync');
const Repair = require('../models/repair.models');
exports.valideRepairById = catchAsync(async (req, res, next) => {
  //id del Repair que se va verificar si existe
  const { id } = req.params;
  const repair = await Repair.findOne({
    where: {
      id,
    },
  });
  if (!repair) {
    return next(new AppError('Repair not found', 404));
  }

  req.repair = repair;
  next();
});

//----------------------------------

exports.valideRepairByIdStatus = catchAsync(async (req, res, next) => {
  //id del Repair que se va verificar si existe
  const { id } = req.params;
  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  if (repair && repair.status === 'completed') {
    return next(new AppError('Repair not allowed, because it has a status of completed.', 404));
    
  }
  if (!repair) {
    return next(new AppError('Repair not found', 404));
   
  }

  req.repair = repair;
  next();
});

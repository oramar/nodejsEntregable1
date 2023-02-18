const catchAsync = require('../../utils/catchAsync');
const Repair = require('../models/repair.models');
exports.valideRepairById = catchAsync( async (req, res, next) => {
  
    //id del Transfer que se va verificar si existe
    const { id } = req.params;
    const repair = await Repair.findOne({
        where:{
            id,
            status:'pending',
        }
    })
    if (!repair) {
        return res.status(404).json({
          status: 'error',
          message: 'Transfer not found',
        });
      }
  
      req.repair = repair;
      next();
  
});


//----------------------------------


exports.valideRepairByIdStatus = catchAsync(async (req, res, next) => {
  
    //id del Transfer que se va verificar si existe
    const { id } = req.params;
    const repair = await Repair.findOne({
        where:{
            id,            
        }
    })

    if(repair && repair.status ==='completed'){
      return res.status(404).json({
        status: 'error',
        message: 'Repair not allowed, because it has a status of completed.',
      });
    }
    if (!repair) {
        return res.status(404).json({
          status: 'error',
          message: 'Repair not found',
        });
      }
  
      req.repair = repair;
      next();
  
});
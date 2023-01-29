const Transfer = require('../models/transfer.models');
exports.valideTransferById = async (req, res, next) => {
  try {
    //id del Transfer que se va verificar si existe
    const { id } = req.params;
    const transfer = await Transfer.findOne({
        where:{
            id,
            status:'pending',
        }
    })
    if (!transfer) {
        return res.status(404).json({
          status: 'error',
          message: 'Transfer not found',
        });
      }
  
      req.transfer = transfer;
      next();

  } catch (error) {
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
  }
};


//----------------------------------


exports.valideTransferByIdStatus = async (req, res, next) => {
  try {
    //id del Transfer que se va verificar si existe
    const { id } = req.params;
    const transfer = await Transfer.findOne({
        where:{
            id,            
        }
    })

    if(transfer && transfer.status ==='completed'){
      return res.status(404).json({
        status: 'error',
        message: 'Transfer not allowed, because it has a status of completed.',
      });
    }
    if (!transfer) {
        return res.status(404).json({
          status: 'error',
          message: 'Transfer not found',
        });
      }
  
      req.transfer = transfer;
      next();

  } catch (error) {
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
  }
};
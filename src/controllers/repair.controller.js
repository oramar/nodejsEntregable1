const catchAsync = require('../../utils/catchAsync');
const Transfer = require('../models/repair.models');
exports.findTransfers = catchAsync( async (req, res,next) => {
  const transfers = await Transfer.findAll({
      where: {
        status: 'pending',
      },
    });
    res.status(200).json({
      status: 'succes',
      message: 'The transfers found were successfull',
      transfers,
    });
 
});

exports.findById = catchAsync( async (req, res, next) => {  
    const { transfer } = req;
    return res.status(200).json({
      status: 'succes',
      message: 'The transfers found were successfull',
      transfer,
    });
 
});

exports.createTransfer =catchAsync( async (req, res,next) => {
 
    //obtenemos la informacion a guardar de la req.body
    const { date, userId } = req.body;
    const newTransfer = await Transfer.create({
      date,
      userId,
    });
    res.status(201).json({
      status: 'succes',
      message: 'The transfer was created successfully',
      newTransfer,
    });

});

exports.updateTransfer = catchAsync( async (req, res,next) => {

    //1. Obtendo todos los item de transfer
    const { transfer } = req;
    //2. obtengo la informacion a actualizar del req.body
    const { status } = req.body;

    //5. actualizamos el transfer si todo sale bien
    const updateTransfer = await transfer.update({
      status: status.toLowerCase(),
    });
    //6. ENVIO LA RESPUESTA AL CLIENTE
    res.status(200).json({
      status: 'success',
      message: 'Then transfer has been updated successfully',
      updateTransfer,
    });
 
});

exports.deleteTransfer = catchAsync( async (req, res,next) => { 
    const { transfer } = req;
    res.transfer
    await transfer.update({ status: 'cancelled' ,});
    res.status(200).json({
      status: 'success',
      message: 'The Transfer has been deleted successfully',
    });

});

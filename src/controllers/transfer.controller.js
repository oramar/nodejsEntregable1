const Transfer = require('../models/transfer.models');
exports.findTransfers = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.findById = async (req, res) => {
  try {
    const { transfer } = req;
    return res.status(200).json({
      status: 'succes',
      message: 'The transfers found were successfull',
      transfer,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.createTransfer = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.updateTransfer = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.deleteTransfer = async (req, res) => {
  try {
    const { transfer } = req;
    res.transfer
    await transfer.update({ status: 'cancelled' ,});
    res.status(200).json({
      status: 'success',
      message: 'The Transfer has been deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

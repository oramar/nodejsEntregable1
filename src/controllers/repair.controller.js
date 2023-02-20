const catchAsync = require('../utils/catchAsync');
const Repair = require('../models/repair.models');
const User = require('../models/user.models');

exports.findAllRepair = catchAsync( async (req, res,next) => {
  const repairs = await Repair.findAll({
    attributes: ['id', 'date','description','status'],
      where: {
        status: ['pending','completed'],
      },
     
      include:[
        {
          model: User,
          attributes:  ['id', 'name', 'email','role',] ,
          where:{
            status: 'available'
          },
        }
      ]
    });
    res.status(200).json({
      status: 'succes',
      message: 'The repairs found were successfull',
      repairs,
    });
 
});

exports.findById = catchAsync( async (req, res, next) => {  
    const { repair } = req;

    
    return res.status(200).json({
      status: 'succes',
      message: 'The repair found were successfull',
      repair,
    });
 
});

exports.createRepair =catchAsync( async (req, res,next) => {
 
    //obtenemos la informacion a guardar de la req.body
    const { date,motorsNumbers,description, userId } = req.body;
    const newRepair = await Repair.create({
      date,
      motorsNumbers,
      description,
      userId,
    });
    res.status(201).json({
      status: 'succes',
      message: 'The repair was created successfully',
      newRepair,
    });

});

exports.updateRepair = catchAsync( async (req, res,next) => {

    //1. Obtendo todos los item de transfer
    const { repair } = req;
    //2. obtengo la informacion a actualizar del req.body
    const { status } = req.body;

    //5. actualizamos el transfer si todo sale bien
    const updateRepair = await repair.update({
      status: status.toLowerCase(),
    });
    //6. ENVIO LA RESPUESTA AL CLIENTE
    res.status(200).json({
      status: 'success',
      message: 'Then repair has been updated successfully',
      updateRepair,
    });
 
});

exports.deleteRepair = catchAsync( async (req, res,next) => { 
    const { repair } = req;
    res.repair
    await repair.update({ status: 'cancelled' ,});
    res.status(200).json({
      status: 'success',
      message: 'The repair has been deleted successfully',
    });

});

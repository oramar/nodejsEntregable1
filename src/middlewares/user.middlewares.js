const catchAsync = require('../../utils/catchAsync');
const User = require('../models/user.models');

exports.validIfExistUser = catchAsync( async (req, res, next) => {
 
    // 1. Obtenemos el id de los parametros
    const { id } = req.params;
    // 2. Obtenemso el usuario por su id y que sea de estatus available
    const user = await User.findOne({
      where: {
        status: 'available',
        id,
      },
    });
    //3. Enviamos un error si no existe un usuario
    if (!user) {
      return next(
        new AppError('User not found', 404)
      );
   
    }

    req.user = user;
    next();
 
});

exports.validIfExistUserEmail =catchAsync( async (req, res, next) => {
 
    const { email } = req.body;

    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (user && user.status !== 'available') {
      //Si existe el usuario pero el estatus es available entonces arrojamos un erro 400
      return next(
        new AppError('The user has an account, but it is deactivated please talk to the administrator to activate it', 400)
      );
     
    }

    if (user) {
      return next(
        new AppError('The email user already exists', 400)
      );
     
    }

    next();
 
});

//_________________________________


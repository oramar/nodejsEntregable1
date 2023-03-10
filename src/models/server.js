const express = require('express'); //para utilizar express
const cors = require('cors'); //utilizamos cors
const morgan = require('morgan'); //utilizamos morgan
const helmet = require('helmet');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const { repairRouter } = require('../routes/repair.routes');
const { db } = require('../database/db');
const { userRouter } = require('../routes/user.routes');
const { initModel } = require('../models/initModels');
const globalErrorHandler = require('../controllers/error.controller');
const AppError = require('../utils/appError');
const { authRouter } = require('../routes/auth.routes');
//1. Creamos la clase server
class Server {
  constructor() {
    //a. Inicializamos express, el puerto, el paths
    this.app = express(); //le asignamos a la propiedad app la aplicacion express
    this.port = process.env.PORT || 6000;
    this.limiter = rateLimit({
      windowMs: 60 * 60 * 1000,
      max: 100,
      message: 'Too many request from this IP, please try again in an hour!',
    });
    this.paths = {
      //definimos los paths general de nuestra aplicacion
      auth: '/api/v1/auth',
      user: '/api/v1/user',
      repair: '/api/v1/repair',
    };

    //ejecutamos los metodos creados abajo en el siguiente orden
    this.database(); //metodo conexion base datos
    this.middlewares(); //inicamos metodo middlewares
    this.routes(); //envocamos metodo routes
  }
  //creamos lun metod middlewares
  middlewares() {
    this.app.use(helmet());

    this.app.use(xss());

    this.app.use(hpp());

    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
    this.app.use('/api/v1', this.limiter);
    this.app.use(cors()); //permitimos acceos a la api por medio de las cors
    this.app.use(express.json()); //Parsear el body de la qequest
  }

  //Creamos el metodo de rutas
  routes() {
      //utilizar las rutas de autenticacion
      this.app.use(this.paths.auth, authRouter);
    this.app.use(this.paths.repair, repairRouter); //Utilizamos la rutas de transfer
    this.app.use(this.paths.user, userRouter);

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
      );
    });

    this.app.use(globalErrorHandler);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));
    // relations
    initModel();
    db.sync()//{force:true}
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }
  //creamos el metodo de listen y le pasamo el puerto y enviamosun mensaje
  listen() {
    this.app.listen(this.port, () =>
      console.log(`Server listenig on port ${this.port}`)
    );
  }
}
//exportamos el servidor
module.exports = Server;

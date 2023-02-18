const express = require('express'); //para utilizar express
const cors = require('cors'); //utilizamos cors
const morgan = require('morgan'); //utilizamos morgan
const { repairRouter } = require('../routes/repair.routes');
const { db } = require('../database/db');
const { userRouter } = require('../routes/user.routes');

//1. Creamos la clase server
class Server {
  constructor() {
    //a. Inicializamos express, el puerto, el paths
    this.app = express(); //le asignamos a la propiedad app la aplicacion express
    this.port = process.env.PORT || 6000;
    this.paths = {
      //definimos los paths general de nuestra aplicacion
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
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    } else if (process.NODE_ENV === 'production') {
      console.log('Estoy en desarrollo');
    }

    this.app.use(cors()); //permitimos acceos a la api por medio de las cors
    this.app.use(express.json()); //Parsear el body de la qequest
  }

  //Creamos el metodo de rutas
  routes() {
    this.app.use(this.paths.repair, repairRouter); //Utilizamos la rutas de transfer
    this.app.use(this.paths.user, userRouter);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));

    db.sync()
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

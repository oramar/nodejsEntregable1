//importamo notenv para configurar o usar variable de entorno
require('dotenv').config();
//1. importamos el modelo server
const Server = require('./models/server');
//2. Instanciamos la clase que esta en server 
const server = new Server()
//.3 ponemos a escuchar la clase
server.listen();
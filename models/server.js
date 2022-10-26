const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath     = '/api/auth';
        this.clientesPath = '/api/clientes'

        // Conectar a base de datos
        this.conectarDB();

        //Middewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }
    
    middlewares() {

        //CORS
        this.app.use( cors() );

        // Parseo y lectura del body
        this.app.use( express.json() );

        //Directorio Publico
        this.app.use(express.static('public'));

    }

    routes() {

       this.app.use( this.authPath, require('../routes/auth'))
       this.app.use( this.usuariosPath , require('../routes/usuarios'));
       this.app.use( this.clientesPath , require('../routes/clientes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);

        });
    }

}




module.exports = Server;
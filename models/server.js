const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
        usuarios:         '/api/usuarios',
        auth:             '/api/auth',
        clientes:         '/api/clientes',
        uploads:          '/api/uploads',
        premiums:         '/api/premiums'
        
        }
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

        // File upload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));

    }

    routes() {

       this.app.use( this.paths.auth, require('../routes/auth'))
       this.app.use( this.paths.usuarios , require('../routes/usuarios'));
       this.app.use( this.paths.clientes , require('../routes/clientes'));
       this.app.use( this.paths.uploads, require('../routes/uploads'));
       this.app.use( this.paths.premiums, require('../routes/premiums'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);

        });
    }

}




module.exports = Server;
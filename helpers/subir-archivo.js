const path = require('path')

const subirArchivo = ( files ) => {

    return new Promise( (resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1];
      
        // Validar Extension
        const extensionesValidas = ['xlsx']
        if ( !extensionesValidas.includes( extension )){
          return reject(` La extensión [.${extension}] no es permitida esta solo permitida [.${extensionesValidas}] `)
              
        }
     
        const nombreFinal = 'Tabla de Datos.xlsx'
        const uploadPath = path.join( __dirname, '../uploads/', nombreFinal);
      
        archivo.mv(uploadPath, (err) => {
          if (err) {
            reject(err);
          }
          
      
          resolve( {nombreFinal, uploadPath} );
          
          
        });
    });




}





module.exports = { 
    subirArchivo
}